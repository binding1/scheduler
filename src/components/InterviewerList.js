import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewerItems = props.interviewers.map((interviewerItem) => {
    return (
      <InterviewerListItem
        key={interviewerItem.id}
        id={interviewerItem.id}
        name={interviewerItem.name}
        avatar={interviewerItem.avatar}
        selected={interviewerItem.id === props.interviewer}
        setInterviewer={(event) => props.onChange(interviewerItem.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerItems}</ul>
    </section>
  );
}
