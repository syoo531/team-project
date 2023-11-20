// 팝업스토어 업체 관리자: 사전등록관리페이지

import ReservationContent from "../components/reservationContent/reservationContent";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";

export default function CorpAdmin() {
  return (
    <div className="container">
      <Navbar />
      <div className="main">
        <Sidebar />
        <div className="content">
          <ReservationContent />
        </div>
      </div>
    </div>
  );
}
