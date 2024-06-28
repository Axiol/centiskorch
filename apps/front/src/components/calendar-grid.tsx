import { Day } from "@/server/types";

interface CalendarGridProps {
  emptyDays: number[];
  days: Day[];
}

export default function CalendarGrid({ emptyDays, days }: CalendarGridProps) {
  return (
    <div className={"grid grid-cols-7"}>
      {emptyDays.map((_, index) => {
        return <div key={`empty${index}`}>0</div>;
      })}

      {days.map((day, index) => (
        <div key={`grid${index}`}>
          {day.day}, {day.isWeekend ? "weekend" : "weekday"},{" "}
          {day.isDayOff ? "day off" : "work day"}
          <div>
            <div>
              AM :{" "}
              <input
                type={"checkbox"}
                defaultChecked={!(day.isDayOff || day.isWeekend)}
              />
            </div>
            <div>
              PM :{" "}
              <input
                type={"checkbox"}
                defaultChecked={!(day.isDayOff || day.isWeekend)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
