// 서비스 관리자 페이지
//import StoreForm from "./_components/StoreForm.js";
import PopupStoreList from "./components/PopupStoreList/PopupStoreList";

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
    <div className="main__container">
      <h2 className="main__heading">팝업스토어 목록</h2>
      <PopupStoreList storeData={data} />
    </div>
  );
}
