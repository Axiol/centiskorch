import {
  daysInMonth,
  isDateWeekend,
  isDayOff,
  numberOfEmptyDays,
} from "@/server/utils";
import { DayOff } from "@/server/types";
import CalendarGrid from "@/components/calendar-grid";

export default async function Home() {
  const currentDate = new Date();
  const currentMonth = 5;
  // const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
  const nationalDaysOff: DayOff[] = await fetch(
    `https://openholidaysapi.org/PublicHolidays?countryIsoCode=BE&languageIsoCode=FR&validFrom=${currentYear}-${currentMonth}-1&validTo=${currentYear}-${currentMonth}-${daysInCurrentMonth}`,
  ).then((response) => {
    return response.json();
  });
  const emptyDays = Array.from(
    { length: numberOfEmptyDays(new Date(currentYear, currentMonth - 1, 1)) },
    () => 0,
  );

  const days = Array.from({ length: daysInCurrentMonth }, (_, i) => {
    return {
      day: i + 1,
      isWeekend: isDateWeekend(i + 1, currentMonth - 1, currentYear),
      isDayOff: isDayOff(
        new Date(currentYear, currentMonth - 1, i + 1),
        nationalDaysOff,
      ),
    };
  });

  return (
    <>
      <CalendarGrid emptyDays={emptyDays} days={days} />
    </>
  );
}
