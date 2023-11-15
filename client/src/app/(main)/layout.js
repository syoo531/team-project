export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <h1>메인 레이아웃</h1>
        {children}
      </body>
    </html>
  );
}
