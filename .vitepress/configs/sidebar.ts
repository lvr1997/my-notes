import { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/BackEnd/": [
    {
      text: "Java",
      collapsed: false,
      items: [
        {
          text: "介绍",
          link: "/BackEnd/Java/1.intro"
        },
        {
          text: "Eclipse",
          link: "/BackEnd/Java/2.Eclipse"
        },
        {
          text: "变量",
          link: "/BackEnd/Java/3.variable"
        },
        {
          text: "运算符",
          link: "/BackEnd/Java/4.operator"
        },
        {
          text: "循环控制",
          link: "/BackEnd/Java/5.loop_control"
        },
        {
          text: "猜数字游戏",
          link: "/BackEnd/Java/6.guess_number"
        },
        {
          text: "函数",
          link: "/BackEnd/Java/7.functions"
        },
        {
          text: "数组",
          link: "/BackEnd/Java/8.array"
        },
        {
          text: "数组排序",
          link: "/BackEnd/Java/9.sort_2arrays"
        },
        {
          text: "String与StringBuffer",
          link: "/BackEnd/Java/10.string_stringbuffer"
        },
        {
          text: "面向对象",
          link: "/BackEnd/Java/11.oop"
        },
        {
          text: "常用类",
          link: "/BackEnd/Java/12.java-common-class"
        },
        {
          text: "集合",
          link: "/BackEnd/Java/13.collection"
        },
        {
          text: "IO操作",
          link: "/BackEnd/Java/14.IO"
        },
        {
          text: "多线程",
          link: "/BackEnd/Java/15.mulit-thread"
        },
        {
          text: "反射与XML",
          link: "/BackEnd/Java/16.Reflection-xml"
        },
        {
          text: "JDBC",
          link: "/BackEnd/Java/17.JDBC"
        },
        {
          text: "DBUtils",
          link: "/BackEnd/Java/18.DBUtiils"
        },
        {
          text: "Spring",
          link: "/BackEnd/Java/19.Spring"
        },
        {
          text: "SpringMVC",
          link: "/BackEnd/Java/20.SpringMVC"
        },
        {
          text: "MyBatis",
          link: "/BackEnd/Java/21.MyBatis"
        },
        {
          text: "Struts2",
          link: "/BackEnd/Java/22.struts2"
        },
        {
          text: "Hibernate",
          link: "/BackEnd/Java/23.Hibernate"
        }
      ]
    },
  ],

  "/FrontEnd/": [
    {
      text: "HTML+CSS+JS",
      collapsed: false,
      items: [
        {
          text: "HTML",
          link: "/FrontEnd/1.HTML+CSS+JS/1.HTML"
        },
        {
          text: "HTML5新玩具",
          link: "/FrontEnd/1.HTML+CSS+JS/2.HTML5_new_toys"
        },
        {
          text: "CSS",
          link: "/FrontEnd/1.HTML+CSS+JS/3.CSS"
        },
        {
          text: "JavaScript基础",
          link: "/FrontEnd/1.HTML+CSS+JS/4.js_base"
        },
        {
          text: "JavaScript进阶",
          link: "/FrontEnd/1.HTML+CSS+JS/5.js_step"
        },
        {
          text: "JavaScript API",
          link: "/FrontEnd/1.HTML+CSS+JS/6.js_apis"
        },
        {
          text: "JavaScript代码片段",
          link: "/FrontEnd/1.HTML+CSS+JS/7.js_snippet"
        },
        {
          text: 'FrontEnd Mentor',
          link: '/FrontEnd/1.HTML+CSS+JS/8.frontend-mentor'
        }
      ]
    },
    {
      text: "TypeScript",
      collapsed: false,
      items: [
        {
          text: "介绍",
          link: "/FrontEnd/2.TypeScript/0.intro"
        },
        {
          text: "类",
          link: "/FrontEnd/2.TypeScript/1.Class"
        },
        {
          text: "接口",
          link: "/FrontEnd/2.TypeScript/2.interface"
        },
        {
          text: "泛型",
          link: "/FrontEnd/2.TypeScript/3.Generic"
        },
        {
          text: "编译选项",
          link: "/FrontEnd/2.TypeScript/4.tsc"
        },
        {
          text: "Webpack+TypeScript",
          link: "/FrontEnd/2.TypeScript/5.webpack_ts"
        }
      ]
    },
    {
      text: "Vue",
      collapsed: false,
      items: [
        {
          text: "Vue基础",
          link: "/FrontEnd/3.Vue/1.vue-base"
        },
        {
          text: "MVVM模式",
          link: "/FrontEnd/3.Vue/2.mvvm"
        },
        {
          text: "Vue SVG",
          link: "/FrontEnd/3.Vue/3.vue_svg"
        },
        {
          text: "Vue3 ViewerJS",
          link: "/FrontEnd/3.Vue/4.vue3_viewerjs"
        },
        {
          text: "Vue3 Props",
          link: "/FrontEnd/3.Vue/5.vue3_props"
        },
        {
          text: "Vue表单自动保存",
          link: "/FrontEnd/3.Vue/7.vue_form_autosave"
        },
        {
          text: "Vue Flexible",
          link: "/FrontEnd/3.Vue/8.vue_flexible"
        },
        {
          text: "自定义日期组件",
          link: "/FrontEnd/3.Vue/9.custom_date_components"
        },
        {
          text: "多条件组件",
          link: "/FrontEnd/3.Vue/10.muti_condition_components"
        },
        {
          text: "多条件组件2",
          link: "/FrontEnd/3.Vue/11.muti_condition_components2"
        }
      ]
    },
    {
      text: "React",
      collapsed: false,
      items: [
        {
          text: "React基础",
          link: "/FrontEnd/4.React/1.base"
        },
        {
          text: "井字棋游戏",
          link: "/FrontEnd/4.React/2.toc-toe"
        }
      ]
    },
    {
      text: "Vue实战应用",
      collapsed: false,
      items: [
        {
          text: "Vue+ElementUI",
          link: "/FrontEnd/5.vue-application/vue+elementui"
        },
        {
          text: "Vue+AntDesign",
          link: "/FrontEnd/5.vue-application/vue-antdesign"
        },
        {
          text: "Vue+ECharts",
          link: "/FrontEnd/5.vue-application/vue-echarts"
        }
      ]
    },
    {
      text: "无样式组件库",
      collapsed: false,
      items: [
        {
          text: "RadixVue",
          link: "/FrontEnd/6.unheadlessui/1.RadixVue"
        }
      ]
    },
    {
      text: "小程序",
      collapsed: false,
      items: [
        {
          text: "微信小程序",
          link: "/FrontEnd/7.miniprogram/1.wx-miniprogram"
        },
        {
          text: "UniApp",
          link: "/FrontEnd/7.miniprogram/2.uniapp"
        }
      ]
    },
    {
      text: "Nuxt3",
      collapsed: false,
      items: [
        {
          text: "Nuxt3介绍",
          link: "/FrontEnd/8.Nuxt3/1.intro"
        },
        {
          text: "Nuxt3 B站项目",
          link: "/FrontEnd/8.Nuxt3/2.Nuxt3-bilibili"
        }
      ]
    },
    {
      text: "Three.js",
      collapsed: false,
      items: [
        {
          text: "Three.js介绍",
          link: "/FrontEnd/9.Threejs/1.intro"
        }
      ]
    },
    {
      text: "面试宝典",
      collapsed: false,
      items: [
        {
          text: "面试常见问答",
          link: "/FrontEnd/10.interview/1.asked_questions"
        },
        {
          text: "面试问题",
          link: "/FrontEnd/10.interview/2.question"
        }
      ]
    },
    {
      text: "VitePress",
      collapsed: false,
      items: [
        {
          text: "VitePress+Obsidian",
          link: "/FrontEnd/11.VitePress/about"
        }
      ]
    }, 
     {
      text: "SEO",
      collapsed: false,
      items: [
        {
          text: "关于SEO的探究",
          link: "/FrontEnd/13.SEO/intro.md"
        },
        {
          text: "Google Ads",
          link: "/FrontEnd/13.SEO/google-ads.md"
        }
      ]
    },
    {
      text: "Node生态",
      collapsed: true,
      items: [
        {
          text: "Nestjs",
          link: "/FrontEnd/12.Node-environment/Nestjs.md"
        }
      ]
    }
   
  ],

  "/Essay/": [
    {
      text: "2016",
      collapsed: false,
      items: [
        { text: "初识Java", link: "/Essay/2016/intro-java" },
      ]
    },
    {
      text: "2017",
      collapsed: false,
      items: [
        { text: "培训", link: "/Essay/2017/java-learn" },
      ]
    },
    {
      text: "2021",
      collapsed: false,
      items: [
        { text: "涨薪 or 离职", link: "/Essay/2021/choose-job" },
        { text: "来自一个程序媛的内心独白", link: "/Essay/2021/java-story" },
      ]
    },
    {
      text: "2025",
      collapsed: false,
      items: [
        { text: "WordPress使用小记", link: "/Essay/2025/wordpress-use-record" },
      ]
    },
    {
      text: "2026",
      collapsed: false,
      items: [
        { text: "React使用感想", link: "/Essay/2026/react-use-express" },
      ]
    }
  ],

  "/software/": [
    {
      text: "VS Code",
      collapsed: false,
      items: [
        {
          text: "使用技巧",
          link: "/software/VSCode/use_skill.md"
        },
        {
          text: "常用插件",
          link: "/software/VSCode/use_plugin.md"
        },
        {
          text: "常用主题",
          link: "/software/VSCode/use_theme.md"
        }
      ]
    },
    {
      text: "Others",
      collapsed: false,
      items: [
        {
          text: "在线工具",
          link: "/software/OtherTools/online_tools.md"
        },
        {
          text: "桌面软件",
          link: "/software/OtherTools/desktop_software.md"
        },
        {
          text: "摸鱼",
          link: "/software/OtherTools/touch_fish.md"
        }
      ]
    }
  ],
  "/i-have/": [
    {
      text: "文档",
      collapsed: false,
      items: [
        {
          text: "需求文档",
          link: "/i-have/01-Documents/1.requirement"
        },
        {
          text: "后端框架",
          link: "/i-have/01-Documents/2.backend-framework"
        },
        {
          text: "前端框架",
          link: "/i-have/01-Documents/3.frontend-framework"
        },
        {
          text: "接口文档",
          link: "/i-have/01-Documents/4.interface"
        }
      ]
    },
    {
      text: '代码实现',
      collapsed: false,
      items: [
        {
          text: '后端：图片上传实现',
          link: '/i-have/02-Code/1.backend-imageUpload.md'
        }
      ]
    }
  ],
};