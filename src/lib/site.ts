// ========================================
// SMHC — SITE CONFIGURATION
// ========================================

export const SITE_URL = "https://stephanymanzano.com";

// ========================================
// DEPLOYMENT ENVIRONMENT
// ========================================

const vercelEnvironment = process.env.VERCEL_ENV;

export const isPublicDeployment =
  vercelEnvironment !== undefined
    ? vercelEnvironment === "production"
    : process.env.NODE_ENV === "production";
