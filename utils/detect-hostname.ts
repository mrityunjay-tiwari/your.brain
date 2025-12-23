import { websiteCollection, WebsiteDefinition } from "./website-collection";

const websites = [
"medium",
"facebook",
"instagram",
"x",
"khaosat",
"archdaily",
"hostinger",
"iframely",
"github",
"react-icons",
"lucide",
"prisma",
"google"
] as const;


// const websiteCollection = [
//     {
//         name: "youtube",
//         displayName: "YouTube",
//         icon: ""
//     },
//     {
//         name: "twitter",
//         displayName: "X",
//         icon: ""
//     },
//     {
//         name: "x",
//         displayName: "X",
//         icon: ""
//     },
//     {
//         name: "drive.google",
//         displayName: "Google Drive",
//         icon: ""
//     },
// ]

type Website = (typeof websites)[number];

const websiteSet: ReadonlySet<Website> = new Set(websites);

export function detectWebsite(url: string): Website | null {
  try {
    const hostname: string = new URL(url)
      .hostname
      .replace(/^www\./, "")
      .toLowerCase();

    const parts: string[] = hostname.split(".");

    for (const site of websiteSet) {
      if (parts.includes(site)) {
        return site;
      }
    }

    return null;
  } catch {
    return null;
  }
}


export function getWebsiteFromUrl(
  url: string
): WebsiteDefinition | null {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "").toLowerCase();

    return (
      websiteCollection.find(site =>
        site.domains.some(domain =>
          hostname === domain || hostname.endsWith(`.${domain}`)
        )
      ) ?? null
    );
  } catch {
    return null;
  }
}