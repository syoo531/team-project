import SideMenu from "./components/SideMenu/SideMenu";
import NavBar from "./components/NavBar/NavBar";
import "./main.scss";

export default function RootLayout({ children }) {
  return (
    <div className="app">
      <NavBar />
      <main>
        <SideMenu />
        <section>{children}</section>
      </main>
    </div>
  );
}
