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
import { formatCurrency } from "@/utils/format";
import Link from "next/link";

export default async function InvoicesPage() {
  const session = await auth();

  if (!session) {
    return <div>Carregando...</div>;
  }

  let invoices = [];

  if (session.user.role === "resident") {
    // Get units owned by the user
    const units = await prisma.unit.findMany({
      where: { ownerId: session.user.id },
      select: { id: true },
    });

    if (units.length > 0) {
      // Get invoices for those units
      invoices = await prisma.invoice.findMany({
        where: { unitId: { in: units.map((unit) => unit.id) } },
        include: {
          unit: {
            select: {
              number: true,
              floor: true,
              tower: true,
            },
          },
          payments: true,
        },
        orderBy: { dueDate: "desc" },
      });
    }
  } else {
    // Admin/manager can see all invoices
    invoices = await prisma.invoice.findMany({
      include: {
        unit: {
          select: {
            number: true,
            floor: true,
            tower: true,
            owner: {
              select: {
                name: true,
              },
            },
          },
        },
        payments: true,
      },
      orderBy: { dueDate: "desc" },
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Faturas</h1>
          <p className="text-muted-foreground">
            Gerencie as faturas do condomínio
          </p>
        </div>

        {["admin", "manager"].includes(session.user.role) && (
          <Button asChild>
            <Link href="/finances/invoices/new">Nova Fatura</Link>
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {invoices.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                Nenhuma fatura encontrada.
              </p>
            </CardContent>
          </Card>
        ) : (
          invoices.map((invoice) => (
            <Card key={invoice.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{invoice.description}</CardTitle>
                    <CardDescription>
                      Unidade: {invoice.unit.tower} - {invoice.unit.floor}0
                      {invoice.unit.number}
                      {invoice.unit.owner &&
                        ` | Proprietário: ${invoice.unit.owner.name}`}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block rounded-md px-2 py-1 text-xs font-medium ${
                        invoice.isPaid
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {invoice.isPaid ? "Pago" : "Pendente"}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Vencimento:{" "}
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Pagamentos: {invoice.payments.length}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">
                      {formatCurrency(Number(invoice.amount))}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/finances/invoices/${invoice.id}`}>
                        Ver Detalhes
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
