import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          CondoManager
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/unidades">Unidades</Link></li>
          <li><Link href="/comunicacao">Comunicação</Link></li>
          <li><Link href="/financeiro">Financeiro</Link></li>
          <li><Link href="/reservas">Reservas</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

