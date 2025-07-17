import React from "react";

const CardService = ({ id, src, alt, title, description, link }) => {
  return (
    <>
      <div id={id} className="card">
        <img src={src} alt={alt} />
        <h3>{title}</h3>
        <p>{description}</p>
        <a href="#">{link} &rarr;</a>
      </div>
    </>
  );
};

export default CardService;
