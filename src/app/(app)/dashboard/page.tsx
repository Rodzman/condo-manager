import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  FileText,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function ResidentDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Bem-vindo, {session.user?.name}
        </h1>
        <p className="text-muted-foreground">
          Gerencie suas informações e acesse os serviços do condomínio.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          icon={<Bell className="h-5 w-5 text-blue-600" />}
          title="Avisos"
          description="3 novos avisos"
          linkText="Ver todos"
          linkHref="/resident/notices"
        />
        <DashboardCard
          icon={<Calendar className="h-5 w-5 text-green-600" />}
          title="Reservas"
          description="Agende áreas comuns"
          linkText="Reservar"
          linkHref="/resident/reservations"
        />
        <DashboardCard
          icon={<FileText className="h-5 w-5 text-amber-600" />}
          title="Documentos"
          description="Regulamentos e atas"
          linkText="Acessar"
          linkHref="/resident/documents"
        />
        <DashboardCard
          icon={<CreditCard className="h-5 w-5 text-purple-600" />}
          title="Financeiro"
          description="Próximo vencimento: 10/04"
          linkText="Ver boletos"
          linkHref="/resident/financial"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>Eventos programados no condomínio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <EventItem
                title="Assembleia Geral"
                date="15 de Abril, 2025"
                time="19:00"
                location="Salão de Festas"
              />
              <EventItem
                title="Manutenção da Piscina"
                date="20 de Abril, 2025"
                time="08:00 - 17:00"
                location="Área da Piscina"
              />
              <EventItem
                title="Festa Junina"
                date="12 de Junho, 2025"
                time="18:00"
                location="Área de Lazer"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suporte</CardTitle>
            <CardDescription>
              Entre em contato com a administração
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Precisa de ajuda ou tem alguma solicitação? Entre em contato com a
              administração do condomínio.
            </p>
            <div className="flex flex-col space-y-2">
              <Button className="bg-dark-green hover:bg-dark-green/90 w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Abrir Chamado
              </Button>
              <Button variant="outline" className="w-full">
                Ver Chamados Anteriores
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  description,
  linkText,
  linkHref,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{description}</div>
        <p className="mt-2 text-xs text-blue-600">
          <a href={linkHref}>{linkText} →</a>
        </p>
      </CardContent>
    </Card>
  );
}

function EventItem({
  title,
  date,
  time,
  location,
}: {
  title: string;
  date: string;
  time: string;
  location: string;
}) {
  return (
    <div className="flex items-start space-x-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <div className="min-w-[50px] rounded-md bg-gray-100 p-2 text-center">
        <div className="text-xs text-gray-500">{date.split(" ")[0]}</div>
        <div className="text-dark-green text-lg font-bold">
          {date.split(" ")[1]?.replace(",", "")}
        </div>
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500">
          {time} • {location}
        </p>
      </div>
    </div>
  );
}
