import React from "react";

const StickerTeam = (props) => {
  console.log(props);
  return (
    <div className="div-team column center">
      <div
        className="sticker-dashboard column center"
        style={{ backgroundImage: `url(${props.team.image})`, margin: "20px", padding:"5px" }}
      ></div>
      <h3 className="row">{props.team.name}</h3>
    </div>
  );
};

export default StickerTeam;
