import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bem-vindo ao CondoManager</h1>
      <p className="text-xl">Selecione uma opção para começar:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/unidades" className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
          <h2 className="text-xl font-semibold">Gestão de Unidades</h2>
          <p>Gerencie unidades, moradores e veículos</p>
        </Link>
        <Link href="/comunicacao" className="p-4 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
          <h2 className="text-xl font-semibold">Comunicação</h2>
          <p>Envie avisos e gerencie reclamações</p>
        </Link>
        <Link href="/financeiro" className="p-4 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors">
          <h2 className="text-xl font-semibold">Controle Financeiro</h2>
          <p>Gerencie despesas, receitas e emita boletos</p>
        </Link>
        <Link href="/reservas" className="p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
          <h2 className="text-xl font-semibold">Reservas</h2>
          <p>Agende e gerencie espaços comuns</p>
        </Link>
      </div>
    </div>
  )
}

