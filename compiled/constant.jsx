"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IS_PRODUCTION = process.env.NODE_ENV === "production";
exports.IS_PRODUCTION = IS_PRODUCTION;
const BACKEND_ENDPOINT = IS_PRODUCTION
    ? "http://3.16.58.104:5000"
    : "http://localhost:5000";
exports.BACKEND_ENDPOINT = BACKEND_ENDPOINT;
