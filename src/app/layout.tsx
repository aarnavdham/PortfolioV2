import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Syne, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "NVISION — Creating Digital Experiences That People Remember",
  description:
    "NVISION is a creative digital studio crafting premium websites, cinematic video edits, brand identities, and immersive UI/UX experiences. We build the unforgettable.",
  keywords: [
    "NVISION",
    "creative studio",
    "web design",
    "UI/UX",
    "brand identity",
    "motion graphics",
    "video editing",
    "Awwwards",
  ],
  authors: [{ name: "NVISION Studio" }],
  openGraph: {
    title: "NVISION — Creating Digital Experiences That People Remember",
    description:
      "A creative digital studio crafting premium websites, cinematic video edits, and immersive brand experiences.",
    siteName: "NVISION",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NVISION — Creating Digital Experiences That People Remember",
    description:
      "A creative digital studio crafting premium websites, cinematic video edits, and immersive brand experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set theme class before React hydrates to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("nvision-theme");var d=t!=="light"&&!(t==="light")&&window.matchMedia("(prefers-color-scheme: light)").matches;if(t==="light"||(t!=="dark"&&window.matchMedia("(prefers-color-scheme: light)").matches)){document.documentElement.classList.add("light")}else{document.documentElement.classList.add("dark")}}catch(e){document.documentElement.classList.add("dark")}})()`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${syne.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
