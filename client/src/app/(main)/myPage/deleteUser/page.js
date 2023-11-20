// 회원탈퇴
import "./page.scss";
import MenuBar from "../components/menuBar/MenuBar";

export default function DeleteUser() {
  return (
    <div>
      <MenuBar />
      <div className="checkBox">
        <div>비밀번호 재확인</div>
        <div>회원 확인을 위해 비밀번호를 다시 입력해주세요.</div>
        <input></input>
        <button>확인</button>
      </div>
      <div>회원탈퇴</div>
      <div>회원탈퇴 하시겠습니까?</div>
      <button>예</button>
      <button>아니요</button>
      <div>회원탈퇴 신청</div>
      <div>그동안 pop.spot을 이용해주셔서 감사합니다.</div>
      <div>탈퇴 회원정보 확인</div>
      <div>이메일 : </div>
      <div>userTest@userTest.com</div>
      <div>이름 : </div>
      <div>userTest</div>
      <div>전화번호 : </div>
      <div>010-1234-5678</div>
      <div>pop.spot을 탈퇴하시는 이유는 무엇인가요?</div>
      <input></input>
      <div>제출</div>
    </div>
  );
}
