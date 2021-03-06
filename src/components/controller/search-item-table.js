import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import * as types from '../../store/mutation-types';
export default {
    name: "search-item-table",
    components: {
        "PulseLoader": PulseLoader,
    },
    data() {
        return {
            perPage:0,
            currentPage:1,
            showLoading: false,
            busyIndicatorSize: '30px',
            searchItems: [],
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
                }
            ]
        };
    },
    methods: {
        onDeleteSearchTerm: function (event) {
            var t = event;
        },
        onInputSearchItems: function (val, event) {
            if (!val) {
                this.searchItems = [];
            }
        },
        onSearchItems: function (val) {
            if (val) {
                let url = `/sap/opu/odata/sap/ZAOC_DEV_SRV/MaterialSet?$filter=(substringof('${val.toUpperCase()}',MAKTX) or substringof('${val}',MATNR) or substringof('${val.toLowerCase()}',EAN11)) and LGORT eq '${this
                    .$store.state.user.defaultStorageLoc}'`;

                this.showLoading = true;
                this.$store.state.service
                    .get(url)
                    .then(response => {
                        let data = response.data.d.results,
                            results = [];
                        data.forEach(element => {
                            let item = {
                                code: element.MATNR,
                                description: element.MAKTX,
                                availQuantity: element.MENGE,
                                chargeQuantity: element.CHARGEQTY,
                                storageLocation: element.LGORT
                            };
                            results.push(item);
                        });
                        this.searchItems = results;
                        this.showLoading = false;
                    })
                    .catch(error => {
                        this.showLoading = false;
                        alert(`Error ${error}`);
                    });
            } else {
                this.searchItems = [];
            }
        },
        increaseQty: function(event,data){
            let item = data.item;
            if (parseInt(item.availQuantity)> parseInt(item.chargeQuantity)){
                item.chargeQuantity++;
            }
        },
        decreaseQty: function(event,data){
            let item = data.item;
            if ( 0 < parseInt(item.chargeQuantity)){
                item.chargeQuantity--;
            }
        },
        onChargeQtyChange: function(data){
            if (parseInt(data.item.chargeQuantity) > parseInt(data.item.availQuantity) || parseInt(data.item.chargeQuantity ) < 0 ){
                data.item.chargeQuantity = data.item.availQuantity;
            }
        },
        addItemsToCart: function(){
            let filteredItems = this.searchItems.filter(item=>{
                return parseInt(item.availQuantity) > 0 && parseInt(item.chargeQuantity)>0;
            });
            //commit filteredItems to the store 
            this.$store.commit(types.ADD_TO_CART,filteredItems);
            //clear search items table
            this.onClearSearchItems();
        },
        onClearSearchItems: function(){
            this.searchItems=[];
        }
    }
};