import markdownMark from 'markdown-it-mark';
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
// import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';
import { defineConfig, type HeadConfig } from "vitepress";
import { searchOptions, nav, sidebar } from "./configs";
import llmstxt from 'vitepress-plugin-llms'

const prod = !!process.env.NETLIFY
const siteUrl = 'https://www.rzoco.top'

const ogImage = new URL('/rinynotes-og.png', siteUrl).href

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
      prod && llmstxt({ workDir: 'posts', ignoreFiles: ['index.md'] })
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
  },
  transformHead({ assets }) {
    const links = []
    
    // 预加载 LXGWWenKai 字体
    const wenkaiFont = assets.find(file => /LXGWWenKai.*\.woff2/)
    if (wenkaiFont) {
      links.push([
        'link',
        {
          rel: 'preload',
          href: wenkaiFont,
          as: 'font',
          type: 'font/woff2',
          crossorigin: ''
        }
      ])
    }
    
    // 预加载 CodeNewRoman 字体
    const codeFont = assets.find(file => /CodeNewRoman\.woff/)
    if (codeFont) {
      links.push([
        'link',
        {
          rel: 'preload',
          href: codeFont,
          as: 'font',
          type: 'font/woff',
          crossorigin: ''
        }
      ])
    }
    
    return links.length > 0 ? links : undefined
  },
  transformPageData: prod ? (pageData, ctx) => {
    const url = new URL(pageData.relativePath.replace(/(?:(^|\/)index)?\.md$/, '$1'), siteUrl).href
    const site = ctx.siteConfig.site
    const title = pageData.title ? `${pageData.title} | ${site.title}` : site.title
    const description = pageData.description || site.description

    ;((pageData.frontmatter.head ??= []) as HeadConfig[]).push(
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: 'Riny Notes' }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { property: 'og:image:secure_url', content: ogImage }],
      ['meta', { property: 'og:image:type', content: 'image/jpeg' }],
      ['meta', { property: 'og:image:width', content: '1280' }],
      ['meta', { property: 'og:image:height', content: '640' }],
      ['meta', { property: 'og:image:alt', content: 'Riny Notes' }],
      ['link', { rel: 'canonical', href: url }]
    )
  } : undefined,
});
