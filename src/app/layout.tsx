import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/components/layout/AppProviders";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";

export const metadata: Metadata = {
  title: "Grafarms NextJS",
  description: "Premium palm oil storefront for Graferd Farms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900 antialiased dark:bg-neutral-900 dark:text-neutral-100">
        <AppProviders>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <SideNav />
        </AppProviders>
      </body>
    </html>
  );
}
