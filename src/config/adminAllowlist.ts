export const getAdminAllowlist = (): string[] => {
  const raw = import.meta.env.VITE_ADMIN_UIDS ?? '';
  return raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
};
