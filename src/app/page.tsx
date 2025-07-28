import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>This is the home page</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
