export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="from-primary/5 via-secondary/5 to-accent/5 min-h-screen bg-gradient-to-br">
      <div className="relative container flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
          <div className="bg-primary absolute inset-0 bg-[url('/assets/images/condominio-geral-02.png')] bg-cover bg-center" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img
              src="/assets/images/logo_reserva_sapetinga-1024x487.png"
              alt="Reserva Sapetinga"
              className="h-8"
            />
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] lg:w-[400px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
