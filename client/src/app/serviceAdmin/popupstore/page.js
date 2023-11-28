import PopupStoreList from "../components/PopupStoreList/PopupStoreList";
import Pagination from "../components/Pagination/Pagination";

const API_URL = "http://kdt-sw-6-team04.elicecoding.com/api/popupStore";

async function getData(searchParams) {
  try {
    const res = await fetch(`${API_URL}?${new URLSearchParams(searchParams)}`, {
      cache: "no-store",
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export default async function ServiceAdmin({ searchParams }) {
  const res = await getData(searchParams);

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
