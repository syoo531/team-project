"use client";
import "./page.scss";
import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    selectedInterests: [],
  });

  const interests = [
    "토이",
    "뷰티",
    "패션",
    "음식",
    "예술",
    "주류",
    "게임",
    "전자기기",
    "가구",
    "캐릭터",
    "럭셔리",
    "카페",
    "아이돌",
  ];
  const toggleInterest = (interest) => {
    const { selectedInterests } = formData;
    if (selectedInterests.includes(interest)) {
      setFormData({
        ...formData,
        selectedInterests: selectedInterests.filter((i) => i !== interest),
      });
    } else {
      setFormData({
        ...formData,
        selectedInterests: [...selectedInterests, interest],
      });
    }
  };

  const checkEmailValid = (email) => {
    // 이메일 유효성 검사
    return email.includes("@");
  };

  const checkPasswordValid = (password) => {
    // 패스워드 유효성 검사
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
    return regex.test(password);
  };

  const checkInterestsValid = (selectedInterests) => {
    // 관심 카테고리 3개 유효성 검사
    return selectedInterests.length >= 3;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [validCheck, setValidCheck] = useState({
    nameValid: true,
    emailValid: true,
    passwordValid: true,
    phoneNumberValid: true,
    interestsValid: true,
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, phoneNumber, selectedInterests } = formData;

    const isNameValid = !!name;
    const isEmailValid = checkEmailValid(email);
    const isPasswordValid = checkPasswordValid(password);
    const isPhoneNumberValid = !!phoneNumber;
    const areInterestsValid = checkInterestsValid(selectedInterests);

    if (
      !isNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isPhoneNumberValid ||
      !areInterestsValid
    ) {
      setValidCheck({
        nameValid: isNameValid,
        emailValid: isEmailValid,
        passwordValid: isPasswordValid,
        phoneNumberValid: isPhoneNumberValid,
        interestsValid: areInterestsValid,
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/signup",
        { name, email, password, phoneNumber, selectedInterests }
      );
      if (response.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error); // 에러 처리
    }
  };

  return (
    <div className="signupPage">
      <div className="signupContainer">
        <div className="signupTitle">SIGNUP</div>
        <div className="signupInputContainer">
          <form className="signupForm" onSubmit={handleSignup}>
            <div className="signupInputElement">
              <div className="signupText">이름</div>
              <input
                className={`signupInput ${
                  !validCheck.nameValid ? "error" : ""
                }`}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {!validCheck.nameValid && (
                <div className="errorText">이름을 입력해주세요.</div>
              )}
            </div>
            <div className="signupInputElement">
              <div className="signupText">이메일 주소</div>
              <input
                className={`signupInput ${
                  !validCheck.emailValid ? "error" : ""
                }`}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {!validCheck.emailValid && (
                <div className="errorText">
                  유효한 이메일 주소를 입력해주세요.
                </div>
              )}
            </div>
            <div className="signupInputElement">
              <div className="signupText">비밀번호</div>
              <input
                className={`signupInput ${
                  !validCheck.passwordValid ? "error" : ""
                }`}
                id="password"
                type="password"
                name="password"
                value={formData.password}
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
              <div className="signupText">휴대폰 번호</div>
              <input
                className={`signupInput phoneNumber ${
                  !validCheck.phoneNumberValid ? "error" : ""
                }`}
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (!isNaN(newValue)) {
                    handleInputChange(e);
                  }
                }}
                placeholder="- 없이 숫자만 입력"
              />
              {!validCheck.phoneNumberValid && (
                <div className="errorText">휴대폰 번호를 입력해주세요.</div>
              )}
            </div>
            <div className="signupInputElement">
              <div className="signupText">관심 카테고리</div>
              <div
                className={`interests-container ${
                  !validCheck.interestsValid ? "errorIntersts" : ""
                }`}
              >
                {interests.map((interest, index) => (
                  <button
                    key={index}
                    className={`interest-tag ${
                      formData.selectedInterests.includes(interest)
                        ? "selected"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleInterest(interest);
                    }}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              {!validCheck.interestsValid && (
                <div className="errorText">
                  최소 3개의 관심 카테고리를 선택해주세요.
                </div>
              )}
            </div>

            <button className="signupBtn" type="submit">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
