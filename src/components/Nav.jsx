import Link from "next/link";

const Nav = () => {
  return (
    <nav className="bg-blue-50 border-2 border-blue-600 p-2">
      <ul className="flex text-center">
        <li className="flex-1">
          <Link href="/">Home</Link>
        </li>
        <li className="flex-1">
          <Link href="/search">Search Artworks</Link>
        </li>
        <li className="flex-1">
          <Link href="/exhibition">My Exhibition</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
