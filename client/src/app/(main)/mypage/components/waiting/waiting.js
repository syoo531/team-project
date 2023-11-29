"use client";
import { useEffect, useState } from "react";
import "./waiting.scss";
import instance from "@/utils/instance";
import WaitingCard from "./components/waitingCard";

export default function Waiting() {
  const [myWaiting, setMyWaiting] = useState(undefined);
  useEffect(() => {
    async function getMyWaiting() {
      try {
        const res = await instance.get("/waiting/getWaitingStatus");
        const waitingList = res.data.data;
        setMyWaiting(waitingList);
      } catch (error) {
        console.error(error);
      }
    }
    getMyWaiting();
  }, []);

  return (
    <div className="myWaitingContainer">
      <div className="titleText">내 현장대기</div>
      <div>
        <div className="waitingCardWrapper">
          {myWaiting ? myWaiting.map((v) => WaitingCard(v)) : ""}
        </div>
      </div>
    </div>
  );
}
