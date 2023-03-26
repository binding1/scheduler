import React from "react";
import DayListItem from "./DayListItem";

// day list components to display days of the week
export default function DayList(props) {
  const dayItems = props.days.map((dayItem) => {
    return (
      <DayListItem
        key={dayItem.id}
        selected={dayItem.name === props.day}
        setDay={props.setDay}
        {...dayItem}
      />
    );
  });
  return <ul>{dayItems}</ul>;
}
