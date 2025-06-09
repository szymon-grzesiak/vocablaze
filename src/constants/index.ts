import { SidebarLink } from "@/types";
import sun from "@/assets/icons/sun.svg";
import moon from "@/assets/icons/moon.svg";
import computer from "@/assets/icons/computer.svg";

export const themes = [
    { value: "light", label: "Light", icon: sun },
    { value: "dark", label: "Dark", icon: moon },
    { value: "system", label: "System", icon: computer },
  ];

  export const sidebarLinks: SidebarLink[] = [
    {
      imgURL: "/assets/icons/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/assets/icons/users.svg",
      route: "/community",
      label: "Community",
    },
    {
      imgURL: "/assets/icons/star.svg",
      route: "/collection",
      label: "Collections",
    },
    {
      imgURL: "/assets/icons/suitcase.svg",
      route: "/jobs",
      label: "Find Jobs",
    },
    {
      imgURL: "/assets/icons/tag.svg",
      route: "/tags",
      label: "Tags",
    },
    {
      imgURL: "/assets/icons/user.svg",
      route: "/profile",
      label: "Profile",
    },
    {
      imgURL: "/assets/icons/question.svg",
      route: "/ask-question",
      label: "Ask a question",
    },
  ];
