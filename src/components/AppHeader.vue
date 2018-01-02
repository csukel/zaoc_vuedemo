<template>
    <div>


    <!-- navbar (header) -->
    <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">Automation of Charges</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown right>
                    <!-- Using button-content slot -->
                    <template  slot="button-content">
                        <em >{{ user.fullname }}</em>
                    </template>
                    <b-dropdown-item href="#" v-b-modal.userProfileModal>Profile</b-dropdown-item>
                    <b-dropdown-item href="#" v-on:click="onSignout()">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
    <b-modal  id="userProfileModal" centered title="User profile" hide-footer>
        <b-container>
            <b-row style="text-align:center">
                <b-col>
                    <p>
                        <span>Username: <em>{{user.id}}</em></span>
                    </p>
                    <p>
                        <span>Fullname: <em>{{user.fullname}}</em> </span>
                    </p>
                    <p>
                        <span>Storage Location: <em>{{user.defaultStorageLoc}}</em> </span>
                    </p>
                    <p>
                        <span>Tab: <em>{{user.defaultTab}}</em> </span>
                    </p>
            
                </b-col>
            </b-row>


        </b-container>
    </b-modal>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "app-header",
  computed: mapState({
      user: state => state.user,
  }),
  methods: {
    onSignout: function() {
      //alert('signout');
      var url = `/sap/public/bc/icf/logoff`;
      this.$store.state.service.get(url).then(response => {
        location.reload();
      });
    }
  },
  data() {
    return {};
  }
};
</script>


