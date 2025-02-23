import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from './ThemeProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Instans - AI-Powered Screen Share & Chat Assistant",
  description: "Instans is an intelligent assistant that combines screen sharing with AI-powered chat to help with coding, system design, and technical interviews. Get real-time assistance while sharing your screen.",
  keywords: "AI assistant, screen sharing, coding help, technical interviews, system design, programming assistant",
  openGraph: {
    title: "Instans - AI-Powered Screen Share & Chat Assistant",
    description: "Get real-time AI assistance while sharing your screen for coding, system design, and technical interviews.",
    images: ["https://i.ibb.co/DPQnwsPc/download-2.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instans - AI-Powered Screen Share & Chat Assistant",
    description: "Get real-time AI assistance while sharing your screen for coding, system design, and technical interviews.",
    images: ["https://i.ibb.co/DPQnwsPc/download-2.png"],
  },
  icons: {
    icon: "https://i.ibb.co/DPQnwsPc/download-2.png",
    shortcut: "https://i.ibb.co/DPQnwsPc/download-2.png",
    apple: "https://i.ibb.co/DPQnwsPc/download-2.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "https://i.ibb.co/DPQnwsPc/download-2.png",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="https://i.ibb.co/DPQnwsPc/download-2.png" />
        <link rel="apple-touch-icon" href="https://i.ibb.co/DPQnwsPc/download-2.png" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
