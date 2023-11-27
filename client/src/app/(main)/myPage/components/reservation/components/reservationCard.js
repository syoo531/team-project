import "./reservationCard.scss";

//카드에 들어갈 정보
// 1. 팝업스토어 이름(보내줄때 한번에 ) 2. 예약날자 3. 예약시간 4. 일행
export default function reservationCard(data) {
  const date = new Date(data.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return (
    <div className="reservationCardContainer">
      <div className="Card">
        <div className="imgWrapper">
          <img src="https://user-images.githubusercontent.com/126956430/283725713-f0f5bc90-335b-4ea6-addb-b395a154f685.png" />
        </div>
        <div className="dataWrapper">
          <div className="popupName">{data.popup_store.name}</div>
          <div className="date">{`${year}년 ${month}월 ${day}일`}</div>
          <div className="hour">{`${data.people}명 ${data.hour}`}</div>
        </div>
      </div>
    </div>
  );
}
