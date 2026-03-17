const check = {
  checkAnother: "다른 저장소 확인",
  checkFailed: "확인 실패",
  description:
    "GitHub 또는 GitLab 저장소 URL을 붙여넣어 프로젝트가 받을 수 있는 오픈소스 프로그램과 혜택을 즉시 확인하세요.",
  eligible: "대상",
  fetchError: "자격 결과를 가져올 수 없습니다. 다시 시도해 주세요.",
  fork: "포크",
  heading: "프로젝트 자격 확인",
  ineligible: "대상 외",
  lastPush: "마지막 푸시",
  needsReview: "검토 필요",
  perks: "혜택",
  private: "비공개",
  reasons: {
    codeOfConduct: "행동 강령은 자동 확인할 수 없습니다",
    communitySize: "커뮤니티 규모는 자동 확인할 수 없습니다",
    criteriaUnverifiable: "기준을 자동 확인할 수 없습니다",
    hostingPlatform: "호스팅 플랫폼 요구사항은 자동 확인할 수 없습니다",
    inactive:
      "마지막 커밋이 {days}일 전입니다 (프로젝트가 비활성 상태일 수 있음)",
    missionAlignment: "미션 정렬은 자동 확인할 수 없습니다",
    noOsiLicense: "OSI 승인 라이선스가 감지되지 않았습니다 (감지됨: {license})",
    nonCommercial: "비상업적 요구사항은 자동 확인할 수 없습니다",
    osiLicense: "OSI 승인 라이선스가 필요합니다 (감지됨: {license})",
    permissiveLicense: "허용적 라이선스가 필요합니다 (감지됨: {license})",
    popularityThreshold: "인기도 임계값은 제공업체가 결정합니다",
    procedural: "절차적 단계 — 수동으로 신청하세요",
    projectTooNew:
      "프로젝트는 최소 {required}일이 경과해야 합니다 (현재 {current}일)",
    repoFork: "저장소가 포크입니다",
    repoPrivate: "저장소가 비공개입니다",
    requiresGithub: "GitHub 저장소가 필요합니다",
    requiresGitlab: "GitLab 저장소가 필요합니다",
    role: "역할 요구사항은 자동 확인할 수 없습니다",
    starsBelow: "{threshold}+ 스타가 필요합니다 (현재 {current}개)",
    starsMet: "{current}개 스타가 {threshold}+ 임계값을 충족합니다",
    subjective: "주관적 기준은 자동 확인할 수 없습니다",
    usageRestriction: "사용 제한은 자동 확인할 수 없습니다",
  },
  stars: "스타",
  time: {
    daysAgo: "{days}일 전",
    monthsAgo: "{months}개월 전",
    today: "오늘",
    yearsAgo: "{years}년 전",
    yesterday: "어제",
  },
};

export default check;
export type { CheckTranslations } from "../en/check";
