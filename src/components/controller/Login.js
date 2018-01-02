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
                        //alert('Authenticated successfully!');
                        var user = {
                            name: response.data.firstName,
                            id: response.data.id,
                            fullname: response.data.fullName
                        };
                        this.authenticated = true;
                        //emit event
                        this.$emit('authentication',user);
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