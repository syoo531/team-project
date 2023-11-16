// components/Sidebar.js
import Link from "next/link";
import "./sidebar.scss";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="">About</Link>
        </li>
        <li>
          <Link href="">Contact</Link>
        </li>
      </ul>
    </div>
  );
}
