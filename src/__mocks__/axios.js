// mock axios requests for testing purposes in jest

// mock appointments
const fixtures = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1,
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1,
    },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: {
      id: 2,
      time: "1pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Leopold Silvers", interviewer: 4 },
    },
    4: { id: 4, time: "3pm", interview: null },
  },
  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
    3: {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png",
    },
    4: {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg",
    },
  },
};

//api request urls for mock usages
const dayURL = "http://localhost:8001/api/days";
const appointmentURL = "http://localhost:8001/api/appointments";
const interviewerURL = "http://localhost:8001/api/interviewers";

//mock routes for axios
export default {
  defaults: { baseURL: "" },
  get: jest.fn((url) => {
    if (url === dayURL) {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.days,
      });
    }

    if (url === appointmentURL) {
      /* Resolve appointments data */
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.appointments,
      });
    }

    if (url === interviewerURL) {
      /* Resolve interviewers data */
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.interviewers,
      });
    }
  }),

  put: jest.fn(() => {
    return Promise.resolve({
      status: 200,
      statusText: "OK",
      data: { student: "Lydia Miller-Jones", interviewer: "Sylvia Palmer" },
    });
  }),

  delete: jest.fn((id) => {
    return Promise.resolve({
      status: 200,
      statusText: "OK",
      data: null,
    });
  }),
};
