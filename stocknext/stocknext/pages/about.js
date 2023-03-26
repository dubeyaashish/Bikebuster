import Head from "next/head";
import Link from "next/link";

export default function about() {
  return (
    <>
      <Head>
        <title>About Page</title>
      </Head>
      <h1>About Page</h1>
      <p>About Aashish</p>
      <Link href="/">Home</Link>
    </>
  );
}