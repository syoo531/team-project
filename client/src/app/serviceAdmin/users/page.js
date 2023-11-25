import UserList from "../components/UserList/UserList";
import Pagination from "../components/Pagination/Pagination";

const API_URL = "http://localhost:4000/api/";

export default async function Page() {
  return (
    <>
      <UserList />
      <Pagination />
    </>
  );
}
