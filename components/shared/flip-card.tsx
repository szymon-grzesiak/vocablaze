"use client";

import React, { useState } from "react";

const FlipCard = ({ children }: { children: React.ReactNode }) => {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped(!flipped);
  };
  return (
    <div
      className={`card ${flipped ? "flipped" : ""}`}
      onClick={handleCardClick}
    >
      <div className="front">{children}</div>
      <div className="back">
        <p>Back of the card</p>
      </div>
    </div>
  );
};

export default FlipCard;
