import { createClient } from 'microcms-js-sdk';

// Initialize the client with environment variables
// Users will need to set these in a .env file
export const client = createClient({
    serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN || 'YOUR_DOMAIN',
    apiKey: import.meta.env.VITE_MICROCMS_API_KEY || 'YOUR_API_KEY',
});

// Type definitions for Blog and News
export type Blog = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    content: string;
    eyecatch?: {
        url: string;
        height: number;
        width: number;
    };
    category?: {
        id: string;
        name: string;
    };
};

export type News = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    content: string; // HTML content or could be just text depending on schema
    category?: {
        id: string;
        name: string;
    };
};
