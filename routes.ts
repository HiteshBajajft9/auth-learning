export const publicRoutes = ["/", "/auth/new-verification"];

//for authentication of not logged in user
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset-password",
  "/auth/new-password",
];

// these routes are which start with prefix and used for api authenitcation purposes
export const apiAuthPrefix = "/api/auth/";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
