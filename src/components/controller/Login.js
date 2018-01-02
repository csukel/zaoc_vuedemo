import axios from 'axios';
export default {
    name: "Login",
    data() {
        return {
            form: {
                username: "",
                password: ""
            }
        };
    },
    methods: {
        onSubmit: function () {
            var username = this.form.username,
                password = this.form.password;

            if (username.length > 0 && password.length > 0) {
                //authenticate user by sending a request
                var url = `http://${username}:${password}@sapgtw.ahi.com.cy:8000/sap/bc/ui2/start_up`
                axios.get(url, {
                    auth: {
                        username: username,
                        password: password
                    }
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
                            //navigate to homepage view
                            this.$router.push('/homepage');
                        })
                        .catch(e => {
                            alert('Error ' + e);
                        });
                    })
                    .catch(e => {
                        if (e.response.status === 401) {
                            alert('Opps. Wrong credentials');
                        }
                    })
            }
        },
        onReset: function () { }
    }
};