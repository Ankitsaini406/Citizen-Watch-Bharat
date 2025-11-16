import eslintPluginNext from "@next/eslint-plugin-next";
import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        plugins: {
            "@next/next": eslintPluginNext,
        },
        rules: {
            ...eslintPluginNext.configs["core-web-vitals"].rules,
        },
    },
];
