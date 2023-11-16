// 서비스 관리자 페이지
//import StoreForm from "./_components/StoreForm.js";
import PopupStoreList from "./_components/PopupStoreList";

// async function getData() {
//   try {
//     const res = await fetch('http://localhost:3000/api/serviceAdmin', { cache: 'no-store' });
//     return res.json()
//   } catch (err) {
//     console.log(err);
//   }
// }

export default async function ServiceAdmin() {
  //const storeData = await getData()
  //console.log(storeData)
  return (
    <main>
      <p>서비스 관리자 페이지</p>
      <br></br>
      <PopupStoreList />
    </main>
  );
}
