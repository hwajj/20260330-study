import { randomUUID } from "node:crypto";

export type QuoteRow = {
  sku: string;
  name: string;
  qty: number;
  unit: string;
  unitPrice: number;
  lineTotal: number;
};

export type Quote = {
  quoteId: string;
  rows: QuoteRow[];
  subtotal: number;
  total: number;
};

export type Session = {
  id: string;
  quote: Quote | null;
  confirmed: boolean;
  fileId: string | null;
  createdAt: number;
};

const sessions = new Map<string, Session>();

export function createSession(): Session {
  const s: Session = {
    id: randomUUID(),
    quote: null,
    confirmed: false,
    fileId: null,
    createdAt: Date.now(),
  };
  sessions.set(s.id, s);
  return s;
}

export function getSession(id: string): Session | undefined {
  return sessions.get(id);
}

export function attachQuote(sessionId: string, quote: Omit<Quote, "quoteId">): Quote {
  const s = sessions.get(sessionId);
  if (!s) throw new Error("session not found");
  const full: Quote = { quoteId: randomUUID(), ...quote };
  s.quote = full;
  s.confirmed = false;
  s.fileId = null;
  return full;
}

export function confirmQuote(sessionId: string): Session {
  const s = sessions.get(sessionId);
  if (!s) throw new Error("session not found");
  if (!s.quote) throw new Error("no quote to confirm");
  s.confirmed = true;
  return s;
}
