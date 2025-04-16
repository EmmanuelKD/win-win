 
// types
import * as React from "react";
// mui
// components
// import Navbar from "src/components/layout/_main/navbar";
// import Footer from "src/components/layout/_main/footer";
import PropType from "prop-types";
import MainLayout from "@/layout/MainLayout";

// Meta information
export const metadata = {
  title: "vote for 50 most influencial student",
  description: "50 most influencial students description",
  applicationName: "50 most influencial students",
  authors: "50 most influencial students",
  keywords:
    "Competition, 50 most influencial students, Sierra Leone, Univercities",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    images: "https://commercehope-app.vercel.app/opengraph-image.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      {children}
      {/* <Box sx={{ py: { xs: 5, md: 3 } }} /> */}
    </MainLayout>
  );
}
 
// ==============================|| MAIN LAYOUT ||============================== //
