import { DayOff } from "@/server/types";

export const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export const isDateWeekend = (day: number, month: number, year: number) => {
  const date = new Date(year, month, day);
  return date.getDay() === 0 || date.getDay() === 6;
};

export const isDayOff = (date: Date, daysOff: DayOff[]) => {
  return daysOff.some((dayOff) => {
    const startDate = new Date(dayOff.startDate);
    return date.getDate() === startDate.getDate();
  });
};

export const numberOfEmptyDays = (firstDayOfTheMonth: Date) => {
  return firstDayOfTheMonth.getDay() - 1;
};
