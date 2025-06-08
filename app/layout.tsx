import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FrameFlow - AI-Powered Video Annotation Platform | Cut Labeling Time by 70%",
    template: "%s | FrameFlow - Video Annotation Platform"
  },
  description: "FrameFlow is the enterprise-grade video annotation platform that cuts labeling time by 70% with AI-human workflows. Perfect for autonomous vehicles, smart cities, and computer vision training datasets. Get started with our free demo.",
  keywords: [
    "video annotation",
    "computer vision",
    "AI training data",
    "machine learning datasets",
    "autonomous vehicle training", 
    "smart city surveillance",
    "video labeling platform",
    "object detection annotation",
    "enterprise annotation tool",
    "YOLO detection",
    "frame-by-frame annotation",
    "video data labeling",
    "AI annotation platform",
    "training dataset creation",
    "video analysis software"
  ],
  authors: [{ name: "FrameFlow Team" }],
  creator: "FrameFlow",
  publisher: "FrameFlow",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.frameflow.online",
    siteName: "FrameFlow",
    title: "FrameFlow - AI-Powered Video Annotation Platform | Cut Labeling Time by 70%",
    description: "Enterprise-grade video annotation platform that cuts labeling time by 70% with AI-human workflows. Perfect for autonomous vehicles, smart cities, and computer vision training.",
    images: [
      {
        url: "https://www.frameflow.online/_next/image?url=%2Fimage.png&w=1200&q=75",
        width: 1200,
        height: 630,
        alt: "FrameFlow - AI-Powered Video Annotation Platform",
      },
      {
        url: "https://www.frameflow.online/logo.png",
        width: 512,
        height: 512,
        alt: "FrameFlow Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@frameflow_ai",
    creator: "@frameflow_ai",
    title: "FrameFlow - AI-Powered Video Annotation Platform",
    description: "Cut video labeling time by 70% with AI-human workflows. Enterprise-grade platform for computer vision training datasets.",
    images: ["https://www.frameflow.online/_next/image?url=%2Fimage.png&w=1200&q=75"],
  },
  verification: {
    // Replace with actual verification codes from search engines:
    // Google: Get from https://search.google.com/search-console/ -> Add Property -> HTML tag method
    // Bing: Get from https://www.bing.com/webmasters/ -> Add site -> Meta tag method  
    // Yandex: Get from https://webmaster.yandex.com/ -> Add site -> Meta tag method
    google: "76jcCh5x_xWRTJHWq0vYLBJ2iArlXQr6DAklIdd8JGs",
    other: {
      "msvalidate.01": "your-bing-verification-code-here",
      "yandex-verification": "your-yandex-verification-code-here",
    }
  },
  alternates: {
    canonical: "https://www.frameflow.online",
  },
  category: "Technology",
  classification: "Business Software",
  other: {
    "application-name": "FrameFlow",
    "msapplication-TileColor": "#1e40af",
    "theme-color": "#1e40af",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "FrameFlow",
              "description": "AI-powered video annotation platform that cuts labeling time by 70% with enterprise-grade security and scalability.",
              "url": "https://www.frameflow.online",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web-based",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free trial available, custom pricing for enterprise"
              },
              "creator": {
                "@type": "Organization",
                "name": "FrameFlow",
                "url": "https://www.frameflow.online"
              },
              "screenshot": "https://www.frameflow.online/_next/image?url=%2Fimage.png&w=1920&q=75",
              "featureList": [
                "AI-powered object detection",
                "Frame-to-frame inheritance",
                "Enterprise security",
                "Team collaboration",
                "Custom model training",
                "API integration"
              ]
            })
          }}
        />
        
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FrameFlow",
              "url": "https://www.frameflow.online",
              "logo": "https://www.frameflow.online/logo.png",
              "description": "Enterprise-grade video annotation platform for computer vision and AI training datasets.",
              "foundingDate": "2024",
              "sameAs": [
                "https://twitter.com/frameflow_ai",
                "https://linkedin.com/company/frameflow-ai"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Sales",
                "url": "https://www.frameflow.online#contact"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
