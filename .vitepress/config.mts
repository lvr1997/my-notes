import markdownMark from 'markdown-it-mark';
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
// import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';
import { defineConfig } from "vitepress";
import { searchOptions, nav, sidebar } from "./configs";

export default defineConfig({
  lang: "zh-CN",
  title: "Riny's Notes",
  description: "前端搬砖日记，前端知识积累，技术总结。Java程序媛",
  head: [
    ["link", { rel: "icon", href: "/favicon.png" }],
    [
      "meta", { name: "google-site-verification", content: "Rx6JbEA3FBUNILuPlomUEDql5CvovI2Ix4HB8xShV1g" }
    ],
    [
      'script',
      { id: 'register-sw' },
      `;(() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js')
        }
      })()`
    ]
  ],
  srcDir: "./posts",
  srcExclude: [".obsidian", 'templates', 'Clippings'],
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: 'localhostLinks',
  appearance: 'dark',
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
    config: (md) => {
      md.use(markdownMark),
        md.use(markdownItTaskCheckbox) //todo
      md.use(groupIconMdPlugin) //代码组图标
    },
  },
  themeConfig: {
    logo: {
      light: "/svg/icon.svg",
      dark: "/svg/icon-dark.svg",
    },
    nav,
    sidebar,
    outline: {
      label: '目录',
      level: [2, 3],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/lvr1997" },
      { icon: "vitepress", link: "https://vitepress.dev/" },
    ],
    search: {
      provider: 'local',
      options: searchOptions,
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      },
    },
    editLink: {
      pattern: 'https://github.com/lvr1997/my-notes/edit/main/posts/:path',
      text: '在GitHub上编辑此页'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    footer: {
      message: 'Powered By <a href="https://vitepress.dev/" target="_blank">VitePress</a>',
      copyright:
        '<a href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh-hans" target="_blank">CC BY-SA 4.0</a> Copyright © 2023-2026 Riny',
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    // 自定义配置
    visitor: {
      badgeId: 'riny-notes'
    },
    comment: {
      repo: 'lvr1997/my-notes',
      repoId: 'R_kgDOMnMr4A',
      category: 'Announcements',
      categoryId: 'DIC_kwDOMnMr4M4Ch3mj',
    },
  },
  sitemap: {
    hostname: "https://www.rzoco.top/",
  },
  transformPageData(pageData) {
    const canonicalUrl = `https://www.rzoco.top/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl }
    ])
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    plugins: [
      groupIconVitePlugin(), //代码组图标
      // AutoSidebar({
      //   path: '/posts',
      //   ignoreList: ['public', 'assets', '.obsidian', 'templates', 'Clippings'],
      //   ignoreIndexItem: true,
      //   titleFromFileByYaml: true,
      //   collapsed: false,
      //   // 侧边栏排序
      //   beforeCreateSideBarItems: (data) => {
      //     // console.log(data);

      //     function getOrder(item: string): number {
      //       let res = item.match(/(?<order>\d+)/);
      //       if (res && res.groups) {
      //         return parseInt(res.groups.order);
      //       }
      //       return 0;
      //     }

      //     data.forEach((item) => {
      //       item = item.replace(/^\d+\./, '');
      //     })

      //     data.sort((a, b) => {
      //       return getOrder(a) - getOrder(b);
      //     });

      //     return data;
      //   },
      // })
    ]
  }
});
