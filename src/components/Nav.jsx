import Link from "next/link";

const Nav = () => {
  return (
    <nav className="font-serif text-xl py-2">
      <ul className="flex text-center">
        <li className="flex-1 hover:underline underline-offset-8">
          <Link href="/">Home</Link>
        </li>
        <li className="flex-1 hover:underline underline-offset-8">
          <Link href="/search">Search Artworks</Link>
        </li>
        <li className="flex-1 hover:underline underline-offset-8">
          <Link href="/exhibition">My Exhibition</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
