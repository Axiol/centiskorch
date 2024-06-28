export interface DayOff {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  name: DayOffName[];
  nationwide: boolean;
}

export interface DayOffName {
  language: string;
  text: string;
}
