"use client";
import { useEffect, useState } from "react";
import "./myInterest.scss";
import instance from "@/utils/instance";
import InterestCard from "./components/interestCard";

export default function Interest() {
  const [myInterest, setMyInterest] = useState(undefined);
  const getMyInterest = async () => {
    try {
      const res = await instance.get("/interest");

      const InterestList = res.data ? res.data : undefined;
      setMyInterest(InterestList);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMyInterest();
  }, []);

  return (
    <div className="myInterestContainer">
      <div className="titleText">내 관심팝업</div>
      <div>
        <div className="InterestCardWrapper">
          {myInterest
            ? myInterest.map((v) => {
                return <InterestCard data={v} onClick={getMyInterest} />;
              })
            : ""}
        </div>
      </div>
    </div>
  );
}
