const evaluate = (month: number, day: number, endDay: number) => {
  const today = new Date();
  return (
    today.getMonth() === month &&
    today.getDate() >= day &&
    today.getDate() <= endDay
  );
};

export const useIsChristmas = () =>
  useState<boolean>("is-christmas", () => {
    return evaluate(11, 25, 30);
  });

export const useIsNewYear = () =>
  useState<boolean>("is-new-year", () => {
    return evaluate(0, 1, 5);
  });

export const useIsValentinesDay = () =>
  useState<boolean>("is-valentines-day", () => {
    return evaluate(1, 13, 15);
  });

export const useIsEaster = () =>
  useState<boolean>("is-easter", () => {
    return evaluate(3, 7, 9);
  });

// Path: composables\useSpecialDays.ts
export const useSpecialDays = () =>
  useState("is-special-days", () => {
    const isChristmas = useIsChristmas();
    const isNewYear = useIsNewYear();
    const isValentinesDay = useIsValentinesDay();

    return {
      isChristmas,
      isNewYear,
      isValentinesDay,
    };
  });

export const useSpecialGreeting = () => {
  const { isChristmas, isNewYear, isValentinesDay } = useSpecialDays().value;

  if (isChristmas) return "Merry Christmas! 🎄";
  if (isNewYear) return "Happy New Year! 🎉";
  if (isValentinesDay) return "Happy Valentines Day! ❤️";
  return null;
};
