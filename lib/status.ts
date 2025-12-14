export const STATUS_MAP = {
  building: "Building",
  learning: "Learning",
  writing: "Writing",
  exploring: "Exploring",
  focus: "Focus",
  offline: "Offline",
} as const;

export type StatusKey = keyof typeof STATUS_MAP;
