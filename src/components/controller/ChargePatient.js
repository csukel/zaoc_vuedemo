import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name: "ChargePatient",
    props: ['patient'],
    components: {
        "PulseLoader": PulseLoader
    },
    data() {
        return {}
    },
    created() {
        var t = this.$router;
    }
}