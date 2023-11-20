import SideMenu from "./components/SideMenu/SideMenu";
import NavBar from "./components/NavBar/NavBar";
import "./main.scss";

export default function RootLayout({ children }) {
  return (
    <div className="app">
      <NavBar />
      <div className="app-flex-container">
        <SideMenu />
        <main>{children}</main>
      </div>
    </div>
  );
}
