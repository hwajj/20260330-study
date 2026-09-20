export const metadata = {
  title: 'Backoffice Practice Study',
  description: 'Weekly practice playground'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
          {children}
        </div>
      </body>
    </html>
  );
}

