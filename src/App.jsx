import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import React, { useContext } from "react";
import Context from "./store/Context"; 


function App() {
    const { cartOpened } = useContext(Context);
    return (
        <>
            { cartOpened && <Cart />}
            <Header />
            <main>
                <Meals />
            </main>
        </>
    );
}

export default App;
