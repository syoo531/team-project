"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import instance from "@/utils/instance";
import UserList from "../components/UserList/UserList";
import Pagination from "../components/Pagination/Pagination";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [res, setRes] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      window.alert("권리자 권한이 없습니다");
      router.push("/");
    }

    const fetchData = async () => {
      try {
        const { data } = await instance.get(
          `/popupstore/users?${searchParams.toString()}`,
        );
        setRes(data);
      } catch (error) {
        console.error(error);
        window.alert("권리자 권한이 없습니다");
        router.push("/");
      }
    };
    fetchData();
  }, [searchParams]);

  return (
    <>
      <UserList userData={res?.data} totalUsers={res?.totalUsers || ""} />
      <Pagination currentPage={res?.currentPage} totalPages={res?.totalPages} />
    </>
  );
}
