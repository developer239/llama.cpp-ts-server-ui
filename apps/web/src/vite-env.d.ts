/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// eslint-disable-next-line
interface Window {
  ENV: {
    VITE_SERVER_URI: string
  }
}
