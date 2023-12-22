const events = [
  { title: "Санітарна очистка кабінету", start: getDate("YEAR-MONTH-01") },
  {
    title: "Прийом пацієнтів",
    start: getDate("YEAR-MONTH-07"),
    end: getDate("YEAR-MONTH-10")
  },
  {
    groupId: "999",
    title: "Початок дня",
    start: getDate("YEAR-MONTH-09T16:00:00+00:00")
  },
  {
    groupId: "999",
    title: "Початок дня",
    start: getDate("YEAR-MONTH-16T16:00:00+00:00")
  },
  {
    title: "Підвищення кваліфікації",
    start: "YEAR-MONTH-17",
    end: getDate("YEAR-MONTH-19")
  },
  {
    title: "Підвищення кваліфікації",
    start: getDate("YEAR-MONTH-18T10:30:00+00:00"),
    end: getDate("YEAR-MONTH-18T12:30:00+00:00")
  },
  { title: "Прийом Марії Кобик", start: getDate("YEAR-MONTH-18T12:00:00+00:00") },
  { title: "Прийом Данила Боднара", start: getDate("YEAR-MONTH-19T07:00:00+00:00") },
  { title: "Прийом Мудрого Руслана", start: getDate("YEAR-MONTH-18T14:30:00+00:00") },
  { title: "Кінець", start: getDate("YEAR-MONTH-18T20:00:00+00:00") }
];

function getDate(dayString) {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();

  if (month.length === 1) {
    month = "0" + month;
  }

  return dayString.replace("YEAR", year).replace("MONTH", month);
}

export default events;
