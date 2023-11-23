// 회원탈퇴
import "./page.scss";
import MenuBar from "../../../components/menuBar/MenuBar";

export default function DeleteUser() {
  return (
    <div className="deleteUserContainer">
      <div>
        <MenuBar />
      </div>
      <div className="deleteUserBox">
        <div className="deleteUserBoxTitle">회원탈퇴 신청</div>
        <div>그동안 pop.spot을 이용해주셔서 감사합니다.</div>
        <div>탈퇴 회원정보 확인</div>
        <div className="userInfoBox">
          <div className="infoText">
            <div>이메일 : </div>
            <div>userTest@userTest.com</div>
          </div>
          <div className="infoText">
            <div>이름 : </div>
            <div>userTest</div>
          </div>
          <div className="infoText">
            <div>전화번호 : </div>
            <div>010-1234-5678</div>
          </div>
        </div>
        <div>pop.spot을 탈퇴하시는 이유는 무엇인가요?</div>
        <input></input>
        <button>제출</button>
        <div className="completeDeleteUser">
          OOO회원님, 회원 탈퇴 완료되었습니다.
        </div>
      </div>
    </div>
  );
}
