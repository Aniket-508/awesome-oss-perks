const licenses = {
  nav: "ライセンス",
  listing: {
    accepted: "{count} 件が対象",
    breadcrumb: "ライセンス",
    checkCta: "リポジトリをチェック",
    heading: "ライセンス別のオープンソース特典",
    includes: "含まれるもの",
    intro:
      "ほぼすべての特典プログラムで、ライセンスが最初の関門になります。{count} 件のプログラムで各ライセンスファミリーが何を解放するのかをまとめました。",
    rejected: "{count} 件が対象外",
    unspecified: "{count} 件が指定なし",
  },
  detail: {
    acceptedHeading: "{count} 件のプログラムが対象",
    breadcrumb: "ライセンス",
    checkCta: "リポジトリをチェック",
    checkCtaIntro:
      "ライセンスは関門のひとつにすぎません。スター数、活動状況、商用利用なども条件になります。{count} 件すべてのプログラムでリポジトリを確認しましょう。",
    rejectedOsiHeading: "{count} 件のプログラムが対象外 — OSI 承認ライセンスが必要",
    rejectedOsiIntro:
      "これらのプログラムは Open Source Initiative が承認したライセンスを必要とします。このファミリーは条件を満たしません。",
    rejectedPermissiveHeading:
      "{count} 件のプログラムが対象外 — パーミッシブライセンスが必要",
    rejectedPermissiveIntro:
      "これらのプログラムは MIT、Apache-2.0、BSD、ISC などのパーミッシブライセンスのみを受け付けます。",
    spdxHeading: "このファミリーに含まれるライセンス",
    summary:
      "{accepted} 件が対象 · {rejected} 件が対象外 · {unspecified} 件はライセンス要件なし",
    unspecifiedHeading: "ライセンス要件の記載なし: {count} 件のプログラム",
    unspecifiedIntro:
      "これらのプログラムは応募条件でライセンスに一切触れていません。承認は提供元の裁量によりますが、応募する価値は十分にあります。",
  },
  families: {
    copyleft: {
      advice:
        "コピーレフトライセンスは OSI 承認済みのため、ほぼすべてのプログラムが受け入れます。明示的にパーミッシブライセンスを要求するプログラムだけが対象外とします。AGPL-3.0 もこのグループに含まれ、自動的な OSI チェックは通過しますが、ネットワーク利用条項のため手動審査を行う提供元もあります。",
      heading: "GPL・AGPL プロジェクト向けのオープンソース特典",
      metaDescription:
        "{total} 件中 {accepted} 件のオープンソース特典プログラムが GPL-3.0、AGPL-3.0、MPL-2.0 などのコピーレフトライセンスを受け入れています。対象外となるプログラムとその理由も確認できます。",
      metaTitle: "コピーレフトライセンス — GPL・AGPL で使える特典",
      name: "コピーレフト",
      tagline:
        "GPL、AGPL、LGPL、MPL、EPL は OSI 承認済みですが、パーミッシブではありません。",
    },
    permissive: {
      advice:
        "パーミッシブライセンスはカタログ内のすべてのライセンス要件を満たします。それでも通らない場合の原因は、スター数、活動状況、商用利用であり、ライセンスではありません。",
      heading: "MIT・Apache ライセンスのプロジェクト向けオープンソース特典",
      metaDescription:
        "{total} 件中 {accepted} 件のオープンソース特典プログラムが MIT、Apache-2.0、BSD-3-Clause などのパーミッシブライセンスを受け入れており、他のどのライセンスファミリーよりも多い結果です。",
      metaTitle: "パーミッシブライセンス — MIT・Apache 向けの特典",
      name: "パーミッシブ",
      tagline:
        "MIT、Apache-2.0、BSD、ISC は再配布に条件を課しません。",
    },
    "source-available": {
      advice:
        "BUSL、SSPL、Elastic、FSL はソース公開型であり、オープンソースではありません。Open Source Initiative の承認を受けていないため、ほぼすべてのプログラムのライセンス要件を満たしません。プロジェクトのライセンス変更、または OSI 承認済みコアとのデュアルライセンス化が唯一の道です。",
      heading: "BUSL・SSPL などソース公開型プロジェクト向けのオープンソース特典",
      metaDescription:
        "BUSL-1.1、SSPL-1.0、Elastic-2.0 などのソース公開型ライセンスは OSI 承認を受けていないため、{total} 件中 {rejected} 件の特典プログラムが対象外としています。残る選択肢を紹介します。",
      metaTitle: "ソース公開型ライセンス — BUSL・SSPL は特典対象か",
      name: "ソース公開型",
      tagline:
        "BUSL、SSPL、Elastic、FSL はソースコードを公開しますが OSI 承認ではありません。",
    },
    unlicensed: {
      metaTitle: "LICENSE ファイルなし — 特典プログラムに拒否される理由",
      advice:
        "LICENSE ファイルのないリポジトリは既定でプロプライエタリ扱いとなり、すべてのライセンス要件を満たしません。OSI 承認の LICENSE ファイルを追加することが、応募前にできる最も効果の高い改善です。",
      heading: "ライセンスファイルのないリポジトリ向けのオープンソース特典",
      metaDescription:
        "LICENSE ファイルのないリポジトリは既定でプロプライエタリ扱いとなり、{total} 件中 {rejected} 件の特典プログラムが即座に対象外とします。OSI 承認ライセンスの追加はコミット 1 回で解決します。",
      name: "ライセンスなし",
      tagline: "LICENSE ファイルのないリポジトリは誰にも権利を与えません。",
    },
  },
} as const;

export type LicensesTranslations = typeof licenses;
export default licenses;
