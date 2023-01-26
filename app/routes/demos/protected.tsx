import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/demos/signin");
  }
  return json({ userId });
};

export default function Protected() {
  const data = useLoaderData<typeof loader>();

  return <h1>You're in! UserId is {data.userId}</h1>;
}
