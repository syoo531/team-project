import { useRouter } from "next/navigation";
import PopupStoreList from "../components/PopupStoreList/PopupStoreList";
import Pagination from "../components/Pagination/Pagination";
import Search from "../components/Search/Search";

const API_URL = "http://localhost:4000/api/popupStore";

async function getData(
  searchQuery,
  pageNum = 1,
  category,
  start_date,
  end_date
) {
  try {
    const res = await fetch(
      `${API_URL}?search=${searchQuery}&category=${category}&page=${pageNum}&start_date=${start_date}&end_date=${end_date}`,
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
  console.log(searchParams);
  const pageNum = searchParams.page ? Number(searchParams.page) : 1;
  const searchQuery = searchParams.search || "";
  const category = searchParams.category || "";
  const start_date = searchParams.start_date || "";
  const end_date = searchParams.end_date || "";

  const { data, totalPages, currentPage } = await getData(
    searchQuery,
    pageNum,
    category,
    start_date,
    end_date
  );

  return (
    <>
      <PopupStoreList storeData={data} searchQuery={searchQuery} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
