---
title: React使用感想
date: 2026-02-09 19:11
lastUpdated: false
---

# React使用感想

> 起因：最近公司要搭建一个新的网站，于是我觉得`React`是一个不错的选择。刚好可以尝试下`Next.js`框架。

## 开发

基于[next-wp](https://github.com/9d8dev/next-wp)和[next-woo](https://github.com/9d8dev/next-woo)这两个项目，连接WordPress后台和 WooCommerce

## 部署

### Docker

> 编辑于2026-03-02 14:00 
> 
> **不要碰 `Docker`，会变得不幸**

我也不知道怎么回事，使用`Docker`部署`Next.js`项目，三天了，每次修改代码，再重新构建镜像并启动容器，打开网站都会有一些奇奇怪怪的问题。

### Vercel

最终决定暂时使用Vercel来部署项目测试环境。GitHub私有库+Vercel的免费计划，先解决现有问题。




