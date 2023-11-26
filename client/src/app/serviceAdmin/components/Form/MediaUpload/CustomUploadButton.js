"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function CustomUploadButton({
  onClick,
  onChange,
  overlayText,
  refName,
  multiple,
}) {
  return (
    <>
      <div className="image-upload-custom-buttom" onClick={onClick}>
        <FontAwesomeIcon icon={faFileArrowUp} />
        <div className="overlay-text">{overlayText}</div>
        <input
          className="fileInput"
          type="file"
          accept="image/*"
          name="main"
          onChange={onChange}
          ref={refName}
          multiple={multiple ? true : false}
        />
      </div>
    </>
  );
}
