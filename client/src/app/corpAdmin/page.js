// 팝업스토어 업체 관리자 페이지

import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import "./main.scss";

export default function CorpAdmin() {
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Navbar />
        <div className="content">내용</div>
      </div>
    </div>
  );
}
