import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./backgroundhome.css";
import Upcoming from "../upcoming-events/upcoming.jsx";
import Eventlist from "../diff-events/eventlist.jsx";
import Hostnow from "../hostAnOpportunity/hostnow.jsx";
import Footer from "../footer/footer.jsx";
import Des from "../description/description.jsx";
import Browsebycategory from "../browsebycategory/browsebycategory.jsx";
import Down from "../down/down.jsx";
import NavbarSwitcher from "../navswitch.jsx";
import { fetchEventsPublic } from "../../components/store/slices/publicevents.js";
import { fetchFavoriteEvents } from "../../components/store/slices/favouriteevents.js";

const Backgroundhome = () => {
  const dispatch = useDispatch();
  const { events, status } = useSelector((state) => state.publicEvents);
  const [favoriteEvents, setFavoriteEvents] = useState([]);

  const authToken = localStorage.getItem("authToken");
  const isAuthenticated = !!authToken;

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchEventsPublic());

      if (isAuthenticated) {
        const favoritesResponse = await dispatch(fetchFavoriteEvents()).unwrap();
        setFavoriteEvents(favoritesResponse.data || []); // Assuming favorites are in data
      }
    };

    fetchData();
  }, [dispatch, isAuthenticated]);

  return (
    <div>
      <NavbarSwitcher bgColor="#FDF8EE" />
      <Des events={events} status={status} />
      <Down />
      <Browsebycategory />
      <Upcoming events={events} status={status} favoriteEvents={favoriteEvents} />
      <Eventlist />
      <Hostnow />
      <Footer />
    </div>
  );
};

export default Backgroundhome;
