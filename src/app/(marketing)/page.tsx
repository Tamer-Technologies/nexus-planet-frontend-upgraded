import Features from "@/components/marketing/home/Features";
import HomeScene3D from "@/components/marketing/home/HomeScene3D";
import ReportBug from "@/components/marketing/home/ReportBug";
import { LandingPage } from "@/contexts/marketing/LandingPageContext";

const page = () => {
  return (
    <LandingPage>
      <HomeScene3D />
      <Features />
      <ReportBug />
    </LandingPage>
  );
};

export default page;
