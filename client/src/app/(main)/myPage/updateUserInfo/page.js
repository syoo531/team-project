// 회원정보 수정
import "./page.scss";
import MenuBar from "../components/menuBar/MenuBar";

export default function UpdateUserInfo() {
  return (
    <div>
      <MenuBar />
      <div className="updateUserInfoContainer">
        <div>이름 :</div>
        <div>user</div>
        <div>이메일: </div>
        <div>test@test.com</div>
        <div>비밀번호: </div>
        <div>testPassword</div>
        <div>전화번호: </div>
        <div>010-1234-5678</div>
        <button>수정</button>
      </div>
    </div>
  );
}
