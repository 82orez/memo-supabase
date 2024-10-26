import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-green-600 px-4 py-3">
      <Link href="/">
        <img src="/supanote-logo.png" alt="Supanote Logo" className="h-7" />
      </Link>
    </header>
  );
}
