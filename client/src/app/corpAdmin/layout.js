import "./main.scss";
import CorpAdminSidebar from "./components/corpAdminSidebar/corpAdminSidebar";
import CorpAdminHeader from "./components/corpAdminSidebar/corpAdminHeader";

export default function RootLayout({ children }) {
  return (
    <div className="container">
      <CorpAdminHeader />
      <div className="main">
        <CorpAdminSidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
