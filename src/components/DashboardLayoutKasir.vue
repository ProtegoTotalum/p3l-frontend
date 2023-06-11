<template>
    <div class="dashboard">
        <v-navigation-drawer v-model="drawer" class="fullheight, light-blue darken-4" width="256" app>
            <v-list-item>
                <v-list-item-content>
                    <!-- <v-list-item-title class="title"> <v-icon color="black">mdi-account</v-icon> GOFIT </v-list-item-title> -->
                    <v-list-item-title class="title"> GOFIT </v-list-item-title>
                    <v-list-item-subtitle > Welcome {{ users.name }} !!!</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list dense nav>
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    tag="router-link"
                    :to="item.to" color="white --text">

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app fixed height="75px" class="light-blue lighten-4">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <VSpacer />
            <v-toolbar-items>
                <v-btn text router @click="logout"><v-icon>mdi-power</v-icon></v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
//import axios from "axios";


export default {
    name: "Dashboard",
    data() {
        return {
            users: [],
            drawer: true, 
            items: [
                { title: 'Member', to: '/member'},
                { title: 'Transaksi Aktivasi', to: '/transaksiaktivasi'},
                { title: 'Transaksi Deposit Reguler', to: '/transaksidepositreguler'},
                { title: 'Transaksi Deposit Kelas Paket', to: '/transaksidepositkelaspaket'},
                { title: 'Deaktivasi Member', to: '/deaktivasimember'},
                { title: 'Reset Deposit Kelas', to: '/resetdepositkelas'},
                { title: 'Booking Gym', to: '/bookinggym'},
                { title: 'Booking Kelas', to: '/bookingkelas'},
                { title: 'User', to: '/user'}
            ],
        };
    },
    methods: {
        logout(){
            // localStorage.removeItem('id');
            // localStorage.removeItem('token');
            // location.reload();
            // this.$router.push({
            //     name: 'Home',
            // });
            this.$router.push('/');
            localStorage.clear();
        },
        readData() {
            var url = this.$api + '/user/' + localStorage.getItem('id');
            this.$http.get(url, {
            }).then(response => {
                this.users = response.data.data;
            })
            // axios 
            // .get("http://127.0.0.1:8000/api/user" ,{

            // }).then(response => {
            //     user.value = response.data.data
            //     console.log(user.value)
            // }).catch(error => {
            //     console.log(error.response.data)
            // })
        },
    },

    mounted() {
        this.readData();
    },
};
</script>

<style scoped>
    .fullheight {
        min-height: 100vh !important;
    }

    .router{
        text-decoration: none;
        color: black;
    }
</style>