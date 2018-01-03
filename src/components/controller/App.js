import AppHeader from "@/components/AppHeader"
import axios from 'axios';
import { mapState } from 'vuex'

export default {
    name: "app",
    components: {
        'app-header': AppHeader
    },
    computed: mapState({
        user: state => state.user,
        authenticated: state => state.authenticated
    }),
    data() {
        return {

        }
    },
    beforeCreate() {
        //send a dummy request to check if user is already authenticated
        // var url = "http://useraneme:password@sapgtw.ahi.com.cy:8000/sap/bc/ui2/start_up"
        var url = "/sap/bc/ui2/start_up"
        axios.get(url, {
        })
            .then(response => {
                const user = {
                    name: response.data.firstName,
                    id: response.data.id,
                    fullname: response.data.fullName
                };
                this.$store.state.service.get(`/sap/opu/odata/sap/ZAOC_DEV_SRV/UsersSet?$filter=UNAME eq '${user.id}'`)
                    .then(response => {
                        const data =response.data.d.results[0];
                        user.defaultStorageLoc = data.LGORT;
                        user.defaultTab = data.TAB;

                        //save data to store
                        this.$store.commit('SAVE_STARTUP_PARAM', user);
                        this.$store.commit('SUCCESS_ATUH');

                        this.$router.push('/homepage');
                    })
                    .catch(e => {
                        alert('Error ' + e);
                    });

            })
            .catch(e => {
                if (e.response.status === 401) {
                    //navigate to login view
                    this.$router.push('/login');
                }
            })
    }
};