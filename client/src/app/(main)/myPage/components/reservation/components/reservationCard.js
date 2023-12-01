"use client";
import "./reservationCard.scss";
import instance from "@/utils/instance";

//카드에 들어갈 정보
// 1. 팝업스토어 이름(보내줄때 한번에 ) 2. 예약날자 3. 예약시간 4. 일행
export default function ReservationCard({ data, onDelete }) {
  const popupStoreId = data.popup_store._id;

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const confirmDelete = window.confirm("사전예약을 취소하시겠습니까?");
    if (confirmDelete) {
      const res = await instance.delete(
        `/reservation/deleteReservation/${popupStoreId}`
      );
      onDelete();
    }
  };
  const handleClick = () => {
    window.location.href = `/popupList/all/${data.popup_store._id}`;
  };
  const date = new Date(data.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return (
    <div className="reservationCardContainer">
      <div className="reservationCard" onClick={handleClick}>
        <div className="imgWrapper">
          <img src={`${data.popup_store.mainImage.url}`} />
        </div>
        <div className="dataWrapper">
          <div className="popupName">{data.popup_store.name}</div>
          <div className="date">{`${year}년 ${month}월 ${day}일`}</div>
          <div className="hour">{`${data.people}명 - ${data.hour}`}</div>
          <button className="cancelBtn" onClick={handleDelete}>
            예약취소
          </button>
        </div>
      </div>
    </div>
  );
}
