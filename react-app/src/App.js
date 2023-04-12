import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllProducts from "./components/PrehistoricProducts";
import SinglePrehistoricProduct from "./components/SinglePrehistoricProduct";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import { ThemeProvider } from 'react-hook-theme';
import Bookings from "./components/Bookings";
import Search from "./components/Search";
import UserBookings from "./components/UserBookings";
import UserFavorites from "./components/MyFavorites";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <ThemeProvider
    options={{
        theme: 'dark',
        save: true,
    }}
    >
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <AllProducts />
          </Route>
          <Route exact path = '/products/:id'>
            <SinglePrehistoricProduct />
          </Route>
          <Route exact path = '/cart'>
            <Cart />
          </Route>
          <Route exact path = '/bookings'>
            <Bookings />
          </Route>
          <Route exact path = '/myBookings'>
            <UserBookings />
          </Route>
          <Route exact path = '/myFavorites'>
            <UserFavorites />
          </Route>
          <Route exact path='/search'>
            <Search />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      )}
      </ThemeProvider>
    <Footer/>
    </>
  );
}

export default App;

function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for doesn't exist.</p>
      <img src="https://media1.giphy.com/media/14uQ3cOFteDaU/giphy.gif"></img>
    </div>
  )
}
