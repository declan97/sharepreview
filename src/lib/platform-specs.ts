export interface PlatformSpec {
  name: string;
  id: string;
  titleMaxLength: number;
  descriptionMaxLength: number;
  imageWidth: number;
  imageHeight: number;
  imageRatio: string;
  imageMinWidth?: number;
  imageMinHeight?: number;
  imageMaxSize?: number; // in bytes
  supportedFormats: string[];
  colors: {
    bg: string;
    card: string;
    text: string;
    link: string;
    border: string;
  };
}

export const platformSpecs: Record<string, PlatformSpec> = {
  facebook: {
    name: "Facebook",
    id: "facebook",
    titleMaxLength: 60,
    descriptionMaxLength: 65,
    imageWidth: 1200,
    imageHeight: 630,
    imageRatio: "1.91:1",
    imageMinWidth: 600,
    imageMinHeight: 315,
    imageMaxSize: 8 * 1024 * 1024, // 8MB
    supportedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
    colors: {
      bg: "#f0f2f5",
      card: "#ffffff",
      text: "#050505",
      link: "#1877f2",
      border: "#dddfe2",
    },
  },
  twitter: {
    name: "Twitter / X",
    id: "twitter",
    titleMaxLength: 70,
    descriptionMaxLength: 200,
    imageWidth: 1200,
    imageHeight: 628,
    imageRatio: "1.91:1",
    imageMinWidth: 300,
    imageMinHeight: 157,
    imageMaxSize: 5 * 1024 * 1024, // 5MB
    supportedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
    colors: {
      bg: "#000000",
      card: "#16181c",
      text: "#e7e9ea",
      link: "#1d9bf0",
      border: "#2f3336",
    },
  },
  linkedin: {
    name: "LinkedIn",
    id: "linkedin",
    titleMaxLength: 70,
    descriptionMaxLength: 100,
    imageWidth: 1200,
    imageHeight: 627,
    imageRatio: "1.91:1",
    imageMinWidth: 1200,
    imageMinHeight: 627,
    imageMaxSize: 5 * 1024 * 1024, // 5MB
    supportedFormats: ["jpg", "jpeg", "png"],
    colors: {
      bg: "#f3f2ef",
      card: "#ffffff",
      text: "#000000",
      link: "#0a66c2",
      border: "#e0e0e0",
    },
  },
  discord: {
    name: "Discord",
    id: "discord",
    titleMaxLength: 256,
    descriptionMaxLength: 350,
    imageWidth: 1200,
    imageHeight: 630,
    imageRatio: "1.91:1",
    imageMinWidth: 300,
    imageMinHeight: 157,
    supportedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
    colors: {
      bg: "#313338",
      card: "#2b2d31",
      text: "#dbdee1",
      link: "#00a8fc",
      border: "#1e1f22",
    },
  },
  slack: {
    name: "Slack",
    id: "slack",
    titleMaxLength: 70,
    descriptionMaxLength: 150,
    imageWidth: 1200,
    imageHeight: 630,
    imageRatio: "1.91:1",
    imageMinWidth: 250,
    imageMinHeight: 125,
    supportedFormats: ["jpg", "jpeg", "png", "gif"],
    colors: {
      bg: "#1a1d21",
      card: "#222529",
      text: "#d1d2d3",
      link: "#1264a3",
      border: "#35373b",
    },
  },
};

export const defaultPlatformOrder = ["facebook", "twitter", "linkedin", "discord"];

export function getPlatformSpec(platform: string): PlatformSpec | undefined {
  return platformSpecs[platform.toLowerCase()];
}

export function getAllPlatforms(): PlatformSpec[] {
  return defaultPlatformOrder.map((id) => platformSpecs[id]);
}
