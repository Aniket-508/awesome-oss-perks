const stacks = {
  nav: "スタック",
  listing: {
    breadcrumb: "スタック",
    heading: "特典スタック",
    intro:
      "オープンソース特典を、開発するプロジェクトの種類ごとにまとめたバンドルです。各スタックは検索フィルターではなく、セットアップの順序を示しています。",
    perksCount: "{count} 件の特典",
    programsCount: "{count} 件のプログラム",
  },
  detail: {
    breadcrumb: "スタック",
    checkCta: "利用資格があるものを確認する",
    checkCtaIntro:
      "プログラムごとに独自の参加条件があります。リポジトリをまとめて一括でチェックしましょう。",
    heading: "{stack}向けオープンソース特典スタック",
    metaDescription:
      "{stack}向けの無料ツールとクレジットプログラム {count} 件: {examples}。すべてにオープンソース向けプランがあります。申請すべき順番を紹介します。",
    metaTitle: "{stack}向け無料オープンソース特典",
    otherStacks: "その他のスタック",
    summary: "{programs} プログラム · {perks} 特典",
    tableProgram: "プログラム",
    tableRole: "役割",
    tableTopPerk: "主な特典",
  },
  roles: {
    "ai-assistant": "AI アシスタント",
    analytics: "アナリティクス",
    chat: "チームチャット",
    ci: "CI/CD",
    cms: "CMS",
    "code-review": "コードレビュー",
    "code-signing": "コード署名",
    containers: "コンテナ",
    coverage: "カバレッジ",
    database: "データベース",
    docs: "ドキュメント",
    errors: "エラートラッキング",
    funding: "資金調達",
    hosting: "ホスティング",
    ide: "IDE",
    localization: "ローカライズ",
    monitoring: "モニタリング",
    scheduling: "スケジューリング",
    scraping: "ウェブスクレイピング",
    sdk: "SDK 生成",
    search: "検索",
    secrets: "シークレット管理",
    security: "セキュリティ",
    "status-page": "ステータスページ",
    support: "サポート",
    testing: "クロスブラウザテスト",
    "visual-testing": "ビジュアルテスト",
  },
  items: {
    "ai-agent": {
      description:
        "エージェントは何よりも早くモデルのクレジットを消費するため、ツールよりも支援プログラムが重要です。まず API クレジット、次にマネージドバックエンドと SDK ジェネレーターを確保しましょう。",
      name: "AI エージェントや LLM アプリ",
      shortName: "AI エージェント",
    },
    "community-project": {
      description:
        "ボトルネックがインフラではなく調整にあるプロジェクト向け。チャット、スケジューリング、サポート、そしてメンテナー向けの資金調達手段をそろえます。",
      name: "大規模なコミュニティプロジェクト",
      shortName: "コミュニティプロジェクト",
    },
    "docs-site": {
      description:
        "ドキュメントサイトに必要なのは計算資源よりもホスティング・検索・翻訳です。ここに挙げたプログラムはすべて無料のオープンソース向けプランがあります。",
      name: "ドキュメントサイト",
      shortName: "ドキュメントサイト",
    },
    "go-service": {
      description:
        "本番運用の Go サービスには、コンテナホスティング、オブザーバビリティ、ステータスページが必要です。Sonar と cubic は Node のツールチェーンなしでレビュー面をカバーします。",
      name: "Go サービス",
      shortName: "Go サービス",
    },
    nextjs: {
      description:
        "Next.js プロジェクトの標準スタック。まずホスティングとエラートラッキング、コントリビューターが増えてきたら検索、ドキュメント、ビジュアルリグレッションを追加します。",
      name: "Next.js プロジェクト",
      shortName: "Next.js プロジェクト",
    },
    "node-cli": {
      description:
        "公開された CLI の生命線はサプライチェーンです。カバレッジ、依存関係スキャン、レビュー自動化を何よりも優先しましょう。",
      name: "Node.js の CLI",
      shortName: "Node.js CLI",
    },
    "python-library": {
      description:
        "Python ライブラリにはカバレッジ、静的解析、ドキュメントが必要です。JetBrains と Claude が執筆・開発面を、Crowdin が翻訳ドキュメントを担います。",
      name: "Python ライブラリ",
      shortName: "Python ライブラリ",
    },
    "react-component-library": {
      description:
        "コンポーネントライブラリは機能ではなく見た目で壊れます。ここではビジュアルリグレッションとクロスブラウザテストが最も重要です。",
      name: "React コンポーネントライブラリ",
      shortName: "React コンポーネントライブラリ",
    },
    "rust-cli": {
      description:
        "Rust の CLI は複数プラットフォーム向けに署名済みバイナリを配布するため、ホスティングのクレジットよりも高速なランナーとコード署名が重要です。",
      name: "Rust の CLI",
      shortName: "Rust CLI",
    },
    "self-hosted-saas": {
      description:
        "オープンコア製品には実際のインフラコストがかかります。ホスティングのクレジット、マネージド Postgres、モニタリング、シークレット管理でその大半をカバーできます。",
      name: "セルフホスト型の SaaS",
      shortName: "セルフホスト型 SaaS",
    },
  },
} as const;

export type StacksTranslations = typeof stacks;
export default stacks;
