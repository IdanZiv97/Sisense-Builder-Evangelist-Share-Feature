import "./globals.css";
import ClientProviders from "./ClientProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-slate-50 antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
