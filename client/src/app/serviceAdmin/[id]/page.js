import StoreForm from "../components/StoreForm/StoreForm";

async function getData(id) {
  try {
    const res = await fetch(`http://localhost:4000/popupStore/${id}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export default async function ServiceAdmin({ params }) {
  const storeData = await getData(params.id);

  return (
    <main>
      <p>팝업스토어 정보 변경</p>
      <StoreForm
        {...storeData} storeId={params.id}
      />
    </main>
  );
}
