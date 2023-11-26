import PopupStoreList from "../components/PopupStoreList/PopupStoreList";
import Pagination from "../components/Pagination/Pagination";

const API_URL = "http://localhost:4000/api/popupStore";

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
  const { data, totalPages, currentPage, totalStores } =
    await getData(searchParams);

  return (
    <>
      <PopupStoreList storeData={data} totalStores={totalStores} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
