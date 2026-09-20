import Link from 'next/link';

export default function HomePage() {
  const pages = [
    { href: '/week-1-form', title: 'Week 1 — Form / Validator' }
  ];

  return (
    <main>
      <h1>Study Playground</h1>
      <p>주차별 실습 페이지로 이동해 학습하세요.</p>
      <ul style={{ lineHeight: 2 }}>
        {pages.map(p => (
          <li key={p.href}>
            <Link href={p.href}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

