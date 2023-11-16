import BandBanner from "./components/bandBanner/BandBanner";
import Header from "./components/header/Header";
import MyPageHome from "./myPage/myPageHome/MyPageHome";

export default function HomeLayout({ children }) {
  return (
    <div>
      <BandBanner />
      <Header />
      <MyPageHome />
      {children}
    </div>
  );
}
