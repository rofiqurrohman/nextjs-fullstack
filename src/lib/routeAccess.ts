type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)": ["ADMIN"],
  "/student(.*)": ["STUDENT"],
  "/teacher(.*)": ["TEACHER"],
  "/parent(.*)": ["PARENT"],
};

export const ROOT = '/';
export const PUBLIC_ROUTES = ['/login', '/register'];
export const DEFAULT_REDIRECT = '/dashboard';
export const SIGN_IN = '/login';
export const SIGN_UP = '/register';