import {
  daysInMonth,
  isDateWeekend,
  isDayOff,
  numberOfEmptyDays,
} from "@/server/utils";
import { DayOff } from "@/server/types";

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
      <div className={"grid grid-cols-7"}>
        {emptyDays.map((_, index) => {
          return <div key={`empty${index}`}>0</div>;
        })}

        {days.map((day, index) => (
          <div key={index}>
            {day.day}, {day.isWeekend ? "weekend" : "weekday"},{" "}
            {day.isDayOff ? "day off" : "work day"}
          </div>
        ))}
      </div>
    </>
  );
}
