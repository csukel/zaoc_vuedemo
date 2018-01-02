import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name: "ChargePatient",
    props: ['authenticated'],
    components: {
        "PulseLoader": PulseLoader
    },
    data() {
        return {}
    }
}