export const metadata = {
  title: "pop.spot!",
  description: "pop-up service",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}