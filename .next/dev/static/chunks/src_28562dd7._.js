(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/(app)/data:0066ce [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setFixedExpenseActiveAction",
    ()=>$$RSC_SERVER_ACTION_4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"603b67d4e4807146eabfbcf192ff87f2eb24a54650":"setFixedExpenseActiveAction"},"src/app/(app)/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("603b67d4e4807146eabfbcf192ff87f2eb24a54650", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "setFixedExpenseActiveAction");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgcmVxdWlyZVVzZXIgfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xuaW1wb3J0IHsgY3JlYXRlQ2F0ZWdvcnksIGNyZWF0ZVN1YmNhdGVnb3J5IH0gZnJvbSBcIkAvcHJpc21hL2NhdGVnb3JpZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUZpeGVkRXhwZW5zZSwgc2V0Rml4ZWRFeHBlbnNlQWN0aXZlIH0gZnJvbSBcIkAvcHJpc21hL2ZpeGVkRXhwZW5zZXNcIjtcbmltcG9ydCB7IGNyZWF0ZVRyYW5zYWN0aW9uLCBkZWxldGVUcmFuc2FjdGlvbiwgcGF5VHJhbnNhY3Rpb24gfSBmcm9tIFwiQC9wcmlzbWEvdHJhbnNhY3Rpb25zXCI7XG5pbXBvcnQgdHlwZSB7IFR4VHlwZSB9IGZyb20gXCJAL2xpYi9maW5hbmNlXCI7XG5cbmZ1bmN0aW9uIHJlZnJlc2goKSB7XG4gIHJldmFsaWRhdGVQYXRoKFwiL1wiLCBcImxheW91dFwiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVRyYW5zYWN0aW9uQWN0aW9uKGlucHV0OiB7XG4gIHR5cGU6IFR4VHlwZTtcbiAgc3ViY2F0ZWdvcnlJZDogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgYW1vdW50OiBudW1iZXI7XG4gIHBlcmlvZE1vbnRoOiBzdHJpbmc7XG4gIGR1ZURhdGU/OiBzdHJpbmcgfCBudWxsO1xuICBwYWlkOiBib29sZWFuO1xufSkge1xuICBjb25zdCB1c2VyID0gYXdhaXQgcmVxdWlyZVVzZXIoKTtcbiAgYXdhaXQgY3JlYXRlVHJhbnNhY3Rpb24odXNlci5pZCwge1xuICAgIHR5cGU6IGlucHV0LnR5cGUsXG4gICAgc3ViY2F0ZWdvcnlJZDogaW5wdXQuc3ViY2F0ZWdvcnlJZCxcbiAgICBkZXNjcmlwdGlvbjogaW5wdXQuZGVzY3JpcHRpb24sXG4gICAgYW1vdW50OiBpbnB1dC5hbW91bnQsXG4gICAgcGVyaW9kTW9udGg6IGlucHV0LnBlcmlvZE1vbnRoLFxuICAgIGR1ZURhdGU6IGlucHV0LmR1ZURhdGUgPyBuZXcgRGF0ZShpbnB1dC5kdWVEYXRlKSA6IG51bGwsXG4gICAgcGFpZDogaW5wdXQucGFpZCxcbiAgfSk7XG4gIHJlZnJlc2goKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBheVRyYW5zYWN0aW9uQWN0aW9uKGlucHV0OiB7XG4gIGlkOiBzdHJpbmc7XG4gIHBhaWRBbW91bnQ6IG51bWJlcjtcbiAgcGFpZERhdGU6IHN0cmluZztcbn0pIHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IHJlcXVpcmVVc2VyKCk7XG4gIGF3YWl0IHBheVRyYW5zYWN0aW9uKHVzZXIuaWQsIGlucHV0LmlkLCB7XG4gICAgcGFpZEFtb3VudDogaW5wdXQucGFpZEFtb3VudCxcbiAgICBwYWlkRGF0ZTogbmV3IERhdGUoaW5wdXQucGFpZERhdGUpLFxuICB9KTtcbiAgcmVmcmVzaCgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlVHJhbnNhY3Rpb25BY3Rpb24oaWQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyID0gYXdhaXQgcmVxdWlyZVVzZXIoKTtcbiAgYXdhaXQgZGVsZXRlVHJhbnNhY3Rpb24odXNlci5pZCwgaWQpO1xuICByZWZyZXNoKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVGaXhlZEV4cGVuc2VBY3Rpb24oaW5wdXQ6IHtcbiAgc3ViY2F0ZWdvcnlJZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGVzdGltYXRlZEFtb3VudDogbnVtYmVyO1xuICBkdWVEYXk6IG51bWJlcjtcbn0pIHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IHJlcXVpcmVVc2VyKCk7XG4gIGF3YWl0IGNyZWF0ZUZpeGVkRXhwZW5zZSh1c2VyLmlkLCBpbnB1dCk7XG4gIHJlZnJlc2goKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldEZpeGVkRXhwZW5zZUFjdGl2ZUFjdGlvbihpZDogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IHJlcXVpcmVVc2VyKCk7XG4gIGF3YWl0IHNldEZpeGVkRXhwZW5zZUFjdGl2ZSh1c2VyLmlkLCBpZCwgYWN0aXZlKTtcbiAgcmVmcmVzaCgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQ2F0ZWdvcnlBY3Rpb24oaW5wdXQ6IHsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBpY29uOiBzdHJpbmcgfSkge1xuICBjb25zdCB1c2VyID0gYXdhaXQgcmVxdWlyZVVzZXIoKTtcbiAgYXdhaXQgY3JlYXRlQ2F0ZWdvcnkodXNlci5pZCwgaW5wdXQpO1xuICByZWZyZXNoKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVTdWJjYXRlZ29yeUFjdGlvbihpbnB1dDoge1xuICBjYXRlZ29yeUlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogVHhUeXBlO1xuICBpY29uOiBzdHJpbmc7XG59KSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCByZXF1aXJlVXNlcigpO1xuICBhd2FpdCBjcmVhdGVTdWJjYXRlZ29yeSh1c2VyLmlkLCBpbnB1dCk7XG4gIHJlZnJlc2goKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoid1NBaUVzQix3TUFBQSJ9
}),
"[project]/src/components/PauseButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PauseButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$7$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$react$2d$icons$2f$tb$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-icons@5.7.0_react@19.2.3/node_modules/react-icons/tb/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$data$3a$0066ce__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/data:0066ce [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PauseButton({ id, active }) {
    _s();
    const [pending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        disabled: pending,
        onClick: ()=>startTransition(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$data$3a$0066ce__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["setFixedExpenseActiveAction"])(id, !active)),
        title: active ? "Pausar" : "Retomar",
        style: {
            width: 30,
            height: 30,
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: pending ? 0.6 : 1
        },
        children: active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$7$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$react$2d$icons$2f$tb$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TbPlayerPause"], {
            size: 13
        }, void 0, false, {
            fileName: "[project]/src/components/PauseButton.tsx",
            lineNumber: 28,
            columnNumber: 17
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$7$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$react$2d$icons$2f$tb$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TbPlayerPlay"], {
            size: 13
        }, void 0, false, {
            fileName: "[project]/src/components/PauseButton.tsx",
            lineNumber: 28,
            columnNumber: 47
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/PauseButton.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(PauseButton, "VdycpLWWKWPshgRympCCcrNu/Wc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c = PauseButton;
var _c;
__turbopack_context__.k.register(_c, "PauseButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ModalTriggerButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModalTriggerButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ModalProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/providers/ModalProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function ModalTriggerButton({ modal, ctx, children, style }) {
    _s();
    const { openModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ModalProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick: ()=>openModal(modal, ctx),
        style: {
            alignSelf: "flex-start",
            padding: "11px 18px",
            border: "none",
            borderRadius: "var(--radius-md)",
            background: "var(--color-primary)",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            ...style
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ModalTriggerButton.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(ModalTriggerButton, "SvrcxMGNhDbHl8OYqetXtwf/ij0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ModalProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"]
    ];
});
_c = ModalTriggerButton;
var _c;
__turbopack_context__.k.register(_c, "ModalTriggerButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/EmptyState.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmptyState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.7_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$7$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$react$2d$icons$2f$tb$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-icons@5.7.0_react@19.2.3/node_modules/react-icons/tb/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ModalProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/providers/ModalProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function EmptyState({ title, description, actionLabel = "+ Novo lançamento" }) {
    _s();
    const { openModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ModalProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "60px 20px",
            gap: 12
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "var(--color-primary-tint)",
                    color: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$7$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$react$2d$icons$2f$tb$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TbMoodEmpty"], {
                    size: 30
                }, void 0, false, {
                    fileName: "[project]/src/components/EmptyState.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/EmptyState.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 16,
                    fontWeight: 700
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/EmptyState.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    maxWidth: 320
                },
                children: description
            }, void 0, false, {
                fileName: "[project]/src/components/EmptyState.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>openModal("novoLancamento"),
                style: {
                    marginTop: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "11px 18px",
                    border: "none",
                    borderRadius: "var(--radius-md)",
                    background: "var(--color-primary)",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 600
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$7$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$react$2d$icons$2f$tb$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TbPlus"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/components/EmptyState.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    " ",
                    actionLabel.replace("+ ", "")
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/EmptyState.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/EmptyState.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(EmptyState, "SvrcxMGNhDbHl8OYqetXtwf/ij0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ModalProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"]
    ];
});
_c = EmptyState;
var _c;
__turbopack_context__.k.register(_c, "EmptyState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_28562dd7._.js.map