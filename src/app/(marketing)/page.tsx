import Features from "@/components/marketing/home/Features";
import HomeScene3D from "@/components/marketing/home/HomeScene3D";
import { LandingPage } from "@/contexts/marketing/LandingPageContext";

const page = () => {
  return (
    <LandingPage>
      <HomeScene3D />
      <Features />
    </LandingPage>
  );
};

export default page;
