// components/Navbar.js
import Link from "next/link";
import "./navbar.scss";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="">웨이팅중</Link>
        </li>
        <li>
          <Link href="">완료</Link>
        </li>
      </ul>
    </nav>
  );
}
