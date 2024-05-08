import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";

export default [
    pluginJs.configs.recommended,
    {
        languageOptions: { globals: globals.browser },
        ignores: "webpack.config.js",
    },
    {
        rules: {
            "no-console": "off",
            "no-unused-vars": "warn",
            "no-param-reassign": "warn",
        },
    },
    {
        files: ["**/*.test.js"],
        plugins: {
            jest,
        },
        languageOptions: { globals: globals.jest },
    },
];
