//function to retrieve appoints based of the name of the day
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

//function to get interview information with student and interviewer
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

//function to get interviewers for a specific day
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
