import AppHeader from "@/components/AppHeader"
import axios from 'axios';

export default {
    name: "app",
    components: {
        'app-header': AppHeader
    },
    data() {
        return {
            user: { fullname: '' },
            authenticated: false,
        }
    },
    methods: {
        authAction: function (user) {

            this.user = user;
            this.authenticated = true;
            this.$router.push('/homepage');

        }
    },
    beforeCreate() {
        //send a dummy request to check if user is already authenticated
        var url = "http://useraneme:password@sapgtw.ahi.com.cy:8000/sap/bc/ui2/start_up"
        axios.get(url, {
        })
            .then(response => {
                this.user = {
                    name: response.data.firstName,
                    id: response.data.id,
                    fullname: response.data.fullName
                };
                this.authenticated = true;
                this.$router.push('/homepage');
            })
            .catch(e => {
                if (e.response.status === 401) {
                    //navigate to login view
                    this.$router.push('login');
                }
            })
    }
};