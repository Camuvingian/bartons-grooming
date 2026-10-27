export type Day = { key: string; dow: string; date: number; label: string };

/** The next four open days (the salon is closed Sunday and Monday). */
export function nextOpenDays(from = new Date(), count = 4): Day[] {
  const days: Day[] = [];
  const d = new Date(from);
  d.setDate(d.getDate() + 1);
  while (days.length < count) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 1) {
      days.push({
        key: d.toISOString().slice(0, 10),
        dow: d.toLocaleDateString("en-GB", { weekday: "short" }),
        date: d.getDate(),
        label: d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}
