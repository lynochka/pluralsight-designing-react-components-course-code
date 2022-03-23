import { useState } from "react";
import { range } from "../utils";

function useSpeakerFilter(startingShowSessions, startingEventYear) {
  const [showSessions, setShowShessions] = useState(startingShowSessions);
  const [eventYear, setEventYear] = useState(startingEventYear);
  const [searchQuery, setSearchQuery] = useState("");

  const EVENT_YEARS = range(2008, 2020).map((x) => x.toString());

  return {
    showSessions,
    setShowShessions,
    eventYear,
    setEventYear,
    searchQuery,
    setSearchQuery,
    EVENT_YEARS,
  };
}

export default useSpeakerFilter;
