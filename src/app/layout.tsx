import "./globals.css";
import NavigationMenu from "./components/NavigationMenu"




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
    <NavigationMenu/>
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}
