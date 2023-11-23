import "./waiting.scss";
import instance from "../../../../../utils/instance";

import { useEffect } from "react";

export default function Waiting() {
  useEffect(() => {
    async function getWaiting() {
      const res = await instance.get("/waiting/getWaitingStatus");
      console.log(res);
    }
    getWaiting();
  }, []);

  return <div>현장대기</div>;
}
