import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mortib Studio — Digital experiences with a pulse",
  description: "Mortib Studio creates bold digital experiences, web design and brand systems.",
  openGraph: {
    title: "Mortib Studio — Digital experiences with a pulse",
    description: "Web design, creative code and visual systems for memorable brands.",
    images: ["/assets/images/og-mortib-studio.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
