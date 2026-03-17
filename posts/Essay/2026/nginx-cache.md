---
title: Nginx缓存踩坑
---

# Nginx缓存踩坑

> 说多了都是泪
> 
> 两天，github-actions工作流跑了37次！

![ScreenShot_2026-03-17_142710_866.png](https://files.seeusercontent.com/2026/03/17/F7iw/ScreenShot_2026-03-17_142710_866.png)

就为了测试一个问题：Next项目修改代码重新部署后，首页的内容不更新。

我排除了很多因素、浏览器缓存、Nextjs构建缓存等问题，最后发现是Nginx缓存的问题。

> 感谢 [这条帖子](https://stackoverflow.com/questions/6236078/how-to-clear-the-cache-of-nginx) 提醒了我

我忽略了一个最不起眼的配置：在nginx配置文件最上方有这样一行代码：

```nginx.conf
proxy_cache_path /www/wwwroot/next-wp-app/proxy_cache_dir levels=1:2 keys_zone=next_wp_app_cache:20m inactive=5m max_size=1g;
```

这条配置你在正常安装nginx时是不会有的。问题是我服务器还安装了宝塔面板，nginx是在宝塔面板安装的这条配置是宝塔面板在新建网站反向代理时自动加上的......


