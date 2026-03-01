import CustomCursor from "@/components/marketing/CustomCursor";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Your portal to your Nexus Planet",
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="cursor-none">
      <MarketingHeader />
      <CustomCursor />
      <main className="min-h-svh">{children}</main>
    </div>
  );
};

export default Layout;
