const stacks = {
  nav: "技术栈",
  listing: {
    breadcrumb: "技术栈",
    heading: "福利技术栈",
    intro:
      "按项目类型分组、精心整理的开源福利组合。每个技术栈都是一份申领顺序清单,而不是搜索过滤器。",
    perksCount: "{count} 项福利",
    programsCount: "{count} 个项目",
  },
  detail: {
    breadcrumb: "技术栈",
    checkCta: "查看你符合其中哪些资格",
    checkCtaIntro:
      "每个项目都有自己的资格规则。一次性用你的仓库比对全部规则。",
    heading: "{stack} 的开源福利技术栈",
    metaDescription:
      "面向 {stack} 的 {count} 款免费工具与额度项目:{examples}。它们都提供开源免费层级——下面是推荐的申领顺序。",
    metaTitle: "{stack} 的免费开源福利",
    otherStacks: "其他技术栈",
    summary: "{programs} 个项目 · {perks} 项福利",
    tableProgram: "项目",
    tableRole: "用途",
    tableTopPerk: "核心福利",
  },
  roles: {
    "ai-assistant": "AI 助手",
    analytics: "数据分析",
    chat: "团队聊天",
    ci: "CI/CD",
    cms: "CMS",
    "code-review": "代码评审",
    "code-signing": "代码签名",
    containers: "容器",
    coverage: "测试覆盖率",
    database: "数据库",
    docs: "文档",
    errors: "错误追踪",
    funding: "资金支持",
    hosting: "托管",
    ide: "IDE",
    localization: "本地化",
    monitoring: "监控",
    scheduling: "日程安排",
    scraping: "网页抓取",
    sdk: "SDK 生成",
    search: "搜索",
    secrets: "密钥管理",
    security: "安全",
    "status-page": "状态页",
    support: "技术支持",
    testing: "跨浏览器测试",
    "visual-testing": "视觉测试",
  },
  items: {
    "ai-agent": {
      description:
        "智能体消耗模型额度的速度远超其他场景,因此额度赠予比工具链更重要。先拿 API 额度,再考虑托管后端和 SDK 生成器。",
      name: "AI 智能体或 LLM 应用",
      shortName: "AI 智能体",
    },
    "community-project": {
      description:
        "这类项目的瓶颈在于协作而非基础设施:聊天、日程安排、技术支持,以及给维护者的资金渠道。",
      name: "大型社区项目",
      shortName: "社区项目",
    },
    "docs-site": {
      description:
        "文档站点更需要托管、搜索和翻译,而不是算力。这里的每个项目都提供免费的开源层级。",
      name: "文档站点",
      shortName: "文档站点",
    },
    "go-service": {
      description:
        "生产环境中的 Go 服务需要容器托管、可观测性和状态页。Sonar 和 cubic 无需 Node 工具链即可覆盖代码评审环节。",
      name: "Go 服务",
      shortName: "Go 服务",
    },
    nextjs: {
      description:
        "Next.js 项目的默认技术栈:先解决托管和错误追踪,待贡献者到来后再加上搜索、文档和视觉回归测试。",
      name: "Next.js 项目",
      shortName: "Next.js 项目",
    },
    "node-cli": {
      description:
        "已发布的 CLI 成败系于其供应链。测试覆盖率、依赖扫描和评审自动化优先级最高。",
      name: "Node.js CLI",
      shortName: "Node.js CLI",
    },
    "python-library": {
      description:
        "Python 库需要测试覆盖率、静态分析和文档。JetBrains 与 Claude 负责编写环节,Crowdin 处理文档翻译。",
      name: "Python 库",
      shortName: "Python 库",
    },
    "react-component-library": {
      description:
        "组件库出问题通常在视觉层面,而非功能层面。视觉回归和跨浏览器测试在这里最为关键。",
      name: "React 组件库",
      shortName: "React 组件库",
    },
    "rust-cli": {
      description:
        "Rust CLI 需要跨平台发布已签名的二进制文件,因此高速构建机和代码签名比托管额度更重要。",
      name: "Rust CLI",
      shortName: "Rust CLI",
    },
    "self-hosted-saas": {
      description:
        "开放内核产品有实打实的基础设施成本。托管额度、托管版 Postgres、监控和密钥管理基本可以覆盖大部分开销。",
      name: "自托管 SaaS",
      shortName: "自托管 SaaS",
    },
  },
} as const;

export type StacksTranslations = typeof stacks;
export default stacks;
