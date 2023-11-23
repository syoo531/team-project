import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Period.scss";

export default function Period({ selectValue, setSelectValue }) {
  function selectDate(targetValue) {
    setSelectValue({ ...selectValue, date: targetValue });
  }

  return (
    <div className="period">
      <div className="periodTitle">날짜로 찾기</div>
      <div className="periodSubTitle">
        방문하실 날짜를 지정하시면, <br />
        해당 날짜에 방문이 가능한 팝업스토어를 모두 확인하실 수 있습니다.
      </div>
      <div className="calendarWrapper">
        <Calendar
          className="customCalendar"
          onChange={selectDate}
          value={selectValue.date}
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
        />
      </div>
    </div>
  );
}
