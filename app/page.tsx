import { getServerSession } from "next-auth";
import Link from "next/link";

import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Home</h1>
      {session ? (
        <div>
          <p>{JSON.stringify(session)}</p>
          <Link href="/api/auth/signout">Sign Out</Link>
        </div>
      ) : (
        <Link href="/api/auth/signin">Log In</Link>
      )}
    </main>
  );
}
