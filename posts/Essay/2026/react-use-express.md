---
title: React开发感想
date: 2026-02-09 19:11
---

# React开发感想

> 起因：最近公司要搭建一个新的网站，于是我觉得`React`是一个不错的选择。刚好可以尝试下`Next.js`框架。

## 开发

基于 [next-wp](https://github.com/9d8dev/next-wp) 和 [next-woo](https://github.com/9d8dev/next-woo) 这两个项目，连接WordPress后台和 WooCommerce

## 打包

next有两种打包方式，

npm run build 来生成 .next 文件夹。
将 .next, public, package.json, package-lock.json, 环境变量文件以及任何必要的配置文件上传到了云服务器上的项目根目录。

### 使用 PM2 进程管理器

为了确保应用稳定运行，可以使用 PM2 来管理 Node.js 应用程序。PM2 提供自动重启、日志管理和更多功能来提高应用程序的可靠性。

```bash
# 安装 PM2:
npm install pm2 -g
# 然后使用 PM2 启动应用：
pm2 start npm --name "your-app-name" -- start
# 或者
pm2 start ecosystem.config.js
```

`ecosystem.config.js` 配置示例：

```js
// ecosystem.config.js
module.exports = {
    apps: [{
        name: 'next-wp-app',
        script: 'npx',
        args: 'next start',
        interpreter: 'none',
        cwd: "/www/wwwroot/next-wp-app",
        exec_mode: "fork",
        instances: "1",
        env: {
            HOST: "0.0.0.0",
            PORT: 3000,             // 开发环境端口
            NODE_ENV: "production",
        },
        env_production: {
            NODE_ENV: 'production',
            APP_DEBUG: false,
            WORDPRESS_URL: process.env.WORDPRESS_URL,
            WORDPRESS_HOSTNAME: process.env.WORDPRESS_HOSTNAME,
            WC_CONSUMER_KEY: process.env.WC_CONSUMER_KEY,
            WC_CONSUMER_SECRET: process.env.WC_CONSUMER_SECRET,
            WORDPRESS_WEBHOOK_SECRET: process.env.WORDPRESS_WEBHOOK_SECRET,

            // 站点服务配置
            PORT: 3000,                      // 项目指定服务端口（如需通过 Nginx 反向代理，保持此端口即可）
            BODY_LIMIT: "300kb",             // 请求体大小限制（防止大文件上传攻击）
            CORS_ORIGIN: "https://example.com",// 跨域允许所有来源（生产环境建议指定具体域名，如 "https://your-domain.com"）

            // 日志配置
            LOGGER_LEVEL: "tiny",            // 生产环境日志级别（精简日志，减少磁盘占用）
        },
        // ===================== 日志配置 =====================
        error_file: "./logs/chancms-error.log",
        out_file: "./logs/chancms-out.log",
        merge_logs: true,
        log_date_format: "YYYY-MM-DD HH:mm:ss",
        log_rotate: {
            size: "10M",        // 单个日志文件最大 size（超过则分割）
            max: 30,            // 保留最近 30 个日志文件
            compress: true,     // 压缩历史日志（gzip 格式，节省磁盘空间）
            interval: "1d",     // 日志轮转间隔（1d = 每天轮转一次）
        },

        // ===================== 稳定性配置 =====================
        autorestart: true,
        restart_delay: 5000,
        watch: false,
        max_memory_restart: "1G",
        timeout: 30000,
        health_check: {
            enable: true,
            interval: 60,  // 每 60 秒检查一次
            timeout: 5,    // 检查超时时间 5 秒
            port: 3000,    // 与生产环境 PORT 一致
        },
        // merge_env_vars: true,
        nice: 19, //进程优先级：设置为 19（最低优先级），避免抢占核心服务资源
    }]
}
```

## 部署

### Docker

> 编辑于2026-03-02 14:00 
> 
> **不要碰 `Docker`，会变得不幸**

我也不知道怎么回事，使用`Docker`部署`Next.js`项目，三天了，每次修改代码，再重新构建镜像并启动容器，打开网站都会有一些奇奇怪怪的问题。

### Vercel

最终决定暂时使用Vercel来部署项目测试环境。GitHub私有库+Vercel的免费计划，先解决现有问题。

### GitHub Actions

自动化部署，真方便

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment: Production

    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          persist-credentials: false

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '24'

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Cache pnpm store
        uses: actions/cache@v3
        with:
          path: |
            ~/.pnpm-store
            ~/.local/share/pnpm/store
          key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-

      - name: Cache Next.js build
        uses: actions/cache@v3
        with:
          path: |
            .next/cache
            ~/.cache/turbo
          key: ${{ runner.os }}-next-${{ hashFiles('**/pnpm-lock.yaml') }}-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-next-${{ hashFiles('**/pnpm-lock.yaml') }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build application
        run: pnpm run build
        env:
          WORDPRESS_URL: ${{ vars.WORDPRESS_URL }}
          WORDPRESS_HOSTNAME: ${{ vars.WORDPRESS_HOSTNAME }}
          WC_CONSUMER_KEY: ${{ secrets.WC_CONSUMER_KEY }}
          WC_CONSUMER_SECRET: ${{ secrets.WC_CONSUMER_SECRET }}
          WORDPRESS_WEBHOOK_SECRET: ${{ secrets.WORDPRESS_WEBHOOK_SECRET }}

      - name: Deploy to server
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          password: ${{ secrets.SERVER_PASSWORD }}
          port: ${{ secrets.SERVER_PORT }}
          timeout: 60m
          source: ".next/,public/,package.json,pnpm-lock.yaml,node_modules/,ecosystem.config.js,next.config.*"
          target: "/www/wwwroot/next-wp-app/"
          strip_components: 0
          overwrite: true

      - name: Prepare server environment and restart application
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          password: ${{ secrets.SERVER_PASSWORD }}
          port: ${{ secrets.SERVER_PORT }}
          script: |
            cd /www/wwwroot/next-wp-app

            curl http://localhost:3000/ -s -I -H "secret-header:true"
            
            # 创建或更新环境变量文件
            cat > .env.production << EOF
            WORDPRESS_URL=${{ vars.WORDPRESS_URL }}
            WORDPRESS_HOSTNAME=${{ vars.WORDPRESS_HOSTNAME }}
            WC_CONSUMER_KEY=${{ secrets.WC_CONSUMER_KEY }}
            WC_CONSUMER_SECRET=${{ secrets.WC_CONSUMER_SECRET }}
            WORDPRESS_WEBHOOK_SECRET=${{ secrets.WORDPRESS_WEBHOOK_SECRET }}
            NODE_ENV=production
            CONTACT_FORM_7_FORM_ID=760
            EOF
            
            
            # 启动 PM2 应用
            pm2 restart ecosystem.config.js
            pm2 save
```
