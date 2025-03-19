import { auth } from "@/server/auth";
import { db as prisma } from "@/server/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/utils/format";
import Link from "next/link";
import { notFound } from "next/navigation";

interface InvoiceDetailPageProps {
  params: {
    id: string;
  };
}

export default async function InvoiceDetailPage({
  params,
}: InvoiceDetailPageProps) {
  const session = await auth();

  if (!session) {
    return <div>Carregando...</div>;
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: {
      unit: {
        select: {
          number: true,
          floor: true,
          tower: true,
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      payments: {
        orderBy: {
          paymentDate: "desc",
        },
      },
    },
  });

  if (!invoice) {
    return notFound();
  }

  // Check if user has access to this invoice
  if (
    session.user.role === "resident" &&
    invoice.unit.owner.id !== session.user.id
  ) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Acesso Negado</h1>
        <p>Você não tem permissão para visualizar esta fatura.</p>
      </div>
    );
  }

  // Calculate total paid
  const totalPaid = invoice.payments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0,
  );

  // Calculate remaining balance
  const remainingBalance = Number(invoice.amount) - totalPaid;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Detalhes da Fatura
          </h1>
          <p className="text-muted-foreground">{invoice.description}</p>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/finances/invoices">Voltar</Link>
          </Button>

          {!invoice.isPaid &&
            ["admin", "manager"].includes(session.user.role) && (
              <Button asChild>
                <Link href={`/finances/invoices/${invoice.id}/payment/new`}>
                  Registrar Pagamento
                </Link>
              </Button>
            )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Fatura</CardTitle>
            <CardDescription>Detalhes da cobrança</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Unidade</p>
                <p className="font-medium">
                  {invoice.unit.tower} - {invoice.unit.floor}0
                  {invoice.unit.number}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Proprietário</p>
                <p className="font-medium">{invoice.unit.owner.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Valor</p>
                <p className="font-medium">
                  {formatCurrency(Number(invoice.amount))}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Vencimento</p>
                <p className="font-medium">{formatDate(invoice.dueDate)}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <p
                  className={`font-medium ${
                    invoice.isPaid ? "text-green-600" : "text-amber-600"
                  }`}
                >
                  {invoice.isPaid ? "Pago" : "Pendente"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Data de Emissão</p>
                <p className="font-medium">{formatDate(invoice.createdAt)}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-muted-foreground text-sm">Descrição</p>
              <p className="font-medium">{invoice.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pagamentos</CardTitle>
            <CardDescription>Histórico de pagamentos</CardDescription>
          </CardHeader>
          <CardContent>
            {invoice.payments.length === 0 ? (
              <p className="text-muted-foreground py-4 text-center">
                Nenhum pagamento registrado.
              </p>
            ) : (
              <div className="space-y-4">
                {invoice.payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div>
                      <p className="font-medium">
                        {formatCurrency(Number(payment.amount))}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {formatDate(payment.paymentDate)} •{" "}
                        {payment.paymentMethod}
                      </p>
                      {payment.reference && (
                        <p className="text-muted-foreground text-xs">
                          Ref: {payment.reference}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Total Pago:</p>
                    <p className="font-medium">{formatCurrency(totalPaid)}</p>
                  </div>

                  {!invoice.isPaid && (
                    <div className="mt-2 flex items-center justify-between">
                      <p className="font-medium">Saldo Restante:</p>
                      <p className="font-medium text-amber-600">
                        {formatCurrency(remainingBalance)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
