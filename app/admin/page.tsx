import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.roles || !session.user.roles.includes("Admin"))
    redirect("/");

  return <h1>Admin</h1>;
}
