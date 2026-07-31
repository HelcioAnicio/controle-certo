module.exports = [
"[externals]/pg [external] (pg, esm_import, [project]/node_modules/.pnpm/pg@8.22.0/node_modules/pg)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg-4c0d8067d674414d");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/pg/lib/result.js [external] (pg/lib/result.js, cjs, [project]/node_modules/.pnpm/pg@8.22.0/node_modules/pg)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("pg-4c0d8067d674414d/lib/result.js", () => require("pg-4c0d8067d674414d/lib/result.js"));

module.exports = mod;
}),
"[externals]/pg/lib/utils.js [external] (pg/lib/utils.js, cjs, [project]/node_modules/.pnpm/pg@8.22.0/node_modules/pg)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("pg-4c0d8067d674414d/lib/utils.js", () => require("pg-4c0d8067d674414d/lib/utils.js"));

module.exports = mod;
}),
];