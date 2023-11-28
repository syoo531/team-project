import React, { useEffect, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import "./Postcode.scss";

const Postcode = ({ scriptUrl, setFormData }) => {
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setFormData((cur) => ({
      ...cur,
      address: fullAddress,
      location: data.sigungu,
      zipcode: data.zonecode,
    }));
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button
      className="btn-postcode-popup"
      type="button"
      onClick={handleClick}
    >
      주소 검색
    </button>
  );
};

export default Postcode;
