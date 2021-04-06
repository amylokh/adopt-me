import React from "react";
import { Link } from "@reach/router";

export default function Pet({ name, animal, breed, media, location, id }) {
  let mediaImage = "http://placecorgi.com/300/300";
  if (media.length != 0) {
    mediaImage = media[0].small;
  }

  // if you return an a tag from here, basically you're doing a full page change
  // and hence all the page history & react dom will be destroyed and re-created on the new page
  // in order to retain that you must use a Link tag from the reach router
  return (
    <Link to={`/details/${id}`} className={name}>
      <div className="image-container">
        <img src={mediaImage} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
}
