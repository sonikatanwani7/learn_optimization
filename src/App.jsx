import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import ProductList from "./components/productList/ProductList";
import ProductDetail from "./components/productDetail/ProductDetail";
import SearchResult from "./components/search/SearchResult";
import CartPage from "./components/cart/CartPage";
import { fetchAllProducts } from "./store/productsSlice";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <section id="header">
        <Header />
      </section>

      <section id="content">
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Dashboard} />
          <Route path="/productlist/:categoryId" component={ProductList} />
          <Route path="/products/:productId" component={ProductDetail} />
          <Route path="/search" component={SearchResult} />
          <Route path="/cart" component={CartPage} />
        </Switch>
      </section>

      <section id="footer">
        <Footer />
      </section>
    </>
  );
}

export default App;
