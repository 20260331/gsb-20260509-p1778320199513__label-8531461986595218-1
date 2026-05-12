import { Container } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
          <div className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <Container className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">
            容器镜像仓库
          </span>
        </div>
      </div>
    </header>
  )
}
