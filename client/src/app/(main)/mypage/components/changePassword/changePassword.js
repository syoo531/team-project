"use client";
import "./changePassword.scss";
import React, { useState } from "react";
import instance from "@/utils/instance";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const checkPasswordValid = (password) => {
    // 패스워드 유효성 검사
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
    return regex.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validCheck, setValidCheck] = useState({
    nameValid: true,
    emailValid: true,
    passwordValid: true,
    phoneNumberValid: true,
    interestsValid: true,
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword } = formData;

    const isPasswordValid = checkPasswordValid(newPassword);

    if (!isPasswordValid) {
      setValidCheck({
        passwordValid: isPasswordValid,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setValidCheck((prevValidCheck) => ({
        ...prevValidCheck,
        passwordValid: false,
      }));
      return;
    }

    try {
      const response = await instance.put("/users/changePassword", {
        currentPassword,
        newPassword,
      });
      if (response.status === 200) {
        alert("비밀번호가 변경되었습니다.");

        setFormData({
          currentPassword: "",
          newPassword: "",
        });
        setConfirmPassword("");
      }
    } catch (error) {
      alert(`${error.response.data.message}`);
      console.error(error); // 에러 처리
    }
  };

  return (
    <div className="signupPage">
      <div className="signupContainer">
        <div className="signupTitle">비밀번호변경</div>
        <div className="signupInputContainer">
          <form className="signupForm" onSubmit={handleSignup}>
            <div className="signupInputElement">
              <div className="signupText">현재 비밀번호</div>
              <input
                className="signupInput"
                id="currentPassword"
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="소셜로그인 회원은 비밀번호 변경이 불가합니다."
              />
            </div>
            <div className="signupInputElement">
              <div className="signupText">새 비밀번호</div>
              <input
                className={`signupInput ${
                  !validCheck.passwordValid ? "error" : ""
                }`}
                id="newPassword"
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="최소 9자리, 대 소문자, 숫자, 특수문자 포함"
              />
              {!validCheck.passwordValid && (
                <div className="errorText">
                  최소 9자리, 대 소문자, 숫자, 특수문자 포함하여 입력해주세요.
                </div>
              )}
            </div>
            <div className="signupInputElement">
              <div className="signupText">새 비밀번호 확인</div>
              <input
                className={`signupInput ${
                  !validCheck.passwordValid ? "error" : ""
                }`}
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 한번 더 입력해주세요."
              />
              {/* 비밀번호 확인 에러 메시지 */}
              {!validCheck.passwordValid && (
                <div className="errorText">비밀번호가 일치하지 않습니다.</div>
              )}
            </div>

            <button className="signupBtn" type="submit">
              비밀번호변경
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
