"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.scss";

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`searchBarWrapper ${isFocused ? "focused" : null}`}>
      <label htmlFor="search">
        <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search in Pop-Up Store..."
        autoComplete="off"
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
    </div>
  );
}
