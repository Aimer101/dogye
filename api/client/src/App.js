import "./App.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import SingleProduct from "./pages/SingleProduct";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./ScrolltoTop";
import Success from "./pages/Success";
import Track from "./pages/Track";
import NoPages from "./pages/NoPages";

function App() {
  return (
    <Router onUpdate={() => window.scrollTo(0, 0)}>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/products/">
          <ProductList />
        </Route>
        <Route path="/product/">
          <SingleProduct />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>

        <Route path="/track">
          <Track />
        </Route>
        <Route>
          <NoPages />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
