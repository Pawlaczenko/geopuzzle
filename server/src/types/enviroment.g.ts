
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number,
      NODE_ENV: 'development' | 'production',
      DB_URL: string,
      DB_PASS: string,
      TRACK_DEFAULT_THUMBNAIL:string,
      TRACK_THUMBNAILS_FOLDER: string
    }
  }
}
export {};
