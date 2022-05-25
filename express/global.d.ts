export namespace NodeJS {
    interface ProcessEnv {
    SECRET_KEY: string;
      PORT: string;
      MONGO_URI: string;
      BCRYPT_NUM:string;
    }
  }

declare module '*.html';