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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewInvoicePage() {
  const session = await auth();

  if (!session) {
    return <div>Carregando...</div>;
  }

  // Only admin and manager can create invoices
  if (!["admin", "manager"].includes(session.user.role)) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Acesso Negado</h1>
        <p>Você não tem permissão para criar faturas.</p>
      </div>
    );
  }

  // Get all units for the dropdown
  const units = await prisma.unit.findMany({
    select: {
      id: true,
      number: true,
      floor: true,
      tower: true,
      owner: {
        select: {
          name: true,
        },
      },
    },
    orderBy: [{ tower: "asc" }, { floor: "asc" }, { number: "asc" }],
  });

  async function createInvoice(formData: FormData) {
    "use server";

    const unitId = formData.get("unitId") as string;
    const amount = formData.get("amount") as string;
    const dueDate = formData.get("dueDate") as string;
    const description = formData.get("description") as string;

    if (!unitId || !amount || !dueDate || !description) {
      return { error: "Todos os campos são obrigatórios" };
    }

    try {
      await prisma.invoice.create({
        data: {
          unitId,
          amount: parseFloat(amount),
          dueDate: new Date(dueDate),
          description,
          isPaid: false,
        },
      });

      redirect("/finances/invoices");
    } catch (error) {
      console.error("Error creating invoice:", error);
      return { error: "Falha ao criar fatura" };
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nova Fatura</h1>
          <p className="text-muted-foreground">
            Criar uma nova fatura para uma unidade
          </p>
        </div>

        <Button variant="outline" asChild>
          <Link href="/finances/invoices">Cancelar</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Fatura</CardTitle>
          <CardDescription>
            Preencha as informações da nova fatura
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createInvoice} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="unitId">Unidade</Label>
                <Select name="unitId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id}>
                        {unit.tower} - {unit.floor}0{unit.number} (
                        {unit.owner.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="dueDate">Data de Vencimento</Label>
                <Input id="dueDate" name="dueDate" type="date" required />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Descrição da fatura"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Criar Fatura</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
