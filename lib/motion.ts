// Shared physics so every interaction on the site feels like the same material
export const spring = { type: "spring", stiffness: 100, damping: 20 } as const;
export const snappy = { type: "spring", stiffness: 300, damping: 22 } as const;
