import StoreForm from "../_components/StoreForm";

async function getData(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/serviceAdmin/${id}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export default async function ServiceAdmin({ params }) {
  const storeData = await getData(params.id);
  console.log(storeData);
  return (
    <main>
      <p>팝업스토어 정보 변경</p>
      <StoreForm storeData={storeData} />
    </main>
  );
}
