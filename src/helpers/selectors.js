function getAppointmentsForDay(state, name) {
  // console.log(state.days);
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

function getInterviewersForDay(state, name) {
  let interviewersIdArr = [];
  let interviewersArr = [];
  state.days.map((day) => {
    if (day.name === name) {
      interviewersIdArr = day.interviewers;
    }
  });

  for (let id of interviewersIdArr) {
    interviewersArr.push(state.interviewers[id]);
  }

  return interviewersArr;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };
