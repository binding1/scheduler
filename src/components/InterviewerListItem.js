import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

//list of interviewers list items component, displays interviewer name and avatar
export default function InterviewerListItem(props) {
  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const interviewerImageClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected,
  });

  return (
    <li className={interviewerListItemClass} onClick={props.setInterviewer}>
      <img
        className={interviewerImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
