const stacks = {
  nav: "스택",
  listing: {
    breadcrumb: "스택",
    heading: "혜택 스택",
    intro:
      "만들고 있는 프로젝트 유형별로 묶은 오픈소스 혜택 모음입니다. 각 스택은 검색 필터가 아니라 설정 순서입니다.",
    perksCount: "혜택 {count}개",
    programsCount: "프로그램 {count}개",
  },
  detail: {
    breadcrumb: "스택",
    checkCta: "어떤 혜택을 받을 수 있는지 확인하기",
    checkCtaIntro:
      "프로그램마다 자격 요건이 다릅니다. 저장소를 한 번에 모든 프로그램에 대조해 확인해 보세요.",
    heading: "{stack}를 위한 오픈소스 혜택 스택",
    metaDescription:
      "{stack}를 위한 무료 도구와 크레딧 프로그램 {count}개: {examples}. 모두 오픈소스 등급을 제공하며, 아래는 신청 순서입니다.",
    metaTitle: "{stack}를 위한 무료 오픈소스 혜택",
    otherStacks: "다른 스택",
    summary: "프로그램 {programs}개 · 혜택 {perks}개",
    tableProgram: "프로그램",
    tableRole: "역할",
    tableTopPerk: "주요 혜택",
  },
  roles: {
    "ai-assistant": "AI 어시스턴트",
    analytics: "분석",
    chat: "팀 채팅",
    ci: "CI/CD",
    cms: "CMS",
    "code-review": "코드 리뷰",
    "code-signing": "코드 서명",
    containers: "컨테이너",
    coverage: "커버리지",
    database: "데이터베이스",
    docs: "문서화",
    errors: "오류 추적",
    funding: "펀딩",
    hosting: "호스팅",
    ide: "IDE",
    localization: "현지화",
    monitoring: "모니터링",
    scheduling: "일정 관리",
    scraping: "웹 스크래핑",
    sdk: "SDK 생성",
    search: "검색",
    secrets: "시크릿 관리",
    security: "보안",
    "status-page": "상태 페이지",
    support: "지원",
    testing: "크로스 브라우저 테스트",
    "visual-testing": "비주얼 테스트",
  },
  items: {
    "ai-agent": {
      description:
        "에이전트는 무엇보다 모델 크레딧을 빠르게 소모하므로, 도구보다 지원금이 더 중요합니다. API 크레딧부터 시작해 관리형 백엔드와 SDK 생성기로 이어가세요.",
      name: "AI 에이전트 또는 LLM 앱",
      shortName: "AI 에이전트",
    },
    "community-project": {
      description:
        "병목이 인프라가 아니라 협업에 있는 프로젝트를 위한 구성입니다. 채팅, 일정 관리, 지원, 그리고 메인테이너를 위한 펀딩 경로를 포함합니다.",
      name: "대규모 커뮤니티 프로젝트",
      shortName: "커뮤니티 프로젝트",
    },
    "docs-site": {
      description:
        "문서 사이트에는 연산 자원보다 호스팅, 검색, 번역이 더 필요합니다. 여기 있는 모든 프로그램은 무료 오픈소스 등급을 제공합니다.",
      name: "문서 사이트",
      shortName: "문서 사이트",
    },
    "go-service": {
      description:
        "프로덕션의 Go 서비스에는 컨테이너 호스팅, 관측 가능성, 상태 페이지가 필요합니다. Sonar와 cubic은 Node 툴체인 없이 리뷰 영역을 커버합니다.",
      name: "Go 서비스",
      shortName: "Go 서비스",
    },
    nextjs: {
      description:
        "Next.js 프로젝트의 기본 스택입니다. 먼저 호스팅과 오류 추적을, 기여자가 늘어나면 검색, 문서, 비주얼 회귀 테스트를 추가하세요.",
      name: "Next.js 프로젝트",
      shortName: "Next.js 프로젝트",
    },
    "node-cli": {
      description:
        "배포되는 CLI의 성패는 공급망에 달려 있습니다. 커버리지, 의존성 스캔, 리뷰 자동화가 무엇보다 먼저입니다.",
      name: "Node.js CLI",
      shortName: "Node.js CLI",
    },
    "python-library": {
      description:
        "Python 라이브러리에는 커버리지, 정적 분석, 문서가 필요합니다. JetBrains와 Claude가 작성 과정을, Crowdin이 번역 문서를 담당합니다.",
      name: "Python 라이브러리",
      shortName: "Python 라이브러리",
    },
    "react-component-library": {
      description:
        "컴포넌트 라이브러리는 기능이 아니라 시각적으로 깨집니다. 비주얼 회귀 테스트와 크로스 브라우저 테스트가 가장 중요합니다.",
      name: "React 컴포넌트 라이브러리",
      shortName: "React 컴포넌트 라이브러리",
    },
    "rust-cli": {
      description:
        "Rust CLI는 여러 플랫폼에 서명된 바이너리를 배포하므로, 호스팅 크레딧보다 빠른 러너와 코드 서명이 더 중요합니다.",
      name: "Rust CLI",
      shortName: "Rust CLI",
    },
    "self-hosted-saas": {
      description:
        "오픈 코어 제품에는 실제 인프라 비용이 발생합니다. 호스팅 크레딧, 관리형 Postgres, 모니터링, 시크릿 관리로 대부분을 해결할 수 있습니다.",
      name: "셀프 호스팅 SaaS",
      shortName: "셀프 호스팅 SaaS",
    },
  },
} as const;

export type StacksTranslations = typeof stacks;
export default stacks;
