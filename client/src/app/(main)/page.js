"use client";
import "./main.scss";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("1");
  const checkExpress = async () => {
    try {
      const res = await axios.get("/getRequest");
      console.log(res);
      setData(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkExpress();
  }, []);
  return (
    <div>
      <p>메인페이지23</p>
      <div>{data}</div>
    </div>
  );
}
