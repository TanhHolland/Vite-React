const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary_color: {
                    1: "#0CE76F",
                    2: "#1F3649",
                },
                secondary_color: {
                    1: "#4C5E6D",
                    2: "#55EE9A",
                },
                text: {
                    normal: "#263238",
                }
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};
