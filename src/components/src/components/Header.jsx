export default function Header() {
  return (
    <header className="bg-orange-500 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Urja4All</h1>
        <nav>
          <a href="#" className="px-4 hover:underline">Home</a>
          <a href="#" className="px-4 hover:underline">About</a>
          <a href="#" className="px-4 hover:underline">Contact</a>
        </nav>
      </div>
    </header>
  );
}
