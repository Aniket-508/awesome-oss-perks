const licenses = {
  nav: "라이선스",
  listing: {
    accepted: "{count}개 허용",
    breadcrumb: "라이선스",
    checkCta: "내 저장소 확인하기",
    heading: "라이선스별 오픈소스 혜택",
    includes: "포함",
    intro:
      "거의 모든 혜택 프로그램에서 라이선스는 첫 번째 관문입니다. {count}개 프로그램에서 각 라이선스 계열이 어떤 혜택을 열어주는지 확인하세요.",
    rejected: "{count}개 거부",
    unspecified: "{count}개 미지정",
  },
  detail: {
    acceptedHeading: "{count}개 프로그램에서 허용",
    breadcrumb: "라이선스",
    checkCta: "내 저장소 확인하기",
    checkCtaIntro:
      "라이선스는 여러 관문 중 하나일 뿐입니다. 스타 수, 활동성, 상업적 이용 여부도 함께 봅니다 — {count}개 프로그램 전체를 기준으로 저장소를 확인해 보세요.",
    rejectedOsiHeading: "{count}개 프로그램에서 거부 — OSI 승인 라이선스 필요",
    rejectedOsiIntro:
      "이 프로그램들은 Open Source Initiative가 승인한 라이선스를 요구합니다. 이 계열은 해당되지 않습니다.",
    rejectedPermissiveHeading:
      "{count}개 프로그램에서 거부 — 허용적 라이선스 필요",
    rejectedPermissiveIntro:
      "이 프로그램들은 MIT, Apache-2.0, BSD, ISC와 같은 허용적 라이선스만 인정합니다.",
    spdxHeading: "이 계열에 속한 라이선스",
    summary:
      "{accepted}개 허용 · {rejected}개 거부 · {unspecified}개는 라이선스 요건 없음",
    unspecifiedHeading: "라이선스 요건이 명시되지 않음: {count}개 프로그램",
    unspecifiedIntro:
      "이 프로그램들은 자격 요건에서 라이선스를 전혀 언급하지 않습니다. 그래도 신청해 볼 가치가 있으며, 승인 여부는 제공자의 재량에 달려 있습니다.",
  },
  families: {
    copyleft: {
      advice:
        "카피레프트 라이선스는 OSI 승인 라이선스이므로 거의 모든 프로그램이 이를 허용합니다. 허용적 라이선스를 명시적으로 요구하는 프로그램만 거부합니다. AGPL-3.0도 이 계열에 속합니다. 자동화된 OSI 검사는 통과하지만, 네트워크 사용 조항 때문에 일부 제공자는 수동으로 검토합니다.",
      heading: "GPL·AGPL 프로젝트를 위한 오픈소스 혜택",
      metaDescription:
        "전체 {total}개 오픈소스 혜택 프로그램 중 {accepted}개가 GPL-3.0, AGPL-3.0, MPL-2.0 같은 카피레프트 라이선스를 허용합니다. 어떤 프로그램이 왜 거부하는지 확인하세요.",
      metaTitle: "카피레프트 라이선스 — GPL·AGPL 허용 오픈소스 혜택",
      name: "카피레프트",
      tagline:
        "GPL, AGPL, LGPL, MPL, EPL은 OSI 승인 라이선스이지만 허용적이지는 않습니다.",
    },
    permissive: {
      advice:
        "허용적 라이선스는 카탈로그의 모든 라이선스 관문을 통과합니다. 그래도 거절된다면 이유는 라이선스가 아니라 스타 수, 활동성, 상업적 이용입니다.",
      heading: "MIT·Apache 라이선스 프로젝트를 위한 오픈소스 혜택",
      metaDescription:
        "전체 {total}개 오픈소스 혜택 프로그램 중 {accepted}개가 MIT, Apache-2.0, BSD-3-Clause 같은 허용적 라이선스를 인정합니다. 어떤 계열보다 많습니다.",
      metaTitle: "허용적 라이선스 — MIT·Apache 프로젝트 오픈소스 혜택",
      name: "허용적",
      tagline:
        "MIT, Apache-2.0, BSD, ISC는 재배포에 아무 조건을 두지 않습니다.",
    },
    "source-available": {
      advice:
        "BUSL, SSPL, Elastic, FSL은 오픈소스가 아니라 소스 공개형입니다. Open Source Initiative의 승인을 받지 않았기 때문에 거의 모든 프로그램의 라이선스 관문을 통과하지 못합니다. 프로젝트 라이선스를 변경하거나 OSI 승인 코어를 이중 라이선스로 제공하는 것이 유일한 방법입니다.",
      heading: "BUSL·SSPL 등 소스 공개형 프로젝트를 위한 오픈소스 혜택",
      metaDescription:
        "BUSL-1.1, SSPL-1.0, Elastic-2.0 같은 소스 공개형 라이선스는 OSI 승인이 아니어서 전체 {total}개 중 {rejected}개 프로그램이 거부합니다. 남은 선택지를 확인하세요.",
      metaTitle: "소스 공개형 라이선스 — BUSL·SSPL도 혜택을 받을까?",
      name: "소스 공개형",
      tagline:
        "BUSL, SSPL, Elastic, FSL은 소스를 공개하지만 OSI 승인은 받지 않았습니다.",
    },
    unlicensed: {
      metaTitle: "LICENSE 파일 없음 — 혜택 프로그램이 거절하는 이유",
      advice:
        "LICENSE 파일이 없는 저장소는 기본적으로 독점 소프트웨어로 간주되어 모든 라이선스 관문을 통과하지 못합니다. 신청 전 OSI 승인 LICENSE 파일을 추가하는 것이 가장 효과적인 조치입니다.",
      heading: "라이선스 파일이 없는 저장소를 위한 오픈소스 혜택",
      metaDescription:
        "LICENSE 파일이 없는 저장소는 기본적으로 독점으로 간주되어 전체 {total}개 중 {rejected}개 프로그램이 즉시 거부합니다. OSI 승인 라이선스를 추가하면 커밋 하나로 해결됩니다.",
      name: "라이선스 없음",
      tagline: "LICENSE 파일이 없는 저장소는 누구에게도 권리를 부여하지 않습니다.",
    },
  },
} as const;

export type LicensesTranslations = typeof licenses;
export default licenses;
