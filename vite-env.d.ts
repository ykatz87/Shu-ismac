// FIX: Removed the problematic vite/client reference that was causing a "Cannot find type definition file" error.
// The project uses process.env.API_KEY for configuration, which is handled by the NodeJS.ProcessEnv declaration below.
interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}
