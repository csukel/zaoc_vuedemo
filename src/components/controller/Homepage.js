import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name: "Homepage",
    components: {
        "PulseLoader": PulseLoader
    },
    data() {
        return {
            nodata: false,
            showLoading: false,
            busyIndicatorSize: '50px',
            tabs: [
                {
                    name: "Cath-Lab",
                    active: false,
                    sTab: "CATH",
                    falar: 1
                },
                {
                    name: "ICU",
                    active: false,
                    sTab: "ICU",
                    falar: 1
                },
                {
                    name: "OR",
                    active: false,
                    sTab: "OR",
                    falar: 1
                },
                {
                    name: "Ward",
                    active: true,
                    sTab: "WARD",
                    falar: 1
                },
                {
                    name: "All Inpatients",
                    active: false,
                    sTab: null,
                    falar: 1
                },
                {
                    name: "Outpatients",
                    active: false,
                    sTab: null,
                    falar: 2
                },
            ],
            patients: [],
            _patients: []
        };
    },
    created() {
        this.tabs.forEach(element => {
            //set tab as active if it is the default tab of the logged in user
            element.active = this.$store.state.user.defaultTab === element.sTab;
            if (element.active) {
                //if the tab is active/selected fetch the corresponding patients
                this.getPatients(element.sTab, element.falar);
            }
        })
    },
    methods: {
        getGenderSrc: function (patient) {
            var gender = patient.GSCHL;
            if (gender === '1') {
                return "src/assets/Gender_Male.png";
            } else {
                return "src/assets/Gender_Female.png";
            }
        },
        /**
         * Triggered once the user clicks on a tab
         */
        onTabPress: function (tab, evt) {
            var target = evt.target;
            //check if the tab is already active
            if (!tab.active) {
                //find the active tab and deactivate it
                this.tabs.forEach(element => {
                    if (element.active) {
                        element.active = false;
                    }
                });
                //set the selected tab as active
                tab.active = true;
                //fetch data
                this.getPatients(tab.sTab, tab.falar);
            }
        },
        /**
         * Fetch patients data according to the tab that was selected by the user
         */
        getPatients: function (sTab, falar) {
            var url = `/sap/opu/odata/sap/ZAOC_DEV_SRV/PatientCaseSet?$skip=0&$top=100&$filter=`;
            if (sTab) {
                url += `substringof('${sTab}',TAB) and FALAR eq '${falar}'`;
            } else {
                url += `FALAR eq '${falar}'`;
            }
            if (this.$store.state.authenticated) {
                this.patients = [];
                this.showLoading = true;
                this.$store.state.service.get(url)
                    .then(response => {
                        this.patients = response.data.d.results;
                        this._patients = this.patients;
                        this.nodata = this.patients.length === 0 ? true : false;
                        this.showLoading = false;
                    })
                    .catch(e => {
                        alert('Error. Something went wrong!');
                    });
            } else {
                this.$router.replace('/');
            }

        },
        /**
         * Navigate to Charge patient view
         */
        onChargePatient: function(patient,evt){
            // this.$router.push({path:`/chargepatient/${patient.FALNR}`,params: {patient:patient}});
            this.$router.push({name:'ChargePatient',params: {falnr:patient.FALNR,patient:patient}});
            
        },

        onSearch:function(val){
            if (val){
                this.patients = this._patients.filter( patient => {
                    return patient.VNAME.toLowerCase().includes(val.toLowerCase()) || patient.NNAME.toLowerCase().includes(val.toLowerCase())
                 });
            }else{
                this.patients = this._patients;
            }

        },

    }
};