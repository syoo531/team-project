"use client";
import { useEffect, useState } from "react";
import "./myInterest.scss";
import instance from "@/utils/instance";
import InterestCard from "./components/interestCard";

export default function Interest() {
  const [myInterest, setMyInterest] = useState(undefined);
  useEffect(() => {
    async function getMyInterest() {
      try {
        const res = await instance.get("/interest");

        const InterestList = res.data ? res.data : undefined;
        setMyInterest(InterestList);
      } catch (error) {
        console.error(error);
      }
    }
    getMyInterest();
    console.log("여기", myInterest);
  }, []);

  return (
    <div className="myInterestContainer">
      <div className="titleText">내 관심팝업</div>
      <div className="InterestCardWrapper">
        {myInterest ? myInterest.map((v) => InterestCard(v)) : ""}
      </div>
    </div>
  );
}
