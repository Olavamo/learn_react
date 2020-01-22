import React, { useEffect, useState } from "react";
import CardList from "./components/CardList";
import ShoppingCart from "./components/ShoppingCart";
import ShoppingCartProvider from "./context/ShoppingCartContext";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Message, Button } from "rbx";

const firebaseConfig = {
  apiKey: "AIzaSyBFTCd9lcqZRrNM5n6IE48PWsoQaPkz3uM",
  authDomain: "shoppingcart-nu.firebaseapp.com",
  databaseURL: "https://shoppingcart-nu.firebaseio.com",
  projectId: "shoppingcart-nu",
  storageBucket: "shoppingcart-nu.appspot.com",
  messagingSenderId: "502800341288",
  appId: "1:502800341288:web:ec5644bcaa4f5b9c89d81d"

};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const Banner = ({ user }) => (
  <React.Fragment>{user ? <Welcome user={user} /> : <SignIn />}</React.Fragment>
);

const SignIn = () => (
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
);

const Welcome = ({ user }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);


const App = () => {
  const [user, setUser] = useState(null);

  const [data, setData] = useState({});
  
  const [inventory, setInventory] = useState({});


  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      const json = await response.json();
      setData(json);
    };

  
    fetchProducts();

    const handleInventory = snap => {
      if (snap.val()) setInventory(snap.val());
    };
    db.on("value", handleInventory, error => alert(error));
    return () => {
      db.off("value", handleInventory);
    };
  }, []);


  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <ShoppingCartProvider>
      <ul>
      <ShoppingCart />
      <Banner user={user}/>
        <CardList
          products={products}
          inventory={inventory}
          setInventory={setInventory}/>
        
      </ul>
    </ShoppingCartProvider>
  );
};

export default App;