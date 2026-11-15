/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY: string;
  readonly VITE_RESUME_ACCESS_CODE?: string;
  readonly VITE_RESUME_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.pdf' {
  const src: string;
  export default src;
}

