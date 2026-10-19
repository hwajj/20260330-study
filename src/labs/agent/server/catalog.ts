import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export type CatalogItem = {
  sku: string;
  name: string;
  synonyms: string[];
  defaultUnit: string;
  unitPrice: number;
};

export type ResolveLine = {
  raw: string;
  qty: number;
  unit?: string;
};

const catalogPath = join(dirname(fileURLToPath(import.meta.url)), "catalog.json");

export function loadCatalog(): CatalogItem[] {
  return JSON.parse(readFileSync(catalogPath, "utf8")) as CatalogItem[];
}

function matches(item: CatalogItem, raw: string): boolean {
  const q = raw.trim().toLowerCase();
  if (!q) return false;
  if (item.name.toLowerCase() === q) return true;
  return item.synonyms.some((s) => s.toLowerCase() === q);
}

/** mock resolve — LLM 없음. 동의어 정확 일치 + 부분 일치 candidates. */
export function resolveLines(lines: ResolveLine[]) {
  const catalog = loadCatalog();
  const items: {
    sku: string;
    name: string;
    qty: number;
    unit: string;
    unitPrice: number;
  }[] = [];
  const ambiguous: { raw: string; candidates: { sku: string; name: string }[] }[] =
    [];

  for (const line of lines) {
    const q = line.raw.trim().toLowerCase();
    const exact = catalog.filter((c) => matches(c, line.raw));
    // `고추` → PEPPER exact + 고춧가루 contains → ambiguous (플랜 §3)
    const contains = catalog.filter(
      (c) =>
        !exact.some((e) => e.sku === c.sku) &&
        q.length > 0 &&
        (c.name.toLowerCase().includes(q) ||
          c.synonyms.some((s) => s.toLowerCase().includes(q))),
    );
    const partial =
      exact.length > 0
        ? []
        : catalog.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.synonyms.some((s) => s.toLowerCase().includes(q)) ||
              q.includes(c.name.toLowerCase()),
          );

    const candidates =
      exact.length > 0
        ? contains.length > 0
          ? [...exact, ...contains]
          : exact
        : partial;

    if (candidates.length === 1) {
      const c = candidates[0];
      items.push({
        sku: c.sku,
        name: c.name,
        qty: line.qty,
        unit: line.unit ?? c.defaultUnit,
        unitPrice: c.unitPrice,
      });
    } else if (candidates.length > 1) {
      ambiguous.push({
        raw: line.raw,
        candidates: candidates.map((c) => ({ sku: c.sku, name: c.name })),
      });
    } else {
      ambiguous.push({ raw: line.raw, candidates: [] });
    }
  }

  return { items, ambiguous: ambiguous.length ? ambiguous : undefined };
}
