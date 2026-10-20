import { defineConfig } from "vitepress";
import { studySidebar } from "./study-sidebar.mts";

export default defineConfig({
  lang: "ko-KR",
  title: "20260330 Study",
  description: "학습 트랙 노트 — FE · SI · Agent · Colleague · IT 훑기",
  // https://hwajj.github.io/20260330-study/
  base: "/20260330-study/",
  cleanUrls: true,
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: "홈", link: "/" },
      { text: "FE", link: "/fe/" },
      { text: "SI", link: "/si/" },
      { text: "Agent", link: "/agent/" },
      { text: "Colleague", link: "/colleague/" },
      { text: "IT 훑기", link: "/tech-survey/" },
      {
        text: "이론 원문",
        link: "https://hwajj.github.io/frontend-dev-notes/fe/curriculum/",
      },
    ],
    sidebar: studySidebar,
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/hwajj/20260330-study",
      },
    ],
  },
});
