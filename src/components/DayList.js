import React from "react";
import classNames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  //   const testClass = classNames("day-list__item", {
  //     "day-list__item--selected": props.selected,
  //     "day-list__item--full": !props.spots,
  //   });

  //   const formatSpots = (spots) => {
  //     if (!spots) {
  //       return "no spots remaining";
  //     }

  //     if (spots === 1) {
  //       return `${spots} spot remaining`;
  //     }

  //     return `${spots} spots remaining`;
  //   };

  //   const spotsMsg = formatSpots(props.spots);

  const dayItems = props.days.map((dayItem) => {
    return (
      <DayListItem
        key={dayItem.id}
        name={dayItem.name}
        spots={dayItem.spots}
        selected={dayItem.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{dayItems}</ul>;
}
