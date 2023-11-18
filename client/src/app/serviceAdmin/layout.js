import NavBar from "./components/NavBar/NavBar";
import "./main.scss"

export default function RootLayout({ children }) {
  return (
    <div className="app">
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
