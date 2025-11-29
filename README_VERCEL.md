# Vercel Deployment Guide

This project has been refactored to use Vercel Serverless Functions.

## Prerequisites

1. **Node.js** (v18+)
2. **Vercel CLI**: Install globally with `npm i -g vercel`

## Running Locally

To run the full application (Frontend + API) locally, use the Vercel CLI:

```bash
vercel dev
```

This will start the development server at `http://localhost:3000`.

> **Note**: `npm run dev` will only start the frontend (Vite) and API calls will fail because the Express server has been replaced by serverless functions.

## Deployment

1. **Login to Vercel**:

    ```bash
    vercel login
    ```

2. **Deploy**:

    ```bash
    vercel
    ```

3. **Production Deploy**:

    ```bash
    vercel --prod
    ```

## Environment Variables

Ensure you have the following environment variables set in Vercel (Project Settings -> Environment Variables):

- `DATABASE_URL`: Your Supabase connection string (Transaction Pooler)
- `ADMIN_PASSWORD`: Password for admin login
- `JWT_SECRET`: A long random string for signing tokens
