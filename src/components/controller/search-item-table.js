import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
export default {
    name: "search-item-table",
    components: {
        "PulseLoader": PulseLoader,
    },
    data() {
        return {
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
            if (item.availQuantity> item.chargeQuantity){
                item.chargeQuantity++;
            }
        },
        decreaseQty: function(event,data){
            let item = data.item;
            if ( 0 < item.chargeQuantity){
                item.chargeQuantity--;
            }
        },
        addItemsToCart: function(){
            
        }
    }
};