import React, { useEffect, useState } from "react";
import { Loader } from "./loader";

const GeneratedIDMessage = ({ id, onConfirm }) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        onConfirm();
      }, 2500);
    }
  }, [clicked]);
  return (
    <div className="alert alert-info mt-3" role="alert">
      Share this ID with the other invitee: {id}
      <button
        className="btn btn-primary ms-3"
        onClick={() => {
          navigator.clipboard.writeText(id);
          setClicked(true);
        }}
      >
        {!clicked ? "Copy To Clipboard" : "Copied"}
      </button>
      {clicked && <Loader typee={"BeatLoader"} size={5} />}
    </div>
  );
};

export default GeneratedIDMessage;
