"use client";
import { useRouter } from "next/navigation";
import "./WeekPopUp.scss";

const weeklyPopUpArr = [
  {
    id: "6567fd97f9850bddb661d091",
    brand: "선양소주",
    title: "어른들의 놀이터: 선양 소주 팝업스토어",
    summary:
      "선양을 보고 느낄 수 있는 다양한 전시, 체험 공간을 통해 선양에 퐁당 빠져볼까요?",
    url: "/images/weekly1.png",
  },
  {
    id: "6567ff48f9850bddb661d0a4",
    brand: "NH올원뱅크",
    title: "금융에 대한 근심과 걱정이 사라지는 신선놀음 팝업스토어",
    summary:
      "NH올원뱅크 서비스를 재미있게 체험할 수 있는 다양한 체험존이 준비되어 있습니다.",
    url: "/images/weekly2.png",
  },
];

export default function WeekPopUp() {
  const router = useRouter();
  return (
    <div className="weekPopUp">
      <div className="titleWrapper">
        <div className="title">이번 주말 가야 할 팝업!</div>
        <div className="subTitle">
          이색적인 컨셉에 재미있게 즐길 수 있는 핫플,
          <br /> 팝스팟이 소개하는 주목할 만한 팝업스토어를 경험해 보세요.
        </div>
        <div
          className="viewBtn"
          onClick={() => router.push("/popupList/all?pageNumber=1&limit=8")}
        >
          모두 보기
        </div>
      </div>
      <div className="popUpListWrapper">
        {weeklyPopUpArr.map((store) => {
          return (
            <div
              className="popUpWrapper"
              key={store.id}
              style={{ backgroundImage: `url(${store.url})` }}
            >
              <div className="backGround"></div>
              <div className="contentWrapper">
                <div className="popUpBrand">{store.brand}</div>
                <div className="popUpTitle">{store.title}</div>
                <div className="popUpSummary">{store.summary}</div>
                <div
                  className="readMoreBtn"
                  onClick={() => {
                    router.push(`/popupList/all/${store.id}`);
                  }}
                >
                  자세히 보기
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
