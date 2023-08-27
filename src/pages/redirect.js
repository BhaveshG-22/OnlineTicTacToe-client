import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Redirect = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(props.location);
  }, []);
  return <h1>Redirecting to ${props.location}</h1>;
};
