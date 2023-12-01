"use client";
import "./page.scss";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Spinner from "../components/spinner.js";

export default function GoogleAuth() {
  const [isSignup, setIsSignup] = useState(false);
  const [receivedName, setReceivedName] = useState("");
  const [receivedEmail, setReceivedEmail] = useState("");
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    selectedInterests: [],
  });
  const [checkboxes, setCheckboxes] = useState({
    terms: false,
    over14: false,
  });

  useEffect(() => {
    async function sendCode() {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/users/auth/google/check",
          {
            code: code,
          },
          { withCredentials: true }
        );
        if (res.status === 200) {
          const accessToken = res.data.accessToken;
          localStorage.setItem("accessToken", accessToken);
          window.location.href = "/";
        }
        if (res.status === 202) {
          setReceivedName(res.data.name);
          setReceivedEmail(res.data.email);
          setIsSignup(true);
        }
      } catch (error) {
        console.log(error);
        window.location.href = "/login";
      }
    }
    sendCode();
  }, []);

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

  const handleCheckboxChange = (e) => {
    setCheckboxes({
      ...checkboxes,
      [e.target.name]: e.target.checked,
    });
  };

  const checkInterestsValid = (selectedInterests) => {
    // 관심 카테고리 3개 유효성 검사
    return selectedInterests.length >= 3;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [validCheck, setValidCheck] = useState({
    phoneNumberValid: true,
    interestsValid: true,
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    const { phoneNumber, selectedInterests } = formData;

    const isPhoneNumberValid = !!phoneNumber;
    const areInterestsValid = checkInterestsValid(selectedInterests);

    if (!isPhoneNumberValid || !areInterestsValid) {
      setValidCheck({
        phoneNumberValid: isPhoneNumberValid,
        interestsValid: areInterestsValid,
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/auth/signup",
        {
          name: receivedName,
          email: receivedEmail,
          phoneNumber,
          selectedInterests,
        }
      );

      if (response.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error); // 에러 처리
    }
  };

  function SignUp() {
    return (
      <div className="signupPage">
        <div className="signupContainer">
          <div className="signupTitle">SIGNUP</div>
          <div className="signupInputContainer">
            <form className="signupForm" onSubmit={handleSignup}>
              <div className="signupInputElement">
                <div className="signupText">휴대폰 번호</div>
                <input
                  className={`signupInput phoneNumber ${
                    !validCheck.phoneNumberValid ? "error" : ""
                  }`}
                  type="text"
                  name="phoneNumber"
                  autoFocus
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
              <div className="checkboxContainer">
                <div className="checkboxTerms">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={checkboxes.terms}
                    onChange={handleCheckboxChange}
                  />{" "}
                  [필수] 이용 약관 및 개인정보 처리방침에 동의합니다.
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="over14"
                    checked={checkboxes.over14}
                    onChange={handleCheckboxChange}
                  />{" "}
                  [필수] 만 14세 이상임을 확인하고 동의합니다.
                </div>
              </div>

              <button
                className="signupBtn"
                type="submit"
                disabled={!checkboxes.terms || !checkboxes.over14}
              >
                회원가입
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <>{isSignup ? <SignUp /> : <Spinner />}</>;
}
