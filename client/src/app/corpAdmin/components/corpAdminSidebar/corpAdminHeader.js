import Header from "@/adminStyles/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function CorpAdminHeader({ isMobileView, toggleSidebar }) {
  const headerContent = (
    <>
      {isMobileView && (
        <FontAwesomeIcon
          icon={faBars}
          className="hamburgerIcon"
          onClick={toggleSidebar}
        />
      )}
      <Link href="/corpAdmin" className="linkLogo">
        <img
          className="logo"
          src="https://user-images.githubusercontent.com/126956430/282671088-36fecca9-631c-4a3d-a73e-80047a312533.png"
          alt="로고 이미지"
        />
      </Link>
    </>
  );
  return <Header headerContent={headerContent} />;
}
