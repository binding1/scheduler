import { useState, useEffect } from "react";
import Axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });

  const dayURL = "http://localhost:8001/api/days";
  const appointmentURL = "http://localhost:8001/api/appointments";
  const interviewerURL = "http://localhost:8001/api/interviewers";

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Axios.get(dayURL),
      Axios.get(appointmentURL),
      Axios.get(interviewerURL),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //   function updateSpots() {
  //     let apptArr = [];
  //     let newSpots = 0;
  //     const dayName = state.day;
  //     const filteredDays = state.days.filter((day) => day.name === dayName);
  //     const dayId = filteredDays[0].id - 1;

  //     state.days.map((day) => {
  //       if (day.id === dayId + 1) {
  //         apptArr = day.appointments;
  //       }
  //     });

  //     for (let i of apptArr) {
  //       if (state.appointments[i].interview) {
  //         newSpots++;
  //       }
  //     }

  //     const day = { ...state.days[dayId], spots: newSpots };
  //     const days = { ...state.days, [dayId]: day };

  //     return days;
  //   }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // const days = updateSpots();

    return Axios.put(`http://localhost:8001/api/appointments/${id}`, {
      interview,
    }).then((res) => {
      setState({ ...state, appointments });
      return res;
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // const days = updateSpots();

    return Axios.delete(`http://localhost:8001/api/appointments/${id}`).then(
      (res) => {
        setState({ ...state, appointments });
        return res;
      }
    );
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
