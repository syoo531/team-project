"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function ImagePreview({ uniqueId, deleteImage, image }) {
  return (
    <>
      <div key={uniqueId} className="image-upload-wrapper">
        <div className="image-upload-custom-buttom" onClick={deleteImage}>
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
        <div className="image-preview">
          <img key={uniqueId} src={image} />
        </div>
      </div>
    </>
  );
}
