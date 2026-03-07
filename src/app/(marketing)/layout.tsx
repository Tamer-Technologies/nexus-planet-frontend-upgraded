import CustomCursor from "@/components/marketing/CustomCursor";
import MarketingFooter from "@/components/marketing/home/MarketingFooter";
import MarketingHeader from "@/components/marketing/MarketingHeader";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <CustomCursor />
      <MarketingHeader />
      <main className="min-h-svh">{children}</main>
      <MarketingFooter />
    </div>
  );
};

export default Layout;
