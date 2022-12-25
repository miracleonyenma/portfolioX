export const useSiteTheme = () => useState("site-theme", () => "dark");
export const useSetSiteTheme = (value: string) =>
  useState("set-site-theme", () => {
    const theme = useSiteTheme();
    // set the theme
    theme.value = value;
  });
