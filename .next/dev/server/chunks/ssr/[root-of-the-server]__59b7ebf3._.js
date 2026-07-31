module.exports = [
"[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$12$2e$4_$40$supabase$2b$supabase$2d$js$40$2$2e$111$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+ssr@0.12.4_@supabase+supabase-js@2.111.0/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$12$2e$4_$40$supabase$2b$supabase$2d$js$40$2$2e$111$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://coufskbbyjqgfinonrok.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_3pVfhFcVUCuQaTofM1xONQ_aPrAczNP"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    for (const { name, value, options } of cookiesToSet){
                        cookieStore.set(name, value, options);
                    }
                } catch  {
                // Called from a Server Component with no response to write to —
                // safe to ignore because middleware refreshes the session too.
                }
            }
        }
    });
}
}),
"[project]/src/lib/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUser",
    ()=>getUser,
    "requireUser",
    ()=>requireUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
;
;
;
const getUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
});
async function requireUser() {
    const user = await getUser();
    if (!user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/login");
    }
    return user;
}
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/prisma/contract.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"schemaVersion\":\"1\",\"targetFamily\":\"sql\",\"target\":\"postgres\",\"profileHash\":\"sha256:9c8aa3114e84ed3b7ea2bd57526d9c2e1bf7c5292be694e9d3801f566fda7ccb\",\"roots\":{\"Category\":{\"model\":\"Category\",\"namespace\":\"public\"},\"FixedExpense\":{\"model\":\"FixedExpense\",\"namespace\":\"public\"},\"Subcategory\":{\"model\":\"Subcategory\",\"namespace\":\"public\"},\"Transaction\":{\"model\":\"Transaction\",\"namespace\":\"public\"}},\"domain\":{\"namespaces\":{\"public\":{\"models\":{\"Category\":{\"fields\":{\"color\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/text@1\",\"kind\":\"scalar\"}},\"createdAt\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/timestamptz@1\",\"kind\":\"scalar\"}},\"icon\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/text@1\",\"kind\":\"scalar\"}},\"id\":{\"nullable\":false,\"type\":{\"codecId\":\"sql/char@1\",\"kind\":\"scalar\",\"typeParams\":{\"length\":36}}},\"name\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/text@1\",\"kind\":\"scalar\"}},\"updatedAt\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/timestamptz@1\",\"kind\":\"scalar\"}},\"userId\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/text@1\",\"kind\":\"scalar\"}}},\"relations\":{\"subcategories\":{\"cardinality\":\"1:N\",\"on\":{\"localFields\":[\"id\"],\"targetFields\":[\"categoryId\"]},\"to\":{\"model\":\"Subcategory\",\"namespace\":\"public\"}}},\"storage\":{\"fields\":{\"color\":{\"column\":\"color\"},\"createdAt\":{\"column\":\"createdAt\"},\"icon\":{\"column\":\"icon\"},\"id\":{\"column\":\"id\"},\"name\":{\"column\":\"name\"},\"updatedAt\":{\"column\":\"updatedAt\"},\"userId\":{\"column\":\"userId\"}},\"namespaceId\":\"public\",\"table\":\"Category\"}},\"FixedExpense\":{\"fields\":{\"active\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/bool@1\",\"kind\":\"scalar\"}},\"createdAt\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/timestamptz@1\",\"kind\":\"scalar\"}},\"dueDay\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/int4@1\",\"kind\":\"scalar\"}},\"estimatedAmount\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/numeric@1\",\"kind\":\"scalar\"}},\"id\":{\"nullable\":false,\"type\":{\"codecId\":\"sql/char@1\",\"kind\":\"scalar\",\"typeParams\":{\"length\":36}}},\"name\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/text@1\",\"kind\":\"scalar\"}},\"subcategoryId\":{\"nullable\":false,\"type\":{\"codecId\":\"sql/char@1\",\"kind\":\"scalar\",\"typeParams\":{\"length\":36}}},\"updatedAt\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/timestamptz@1\",\"kind\":\"scalar\"}},\"userId\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/text@1\",\"kind\":\"scalar\"}}},\"relations\":{\"subcategory\":{\"cardinality\":\"N:1\",\"on\":{\"localFields\":[\"subcategoryId\"],\"targetFields\":[\"id\"]},\"to\":{\"model\":\"Subcategory\",\"namespace\":\"public\"}},\"transactions\":{\"cardinality\":\"1:N\",\"on\":{\"localFields\":[\"id\"],\"targetFields\":[\"fixedExpenseId\"]},\"to\":{\"model\":\"Transaction\",\"namespace\":\"public\"}}},\"storage\":{\"fields\":{\"active\":{\"column\":\"active\"},\"createdAt\":{\"column\":\"createdAt\"},\"dueDay\":{\"column\":\"dueDay\"},\"estimatedAmount\":{\"column\":\"estimatedAmount\"},\"id\":{\"column\":\"id\"},\"name\":{\"column\":\"name\"},\"subcategoryId\":{\"column\":\"subcategoryId\"},\"updatedAt\":{\"column\":\"updatedAt\"},\"userId\":{\"column\":\"userId\"}},\"namespaceId\":\"public\",\"table\":\"FixedExpense\"}},\"Subcategory\":{\"fields\":{\"categoryId\":{\"nullable\":false,\"type\":{\"codecId\":\"sql/char@1\",\"kind\":\"scalar\",\"typeParams\":{\"length\":36}}},\"createdAt\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/timestamptz@1\",\"kind\":\"scalar\"}},\"icon\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/text@1\",\"kind\":\"scalar\"}},\"id\":{\"nullable\":false,\"type\":{\"codecId\":\"sql/char@1\",\"kind\":\"scalar\",\"typeParams\":{\"length\":36}}},\"name\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/text@1\",\"kind\":\"scalar\"}},\"type\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/text@1\",\"kind\":\"scalar\"}},\"updatedAt\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/timestamptz@1\",\"kind\":\"scalar\"}},\"userId\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/text@1\",\"kind\":\"scalar\"}}},\"relations\":{\"category\":{\"cardinality\":\"N:1\",\"on\":{\"localFields\":[\"categoryId\"],\"targetFields\":[\"id\"]},\"to\":{\"model\":\"Category\",\"namespace\":\"public\"}},\"fixedExpenses\":{\"cardinality\":\"1:N\",\"on\":{\"localFields\":[\"id\"],\"targetFields\":[\"subcategoryId\"]},\"to\":{\"model\":\"FixedExpense\",\"namespace\":\"public\"}},\"transactions\":{\"cardinality\":\"1:N\",\"on\":{\"localFields\":[\"id\"],\"targetFields\":[\"subcategoryId\"]},\"to\":{\"model\":\"Transaction\",\"namespace\":\"public\"}}},\"storage\":{\"fields\":{\"categoryId\":{\"column\":\"categoryId\"},\"createdAt\":{\"column\":\"createdAt\"},\"icon\":{\"column\":\"icon\"},\"id\":{\"column\":\"id\"},\"name\":{\"column\":\"name\"},\"type\":{\"column\":\"type\"},\"updatedAt\":{\"column\":\"updatedAt\"},\"userId\":{\"column\":\"userId\"}},\"namespaceId\":\"public\",\"table\":\"Subcategory\"}},\"Transaction\":{\"fields\":{\"amount\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/numeric@1\",\"kind\":\"scalar\"}},\"createdAt\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/timestamptz@1\",\"kind\":\"scalar\"}},\"description\":{\"nullable\":true,\"type\":{\"codecId\":\"pg/text@1\",\"kind\":\"scalar\"}},\"dueDate\":{\"nullable\":true,\"type\":{\"codecId\":\"pg/timestamptz@1\",\"kind\":\"scalar\"}},\"fixedExpenseId\":{\"nullable\":true,\"type\":{\"codecId\":\"sql/char@1\",\"kind\":\"scalar\",\"typeParams\":{\"length\":36}}},\"id\":{\"nullable\":false,\"type\":{\"codecId\":\"sql/char@1\",\"kind\":\"scalar\",\"typeParams\":{\"length\":36}}},\"isFixed\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/bool@1\",\"kind\":\"scalar\"}},\"paidAmount\":{\"nullable\":true,\"type\":{\"codecId\":\"pg/numeric@1\",\"kind\":\"scalar\"}},\"paidDate\":{\"nullable\":true,\"type\":{\"codecId\":\"pg/timestamptz@1\",\"kind\":\"scalar\"}},\"periodMonth\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/text@1\",\"kind\":\"scalar\"}},\"subcategoryId\":{\"nullable\":false,\"type\":{\"codecId\":\"sql/char@1\",\"kind\":\"scalar\",\"typeParams\":{\"length\":36}}},\"type\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/text@1\",\"kind\":\"scalar\"}},\"updatedAt\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/timestamptz@1\",\"kind\":\"scalar\"}},\"userId\":{\"nullable\":false,\"type\":{\"codecId\":\"pg/text@1\",\"kind\":\"scalar\"}}},\"relations\":{\"fixedExpense\":{\"cardinality\":\"N:1\",\"on\":{\"localFields\":[\"fixedExpenseId\"],\"targetFields\":[\"id\"]},\"to\":{\"model\":\"FixedExpense\",\"namespace\":\"public\"}},\"subcategory\":{\"cardinality\":\"N:1\",\"on\":{\"localFields\":[\"subcategoryId\"],\"targetFields\":[\"id\"]},\"to\":{\"model\":\"Subcategory\",\"namespace\":\"public\"}}},\"storage\":{\"fields\":{\"amount\":{\"column\":\"amount\"},\"createdAt\":{\"column\":\"createdAt\"},\"description\":{\"column\":\"description\"},\"dueDate\":{\"column\":\"dueDate\"},\"fixedExpenseId\":{\"column\":\"fixedExpenseId\"},\"id\":{\"column\":\"id\"},\"isFixed\":{\"column\":\"isFixed\"},\"paidAmount\":{\"column\":\"paidAmount\"},\"paidDate\":{\"column\":\"paidDate\"},\"periodMonth\":{\"column\":\"periodMonth\"},\"subcategoryId\":{\"column\":\"subcategoryId\"},\"type\":{\"column\":\"type\"},\"updatedAt\":{\"column\":\"updatedAt\"},\"userId\":{\"column\":\"userId\"}},\"namespaceId\":\"public\",\"table\":\"Transaction\"}}}}}},\"storage\":{\"namespaces\":{\"public\":{\"entries\":{\"rls\":{\"Category\":{\"kind\":\"rls\",\"namespaceId\":\"public\",\"tableName\":\"Category\"},\"FixedExpense\":{\"kind\":\"rls\",\"namespaceId\":\"public\",\"tableName\":\"FixedExpense\"},\"Subcategory\":{\"kind\":\"rls\",\"namespaceId\":\"public\",\"tableName\":\"Subcategory\"},\"Transaction\":{\"kind\":\"rls\",\"namespaceId\":\"public\",\"tableName\":\"Transaction\"}},\"table\":{\"Category\":{\"columns\":{\"color\":{\"codecId\":\"pg/text@1\",\"nativeType\":\"text\",\"nullable\":false},\"createdAt\":{\"codecId\":\"pg/timestamptz@1\",\"default\":{\"expression\":\"now()\",\"kind\":\"function\"},\"nativeType\":\"timestamptz\",\"nullable\":false},\"icon\":{\"codecId\":\"pg/text@1\",\"nativeType\":\"text\",\"nullable\":false},\"id\":{\"codecId\":\"sql/char@1\",\"nativeType\":\"character\",\"nullable\":false,\"typeParams\":{\"length\":36}},\"name\":{\"codecId\":\"pg/text@1\",\"nativeType\":\"text\",\"nullable\":false},\"updatedAt\":{\"codecId\":\"pg/timestamptz@1\",\"nativeType\":\"timestamptz\",\"nullable\":false},\"userId\":{\"codecId\":\"pg/text@1\",\"nativeType\":\"text\",\"nullable\":false}},\"foreignKeys\":[],\"indexes\":[],\"primaryKey\":{\"columns\":[\"id\"]},\"uniques\":[]},\"FixedExpense\":{\"columns\":{\"active\":{\"codecId\":\"pg/bool@1\",\"default\":{\"kind\":\"literal\",\"value\":true},\"nativeType\":\"bool\",\"nullable\":false},\"createdAt\":{\"codecId\":\"pg/timestamptz@1\",\"default\":{\"expression\":\"now()\",\"kind\":\"function\"},\"nativeType\":\"timestamptz\",\"nullable\":false},\"dueDay\":{\"codecId\":\"pg/int4@1\",\"nativeType\":\"int4\",\"nullable\":false},\"estimatedAmount\":{\"codecId\":\"pg/numeric@1\",\"nativeType\":\"numeric\",\"nullable\":false},\"id\":{\"codecId\":\"sql/char@1\",\"nativeType\":\"character\",\"nullable\":false,\"typeParams\":{\"length\":36}},\"name\":{\"codecId\":\"pg/text@1\",\"nativeType\":\"text\",\"nullable\":false},\"subcategoryId\":{\"codecId\":\"sql/char@1\",\"nativeType\":\"character\",\"nullable\":false,\"typeParams\":{\"length\":36}},\"updatedAt\":{\"codecId\":\"pg/timestamptz@1\",\"nativeType\":\"timestamptz\",\"nullable\":false},\"userId\":{\"codecId\":\"pg/text@1\",\"nativeType\":\"text\",\"nullable\":false}},\"foreignKeys\":[],\"indexes\":[],\"primaryKey\":{\"columns\":[\"id\"]},\"uniques\":[]},\"Subcategory\":{\"columns\":{\"categoryId\":{\"codecId\":\"sql/char@1\",\"nativeType\":\"character\",\"nullable\":false,\"typeParams\":{\"length\":36}},\"createdAt\":{\"codecId\":\"pg/timestamptz@1\",\"default\":{\"expression\":\"now()\",\"kind\":\"function\"},\"nativeType\":\"timestamptz\",\"nullable\":false},\"icon\":{\"codecId\":\"pg/text@1\",\"nativeType\":\"text\",\"nullable\":false},\"id\":{\"codecId\":\"sql/char@1\",\"nativeType\":\"character\",\"nullable\":false,\"typeParams\":{\"length\":36}},\"name\":{\"codecId\":\"pg/text@1\",\"nativeType\":\"text\",\"nullable\":false},\"type\":{\"codecId\":\"pg/text@1\",\"nativeType\":\"text\",\"nullable\":false},\"updatedAt\":{\"codecId\":\"pg/timestamptz@1\",\"nativeType\":\"timestamptz\",\"nullable\":false},\"userId\":{\"codecId\":\"pg/text@1\",\"nativeType\":\"text\",\"nullable\":false}},\"foreignKeys\":[],\"indexes\":[],\"primaryKey\":{\"columns\":[\"id\"]},\"uniques\":[]},\"Transaction\":{\"columns\":{\"amount\":{\"codecId\":\"pg/numeric@1\",\"nativeType\":\"numeric\",\"nullable\":false},\"createdAt\":{\"codecId\":\"pg/timestamptz@1\",\"default\":{\"expression\":\"now()\",\"kind\":\"function\"},\"nativeType\":\"timestamptz\",\"nullable\":false},\"description\":{\"codecId\":\"pg/text@1\",\"nativeType\":\"text\",\"nullable\":true},\"dueDate\":{\"codecId\":\"pg/timestamptz@1\",\"nativeType\":\"timestamptz\",\"nullable\":true},\"fixedExpenseId\":{\"codecId\":\"sql/char@1\",\"nativeType\":\"character\",\"nullable\":true,\"typeParams\":{\"length\":36}},\"id\":{\"codecId\":\"sql/char@1\",\"nativeType\":\"character\",\"nullable\":false,\"typeParams\":{\"length\":36}},\"isFixed\":{\"codecId\":\"pg/bool@1\",\"default\":{\"kind\":\"literal\",\"value\":false},\"nativeType\":\"bool\",\"nullable\":false},\"paidAmount\":{\"codecId\":\"pg/numeric@1\",\"nativeType\":\"numeric\",\"nullable\":true},\"paidDate\":{\"codecId\":\"pg/timestamptz@1\",\"nativeType\":\"timestamptz\",\"nullable\":true},\"periodMonth\":{\"codecId\":\"pg/text@1\",\"nativeType\":\"text\",\"nullable\":false},\"subcategoryId\":{\"codecId\":\"sql/char@1\",\"nativeType\":\"character\",\"nullable\":false,\"typeParams\":{\"length\":36}},\"type\":{\"codecId\":\"pg/text@1\",\"nativeType\":\"text\",\"nullable\":false},\"updatedAt\":{\"codecId\":\"pg/timestamptz@1\",\"nativeType\":\"timestamptz\",\"nullable\":false},\"userId\":{\"codecId\":\"pg/text@1\",\"nativeType\":\"text\",\"nullable\":false}},\"foreignKeys\":[{\"onDelete\":\"setNull\",\"source\":{\"columns\":[\"fixedExpenseId\"],\"namespaceId\":\"public\",\"tableName\":\"Transaction\"},\"target\":{\"columns\":[\"id\"],\"namespaceId\":\"public\",\"tableName\":\"FixedExpense\"}}],\"indexes\":[{\"columns\":[\"fixedExpenseId\"],\"name\":\"Transaction_fixedExpenseId_idx\"}],\"primaryKey\":{\"columns\":[\"id\"]},\"uniques\":[]}}},\"id\":\"public\",\"kind\":\"postgres-schema\"}},\"storageHash\":\"sha256:28e1cbbe5080a2ba4e2d8ea6d0079b2423163cea34adabeb39bdb55cf3ab46dd\"},\"execution\":{\"executionHash\":\"sha256:db8efae7cc2755e7d80a16177e0b049857741e15b640dd522efb3b9f6a6066af\",\"mutations\":{\"defaults\":[{\"onCreate\":{\"id\":\"uuidv7\",\"kind\":\"generator\"},\"ref\":{\"column\":\"id\",\"namespace\":\"public\",\"table\":\"Category\"}},{\"onCreate\":{\"id\":\"timestampNow\",\"kind\":\"generator\"},\"onUpdate\":{\"id\":\"timestampNow\",\"kind\":\"generator\"},\"ref\":{\"column\":\"updatedAt\",\"namespace\":\"public\",\"table\":\"Category\"}},{\"onCreate\":{\"id\":\"uuidv7\",\"kind\":\"generator\"},\"ref\":{\"column\":\"id\",\"namespace\":\"public\",\"table\":\"FixedExpense\"}},{\"onCreate\":{\"id\":\"timestampNow\",\"kind\":\"generator\"},\"onUpdate\":{\"id\":\"timestampNow\",\"kind\":\"generator\"},\"ref\":{\"column\":\"updatedAt\",\"namespace\":\"public\",\"table\":\"FixedExpense\"}},{\"onCreate\":{\"id\":\"uuidv7\",\"kind\":\"generator\"},\"ref\":{\"column\":\"id\",\"namespace\":\"public\",\"table\":\"Subcategory\"}},{\"onCreate\":{\"id\":\"timestampNow\",\"kind\":\"generator\"},\"onUpdate\":{\"id\":\"timestampNow\",\"kind\":\"generator\"},\"ref\":{\"column\":\"updatedAt\",\"namespace\":\"public\",\"table\":\"Subcategory\"}},{\"onCreate\":{\"id\":\"uuidv7\",\"kind\":\"generator\"},\"ref\":{\"column\":\"id\",\"namespace\":\"public\",\"table\":\"Transaction\"}},{\"onCreate\":{\"id\":\"timestampNow\",\"kind\":\"generator\"},\"onUpdate\":{\"id\":\"timestampNow\",\"kind\":\"generator\"},\"ref\":{\"column\":\"updatedAt\",\"namespace\":\"public\",\"table\":\"Transaction\"}}]}},\"capabilities\":{\"postgres\":{\"distinctOn\":true,\"jsonAgg\":true,\"lateral\":true,\"limit\":true,\"orderBy\":true,\"returning\":true},\"sql\":{\"defaultInInsert\":true,\"enums\":true,\"lateral\":true,\"returning\":true,\"scalarList\":true}},\"extensionPacks\":{},\"meta\":{},\"_generated\":{\"warning\":\"⚠️  GENERATED FILE - DO NOT EDIT\",\"message\":\"This file is automatically generated by \\\"prisma-next contract emit\\\".\",\"regenerate\":\"To regenerate, run: prisma-next contract emit\"}}"));}),
"[project]/src/prisma/db.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$prisma$2d$next$2b$postgres$40$0$2e$16$2e$0_typanion$40$3$2e$14$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$prisma$2d$next$2f$postgres$2f$dist$2f$runtime$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@prisma-next+postgres@0.16.0_typanion@3.14.0_typescript@5.9.3/node_modules/@prisma-next/postgres/dist/runtime.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$contract$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/prisma/contract.json (json)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$prisma$2d$next$2b$postgres$40$0$2e$16$2e$0_typanion$40$3$2e$14$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$prisma$2d$next$2f$postgres$2f$dist$2f$runtime$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$prisma$2d$next$2b$postgres$40$0$2e$16$2e$0_typanion$40$3$2e$14$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$prisma$2d$next$2f$postgres$2f$dist$2f$runtime$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$prisma$2d$next$2b$postgres$40$0$2e$16$2e$0_typanion$40$3$2e$14$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$prisma$2d$next$2f$postgres$2f$dist$2f$runtime$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])({
    contractJson: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$contract$2e$json__$28$json$29$__["default"],
    url: process.env['DATABASE_URL']
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/finance.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COLOR_SWATCHES",
    ()=>COLOR_SWATCHES,
    "DEFAULT_CATEGORIES",
    ()=>DEFAULT_CATEGORIES,
    "DEFAULT_SUBCATEGORIES",
    ()=>DEFAULT_SUBCATEGORIES,
    "ICON_SWATCHES",
    ()=>ICON_SWATCHES,
    "STATUS_META",
    ()=>STATUS_META,
    "addMonths",
    ()=>addMonths,
    "buildSubcategoryOptions",
    ()=>buildSubcategoryOptions,
    "computeStatus",
    ()=>computeStatus,
    "dateOnly",
    ()=>dateOnly,
    "dueDateForPeriod",
    ()=>dueDateForPeriod,
    "formatBRL",
    ()=>formatBRL,
    "periodKey",
    ()=>periodKey,
    "periodLabel",
    ()=>periodLabel
]);
const STATUS_META = {
    pending: {
        label: "Pendente",
        color: "#F59E0B",
        bg: "#FEF3C7"
    },
    scheduled: {
        label: "Agendado",
        color: "#3B82F6",
        bg: "#DBEAFE"
    },
    due: {
        label: "Vence hoje",
        color: "#D97706",
        bg: "#FEF3C7"
    },
    paid: {
        label: "Pago",
        color: "#10B981",
        bg: "#D1FAE5"
    },
    overdue: {
        label: "Atrasado",
        color: "#EF4444",
        bg: "#FEE2E2"
    }
};
function formatBRL(value) {
    const n = Number(value) || 0;
    return (n < 0 ? "-" : "") + "R$ " + Math.abs(n).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
function dateOnly(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}
function computeStatus(tx, today = new Date()) {
    if (tx.paidDate) return "paid";
    if (!tx.dueDate) return "pending";
    const due = dateOnly(tx.dueDate);
    const now = dateOnly(today);
    if (due < now) return "overdue";
    if (due === now) return "due";
    return "scheduled";
}
function periodKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function periodLabel(period) {
    const [y, m] = period.split("-").map(Number);
    const date = new Date(y, m - 1, 1);
    const label = date.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric"
    });
    return label.charAt(0).toUpperCase() + label.slice(1);
}
function addMonths(period, delta) {
    const [y, m] = period.split("-").map(Number);
    const date = new Date(y, m - 1 + delta, 1);
    return periodKey(date);
}
function dueDateForPeriod(period, dueDay) {
    const [y, m] = period.split("-").map(Number);
    const lastDay = new Date(y, m, 0).getDate();
    return new Date(y, m - 1, Math.min(dueDay, lastDay));
}
const DEFAULT_CATEGORIES = [
    {
        key: "geral",
        name: "Geral",
        color: "#64748B",
        icon: "folder"
    },
    {
        key: "basica",
        name: "Despesa Básica",
        color: "#2563EB",
        icon: "home"
    },
    {
        key: "lazer",
        name: "Lazer",
        color: "#DB2777",
        icon: "party"
    },
    {
        key: "invest",
        name: "Investimento",
        color: "#0D9488",
        icon: "trending"
    },
    {
        key: "estudo",
        name: "Estudo",
        color: "#7C3AED",
        icon: "book"
    }
];
const DEFAULT_SUBCATEGORIES = [
    {
        key: "salario",
        categoryKey: "geral",
        name: "Salário",
        type: "income",
        icon: "cash"
    },
    {
        key: "freelance",
        categoryKey: "geral",
        name: "Freelance",
        type: "income",
        icon: "briefcase"
    },
    {
        key: "outros",
        categoryKey: "geral",
        name: "Outros",
        type: "expense",
        icon: "folder"
    },
    {
        key: "presentes",
        categoryKey: "geral",
        name: "Presentes",
        type: "expense",
        icon: "gift"
    },
    {
        key: "supermercado",
        categoryKey: "basica",
        name: "Supermercado",
        type: "expense",
        icon: "cart"
    },
    {
        key: "agua",
        categoryKey: "basica",
        name: "Conta de Água",
        type: "expense",
        icon: "water"
    },
    {
        key: "luz",
        categoryKey: "basica",
        name: "Conta de Luz",
        type: "expense",
        icon: "bulb"
    },
    {
        key: "condominio",
        categoryKey: "basica",
        name: "Condomínio",
        type: "expense",
        icon: "building"
    },
    {
        key: "aluguel",
        categoryKey: "basica",
        name: "Aluguel",
        type: "expense",
        icon: "home"
    },
    {
        key: "internet",
        categoryKey: "basica",
        name: "Internet",
        type: "expense",
        icon: "wifi"
    },
    {
        key: "restaurantes",
        categoryKey: "lazer",
        name: "Restaurantes",
        type: "expense",
        icon: "food"
    },
    {
        key: "streaming",
        categoryKey: "lazer",
        name: "Streaming",
        type: "expense",
        icon: "movie"
    },
    {
        key: "viagem",
        categoryKey: "lazer",
        name: "Viagem",
        type: "expense",
        icon: "plane"
    },
    {
        key: "reserva",
        categoryKey: "invest",
        name: "Reserva de Emergência",
        type: "expense",
        icon: "piggy"
    },
    {
        key: "acoes",
        categoryKey: "invest",
        name: "Ações",
        type: "expense",
        icon: "chart"
    },
    {
        key: "cursos",
        categoryKey: "estudo",
        name: "Cursos",
        type: "expense",
        icon: "graduation"
    },
    {
        key: "livros",
        categoryKey: "estudo",
        name: "Livros",
        type: "expense",
        icon: "book"
    }
];
function buildSubcategoryOptions(categories, subcategories, filter) {
    const categoryOrder = new Map(categories.map((c, i)=>[
            c.id,
            i
        ]));
    const catNameById = new Map(categories.map((c)=>[
            c.id,
            c.name
        ]));
    return subcategories.filter((s)=>!filter || filter(s)).slice().sort((a, b)=>{
        const ao = categoryOrder.get(a.categoryId) ?? Number.MAX_SAFE_INTEGER;
        const bo = categoryOrder.get(b.categoryId) ?? Number.MAX_SAFE_INTEGER;
        if (ao !== bo) return ao - bo;
        return a.name.localeCompare(b.name, "pt-BR");
    }).map((s)=>({
            id: s.id,
            label: `${catNameById.get(s.categoryId) ?? "—"} - ${s.name}`
        }));
}
const COLOR_SWATCHES = [
    "#2563EB",
    "#DB2777",
    "#0D9488",
    "#7C3AED",
    "#F59E0B",
    "#EF4444",
    "#64748B",
    "#0EA5E9"
];
const ICON_SWATCHES = [
    "folder",
    "home",
    "party",
    "trending",
    "book",
    "cart",
    "water",
    "food"
];
}),
"[project]/src/prisma/categories.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "createCategory",
    ()=>createCategory,
    "createSubcategory",
    ()=>createSubcategory,
    "ensureDefaultCategories",
    ()=>ensureDefaultCategories,
    "listCategories",
    ()=>listCategories,
    "listSubcategories",
    ()=>listSubcategories,
    "updateSubcategory",
    ()=>updateSubcategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/server-only/empty.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/prisma/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/finance.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function listCategories(userId) {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].orm.public.Category.where({
        userId
    }).orderBy((c)=>c.createdAt.asc()).all();
    return rows;
}
async function listSubcategories(userId) {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].orm.public.Subcategory.where({
        userId
    }).orderBy((s)=>s.createdAt.asc()).all();
    return rows;
}
async function createCategory(userId, input) {
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].orm.public.Category.create({
        userId,
        ...input
    });
    return row;
}
async function createSubcategory(userId, input) {
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].orm.public.Subcategory.create({
        userId,
        ...input
    });
    return row;
}
async function updateSubcategory(userId, id, input) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].orm.public.Subcategory.where({
        id,
        userId
    }).update(input);
}
async function ensureDefaultCategories(userId) {
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].orm.public.Category.where({
        userId
    }).take(1).all();
    if (existing.length > 0) return;
    const categoryIdByKey = new Map();
    for (const cat of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_CATEGORIES"]){
        const row = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].orm.public.Category.create({
            userId,
            name: cat.name,
            color: cat.color,
            icon: cat.icon
        });
        categoryIdByKey.set(cat.key, row.id);
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].orm.public.Subcategory.createAll(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_SUBCATEGORIES"].map((sub)=>({
            userId,
            categoryId: categoryIdByKey.get(sub.categoryKey),
            name: sub.name,
            type: sub.type,
            icon: sub.icon
        }))).toArray();
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/components/providers/CategoriesProvider.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoriesProvider",
    ()=>CategoriesProvider,
    "useCategories",
    ()=>useCategories
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CategoriesProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CategoriesProvider() from the server but CategoriesProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/providers/CategoriesProvider.tsx <module evaluation>", "CategoriesProvider");
const useCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useCategories() from the server but useCategories is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/providers/CategoriesProvider.tsx <module evaluation>", "useCategories");
}),
"[project]/src/components/providers/CategoriesProvider.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoriesProvider",
    ()=>CategoriesProvider,
    "useCategories",
    ()=>useCategories
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CategoriesProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CategoriesProvider() from the server but CategoriesProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/providers/CategoriesProvider.tsx", "CategoriesProvider");
const useCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useCategories() from the server but useCategories is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/providers/CategoriesProvider.tsx", "useCategories");
}),
"[project]/src/components/providers/CategoriesProvider.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$CategoriesProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/providers/CategoriesProvider.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$CategoriesProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/providers/CategoriesProvider.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$CategoriesProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/providers/ToastProvider.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ToastProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ToastProvider() from the server but ToastProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/providers/ToastProvider.tsx <module evaluation>", "ToastProvider");
const useToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useToast() from the server but useToast is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/providers/ToastProvider.tsx <module evaluation>", "useToast");
}),
"[project]/src/components/providers/ToastProvider.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ToastProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ToastProvider() from the server but ToastProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/providers/ToastProvider.tsx", "ToastProvider");
const useToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useToast() from the server but useToast is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/providers/ToastProvider.tsx", "useToast");
}),
"[project]/src/components/providers/ToastProvider.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/providers/ToastProvider.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/providers/ToastProvider.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/providers/ModalProvider.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModalProvider",
    ()=>ModalProvider,
    "useModal",
    ()=>useModal
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ModalProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ModalProvider() from the server but ModalProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/providers/ModalProvider.tsx <module evaluation>", "ModalProvider");
const useModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useModal() from the server but useModal is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/providers/ModalProvider.tsx <module evaluation>", "useModal");
}),
"[project]/src/components/providers/ModalProvider.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModalProvider",
    ()=>ModalProvider,
    "useModal",
    ()=>useModal
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ModalProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ModalProvider() from the server but ModalProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/providers/ModalProvider.tsx", "ModalProvider");
const useModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useModal() from the server but useModal is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/providers/ModalProvider.tsx", "useModal");
}),
"[project]/src/components/providers/ModalProvider.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ModalProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/providers/ModalProvider.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ModalProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/providers/ModalProvider.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ModalProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/AppShell.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/AppShell.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/AppShell.tsx <module evaluation>", "default");
}),
"[project]/src/components/AppShell.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/AppShell.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/AppShell.tsx", "default");
}),
"[project]/src/components/AppShell.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AppShell$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/AppShell.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AppShell$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/AppShell.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AppShell$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/(app)/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>AppLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/prisma/categories.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$CategoriesProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/providers/CategoriesProvider.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/providers/ToastProvider.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ModalProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/providers/ModalProvider.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AppShell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AppShell.tsx [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
async function AppLayout({ children }) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureDefaultCategories"])(user.id);
    const [categories, subcategories] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listCategories"])(user.id),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$prisma$2f$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listSubcategories"])(user.id)
    ]);
    const name = user.user_metadata?.name?.trim() || user.email || "Você";
    const email = user.email ?? "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$CategoriesProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoriesProvider"], {
        categories: categories,
        subcategories: subcategories,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ToastProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ModalProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ModalProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: null,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AppShell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        name: name,
                        email: email,
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/layout.tsx",
                        lineNumber: 25,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/layout.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/layout.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/layout.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/layout.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__59b7ebf3._.js.map