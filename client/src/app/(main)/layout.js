import BandBanner from "./components/bandBanner/BandBanner";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

export default function HomeLayout({ children }) {
  return (
    <div>
      <BandBanner />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
