import ServiceAdminHeader from "./components/serviceAdminSidebar/serviceAdminHeader";
import ServiceAdminSidebar from "./components/serviceAdminSidebar/serviceAdminSidebar";
import "./main.scss";

export default function RootLayout({ children }) {
  return (
    <div className="app">
      <ServiceAdminHeader />
      <div className="app-flex-container">
        <ServiceAdminSidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}
