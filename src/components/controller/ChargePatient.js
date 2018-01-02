import axios from 'axios';

import * as favourites from '../model/favourites';
import SeachItemTable from '../search-item-table.vue';

export default {
    name: "ChargePatient",
    props: ['patient'],
    components: {
        
        "search-item-table":SeachItemTable
    },
    data() {
        return {
            tabs:[
                {
                    name:"Tab1",
                    active: true,
                    key:"tab1"
                },
                {
                    name:"Tab2",
                    active: false,
                    key:"tab2"
                },
                {
                    name:"Tab3",
                    active: false,
                    key:"tab3"
                },
            ],
            favourites: favourites.favourites,
            searchItems:[]
        }
    },
    created() {
        
    },
    computed:{
        formattedDob: function(){
            let dob = this.$props.patient.GBDAT;
            dob= dob.replace(/\//g, '');
            dob= dob.replace(/\(/g, '');
            dob= dob.replace(/\)/g, '');
            dob = dob.replace('Date','');
            dob = new Date(parseInt(dob));
            return dob.toLocaleDateString();
        },
        defaultStorageLoc : function(){
            return this.$store.state.user.defaultStorageLoc;
        },
        images: function(){
            let activeTab = "tab1",
                storageLoc = this.$store.state.user.defaultStorageLoc;
            this.tabs.forEach(tab=>{
                if (tab.active){
                    activeTab = tab.key;
                }
            });
            return this.favourites[storageLoc][activeTab];

        }
    },
    methods : {
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
                //fetch favourites data
                
            }
        }
    }
}