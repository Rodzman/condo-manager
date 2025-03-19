import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import {
  CreditCard,
  Receipt,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
} from "lucide-react";
import { api } from "@/utils/api";

const getInvoices = async () => {
  const { data: invoices, isLoading } = api.invoice.getAll.useQuery({
    isPaid: false,
  });

  const createInvoice = api.invoice.create.useMutation({
    onSuccess: () => {
      // Invalidate the query to refetch the list
      // api.invoice.getAll.invalidate();
    },
  });
};

// console.log("teste", await getInvoices());

// Mock data for demonstration
const mockInvoices = [
  {
    id: "1",
    description: "Taxa de Condomínio - Janeiro 2025",
    amount: 500,
    dueDate: new Date("2025-01-10"),
    isPaid: true,
    unit: {
      tower: "A",
      floor: 1,
      number: 101,
      owner: {
        name: "João Silva",
      },
    },
  },
  {
    id: "2",
    description: "Taxa de Condomínio - Fevereiro 2025",
    amount: 500,
    dueDate: new Date("2025-02-10"),
    isPaid: false,
    unit: {
      tower: "A",
      floor: 1,
      number: 101,
      owner: {
        name: "João Silva",
      },
    },
  },
  {
    id: "3",
    description: "Taxa Extra - Reforma da Piscina",
    amount: 200,
    dueDate: new Date("2025-01-15"),
    isPaid: false,
    unit: {
      tower: "A",
      floor: 1,
      number: 101,
      owner: {
        name: "João Silva",
      },
    },
  },
];

const mockExpenses = [
  {
    id: "1",
    title: "Manutenção do Elevador",
    amount: 1200,
    category: "Manutenção",
    paymentDate: new Date("2025-01-05"),
  },
  {
    id: "2",
    title: "Limpeza da Piscina",
    amount: 350,
    category: "Limpeza",
    paymentDate: new Date("2025-01-08"),
  },
  {
    id: "3",
    title: "Salários - Funcionários",
    amount: 3500,
    category: "Pessoal",
    paymentDate: new Date("2025-01-05"),
  },
];

export default async function FinancesPage() {
  const session = await auth();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  try {
    const invoices = await getInvoices();

    if (!invoices) {
      return <div>Error loading invoices</div>;
    }

    // Financial summary data
    const totalInvoices = mockInvoices.length;
    const totalPaid = mockInvoices
      .filter((invoice) => invoice.isPaid)
      .reduce((sum, invoice) => sum + invoice.amount, 0);
    const totalPending = mockInvoices
      .filter((invoice) => !invoice.isPaid)
      .reduce((sum, invoice) => sum + invoice.amount, 0);
    const totalExpenses = mockExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
            <p className="text-muted-foreground">
              Gerencie as finanças do condomínio
            </p>
          </div>

          {session.user?.role &&
            ["admin", "manager"].includes(session.user.role) && (
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link href="/finances/expenses">
                    <FileText className="mr-2 h-4 w-4" />
                    Despesas
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/finances/invoices/new">
                    <Receipt className="mr-2 h-4 w-4" />
                    Nova Fatura
                  </Link>
                </Button>
              </div>
            )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Faturas
              </CardTitle>
              <CreditCard className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInvoices}</div>
              <p className="text-muted-foreground text-xs">
                <Link href="/finances/invoices" className="text-blue-600">
                  Ver todas →
                </Link>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalPaid)}
              </div>
              <p className="text-muted-foreground text-xs">Faturas quitadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendente</CardTitle>
              <TrendingDown className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {formatCurrency(totalPending)}
              </div>
              <p className="text-muted-foreground text-xs">Faturas em aberto</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalPaid - totalExpenses)}
              </div>
              <p className="text-muted-foreground text-xs">
                Receitas - Despesas
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Faturas Recentes</CardTitle>
              <CardDescription>Últimas faturas emitidas</CardDescription>
            </CardHeader>
            <CardContent>
              {mockInvoices.length === 0 ? (
                <p className="text-muted-foreground py-4 text-center">
                  Nenhuma fatura encontrada.
                </p>
              ) : (
                <div className="space-y-4">
                  {mockInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div>
                        <p className="font-medium">{invoice.description}</p>
                        <p className="text-muted-foreground text-sm">
                          Unidade: {invoice.unit.tower} - {invoice.unit.floor}0
                          {invoice.unit.number}
                          {invoice.unit.owner &&
                            ` | ${invoice.unit.owner.name}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatCurrency(invoice.amount)}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Vencimento: {invoice.dueDate.toLocaleDateString()}
                        </p>
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                            invoice.isPaid
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {invoice.isPaid ? "Pago" : "Pendente"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {session.user?.role &&
            ["admin", "manager"].includes(session.user.role) && (
              <Card>
                <CardHeader>
                  <CardTitle>Despesas Recentes</CardTitle>
                  <CardDescription>
                    Últimas despesas registradas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mockExpenses.length === 0 ? (
                    <p className="text-muted-foreground py-4 text-center">
                      Nenhuma despesa encontrada.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {mockExpenses.map((expense) => (
                        <div
                          key={expense.id}
                          className="flex items-center justify-between rounded-md border p-3"
                        >
                          <div>
                            <p className="font-medium">{expense.title}</p>
                            <p className="text-muted-foreground text-sm">
                              Categoria: {expense.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-red-600">
                              {formatCurrency(expense.amount)}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              Data: {expense.paymentDate.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in FinancesPage:", error);
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold tracking-tight">Error</h1>
        <p className="text-red-600">
          There was an error loading the financial data. Please try again later.
        </p>
      </div>
    );
  }
}
