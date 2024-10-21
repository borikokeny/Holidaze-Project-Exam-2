export default function Header() {
  return (
    <header className="shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <a>logobogo</a>
      <nav className="space-x-4">
        <a href="" className="">
          my bookings
        </a>
        <a href="" className="">
          my venues
        </a>
      </nav>
    </div>
  </header>
  )
}