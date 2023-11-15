export const metadata = {
  title: "pop.spot!",
  description: "pop-up service",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <h1>상위 레이아웃</h1>
        {children}
      </body>
    </html>
  );
}
