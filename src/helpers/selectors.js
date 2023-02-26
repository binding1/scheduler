export function getAppointmentsForDay(state, name) {
  const filteredDays = state.days.filter((day) => day.name === name);

  if (filteredDays.length === 0) {
    return [];
  }

  const appts = filteredDays[0].appointments;
  const filteredAppts = [];
  for (let appt of appts) {
    filteredAppts.push(state.appointments[appt]);
  }
  return filteredAppts;
}
