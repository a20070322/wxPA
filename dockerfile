# 使用官方 Node.js 基础镜像
FROM node:18

# 设置工作目录
WORKDIR /usr/src/app

# 安装 pnpm
# RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装项目依赖
RUN npm install

# 复制项目文件到容器中
COPY . .

# 暴露端口
EXPOSE 3000

# 运行应用
CMD ["node", "main.js"]