import "../styles/reset.scss";
import "../styles/global.scss";
import Header from "./components/header/Header";
import BandBanner from "./components/bandBanner/BandBanner";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export const metadata = {
  title: "pop.spot!",
  description: "pop-up service",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <BandBanner />
        <Header />
        {children}
      </body>
    </html>
  );
}
