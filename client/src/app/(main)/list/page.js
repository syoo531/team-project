import "./page.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

// 팝업스토어 리스트
export default function List() {
  const generatorsItems = () => {
    const items = [];
    for (let i = 0; i < 8; i++) {
      items.push({
        id: i,
        title: `와일드터키 팝업스토어${i}`,
        location: "서울시 강남구",
        date: "2023. 11. 10 ~ 2023. 11. 31",
      });
    }

    return items;
  };

  const data = generatorsItems();

  return (
    <div className="List">
      <div className="list">
        <div className="listItem closeListItem">
          <div className="itemImg">
            <h1>
              Thumb <br /> IMG
            </h1>
          </div>
          <div className="itemInfo">
            <div className="itemTitle">
              <h1>CLOSED TEST 와일드터키 팝업스토어</h1>
            </div>
            <div className="itemLocation">
              <FontAwesomeIcon className="icon" icon={faLocationDot} />
              <p>인천시 연수구</p>
            </div>
            <div className="itemDate">
              <p>2023.11.01 ~ 2023.11.05</p>
            </div>
            <div className="itemFavorite">
              <input type="checkbox" id="dd" />
              <label htmlFor="dd"></label>
            </div>
          </div>
        </div>
        {data.map((item) => (
          <div className="listItem">
            <div className="itemImg">
              <h1>
                Thumb <br /> IMG
              </h1>
            </div>
            <div className="itemInfo">
              <div className="itemTitle">
                <h1>
                  <Link href={`./list/${item.id}`}>
                    <h1>{item.title}</h1>
                  </Link>
                </h1>
              </div>
              <div className="itemLocation">
                <FontAwesomeIcon className="icon" icon={faLocationDot} />
                <p>{item.location}</p>
              </div>
              <div className="itemDate">
                <p>{item.date}</p>
              </div>
              <div className="itemFavorite">
                <input type="checkbox" id={`itemFav${item.id}`} />
                <label htmlFor={`itemFav${item.id}`}></label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
