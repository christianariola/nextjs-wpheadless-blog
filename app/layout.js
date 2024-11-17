import "./globals.css";

export const metadata = {
  title: "Christian Ariola Blog",
  description: "Page description here.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
