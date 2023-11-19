"use client";
import "./page.scss";
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        { email, password }
      );
      if (response.status === 200) {
        console.log(response);

        // window.location.href = "/"; // 로그인 성공 시 홈페이지로 이동
      }
    } catch (error) {
      console.error(error); // 에러 처리
    }
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginTitle">LOGIN</div>
        <div className="loginInputContainer">
          <form className="loginForm" onSubmit={handleLogin}>
            <div className="loginText">이메일 주소</div>
            <input
              className="loginInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="loginText">비밀번호</div>
            <input
              className="loginInput"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <button className="googleBtn">
          <div className="googleLogo">
            <img src="/googleBtn.svg" alt="google" />
          </div>
          <div className="googleText">구글 로그인</div>
        </button>
      </div>
    </div>
  );
}
