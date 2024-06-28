import { DayOff } from "@/server/types";

/**
 * Returns the number of days in a given month and year.
 *
 * @param {number} month - The month (1-12).
 * @param {number} year - The year.
 * @returns {number} The number of days in the month.
 */
export const daysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

/**
 * Checks if a given date falls on a weekend.
 *
 * @param {number} day - The day of the month (1-31).
 * @param {number} month - The month (1-12).
 * @param {number} year - The year.
 * @returns {boolean} True if the date is a weekend, false otherwise.
 */
export const isDateWeekend = (
  day: number,
  month: number,
  year: number,
): boolean => {
  const date = new Date(year, month, day);
  return date.getDay() === 0 || date.getDay() === 6;
};

/**
 * Checks if a given date is a day off.
 *
 * @param {Date} date - The date to check.
 * @param {DayOff[]} daysOff - An array of days off.
 * @returns {boolean} True if the date is a day off, false otherwise.
 */
export const isDayOff = (date: Date, daysOff: DayOff[]): boolean => {
  return daysOff.some((dayOff) => {
    const startDate = new Date(dayOff.startDate);
    return date.getDate() === startDate.getDate();
  });
};

/**
 * Returns the number of empty days before the first day of the month.
 *
 * @param {Date} firstDayOfTheMonth - The first day of the month.
 * @returns {number} The number of empty days.
 */
export const numberOfEmptyDays = (firstDayOfTheMonth: Date): number => {
  return firstDayOfTheMonth.getDay() - 1;
};
