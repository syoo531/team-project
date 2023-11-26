import UserList from "../components/UserList/UserList";
import Pagination from "../components/Pagination/Pagination";
import UserDashboard from "../components/UserList/UserDashboard/UserDashboard";

const API_URL = "http://localhost:4000/api/popupStore/users";

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

export default async function Page({ searchParams }) {
  const { data, totalPages, currentPage, totalUsers, newUserToday } =
    await getData(searchParams);

  return (
    <>
      <UserDashboard
        data={data}
        totalUsers={totalUsers}
        newUserToday={newUserToday}
      />
      <UserList userData={data} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
