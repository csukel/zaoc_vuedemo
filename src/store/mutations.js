import * as types from './mutation-types';

const mutations = {

    [types.SAVE_STARTUP_PARAM](state, user) {
        state.user = user;
    },

    [types.SUCCESS_AUTH](state) {
        state.authenticated = true;
    },

    /*  Cart related mutations */

    /**
     * 
     * Add items to cart
     * @param {any} state 
     * @param {any} items 
     */
    [types.ADD_TO_CART](state, items) {
        items.forEach(item => {
            var bAdded = false;
            state.cart.forEach(cartItem => {
                //if both items have same sap code (matnr) .....
                if (cartItem.code === item.code) {
                    // if the sum of both charge qties does not exist the available then modify cart item's charge qty accordingly ...
                    if (parseInt(cartItem.availQuantity) >= parseInt(cartItem.chargeQuantity) + parseInt(item.chargeQuantity)) {
                        cartItem.chargeQuantity = `${parseInt(cartItem.chargeQuantity) + parseInt(item.chargeQuantity)}`;
                    } else {
                        //... otherwise cart item's charge qty should be equal to the available
                        cartItem.chargeQuantity = cartItem.availQuantity;
                    }
                    bAdded = true;
                    return;
                }
            });
            if (!bAdded) {
                state.cart.push(item);
            }
        });

    },

    /**
     * Remove all items from the cart
     * 
     * @param {any} state 
     */
    [types.CLEAR_CART](state) {
        state.cart = [];
    },

    /**
     * Remove item from cart using item's position (index)
     * 
     * @param {any} state 
     * @param {any} itemCode 
     */
    [types.REMOVE_ITEM_FROM_CART](state, index) {
        state.cart.splice(index, 1);
    },


    /**
     * Increment the charge quantity of a cart item
     * 
     * @param {any} state 
     * @param {any} item 
     */
    [types.INCREASE_CART_ITEM_QTY](state, item) {
        state.cart.forEach(cartItem => {
            if (cartItem.code === item.code && parseInt(cartItem.availQuantity) > parseInt(cartItem.chargeQuantity)) {
                cartItem.chargeQuantity++;
            }
        });
    },

    /**
     * Decrement the charge quantity of a cart item
     * 
     * @param {any} state 
     * @param {any} item 
     */
    [types.DECREASE_CART_ITEM_QTY](state, item) {
        state.cart.forEach(cartItem => {
            if (cartItem.code === item.code && parseInt(cartItem.chargeQuantity) > 1) {
                cartItem.chargeQuantity--;
            }
        });
    },

    /**
     * Change cart item which has been modified through manuall data entry
     * 
     * @param {any} state 
     * @param {any} item 
     * @param {any} newValue
     */
    [types.CHANGE_CART_ITEM_QTY](state, {item ,newValue}) {
        state.cart.forEach(cartItem => {
            if (cartItem.code === item.code &&  (parseInt(newValue) > parseInt(item.availQuantity) || parseInt(newValue) < 0)) {
                cartItem.chargeQuantity = cartItem.availQuantity;
            }else {
                cartItem.chargeQuantity = parseInt(newValue);
            }
        })

    }

};

export default {
    mutations
}