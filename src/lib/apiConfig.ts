const RAW_API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ||
  "http://localhost:5000/api";

const hasProtocol = (url: string) =>
  /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url);

const ensureProtocol = (url: string) =>
  hasProtocol(url) ? url : `https://${url}`;

const stripTrailingSlash = (url: string) => url.replace(/\/+$/, "");

export const API_BASE_URL = stripTrailingSlash(ensureProtocol(RAW_API_BASE_URL));

export const API_ORIGIN = stripTrailingSlash(
  API_BASE_URL.replace(/\/api\/?$/i, "")
);

export const toBackendAssetUrl = (imagePath?: string): string => {
  if (!imagePath) return "";
  if (!imagePath.startsWith("/uploads/")) return imagePath;
  return `${API_ORIGIN}${imagePath}`;
};
