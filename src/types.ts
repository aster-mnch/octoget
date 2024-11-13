export type DownloadOption = {
  dir?: string;
  force?: boolean;
  auth?: string;
};

export type DownloadResult = {
  source: string;
  dir: string;
};
