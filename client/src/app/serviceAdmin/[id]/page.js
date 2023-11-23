import UpdateStore from "../components/UpdateStore/UpdateStore";

async function getData(id) {
  try {
    const res = await fetch(`http://localhost:4000/api/popupStore/${id}`, {
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
    <>
      <UpdateStore
        storeData={storeData}
        mainImage={storeData.mainImage}
        detailImg={storeData.images}
        storeId={params.id}
      />
    </>
  );
}
