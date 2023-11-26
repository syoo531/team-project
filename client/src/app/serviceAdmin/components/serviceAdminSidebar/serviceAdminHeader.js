import Header from "@/adminStyles/header/header";
import Link from "next/link";

export default function ServiceAdminHeader() {
  const headerContent = (
    <Link href="/serviceAdmin" className="linkLogo">
      <img
        className="logo"
        src="https://user-images.githubusercontent.com/126956430/282671088-36fecca9-631c-4a3d-a73e-80047a312533.png"
        alt="로고 이미지"
      />
    </Link>
  );
  return <Header headerContent={headerContent} />;
}
