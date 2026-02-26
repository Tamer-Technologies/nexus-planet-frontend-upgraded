import CustomCursor from "@/components/marketing/CustomCursor";
import HomeScene3D from "@/components/marketing/home/HomeScene3D";

const page = () => {
  return (
    <div className="h-svh relative cursor-none">
      <CustomCursor />
      <HomeScene3D />
    </div>
  );
};

export default page;
