import type { Metadata } from "next";
import "./book.css";
import { BookShell } from "@/components/book-shell";

export const metadata: Metadata = {
  title: { default: "A History of AI — Every idea has a beginning", template: "%s · A History of AI" },
  description: "A free, open textbook tracing the ideas behind artificial intelligence. Begin with computation, logic, information, and the questions that started a field.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body><BookShell>{children}</BookShell></body>
    </html>
  );
}
