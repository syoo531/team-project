"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import instance from "@/utils/instance";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const validateAdmin = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await instance.post(`/popupStore/validate`);

        if (!accessToken || res.status !== 200) {
          window.alert("권리자 권한이 없습니다");
          router.push("/");
          return;
        }

        router.push("/serviceAdmin/popupstore");
      } catch (error) {
        window.alert("권리자 권한이 없습니다");
        router.push("/");
      }
    };
    validateAdmin();
  }, []);

  return (
    <div className="centered-container">
      <div className="login-message">관리자 페이지에 접속 중입니다.</div>
      <div className="login-message"> 잠시만 기다려주세요.</div>
    </div>
  );
};

export default Page;

// import { redirect } from "next/navigation";

// export default function Page() {
//   redirect("/serviceAdmin/popupstore");
// }
