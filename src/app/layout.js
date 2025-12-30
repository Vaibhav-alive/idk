import { Quicksand } from "next/font/google";
import "./globals.css";
import Globalaudio from "./Globalaudio";
import Script from "next/script";
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Bareminimumbyshayaan",
  description: "A cute little website filled with compliments, surprises, and a heartfelt message made just for you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} bg-black antialiased select-none`}
      >
        <Globalaudio />
        {children}
        <Script src="https://cdn.jsdelivr.net/npm/canvas-confetti/dist/confetti.browser.min.js" />

      </body>
    </html>
  );
}
