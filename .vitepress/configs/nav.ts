import { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.NavItem[] = [
    { text: "i-have项目文档", link: "/i-have" },
    { text: "搬砖日记", items: [
        { text: "前端", link: "/FrontEnd" },
        { text: "后端", link: "/BackEnd" },
        { text: "随笔", link: "/Essay" },
    ] },
    { text: "抠抠搜搜DIY系列", link: "/diy" }
  ]