import Link from "next/link";
import "./navbar.scss";

export default function Navbar() {
  const links = [
    { href: "", label: "웨이팅중" },
    { href: "", label: "완료" },
  ];
  return (
    <nav className="navbar">
      <ul>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
