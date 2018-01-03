import * as types from '../../store/mutation-types';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
export default {
    name: "CartTable",
    props: [
        'patient'
    ],
    components: {
        "PulseLoader": PulseLoader,
    },
    data() {
        return {
            showLoading: false,

            busyIndicatorSize: '30px',
            fields: [
                {
                    key: "code",
                    label: "SAP Code",
                    formatter: value => {
                        return parseInt(value);
                    }
                },
                {
                    key: "description",
                    label: "Description"
                },
                {
                    key: "availQuantity",
                    label: "Available Quantity (PC)"
                },
                {
                    key: "chargeQuantity",
                    label: "Charge Quantity"
                },
                {
                    key: "storageLocation",
                    label: "Storage Location"
                },
                {
                    key: "deleteItem",
                    label: ""
                }
            ]
        }
    },
    computed: {
        cartItems() {
            return this.$store.state.cart;
        }
    },
    methods: {
        increaseQty: function (event, data) {
            const item = data.item;
            this.$store.commit(types.INCREASE_CART_ITEM_QTY, item);
        },
        decreaseQty: function (event, data) {
            const item = data.item;
            this.$store.commit(types.DECREASE_CART_ITEM_QTY, item);
        },
        onChargeQtyChange: function (value, data) {
            const item = data.item;
            this.$store.commit(types.CHANGE_CART_ITEM_QTY, { item: item, newValue: value });

        },
        onRemoveCartItem: function (data) {
            const index = data.index;
            this.$store.commit(types.REMOVE_ITEM_FROM_CART, index);
        },

        onChargePatient: function () {
            const cartItems = this.cartItems,
                patientCase = this.patient,
                storageLoc = this.$store.state.user.defaultStorageLoc,
                chargeItems = [],
                url = `/sap/opu/odata/sap/ZAOC_DEV_SRV/ChargeHeadSet`;
            if (cartItems && cartItems.length>0) {
                cartItems.forEach(cartItem => {
                    chargeItems.push({
                        "FALNR": patientCase.FALNR,
                        "MATNR": cartItem.code,
                        "MENGE": cartItem.chargeQuantity.toString(),
                        "ERBOE": patientCase.ORGPF,
                        "LNRLS": ""
                    });
                });
                this.showLoading = true;
                this.$store.state.service.get(`/sap/opu/odata/sap/ZAOC_DEV_SRV/$metadata`, {
                    headers:
                        {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "X-CSRF-Token": "Fetch"
                        }
                }).then(response => {
                    this.$store.state.service.post(url,
                        {
                            "FALNR": patientCase.FALNR,
                            "PATNR": patientCase.PATNR,
                            "LGORT": storageLoc,
                            "ACTION": "I",
                            "ChargeNavigation": chargeItems
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "X-CSRF-Token": response.headers["x-csrf-token"]
                            }
                        }
                    ).then(response => {
                        this.showLoading = false;
                        const data = response.data.d;
                        this.clearCart();
                        alert(`${data.MESSAGE}\n${data.MESSAGE2}`);
                        this.$router.replace({path:'/homepage'});
                    })
                        .catch(e => {
                            this.showLoading = false;
                            alert(`Error ${e}`);
                        });

                }).catch(e => {
                    this.showLoading = false;
                    alert(`Error ${e}`);
                })
            }




        },

        clearCart: function () {
            this.$store.commit(types.CLEAR_CART);
        }
    }
}