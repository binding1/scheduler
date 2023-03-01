function getAppointmentsForDay(state, name) {
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

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewObj = state.interviewers[interview.interviewer];

  const result = {
    student: interview.student,
    interviewer: interviewObj,
  };

  return result;
}

module.exports = { getAppointmentsForDay, getInterview };
