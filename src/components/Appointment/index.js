import React, { useEffect } from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }

    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [mode, transition, props.interview]);

  function save(name, interviewer) {
    if (name && interviewer) {
      transition(SAVE);
    }

    const interview = {
      student: name,
      interviewer,
    };

    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function editInterview() {
    transition(EDIT);
  }

  function cancelDelete() {
    transition(SHOW);
  }

  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={editInterview}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={deleteInterview}
          onCancel={cancelDelete}
          message={"Are you sure you want to delete?"}
        />
      )}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVE && <Status message="Saving..." />}
    </article>
  );
}
