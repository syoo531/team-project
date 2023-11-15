"use client";
import "./page.scss";

export default function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginTitle">LOGIN</div>
        <div className="loginInputContainer">
          <form className="loginForm" onSubmit={handleLogin}>
            <div className="loginText">이메일 주소</div>
            <input className="loginInput" type="email" required />
            <div className="loginText">비밀번호</div>
            <input
              className="loginInput"
              id="password"
              type="password"
              required
            />
            <button className="loginBtn" type="submit">
              로그인
            </button>
          </form>
          <div className="forgetPassword">비밀번호를 잊으셨나요?</div>
        </div>
        <button className="kakaoBtn">
          <div className="kakaoLogo">
            <img src="/kakaoBtn.svg" alt="kakao" />
          </div>
          <div className="kakaoText">카카오 로그인 </div>
        </button>

        <button className="googleBtn">구글 로그인</button>
      </div>
    </div>
  );
}
