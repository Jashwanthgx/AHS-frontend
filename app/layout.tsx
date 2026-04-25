import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TalentBridge | Find Your Next High-Impact Role in India",
  description: "The modern recruitment portal for top tech talent in India. Apply to Zomato, Razorpay, Stripe, and more without the friction of traditional job boards.",
  keywords: ["Jobs in India", "Software Engineer Jobs Bangalore", "Tech Careers Mumbai", "Startup Jobs Hyderabad", "Apply without login"],
  authors: [{ name: "TalentBridge Team" }],
  openGraph: {
    title: "TalentBridge - The Modern Way to Hire Top Talent",
    description: "Frictionless job applications for the world's most innovative teams.",
    url: "https://talentbridge.example.com",
    siteName: "TalentBridge",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased light`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="bg-background text-on-background min-h-screen flex flex-col font-body-md selection:bg-primary-container selection:text-on-primary-container">
        {children}
      </body>
    </html>
  );
}
