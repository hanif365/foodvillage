"use client";
import { ThemeProvider } from "next-themes";
export default function MyThemeProviders({ children }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
