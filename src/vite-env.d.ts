/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MICROCMS_SERVICE_DOMAIN: string
    readonly VITE_MICROCMS_API_KEY: string
    readonly VITE_EMAILJS_SERVICE_ID: string
    readonly VITE_EMAILJS_TEMPLATE_ID: string
    readonly VITE_EMAILJS_PUBLIC_KEY: string
    readonly VITE_RECAPTCHA_SITE_KEY: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}
declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
