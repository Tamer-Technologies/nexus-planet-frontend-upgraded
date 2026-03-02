import HomeScene3D from "@/components/marketing/home/HomeScene3D";
import { LandingPage } from "@/contexts/marketing/LandingPageContext";

const page = () => {
  return (
    <LandingPage>
      <HomeScene3D />
    </LandingPage>
  );
};

export default page;
