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
        window.location.href = "/"; // 로그인 성공 시 홈페이지로 이동
      }
    } catch (error) {
      console.error(error); // 에러 처리
    }
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginTitle">SIGNUP</div>
        <div className="loginInputContainer">
          <form className="loginForm" onSubmit={handleLogin}>
            <div className="loginText">이름</div>
            <input
              className="loginInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
              placeholder="최소 9자리, 대 소문자, 숫자, 특수문자 포함"
              required
            />
            <div className="loginText">휴대폰 번호</div>
            <input
              className="loginInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="- 없이 숫자만 입력"
              required
            />
            <div className="loginText">관심 카테고리</div>
            <input
              className="loginInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="loginBtn" type="submit">
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
