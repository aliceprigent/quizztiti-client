import React from "react";

const StickerDashboard = (props) => {
  // console.log(props);
  return (
    <div className="sticker-dashboard column center" style={{backgroundImage:`url(${props.quizz.image})`}}>
    
      <h3 className="row">{props.quizz.title}</h3>
    </div>
  );
};

export default StickerDashboard;
