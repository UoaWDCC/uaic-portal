import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "@components/Header";

const App = () => {
  return (
    <>
      <main>
        <Header />
        <div>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
