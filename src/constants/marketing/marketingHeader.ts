import { LinkObject } from "@/types/constants";

type MarketingHeaderNavsProps = {
  sections: LinkObject[];
  ctas: LinkObject[];
};
export const marketingHeaderNavs: MarketingHeaderNavsProps = {
  sections: [
    { label: "star our repo", url: "/#star-repo" },
    { label: "features", url: "/#app-features" },
    { label: "report a bug", url: "/#report-bug" },
  ],
  ctas: [
    { label: "sign in", url: "/login" },
    { label: "create account", url: "/register" },
  ],
};
