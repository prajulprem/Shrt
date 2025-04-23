import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata = {
  title: "SHRT",
  description: "Helps shorten your URLS, without login friction.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
      </head>
      <body
        className={` antialiased bg-blue-50` }
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
