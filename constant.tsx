const IS_PRODUCTION = process.env.NODE_ENV === "production";
const BACKEND_ENDPOINT = IS_PRODUCTION
  ? "http://3.16.58.104:5000"
  : "http://localhost:5000";

export { BACKEND_ENDPOINT, IS_PRODUCTION };