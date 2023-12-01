"use client";
import "./waitingCard.scss";
import instance from "@/utils/instance";

export default function WaitingCard({ data, onDelete }) {
  const popupStoreId = data[4];
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const confirmDelete = window.confirm("현장대기를 취소하시겠습니까?");
    if (confirmDelete) {
      const res = await instance.delete(
        `/waiting/cancelWaiting/${popupStoreId}`
      );
      onDelete();
    }
  };
  const handleClick = () => {
    window.location.href = `/popupList/all/${popupStoreId}`;
  };
  return (
    <div className="waitingCardContainer">
      <div className="waitingCard" onClick={handleClick}>
        <div className="imgWrapper">
          <img src={`${data[2]}`} />
        </div>
        <div className="dataWrapper">
          <div className="popupName">{data[0]}</div>
          {data[1] === 0 ? (
            <>
              <div className="name">{data[3]} 님</div>
              <div className="nowEnter">지금 입장해주세요!</div>
            </>
          ) : (
            <>
              <div className="info">
                <div className="infrontMe">내 앞에 대기</div>
                <div className="team">{data[1]} 팀</div>
              </div>

              <button className="cancelBtn" onClick={handleDelete}>
                대기취소
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
