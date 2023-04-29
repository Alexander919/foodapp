import React from "react";
import { useState, useReducer } from "react";

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
];

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
        default:
            return state;
    }
};

export function ContextComponent({ children }) {

    const [cartItems2, dispatchCart] = useReducer(cartReducer, []);
    
    const addItemToCartHandler2 = item => {
        dispatchCart({ type: "add", payload: item });
    };

    const removeItemFromCartHandler2 = id => {
        dispatchCart({ type: "remove", payload: { id } });
    };

    const [cartOpened, setCartOpened] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCartHandler = (newItem) => {
        //if item already in cart
        //{id, price, qty, name}
        const inx = cartItems.findIndex(item => item.id === newItem.id);

        if(inx !== -1) { //repeated item
            const repeatedItem = cartItems[inx];
            const qty = repeatedItem.qty + newItem.qty;
            // const price = repeatedItem.price + newItem.price;

            const updatedItem = { ...repeatedItem, qty };
            const newCartItems = [...cartItems];
            newCartItems[inx] = updatedItem;

            setCartItems(newCartItems);
        } else {
            setCartItems([...cartItems, newItem]);
        }
        // if (cartItems.some(cItem => cItem.id === newItem.id)) {
        //     setCartItems(oldCartItems => {
        //         return oldCartItems.map(({ id, qty: oldQty, price: oldPrice, name }) => {
        //             if (id === newItem.id) {
        //                 const qty = oldQty + newItem.qty;
        //                 const price = oldPrice + newItem.price;

        //                 return { id, qty, price, name };
        //             }
        //             return { id, qty: oldQty, price: oldPrice, name };
        //         })
        //     });
        // } else {
        //     setCartItems((oldCartItems) => {
        //         return [...oldCartItems, newItem];
        //     });
        // }
    };
    const removeItemFromCartHandler = id => {
        const updatedItems = [...cartItems];
        const inx = updatedItems.findIndex(item => item.id === id);

        if(updatedItems[inx].qty > 1) {
            const updatedItem = { ...updatedItems[inx] };
            updatedItem.qty -= 1;

            updatedItems[inx] = updatedItem;

            setCartItems(updatedItems);
        } else {
            updatedItems.splice(inx, 1);
            setCartItems(updatedItems);
        }
    };

    const cartShowHandler = () => {
        setCartOpened(true);
    };

    const cartCloseHandler = () => {
        setCartOpened(false);
    };

    const context = {
        DUMMY_MEALS,
        cartOpened,
        cartShowHandler,
        cartCloseHandler,
        cartContainedItems: cartItems2,
        cartAddItem: addItemToCartHandler2,
        cartRemoveItem: removeItemFromCartHandler2
    };

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    );
}

export default Context;