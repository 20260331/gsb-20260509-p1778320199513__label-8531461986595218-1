export interface Repo {
  id: number
  name: string
  tag: string
  size: string
  pulls: string
  lastUpdated: string
}

export const INITIAL_REPOS: Repo[] = [
  { id: 1, name: "nginx", tag: "latest", size: "142MB", pulls: "10M+", lastUpdated: "2 days ago" },
  { id: 2, name: "nginx", tag: "alpine", size: "41MB", pulls: "5M+", lastUpdated: "2 days ago" },
  { id: 3, name: "postgres", tag: "16", size: "240MB", pulls: "8M+", lastUpdated: "1 week ago" },
  { id: 4, name: "postgres", tag: "15-alpine", size: "230MB", pulls: "5M+", lastUpdated: "1 week ago" },
  { id: 5, name: "redis", tag: "7.2", size: "130MB", pulls: "12M+", lastUpdated: "3 days ago" },
  { id: 6, name: "redis", tag: "alpine", size: "40MB", pulls: "9M+", lastUpdated: "3 days ago" },
  { id: 7, name: "node", tag: "20", size: "900MB", pulls: "20M+", lastUpdated: "12 hours ago" },
  { id: 8, name: "node", tag: "20-alpine", size: "180MB", pulls: "15M+", lastUpdated: "12 hours ago" },
  { id: 9, name: "node", tag: "18-slim", size: "180MB", pulls: "12M+", lastUpdated: "5 hours ago" },
  { id: 10, name: "python", tag: "3.12", size: "920MB", pulls: "18M+", lastUpdated: "1 day ago" },
  { id: 11, name: "python", tag: "3.11-slim", size: "150MB", pulls: "10M+", lastUpdated: "4 days ago" },
  { id: 12, name: "mysql", tag: "8.0", size: "500MB", pulls: "50M+", lastUpdated: "2 weeks ago" },
  { id: 13, name: "mysql", tag: "5.7", size: "480MB", pulls: "30M+", lastUpdated: "2 weeks ago" },
  { id: 14, name: "mongo", tag: "7.0", size: "450MB", pulls: "15M+", lastUpdated: "5 days ago" },
  { id: 15, name: "mongo", tag: "6.0", size: "440MB", pulls: "10M+", lastUpdated: "1 month ago" },
  { id: 16, name: "ubuntu", tag: "24.04", size: "78MB", pulls: "100M+", lastUpdated: "3 days ago" },
  { id: 17, name: "ubuntu", tag: "22.04", size: "75MB", pulls: "80M+", lastUpdated: "1 month ago" },
  { id: 18, name: "alpine", tag: "3.19", size: "7MB", pulls: "50M+", lastUpdated: "1 week ago" },
  { id: 19, name: "busybox", tag: "latest", size: "4MB", pulls: "40M+", lastUpdated: "2 weeks ago" },
  { id: 20, name: "golang", tag: "1.22", size: "850MB", pulls: "8M+", lastUpdated: "4 days ago" },
  { id: 21, name: "golang", tag: "1.21-alpine", size: "300MB", pulls: "6M+", lastUpdated: "2 weeks ago" },
  { id: 22, name: "traefik", tag: "v3.0", size: "120MB", pulls: "5M+", lastUpdated: "3 days ago" },
  { id: 23, name: "wordpress", tag: "latest", size: "600MB", pulls: "20M+", lastUpdated: "5 days ago" },
  { id: 24, name: "jenkins/jenkins", tag: "lts", size: "450MB", pulls: "10M+", lastUpdated: "6 days ago" },
  { id: 25, name: "gitlab/gitlab-ce", tag: "latest", size: "1.2GB", pulls: "2M+", lastUpdated: "1 day ago" },
  { id: 26, name: "frontend-app", tag: "v1.0.2", size: "45MB", pulls: "120", lastUpdated: "10 mins ago" },
  { id: 27, name: "frontend-app", tag: "v1.0.1", size: "45MB", pulls: "105", lastUpdated: "2 days ago" },
  { id: 28, name: "backend-api", tag: "v2.1.0", size: "65MB", pulls: "340", lastUpdated: "1 hour ago" },
  { id: 29, name: "backend-api", tag: "v2.0.0", size: "64MB", pulls: "310", lastUpdated: "3 days ago" },
  { id: 31, name: "elasticsearch", tag: "8.11", size: "1.1GB", pulls: "15M+", lastUpdated: "2 weeks ago" },
]
