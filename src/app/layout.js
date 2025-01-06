import "./globals.css";

export const metadata = {
  title: "Exhibition Curator",
  description:
    "A platform where users can explore virtual exhibitions from combined collections of antiquities and fine art",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
