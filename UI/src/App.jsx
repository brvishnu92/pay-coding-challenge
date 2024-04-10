import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { HomeRoute } from "./routes/HomeRoute";
import { CustomerRoute } from "./routes/CustomerRoute";
import { Provider } from "react-redux";
import { store } from "./redux/store";
export const App = () => {
  return (
    <>
      <Provider store={store()}>
        <Navbar />
        <Switch >
          <Route path={"/customer/:id"} component={CustomerRoute} />
          <Route path={"/"} component={HomeRoute} />
        </Switch>
      </Provider>
    </>
  );
};
