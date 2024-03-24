import MainAppBar from "components/main-app-bar";
import { FilterProvider } from "context/FilterContext";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import Filters from "screens/filters";
import Home from "screens/home";
import Releases from "screens/releases";
import Timeline from "screens/timeline";
import { analytics, useFetchBosses } from "services/firebase-service";

const LoggedNavigation = ({ user }) => {
  const [timelineOpen, setTimelineOpen] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(null);

  const bosses = useFetchBosses(user.uid);

  if (typeof window !== "undefined" && user) {
    analytics(user.uid);
  }

  const switchTimelineVisibility = () => {
    setTimelineOpen(!timelineOpen);
  };

  const switchFiltersVisibility = () => {
    setFiltersOpen(!filtersOpen);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bosses && bosses.length > 1) {
      setLoading(false);
    }
  }, [bosses]);

  return (
    <FilterProvider>
      <Router>
        <MainAppBar
          handleTimeline={switchTimelineVisibility}
          timelineOpen={timelineOpen}
          handleFilter={switchFiltersVisibility}
          filtersOpen={filtersOpen}
        />
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 32,
            }}
          >
            <PacmanLoader color="#3f51b5" />
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <Filters visible={filtersOpen} />
            <div style={{ flexGrow: 1, padding: "16px" }}>
              <Routes>
                <Route path="/" element={<Home bosses={bosses} />} />
                <Route path="/releases" element={<Releases />} />
              </Routes>
            </div>
            <Timeline visible={timelineOpen} bosses={bosses} />
          </div>
        )}
      </Router>
    </FilterProvider>
  );
};

export default LoggedNavigation;
