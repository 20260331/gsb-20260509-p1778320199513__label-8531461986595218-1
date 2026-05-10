# 容器镜像仓库管理前端 (Container Registry Frontend)

这是一个使用 Vite, React, Tailwind CSS 和 shadcn/ui 构建的容器镜像仓库管理前端项目。

## 功能

- 镜像列表展示
- 镜像搜索
- 镜像管理 (模拟删除)
- 响应式设计 (兼容 PC 和移动端)

## 项目结构

- `frontend/`: 前端源代码
- `Dockerfile`: Docker 构建文件
- `docker-compose.yml`: Docker Compose 配置文件
- `nginx.conf`: Nginx 配置文件

## 启动说明

### 本地开发

1. 进入 frontend 目录:
   ```bash
   cd frontend
   ```
2. 安装依赖:
   ```bash
   npm install
   ```
3. 启动开发服务器:
   ```bash
   npm run dev
   ```
   应用将在 http://localhost:3000 启动。

### Docker 启动

确保根目录下有 `Dockerfile` 和 `docker-compose.yml`。

使用 Docker Compose (推荐):

```bash
docker-compose up -d --build
```

或者使用 Docker 命令直接构建和运行:

1. 构建镜像:
   ```bash
   docker build -t container-registry-frontend .
   ```
2. 运行容器:
   ```bash
   docker run -p 3000:3000 container-registry-frontend
   ```

启动后，访问 http://localhost:3000 即可使用。
