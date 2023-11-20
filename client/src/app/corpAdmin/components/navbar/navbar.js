import Link from "next/link";
import "./navbar.scss";

export default function Navbar() {
  const links = [
    { href: "", label: "웨이팅중" },
    { href: "", label: "완료" },
  ];
  return (
    <nav className="navbar">
      <Link href="/corpAdmin" className="linkLogo">
        <img
          className="logo"
          src="https://user-images.githubusercontent.com/126956430/282671088-36fecca9-631c-4a3d-a73e-80047a312533.png"
          alt="로고 이미지"
        />
      </Link>
      <ul>
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
