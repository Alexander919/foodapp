import React from "react";
import { useState, useEffect, useReducer } from "react";
import useFetch from "../components/hooks/useFetch";

const Context = React.createContext();

const cartReducer = (state, action) => {
    let inx;
    switch(action.type) {
        case "add":
            //if item already in cart
            //{id, price, qty, name}
            inx = state.findIndex(item => item.id === action.payload.id);

            if(inx !== -1) { //repeated item
                const repeatedItem = state[inx];
                const qty = repeatedItem.qty + action.payload.qty;
                // const price = repeatedItem.price + newItem.price;

                const updatedItem = { ...repeatedItem, qty };
                const newCartItems = [...state];
                newCartItems[inx] = updatedItem;

                return newCartItems;
            } else {
                return [...state, action.payload];
            }
        case "remove":
            const updatedItems = [...state];
            inx = updatedItems.findIndex(item => item.id === action.payload.id);

            if(updatedItems[inx].qty > 1) {
                const updatedItem = { ...updatedItems[inx] };
                updatedItem.qty -= 1;

                updatedItems[inx] = updatedItem;

                return updatedItems;
            } else {
                updatedItems.splice(inx, 1);
                return updatedItems;
            }

        case "reset-cart":
            return [];
        default:
            return state;
    }
};

export function ContextComponent({ children }) {
    const [cartItems2, dispatchCart] = useReducer(cartReducer, []);

    const [mealsLoading, mealsError, fetchMeals] = useFetch();
    const [orderUploading, orderUploadingError, uploadOrder] = useFetch();

    const [orderPlaced, setOrderPlaced] = useState(null);
    const [cartOpened, setCartOpened] = useState(false);
    const [meals, setMeals] = useState([]);

    const mealsDataAction = (data) => {
        setMeals(data);
    };

    const resetCart = () => {
        dispatchCart({type: "reset-cart"});
    };

    const uploadOrderAction = (data) => {
        console.log("database response", data);
        resetCart();
        setOrderPlaced(data);
    };

    useEffect(() => {
        fetchMeals("https://react-http-84fba-default-rtdb.europe-west1.firebasedatabase.app/meals.json", null, mealsDataAction);
    }, [fetchMeals]);
    
    const addItemToCartHandler2 = item => {
        dispatchCart({ type: "add", payload: item });
    };

    const removeItemFromCartHandler2 = id => {
        dispatchCart({ type: "remove", payload: { id } });
    };

    const cartShowHandler = () => {
        setCartOpened(true);
    };

    const cartCloseHandler = () => {
        setCartOpened(false);
        setOrderPlaced(null);
    };

    const context = {
        meals,
        cartOpened,
        cartShowHandler,
        cartCloseHandler,
        cartContainedItems: cartItems2,
        cartAddItem: addItemToCartHandler2,
        cartRemoveItem: removeItemFromCartHandler2,
        mealsLoading,
        mealsError,
        orderUploading,
        orderUploadingError,
        orderPlaced,
        uploadOrder,
        uploadOrderAction
    };

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    );
}

export default Context;