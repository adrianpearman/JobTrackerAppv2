// NPM Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Footer from "./Footer";
import Navigation from "./Navigation";
import RootProvider from "./RootProvider";
// Pages
import AdminPanel from "../routes/AdminPanel";
import AddApplication from "../routes/AddAplication";
import EditApplication from "../routes/EditApplication";
import ErrorPage from "../routes/ErrorPage";
import Home from "../routes/Home";
import LogInOrSignUp from "../routes/LogInOrSignUp";

const App = () => {
  return (
    <RootProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<LogInOrSignUp />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/application" element={<AddApplication />} />
          <Route path="/application/:id" element={<EditApplication />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </RootProvider>
  );
};

export default App;
