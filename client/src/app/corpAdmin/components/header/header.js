import Link from "next/link";
import "./header.scss";

export default function Header() {
  return (
    <div className="header">
      <Link href="/corpAdmin" className="linkLogo">
        <img
          className="logo"
          src="https://user-images.githubusercontent.com/126956430/282671088-36fecca9-631c-4a3d-a73e-80047a312533.png"
          alt="로고 이미지"
        />
      </Link>
    </div>
  );
}
