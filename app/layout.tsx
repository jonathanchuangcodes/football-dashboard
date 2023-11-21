import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <header>
        <title>Football Dashboard</title>
      </header>
      <body>{children}</body>
    </html>
  );
}
