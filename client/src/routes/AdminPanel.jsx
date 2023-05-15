// NPM
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../helperFunctions/axiosClient";
// Context
import { ContextProvider } from "../Context/ContextProvider";
// Components
import ApplicationList from "../Components/ApplicationList";

const AdminPanel = () => {
  const [applications, setApplications] = useState([]);
  // Context Provider
  const context = useContext(ContextProvider);
  // useNavigate Hook
  const navigate = useNavigate();
  // Functions
  const fetchData = async () => {
    const applications = await axiosClient({
      method: "GET",
      url: "/api/application",
      params: {
        userID: context.user.uid,
      },
    });
    setApplications(applications.data.data);
  };
  const handleDeleteApplication = async (id, userID) => {
    try {
      await axiosClient({
        method: "DELETE",
        url: "/api/application/id",
        data: {
          id: id,
          userID: userID,
        },
      });
      fetchData();
    } catch (error) {
      alert("Unable to delete");
    }
  };
  const handleEditApplication = (id) => {
    navigate(`/application/${id}`);
  };
  // Hooks
  useEffect(() => {
    if (!context.loggedIn) {
      navigate("/");
    } else {
      fetchData();
    }
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      {applications.length > 0 ? (
        <ApplicationList
          applications={applications}
          handleDeleteApplication={handleDeleteApplication}
          handleEditApplication={handleEditApplication}
        />
      ) : (
        <p>No applications to show!</p>
      )}
    </div>
  );
};

export default AdminPanel;
