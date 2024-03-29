import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

//day list item components in the day list, display day name and spots
export default function DayListItem(props) {
  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  // formats number of spots based on props.spots
  const formatSpots = (spots) => {
    if (!spots) {
      return "no spots remaining";
    }

    if (spots === 1) {
      return `${spots} spot remaining`;
    }

    return `${spots} spots remaining`;
  };

  const spotsMsg = formatSpots(props.spots);

  return (
    <li
      className={dayListItemClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsMsg}</h3>
    </li>
  );
}
