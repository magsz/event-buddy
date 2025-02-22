(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_events_[id]_page_5c51b9.js", {

"[project]/src/app/events/[id]/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>EventDetail)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
function EventDetail() {
    _s();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const userId = localStorage.getItem("userId");
    const [event, setEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rsvp, setRsvp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: "",
        description: "",
        location: "",
        startdate: "",
        enddate: "",
        genre: ""
    });
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EventDetail.useEffect": ()=>{
            async function fetchEvent() {
                try {
                    const response = await fetch(`http://localhost:8000/events/${id}`);
                    if (!response.ok) throw new Error("Failed to fetch event");
                    const data = await response.json();
                    setEvent(data);
                    setFormData(data);
                } catch (err) {
                    setError(err.message);
                }
            }
            fetchEvent();
        }
    }["EventDetail.useEffect"], [
        id
    ]);
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    async function handleEdit() {
        try {
            const response = await fetch(`http://localhost:8000/events/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const updatedEvent = await response.json();
                setEvent(updatedEvent);
                setIsEditing(false);
                router.push("/events");
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    async function handleDelete() {
        try {
            const response = await fetch(`http://localhost:8000/events/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                alert("Event deleted!");
                router.push("/events");
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    async function handleRsvp() {
        setRsvp((prev)=>!prev);
        if (rsvp) {
            try {
                const response = await fetch(`http://localhost:8000/events/${id}/rsvp`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        status: "going"
                    })
                });
                const data = await response.json();
                console.log(data);
            } catch (err) {
                console.error(err.message);
            }
        } else {
            const response = await fetch(`http://localhost:8000/events/${id}/rsvp`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: userId
                })
            });
            const data = await response.json();
            console.log(data);
        }
    }
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: [
            "Error: ",
            error
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/events/[id]/page.js",
        lineNumber: 131,
        columnNumber: 20
    }, this);
    if (!event) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Loading event details..."
    }, void 0, false, {
        fileName: "[project]/src/app/events/[id]/page.js",
        lineNumber: 132,
        columnNumber: 21
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col items-center justify-center",
        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-purple-200 shadow-md rounded-lg p-6 w-ful max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    name: "title",
                    value: formData.title,
                    onChange: handleChange,
                    className: "text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400",
                    required: true
                }, void 0, false, {
                    fileName: "[project]/src/app/events/[id]/page.js",
                    lineNumber: 138,
                    columnNumber: 6
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    name: "description",
                    value: formData.description,
                    onChange: handleChange,
                    className: "text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400",
                    required: true
                }, void 0, false, {
                    fileName: "[project]/src/app/events/[id]/page.js",
                    lineNumber: 146,
                    columnNumber: 6
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "date",
                    name: "startdate",
                    value: formData.startdate,
                    onChange: handleChange,
                    className: "text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400",
                    required: true
                }, void 0, false, {
                    fileName: "[project]/src/app/events/[id]/page.js",
                    lineNumber: 152,
                    columnNumber: 6
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "date",
                    name: "enddate",
                    value: formData.enddate,
                    onChange: handleChange,
                    className: "text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400",
                    required: true
                }, void 0, false, {
                    fileName: "[project]/src/app/events/[id]/page.js",
                    lineNumber: 160,
                    columnNumber: 6
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    name: "location",
                    value: formData.location,
                    onChange: handleChange,
                    className: "text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400",
                    required: true
                }, void 0, false, {
                    fileName: "[project]/src/app/events/[id]/page.js",
                    lineNumber: 168,
                    columnNumber: 6
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    name: "genre",
                    value: formData.genre,
                    onChange: handleChange,
                    className: "text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400",
                    required: true
                }, void 0, false, {
                    fileName: "[project]/src/app/events/[id]/page.js",
                    lineNumber: 176,
                    columnNumber: 6
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    onClick: handleEdit,
                    className: "p-2  mr-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-500 transition",
                    children: "Save"
                }, void 0, false, {
                    fileName: "[project]/src/app/events/[id]/page.js",
                    lineNumber: 184,
                    columnNumber: 6
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>{
                        setIsEditing(false);
                    },
                    className: "p-2  mr-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-500 transition",
                    children: "Cancel"
                }, void 0, false, {
                    fileName: "[project]/src/app/events/[id]/page.js",
                    lineNumber: 190,
                    columnNumber: 6
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleDelete,
                    className: "p-2  mr-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-500 transition",
                    children: "Delete"
                }, void 0, false, {
                    fileName: "[project]/src/app/events/[id]/page.js",
                    lineNumber: 197,
                    columnNumber: 6
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/events/[id]/page.js",
            lineNumber: 137,
            columnNumber: 5
        }, this) : //Conditionally render
        //Edit Mode
        //View mode
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center pt-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 rounded-lg shadow-lg mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold text-purple-500",
                        children: event.title
                    }, void 0, false, {
                        fileName: "[project]/src/app/events/[id]/page.js",
                        lineNumber: 210,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg mt-2",
                        children: event.description
                    }, void 0, false, {
                        fileName: "[project]/src/app/events/[id]/page.js",
                        lineNumber: 213,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-400 mt-2",
                        children: [
                            "Location: ",
                            event.location
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/events/[id]/page.js",
                        lineNumber: 216,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-gray-500 mt-2",
                        children: [
                            new Date(event.startdate).toLocaleDateString("en-US"),
                            " ",
                            "-",
                            new Date(event.enddate).toLocaleDateString("en-US")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/events/[id]/page.js",
                        lineNumber: 219,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-sm w-12 h-6 rounded-md bg-gray-200 text-black hover:bg-gray-300",
                                onClick: ()=>{
                                    setIsEditing(true);
                                },
                                children: "Edit"
                            }, void 0, false, {
                                fileName: "[project]/src/app/events/[id]/page.js",
                                lineNumber: 229,
                                columnNumber: 8
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-sm w-12 h-6 rounded-md bg-gray-200 text-black hover:bg-gray-300",
                                onClick: handleRsvp,
                                children: rsvp ? "RSVP" : "✔️"
                            }, void 0, false, {
                                fileName: "[project]/src/app/events/[id]/page.js",
                                lineNumber: 236,
                                columnNumber: 8
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/events/[id]/page.js",
                        lineNumber: 228,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/events/[id]/page.js",
                lineNumber: 209,
                columnNumber: 6
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/events/[id]/page.js",
            lineNumber: 208,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/events/[id]/page.js",
        lineNumber: 135,
        columnNumber: 3
    }, this);
}
_s(EventDetail, "AZR1fyRFqGOYfjVLSs/Iuo027Cg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = EventDetail;
var _c;
__turbopack_refresh__.register(_c, "EventDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/events/[id]/page.js [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_events_%5Bid%5D_page_5c51b9.js.map