export const useIsChristmas = () =>
  useState<boolean>("is-christmas", () => {
    const today = new Date();
    return today.getMonth() === 11 && today.getDate() >= 25;
  });
