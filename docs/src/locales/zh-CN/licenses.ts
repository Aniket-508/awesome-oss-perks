const licenses = {
  nav: "许可证",
  listing: {
    accepted: "{count} 个接受",
    breadcrumb: "许可证",
    checkCta: "检查你的仓库",
    heading: "按许可证划分的开源福利",
    includes: "包含",
    intro:
      "许可证几乎是每个福利项目的第一道门槛。以下是各类许可证在 {count} 个项目中可以解锁的内容。",
    rejected: "{count} 个拒绝",
    unspecified: "{count} 个未说明",
  },
  detail: {
    acceptedHeading: "{count} 个项目接受",
    breadcrumb: "许可证",
    checkCta: "检查你的仓库",
    checkCtaIntro:
      "许可证只是其中一道门槛。星标数、活跃度和商业用途也是门槛——用全部 {count} 个项目检查你的仓库。",
    rejectedOsiHeading: "{count} 个项目拒绝——要求 OSI 批准的许可证",
    rejectedOsiIntro:
      "这些项目要求使用经 Open Source Initiative 批准的许可证。此类许可证不符合条件。",
    rejectedPermissiveHeading:
      "{count} 个项目拒绝——要求宽松型许可证",
    rejectedPermissiveIntro:
      "这些项目只接受 MIT、Apache-2.0、BSD 和 ISC 等宽松型许可证。",
    spdxHeading: "此类别中的许可证",
    summary:
      "{accepted} 个接受 · {rejected} 个拒绝 · {unspecified} 个未提出许可证要求",
    unspecifiedHeading: "未提出许可证要求：{count} 个项目",
    unspecifiedIntro:
      "这些项目在资格规则中从未提及许可证。仍然值得申请——是否通过由提供方自行决定。",
  },
  families: {
    copyleft: {
      advice:
        "Copyleft 许可证经 OSI 批准，因此几乎所有项目都接受。只有明确要求宽松型许可证的项目才会拒绝。AGPL-3.0 属于这一类：它能通过自动化的 OSI 检查，但由于网络使用条款，部分提供方会人工审核。",
      heading: "面向 GPL 与 AGPL 项目的开源福利",
      metaDescription:
        "在 {total} 个开源福利项目中，有 {accepted} 个接受 GPL-3.0、AGPL-3.0 和 MPL-2.0 等 copyleft 许可证。看看哪些项目会拒绝，以及原因。",
      metaTitle: "Copyleft 许可证——哪些开源福利接受 GPL 与 AGPL",
      name: "Copyleft",
      tagline:
        "GPL、AGPL、LGPL、MPL 和 EPL 经 OSI 批准，但并非宽松型许可证。",
    },
    permissive: {
      advice:
        "宽松型许可证可以通过目录中的所有许可证门槛。如果项目仍然拒绝你，原因在于星标数、活跃度或商业用途，而不是许可证。",
      heading: "面向 MIT 与 Apache 许可项目的开源福利",
      metaDescription:
        "在 {total} 个开源福利项目中，有 {accepted} 个接受 MIT、Apache-2.0 和 BSD-3-Clause 等宽松型许可证——多于其他任何许可证类别。",
      metaTitle: "宽松型许可证——MIT 与 Apache 项目的开源福利",
      name: "宽松型",
      tagline:
        "MIT、Apache-2.0、BSD 和 ISC 对再分发不附加任何条件。",
    },
    "source-available": {
      advice:
        "BUSL、SSPL、Elastic 和 FSL 属于源码可见，而非开源：Open Source Initiative 并未批准它们。它们几乎无法通过任何项目的许可证门槛。为项目重新授权许可，或对经 OSI 批准的核心采用双重许可，是唯一的出路。",
      heading: "面向 BUSL、SSPL 等源码可见项目的开源福利",
      metaDescription:
        "BUSL-1.1、SSPL-1.0 和 Elastic-2.0 等源码可见许可证未经 OSI 批准，因此 {total} 个福利项目中有 {rejected} 个会拒绝。以下是剩余的选择。",
      metaTitle: "源码可见许可证——开源福利接受 BUSL 与 SSPL 吗？",
      name: "源码可见",
      tagline:
        "BUSL、SSPL、Elastic 和 FSL 公开源代码，但未经 OSI 批准。",
    },
    unlicensed: {
      metaTitle: "没有 LICENSE 文件 — 权益计划为何拒绝你的仓库",
      advice:
        "没有 LICENSE 文件的仓库默认属于专有软件，因此会在所有许可证门槛上失败。申请之前，添加一个经 OSI 批准的 LICENSE 文件是价值最高的一步改动。",
      heading: "面向无许可证文件仓库的开源福利",
      metaDescription:
        "没有 LICENSE 文件的仓库默认属于专有软件：{total} 个福利项目中有 {rejected} 个会直接拒绝。添加一个经 OSI 批准的许可证，只需一次提交即可解决。",
      name: "无许可证",
      tagline: "没有 LICENSE 文件的仓库不向任何人授予任何权利。",
    },
  },
} as const;

export type LicensesTranslations = typeof licenses;
export default licenses;
