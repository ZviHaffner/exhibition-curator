import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Exhibition Curator",
  description:
    "A platform where users can explore virtual exhibitions from combined collections of antiquities and fine art",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen">
        <Header />
        <Nav />
        <main className="grow bg-slate-50">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
