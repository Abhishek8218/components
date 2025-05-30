import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-material-symbols/rounded'; 
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import QueryProvider from "./providers/QueryProvider";
import RecoilContextProvider from "./providers/RecoilProvider";




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Create Next App",
  description: "Generated by create next app",
};

// export const generateMetadata = async (): Promise<Metadata> => {
//   return {
//     title: "my app",
//     manifest: "/manifest.json",
//     appleWebApp: {
//       capable: true,
//       statusBarStyle: "default",
//       title: "my app",
//     },
//     description: "my app description",
//   };
// };


// generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
          <head>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        <meta name="pwa-demo" content="pwa-demo" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="pwa-demo" />
        <meta name="description" content="pwa-demo" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className}`}>
        {/* <QueryClientProvider client={queryClient}> */}
        <QueryProvider>
        <RecoilContextProvider>
          {children}
        </RecoilContextProvider>
        </QueryProvider>

        {/* </QueryClientProvider> */}
        </body>
    </html>
  );
}
