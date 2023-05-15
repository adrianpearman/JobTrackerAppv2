// NPM Modules
import { useContext, useEffect } from "react";
import axiosClient from "../helperFunctions/axiosClient";
//
import { ContextProvider } from "../Context/ContextProvider";

const Home = () => {
  const context = useContext(ContextProvider);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosClient({
          method: "GET",
          url: "/api/analytics",
          params: {
            userID: context.user.uid,
          },
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card"></div>
    </>
  );
};

export default Home;
