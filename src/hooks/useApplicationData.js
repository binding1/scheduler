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

  function updateSpots(appointment) {
    let apptArr = [];
    let dayId = 0;
    let newSpots = 0;

    for (let i of state.days) {
      if (i.name === state.day) {
        dayId = i.id;
      }
    }

    state.days.map((day) => {
      if (day.id === dayId) {
        apptArr = day.appointments;
      }
    });

    for (let i of apptArr) {
      if (!appointment[i].interview) {
        newSpots++;
      }
    }

    const newDay = [...state.days];
    newDay[dayId - 1].spots = newSpots;

    setState((prev) => ({ ...prev, newDay }));
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return Axios.put(`http://localhost:8001/api/appointments/${id}`, {
      interview,
    }).then((res) => {
      setState((current) => ({ ...current, appointments }));
      updateSpots(appointments);
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

    return Axios.delete(`http://localhost:8001/api/appointments/${id}`).then(
      (res) => {
        setState((current) => ({ ...current, appointments }));
        updateSpots(appointments);
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
