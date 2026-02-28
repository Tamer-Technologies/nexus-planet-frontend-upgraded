import CustomCursor from "@/components/marketing/CustomCursor";
import HomeScene3D from "@/components/marketing/home/HomeScene3D";
import MarketingHeader from "@/components/marketing/MarketingHeader";

const page = () => {
  return (
    <div className="h-svh relative cursor-none">
      <MarketingHeader />
      <CustomCursor />
      <HomeScene3D />
    </div>
  );
};

export default page;
