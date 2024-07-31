import { Inter, Roboto, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { ThemeProvider } from "../../context/ThemeContext";
import { SessionProvider } from "next-auth/react"
import AuthProvider from "../components/AuthProvider/AuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lema Dev",
  description: "This is Home Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <ThemeProvider>
          <div className="container">
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
        </AuthProvider>
     
      </body>
    </html>
  );
}
