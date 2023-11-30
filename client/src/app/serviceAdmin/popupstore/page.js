"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PopupStoreList from "../components/PopupStoreList/PopupStoreList";
import Pagination from "../components/Pagination/Pagination";
import instance from "@/utils/instance";

export default function ServiceAdmin() {
  const searchParams = useSearchParams();

  const [res, setRes] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(
          `/popupstore?${searchParams.toString()}`
        );

        if (response.data) {
          setRes(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchParams]);

  return (
    <>
      <PopupStoreList
        storeData={res?.data ? res.data : []}
        totalStores={res?.totalStores ? res.totalStores : 0}
      />
      <Pagination
        currentPage={res?.currentPage ? res?.currentPage : 1}
        totalPages={res?.totalPages ? res?.totalPages : 1}
      />
    </>
  );
}
