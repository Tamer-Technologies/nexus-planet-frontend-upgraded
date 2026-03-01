import CustomCursor from "@/components/marketing/CustomCursor";
import MarketingHeader from "@/components/marketing/MarketingHeader";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="cursor-none">
      <CustomCursor />
      <MarketingHeader />
      <main className="min-h-svh">{children}</main>
    </div>
  );
};

export default Layout;
