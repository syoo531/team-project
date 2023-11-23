// 회원정보 수정
import "./page.scss";
import MenuBar from "../components/menuBar/MenuBar";

export default function UpdateUserInfo() {
  return (
    <div>
      <div className="updateUserInfoContainer">
        <MenuBar />
        <div className="updateUserInfoList">
          <div className="updateUserInfoBox">
            <div>이름 :</div>
            <div>user</div>
          </div>
          <div className="updateUserInfoBox">
            <div>이메일: </div>
            <div>test@test.com</div>
          </div>
          <div className="updateUserInfoBox">
            <div>비밀번호: </div>
            <div>testPassword</div>
          </div>
          <div className="updateUserInfoBox">
            <div>전화번호: </div>
            <div>010-1234-5678</div>
          </div>

          <button className="updateInfoButton">수정</button>
          <button>완료</button>
        </div>
      </div>
    </div>
  );
}
