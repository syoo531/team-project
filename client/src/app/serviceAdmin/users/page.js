"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import instance from "@/utils/instance";
import UserList from "../components/UserList/UserList";
import Pagination from "../components/Pagination/Pagination";
import UserDashboard from "../components/UserList/UserDashboard/UserDashboard";

export default function Page() {
  const [res, setRes] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await instance.get(
          `/popupstore/users?${searchParams.toString()}`
        );
        setRes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchParams]);

  return (
    <>
      {/* <UserDashboard
        data={res || []}
        totalUsers={res?.totalUsers}
        newUserToday={res?.newUserToday}
      /> */}
      <UserList userData={res?.data} />
      <Pagination currentPage={res?.currentPage} totalPages={res?.totalPages} />
    </>
  );
}
