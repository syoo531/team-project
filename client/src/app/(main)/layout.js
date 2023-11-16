import BandBanner from "./components/bandBanner/BandBanner";
import Header from "./components/header/Header";

export default function HomeLayout({ children }) {
  return (
    <div>
      <BandBanner />
      <Header />
      {children}
    </div>
  );
}
