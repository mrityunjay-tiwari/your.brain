export type WebsiteDefinition = {
  id: string;               // internal stable id
  displayName: string;      // shown to user
  domains: string[];        // hostname matches
  icon?: string;            // optional
};

export const websiteCollection: readonly WebsiteDefinition[] = [
  {
    id: "youtube",
    displayName: "YouTube",
    domains: ["youtube.com", "youtu.be"],
    icon: "youtube",
  },
  {
    id: "x",
    displayName: "X",
    domains: ["x.com", "twitter.com"],
    icon: "x",
  },
  {
    id: "google-drive",
    displayName: "Google Drive",
    domains: ["drive.google.com"],
    icon: "google-drive",
  },
  {
    id: "github",
    displayName: "GitHub",
    domains: ["github.com"],
    icon: "github",
  },
  {
    id: "medium",
    displayName: "Medium",
    domains: ["medium.com"],
    icon: "medium",
  },
  {
    id: "medium",
    displayName: "Medium",
    domains: ["medium.com"],
    icon: "medium",
  },
] as const;