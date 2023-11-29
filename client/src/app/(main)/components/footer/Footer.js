import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const FOOTER_DATA = {
  guide: ["이용정책", "패널티정책", "가이드라인", "사회적 책임"],
  support: ["공지사항", "서비스소개", "문의하기", "자주하는 질문"],
  center: [
    "운영시간 평일 10:00 - 18:00 (토 • 일, 공휴일 휴뮤)",
    "점심시간 평일 13:00 - 14:00",
    "1:1 문의하기는 앱에서만 가능합니다.",
  ],
};

const LINK = {
  textLink: [
    "회사소개",
    "인재채용",
    "제휴제안",
    "이용약관",
    "개인정보처리방침",
  ],
  iconLink: [faInstagram, faFacebook, faTwitter, faGithub],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="topWrapper">
        <div className="customerCenterWrapper">
          <div className="customerCenterNumber">고객센터 1588-8911</div>
          {FOOTER_DATA.center.map((item, index) => {
            return (
              <div className="customerCenterItem" key={index}>
                {item}
              </div>
            );
          })}
        </div>
        <div className="serviceWrapper">
          <div className="useGuideWrapper">
            <h3 className="useGuideTitle">이용안내</h3>
            {FOOTER_DATA.guide.map((item, index) => {
              return (
                <div className="useGuideItem" key={index}>
                  {item}
                </div>
              );
            })}
          </div>
          <div className="supportWrapper">
            <h3 className="supportTitle">고객지원</h3>
            {FOOTER_DATA.support.map((item, index) => {
              return (
                <div className="supportItem" key={index}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bottomWrapper">
        <div className="flexStartWrapper">
          <div className="textLinkWrapper">
            {LINK.textLink.map((text, index) => {
              return (
                <div className="textLink" key={index}>
                  {text}
                </div>
              );
            })}
          </div>
          <div className="businessWrapper">
            <div className="name">팝스팟 주식회사 • 대표 엘리스</div>
            <div className="registrationNumber">
              사업자 등록번호: 571-32-49912
            </div>
            <div className="businessType">
              통신판매업: 제 2023-성수C-003921호
            </div>
          </div>
          <div className="addressWrapper">
            <div className="businessAddress">
              사업장 소재지: 서울특별시 성동구 아차산로 17길 48 성수낙낙 2층
              엘리스랩
            </div>
            <div className="hosting">호스팅 서비스: 네이버 클라우드 (주)</div>
          </div>
        </div>
        <div className="flexEndWrapper">
          <div className="iconLinkWrapper">
            {LINK.iconLink.map((icons, index) => {
              return (
                <FontAwesomeIcon key={index} className="icon" icon={icons} />
              );
            })}
          </div>
          <img
            className="logo"
            src="https://user-images.githubusercontent.com/126956430/282671088-36fecca9-631c-4a3d-a73e-80047a312533.png"
            alt="로고이미지"
          />
        </div>
      </div>
    </footer>
  );
}
