export type DownloadOption = {
  /** The directory to which the repository will be downloaded. */
  dir?: string;
  /** If `true`, allows downloading into an existing directory. */
  force?: boolean;
  /** Authorization token for accessing private repositories. */
  auth: string;
};

export type DownloadResult = {
  /** The path where the repository was extracted. */
  source: string;
  /** The identifier of the downloaded repository. */
  dir: string;
};
