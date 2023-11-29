"use client";
import { useEffect, useState } from "react";
import "./userInfo.scss";
import instance from "@/utils/instance";

export default function UserInfo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    selectedInterests: [],
  });

  const getUserInfo = async () => {
    try {
      const response = await instance.get("/users/getUserInfo");
      const userInfo = response.data.data;
      setFormData({
        name: userInfo.name,
        email: userInfo.email,
        phoneNumber: userInfo.phone_number,
        selectedInterests: userInfo.category,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserInfo();
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
    phoneNumberValid: true,
    interestsValid: true,
  });

  const checkInterestsValid = (selectedInterests) => {
    // 관심 카테고리 3개 유효성 검사
    return selectedInterests.length >= 3;
  };

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

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, phoneNumber, selectedInterests } = formData;

    const isNameValid = !!name;
    const isPhoneNumberValid = !!phoneNumber;
    const areInterestsValid = checkInterestsValid(selectedInterests);

    if (!isNameValid || !isPhoneNumberValid || !areInterestsValid) {
      setValidCheck({
        nameValid: isNameValid,
        phoneNumberValid: isPhoneNumberValid,
        interestsValid: areInterestsValid,
      });
      return;
    }

    try {
      const response = await instance.put("/users/updateUserInfo", {
        name,
        phoneNumber,
        selectedInterests,
      });
      if (response.status === 200) {
        alert("회원정보가 수정되었습니다.");
        getUserInfo();
      }
    } catch (error) {
      console.error(error); // 에러 처리
    }
  };

  const handleSignout = async () => {
    if (window.confirm("정말로 탈퇴 하시겠습니까?")) {
      try {
        const response = await instance.delete("/users/signout");
        if (response.status === 200) {
          alert("회원탈퇴 되었습니다.");
          window.location.href = "/";
        }
      } catch (error) {
        console.error(error); // 에러 처리
      }
    }
  };

  return (
    <div className="userInfoContainer">
      <div className="signupTitle">회원정보수정</div>
      <div className="signupInputContainer">
        <form className="signupForm" onSubmit={handleSignup}>
          <div className="signupInputElement">
            <div className="signupText">이름</div>
            <input
              className={`signupInput ${!validCheck.nameValid ? "error" : ""}`}
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
            <div className="signupText">이메일 주소 (수정 불가)</div>
            <input
              className="signupInput"
              type="email"
              name="email"
              value={formData.email}
              disabled="true"
            />
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
            회원정보수정
          </button>
        </form>
        <button className="signoutBtn" onClick={handleSignout}>
          회원탈퇴
        </button>
      </div>
    </div>
  );
}
