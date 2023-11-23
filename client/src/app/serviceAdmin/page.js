//import StoreForm from "./_components/StoreForm.js";
import PopupStoreList from "./components/PopupStoreList/PopupStoreList";
import Search from "./components/NavBar/NavBar";
import Pagination from "./components/Pagination/Pagination";
import { useRouter } from "next/navigation";

async function getData(pageNum) {
  try {
    const res = await fetch(
      `http://localhost:4000/api/popupStore?page=${pageNum}`,
      {
        cache: "no-store",
      }
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export default async function ServiceAdmin({ searchParams }) {
  const { data, totalPages, currentPage } = await getData(
    searchParams.page || 1
  );

  console.log(data)

  return (
    <>
      <PopupStoreList storeData={data} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
