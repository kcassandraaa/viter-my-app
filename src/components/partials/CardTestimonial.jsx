import React from 'react'

const CardTestimonial = ({src, alt, comment, name, position}) => {
  return (
    <>
      <div className="testimonialsItem">
        <img src={src} alt={alt} />
        <p>
          "{comment}"
        </p>
        <h6>{name}</h6>
        <small>{position}</small>
      </div>
    </>
  );
}

export default CardTestimonial
