"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      window.alert("권리자 권한이 없습니다");
      router.push("/");
      return;
    }

    router.push("/serviceAdmin/popupstore");
  }, []);

  return <p>관리자 페이지 접속 중..</p>;
};

export default Page;

// import { redirect } from "next/navigation";

// export default function Page() {
//   redirect("/serviceAdmin/popupstore");
// }
