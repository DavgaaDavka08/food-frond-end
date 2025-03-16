import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Эдгээр нь `__filename` болон `__dirname`-г зарлах код.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ESLint-ийн тохиргоо үүсгэж байна.
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Next.js болон TypeScript-ийн тохиргоог нэмсэн массив.
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { args: "none" }],
    },
  },
];

export default eslintConfig;
