import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atul Kumar | Software Engineer Portfolio",
  description:
    "Portfolio of Atul Kumar — MCA student at MIT-WPU, aspiring software engineer specializing in Python, Java, Django, and modern web architectures. View projects, skills, and experience.",
  keywords: [
    "Atul Kumar",
    "Software Engineer",
    "Portfolio",
    "Python Developer",
    "Java Developer",
    "MCA",
    "MIT-WPU",
    "Django",
    "Web Development",
    "Full Stack Developer",
  ],
  authors: [{ name: "Atul Kumar" }],
  creator: "Atul Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Atul Kumar | Software Engineer Portfolio",
    description:
      "Aspiring Software Engineer specializing in Python, Java, and modern web architectures.",
    siteName: "Atul Kumar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atul Kumar | Software Engineer Portfolio",
    description:
      "Aspiring Software Engineer specializing in Python, Java, and modern web architectures.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <meta name="theme-color" content="#050505" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-[family-name:var(--font-inter)] antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
