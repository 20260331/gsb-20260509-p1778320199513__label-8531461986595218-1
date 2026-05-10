import { useState, useEffect, useRef } from "react"
import { Search, Trash2, Plus, Pencil, AlertTriangle, Download, Clock, Database, HardDrive, LayoutGrid, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/simple-dialog"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { INITIAL_REPOS } from "@/data/mock"
import type { Repo } from "@/data/mock"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [repos, setRepos] = useState<Repo[]>(INITIAL_REPOS)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRepo, setEditingRepo] = useState<Repo | null>(null)
  const [formData, setFormData] = useState({ name: "", tag: "", size: "" })
  const [formError, setFormError] = useState("")

  // Delete Confirmation State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null)

  // Mobile Detection
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Pagination State (PC)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [inputPage, setInputPage] = useState("1")

  // Infinite Scroll State (Mobile)
  const [visibleCount, setVisibleCount] = useState(8)
  const loaderRef = useRef(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
    setVisibleCount(8)
    setInputPage("1")
  }

  const filteredRepos = repos.filter(repo => 
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    repo.tag.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(validPage)
    setInputPage(validPage.toString())
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
    setInputPage("1")
  }

  // Display Logic
  const displayRepos = isMobile 
    ? filteredRepos.slice(0, visibleCount)
    : filteredRepos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)


  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    if (!isMobile) return

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]
      if (target.isIntersecting && visibleCount < filteredRepos.length) {
        // Simple delay to show loading state
        setTimeout(() => {
          setVisibleCount(prev => prev + 8)
        }, 300)
      }
    }, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    })

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [isMobile, visibleCount, filteredRepos.length])

  const handleDeleteClick = (id: number) => {
    setDeleteTargetId(id)
    setIsDeleteOpen(true)
  }

  const confirmDelete = () => {
    if (deleteTargetId !== null) {
      setRepos(repos.filter(r => r.id !== deleteTargetId))
      setIsDeleteOpen(false)
      setDeleteTargetId(null)
    }
  }

  const handleAddNew = () => {
    setEditingRepo(null)
    setFormData({ name: "", tag: "", size: "" })
    setFormError("")
    setIsDialogOpen(true)
  }

  const handleEdit = (repo: Repo) => {
    setEditingRepo(repo)
    setFormData({ name: repo.name, tag: repo.tag, size: repo.size })
    setFormError("")
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.name || !formData.tag) {
      setFormError("名称和标签为必填项")
      return
    }

    if (editingRepo) {
      // Edit
      setRepos(repos.map(r => r.id === editingRepo.id ? { ...r, ...formData } : r))
    } else {
      // Add
      const newRepo: Repo = {
        id: Date.now(),
        ...formData,
        pulls: "0",
        lastUpdated: "刚刚"
      }
      setRepos([newRepo, ...repos])
    }
    setIsDialogOpen(false)
  }

  // Helper to determine gradient color based on repo name (simple hash-like effect)
  const getGradient = (name: string) => {
    const gradients = [
      "from-blue-500/20 to-cyan-500/5",
      "from-emerald-500/20 to-teal-500/5",
      "from-violet-500/20 to-purple-500/5",
      "from-orange-500/20 to-amber-500/5",
      "from-rose-500/20 to-pink-500/5",
    ]
    const index = name.length % gradients.length
    return gradients[index]
  }

  // Helper for icon color
  const getIconColor = (name: string) => {
    const colors = [
      "text-blue-500",
      "text-emerald-500",
      "text-violet-500",
      "text-orange-500",
      "text-rose-500",
    ]
    const index = name.length % colors.length
    return colors[index]
  }

  return (
    <div className="min-h-screen bg-slate-50/80 flex flex-col font-sans selection:bg-primary/10">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            镜像仓库
          </h1>
          <p className="text-muted-foreground text-lg flex items-center gap-2">
            管理您的容器镜像和制品
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {filteredRepos.length} 个镜像
            </span>
          </p>
        </div>

        {/* Search and Add Button */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="relative w-full sm:max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="搜索镜像名称或标签..." 
              className="pl-9 w-full bg-white border-slate-200 focus-visible:ring-blue-500/30 transition-all shadow-sm"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button onClick={handleAddNew} className="gap-2 w-full sm:w-auto shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all bg-gradient-to-r from-primary to-blue-600 border-0">
            <Plus className="h-4 w-4" /> 新增镜像
          </Button>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayRepos.map((repo) => (
            <Card key={repo.id} className="group relative hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 border-slate-200/60 hover:border-[#1677ff]/30 hover:-translate-y-1 overflow-hidden bg-white">
              {/* Top accent line - thinner and cleaner like antd */}
              <div className={`absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${getGradient(repo.name).replace('/20', '')}`} />
              
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-3 w-full">
                    <div className="flex items-start justify-between w-full">
                      <CardTitle className="text-[18px] font-medium text-[#000000e0] flex items-center gap-3 group-hover:text-[#1677ff] transition-colors">
                        <div className={`p-2 rounded bg-slate-50 ${getIconColor(repo.name)}`}>
                          <Database className="h-5 w-5" />
                        </div>
                        {repo.name}
                      </CardTitle>
                      
                      {/* Dynamic Badge - Antd Tag style */}
                      <div className={`
                        text-[13px] px-2.5 py-0.5 rounded-[4px] border flex items-center gap-1
                        ${repo.tag === 'latest' 
                          ? 'bg-[#e6f7ff] text-[#1890ff] border-[#91d5ff]' 
                          : repo.tag.includes('alpine') 
                            ? 'bg-[#f6ffed] text-[#52c41a] border-[#b7eb8f]'
                            : 'bg-[#fafafa] text-[#000000d9] border-[#d9d9d9]'}
                      `}>
                        {repo.tag}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-2 gap-4 text-[15px] mt-2">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[13px] text-[#00000073]">拉取次数</span>
                    <span className="font-medium text-[#000000d9] flex items-center gap-2">
                      <Download className="h-4 w-4 text-slate-400" />
                      {repo.pulls}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[13px] text-[#00000073]">大小</span>
                    <span className="font-medium text-[#000000d9] flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-slate-400" />
                      {repo.size}
                    </span>
                  </div>
                </div>
                
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-[13px] text-[#00000073]">
                  <Clock className="h-4 w-4" />
                  <span>更新于 {repo.lastUpdated}</span>
                </div>
              </CardContent>

              {/* Antd style actions footer */}
              <CardFooter className="p-0 border-t border-[#f0f0f0] bg-[#fafafa]/50 grid grid-cols-2 divide-x divide-[#f0f0f0]">
                <button 
                  className="flex items-center justify-center h-12 text-[15px] text-[#1677ff] hover:bg-white transition-all duration-200 gap-2 font-medium"
                  onClick={() => handleEdit(repo)}
                >
                  <Pencil className="h-4 w-4" /> 编辑
                </button>
                <button 
                  className="flex items-center justify-center h-12 text-[15px] text-[#ff4d4f] hover:bg-white transition-all duration-200 gap-2 font-medium"
                  onClick={() => handleDeleteClick(repo.id)}
                >
                  <Trash2 className="h-4 w-4" /> 删除
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Mobile Loading Sentinel */}
        {isMobile && filteredRepos.length > 0 && visibleCount < filteredRepos.length && (
          <div ref={loaderRef} className="flex justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        )}

        {/* Pagination (PC Only) */}
        {!isMobile && filteredRepos.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">每页显示</span>
              <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue placeholder="8" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="32">32</SelectItem>
                  <SelectItem value="64">64</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-slate-500">条</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-9 w-9 border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium text-slate-600 bg-white/50 px-4 py-1.5 rounded-full border border-slate-100">
                第 {currentPage} / {totalPages} 页
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-9 w-9 border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">跳转至</span>
              <Input
                className="w-12 h-8 px-2 text-center"
                value={inputPage}
                onChange={(e) => setInputPage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const page = parseInt(inputPage)
                    if (!isNaN(page)) {
                      handlePageChange(page)
                    } else {
                      setInputPage(currentPage.toString())
                    }
                  }
                }}
                onBlur={() => {
                  const page = parseInt(inputPage)
                  if (!isNaN(page)) {
                    handlePageChange(page)
                  } else {
                    setInputPage(currentPage.toString())
                  }
                }}
              />
              <span className="text-sm text-slate-500">页</span>
            </div>
          </div>
        )}

        {filteredRepos.length === 0 && (
          <div className="text-center py-24 px-4 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 mt-8">
            <div className="mx-auto h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <LayoutGrid className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">未找到匹配的镜像</h3>
            <p className="text-slate-500 mt-1 max-w-sm mx-auto">
              尝试调整搜索关键词，或者添加一个新的镜像仓库。
            </p>
            <Button onClick={handleAddNew} variant="outline" className="mt-6 gap-2 border-dashed">
              <Plus className="h-4 w-4" /> 添加新镜像
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRepo ? "编辑镜像" : "新增镜像"}</DialogTitle>
            <DialogDescription>
              {editingRepo ? "修改现有镜像信息。" : "填写新镜像的详细信息。"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {formError && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                {formError}
              </div>
            )}
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">名称 <span className="text-destructive">*</span></label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (formError) setFormError("")
                }}
                placeholder="例如：nginx"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="tag" className="text-sm font-medium">标签 <span className="text-destructive">*</span></label>
              <Input
                id="tag"
                value={formData.tag}
                onChange={(e) => {
                  setFormData({ ...formData, tag: e.target.value })
                  if (formError) setFormError("")
                }}
                placeholder="例如：latest"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="size" className="text-sm font-medium">大小</label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                placeholder="例如：142MB"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>取消</Button>
            <Button onClick={handleSave}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className={isMobile ? "rounded-2xl" : ""}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-xl">
              确认删除
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base mt-2">
              您确定要永久删除此镜像吗？<br/>此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={isMobile ? "gap-3" : ""}>
            <AlertDialogCancel 
              onClick={() => setIsDeleteOpen(false)}
              className={isMobile ? "w-full h-11 text-base rounded-xl border-0 bg-slate-100 text-slate-900" : ""}
            >
              取消
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className={`bg-destructive text-destructive-foreground hover:bg-destructive/90 ${isMobile ? "w-full h-11 text-base rounded-xl" : ""}`}
            >
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default App
