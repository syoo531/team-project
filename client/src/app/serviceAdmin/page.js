// 서비스 관리자 페이지
//import StoreForm from "./_components/StoreForm.js";
import PopupStoreList from "./components/PopupStoreList";

async function getData() {
  try {
    const res = await fetch(`http://localhost:4000/popupStore`, {
      cache: "no-store",
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export default async function ServiceAdmin() {
  const { data } = await getData();
  console.log(data);
  return (
    <main>
      <p>서비스 관리자 페이지</p>
      <br></br>
      <PopupStoreList storeData={data} />
    </main>
  );
}
