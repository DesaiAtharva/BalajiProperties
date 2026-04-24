import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";

export const metadata: Metadata = {
  title: "Balaji Properties | Premier Real Estate Services in Pune & PCMC",
  description: "Find your dream home with Balaji Properties. Expert real estate brokerage services in Pune and PCMC area including Buy, Rent, and Property Management.",
  keywords: "Balaji Properties, Real Estate Pune, PCMC Properties, Buy Home Pune, Rent Apartment PCMC, Property Broker Pune",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
