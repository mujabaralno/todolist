import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
  const user = await currentUser();

  return (
    <>
      <div className="wrapper mb-2">
        <h1 className="h1-semibold text-black">Welcome to TO DO LIST</h1>
      </div>
      <section className="home">
        <h1 className="home-heading text-white">
          TO DO LIST
        </h1>
      </section>
      
      <div className="flex justify-end w-32 mt-2 right-12 absolute">
      <Link className="sidebar-nav_element group bg-purple-gradient text-white sidebar-link" href="/to-do-list">
        Create
      </Link>
      </div>
    </>
  );
}
