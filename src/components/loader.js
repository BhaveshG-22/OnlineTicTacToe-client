import React from "react";
import {
  BarLoader,
  BeatLoader,
  BounceLoader,
  CircleLoader,
  ClimbingBoxLoader,
} from "react-spinners";

export const Loader = (props) => {
  let LoaderComponent = null;
  console.log(props);
  switch (props.typee) {
    case "BarLoader":
      LoaderComponent = BarLoader;
      break;
    case "BeatLoader":
      LoaderComponent = BeatLoader;
      break;
    case "BounceLoader":
      LoaderComponent = BounceLoader;
      break;
    case "CircleLoader":
      LoaderComponent = CircleLoader;
      break;

    default:
      LoaderComponent = CircleLoader; // Default to BeatLoader if type is not recognized
  }

  return (
    <LoaderComponent color="#0047AB" speedMultiplier={2} size={props.size} />
  );
};
