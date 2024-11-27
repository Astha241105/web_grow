import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./backgroundhome.css";
import { fetchParticipantProfile } from "../../components/store/slices/participantprofile";

const Backgroundhome = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchParticipantProfile());
    }
  }, [dispatch]);

  return <div className="backgroundhome">{children}</div>;
};

export default Backgroundhome;
