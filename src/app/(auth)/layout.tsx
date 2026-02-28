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
    <div className="cursor-none min-h-svh">
      <MarketingHeader />
      <CustomCursor />
      <main className="pt-30">{children}</main>
    </div>
  );
};

export default Layout;
