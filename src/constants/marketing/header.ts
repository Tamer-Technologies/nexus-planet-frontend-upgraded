import { AUTH_CONTENT } from "../auth/forms";

export type NavLink = {
  label: string;
  url: string;
};

export const HEADER_CONTENT: {
  home: NavLink;
  main: NavLink[];
  actions: NavLink[];
} = {
  home: { label: "Home", url: "/" },
  main: [
    { label: "star our repo", url: "/#star-repo" },
    { label: "features", url: "/#app-features" },
    { label: "report a bug", url: "/#report-bug" },
  ],
  actions: [
    { label: "sign in", url: AUTH_CONTENT.login.redirectLink },
    { label: "create account", url: AUTH_CONTENT.register.redirectLink },
  ],
};
