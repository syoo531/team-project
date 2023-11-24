import { redirect } from "next/navigation";

export default async function Page({ params }) {
  redirect("/serviceAdmin/popupstore");

  return <></>;
}
