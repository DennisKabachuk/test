export default function InfoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      <div className="relative">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

        {/* Main content */}
        <div className="relative backdrop-blur-sm bg-white/50 dark:bg-black/50 border border-border rounded-2xl px-16 py-12 shadow-xl">
          <h1 className="text-6xl font-bold tracking-tight text-foreground">
            Info page
          </h1>
        </div>
      </div>
    </div>
  );
}
