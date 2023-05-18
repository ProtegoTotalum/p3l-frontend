<template >
    <main>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 elevation-6>
                    <v-toolbar class="light-blue darken-4">
                        <v-toolbar-title class="white--text">
                            <h1>Login</h1>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card class="light-blue lighten-4">
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field label="Username" v-model="username" :rules="usernameRules" required></v-text-field>
                                    <v-text-field label="Password" v-model="password" type="password" :rules="passwordRules" required></v-text-field>
                                    <v-layout justify-center>
                                        <v-btn class="mr-2" @click="submit" :class=" { 'green darken-1 white--text' : valid, disabled: !valid }">Login</v-btn>
                                        <v-btn @click="clear" class="grey darken-3 white--text">Clear</v-btn>
                                    </v-layout>
                                    <v-layout justify-center class="pt-3">
                                        <v-text>Dont have any account? <v-btn @click="register" text color="indigo accent-4">Register</v-btn></v-text>
                                    </v-layout>
                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>

        <!-- <v-snackbar v-model="verified" color="green" timeout="2000" bottom>
            Berhasil Verifikasi Email
          </v-snackbar> -->
    </main>
</template>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");
    .grey--text{
        font-family: "Roboto";
    }

    .posisinya {
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
    }
</style>

<script>

    export default {
        name: "Login",
        data() {
            return {
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                valid: false,
                password: '',
                passwordRules: [
                    (v) => !!v || 'Password tidak boleh kosong :(',
                ],
                username: '',
                usernameRules: [
                    (v) => !!v || 'Username tidak boleh kosong :(',
                ],
                user:[],
                role: '',
            };
        },
        methods: {
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
            submit() {
                if(this.$refs.form.validate()) {
                    // cek validasi data yang terkirim
                    this.load = true;
                    this.$http.post(this.$api + '/login', {
                            username: this.username,
                            password: this.password
                        }).then(response => {
                            localStorage.setItem('id', response.data.user.id);
                            localStorage.setItem('token', response.data.access_token);
                            localStorage.setItem('role', response.data.user.role);
                            localStorage.setItem("dataPegawai", JSON.stringify(response.data.pegawai));
                            this.error_message = response.data.message;
                            this.color = "green";
                            this.snackbar = true;
                            this.load = false;
                            this.clear();
                            this.role = localStorage.getItem('role');
                            if(this.role == "kasir") {
                                this.$router.push({
                                    name: 'DashboardKasir',
                                });
                            }else if (this.role == "mo"){
                                this.$router.push({
                                    name: 'DashboardMO',
                                });
                            }else if(this.role == "admin"){
                                this.$router.push({
                                    name: 'DashboardAdmin',
                                });
                            }else{
                                this.error_message = "Maaf Anda Tidak Memiliki Hak Akses Website Ini"; 
                                this.color = "red";
                                this.snackbar = true;
                                this.load = false;
                            }
                        }).catch(error => {
                            this.error_message = error.response.data.message;
                            this.color = "red";
                            this.snackbar = true;
                            localStorage.removeItem('token');
                            this.load = false;
                        })
                    // if (this.username == "kasir") {
                    //     this.$http.post(this.$api + '/login', {
                    //         username: this.username,
                    //         password: this.password
                    //     }).then(response => {
                    //         localStorage.setItem('id', response.data.user.id);
                    //         localStorage.setItem('token', response.data.access_token);
                    //         localStorage.setItem("dataPegawai", JSON.stringify(response.data.pegawai));
                    //         this.error_message = response.data.message;
                    //         this.color = "green";
                    //         this.snackbar = true;
                    //         this.load = false;
                    //         this.clear();
                    //         this.$router.push({
                    //             name: 'DashboardKasir',
                    //         });
                    //     }).catch(error => {
                    //         this.error_message = error.response.data.message;
                    //         this.color = "red";
                    //         this.snackbar = true;
                    //         localStorage.removeItem('token');
                    //         this.load = false;
                    //     })
                    // } else {
                    //     if (this.username == "mo") {
                    //         this.$http.post(this.$api + '/login', {
                    //             username: this.username,
                    //             password: this.password
                    //         }).then(response => {
                    //             localStorage.setItem('id', response.data.user.id);
                    //             localStorage.setItem('token', response.data.access_token);
                    //             localStorage.setItem("dataPegawai", JSON.stringify(response.data.pegawai));
                    //             this.error_message = response.data.message;
                    //             this.color = "green";
                    //             this.snackbar = true;
                    //             this.load = false;
                    //             this.clear();
                    //             this.$router.push({
                    //                 name: 'DashboardMO',
                    //             });
                    //         }).catch(error => {
                    //             this.error_message = error.response.data.message;
                    //             this.color = "red";
                    //             this.snackbar = true;
                    //             localStorage.removeItem('token');
                    //             this.load = false;
                    //         })
                    //     } else {
                    //         if (this.username == "admin") {
                    //             this.$http.post(this.$api + '/login', {
                    //                 username: this.username,
                    //                 password: this.password
                    //             }).then(response => {
                    //                 localStorage.setItem('id', response.data.user.id);
                    //                 localStorage.setItem('token', response.data.access_token);
                    //                 this.error_message = response.data.message;
                    //                 this.color = "green";
                    //                 this.snackbar = true;
                    //                 this.load = false;
                    //                 this.clear();
                    //                 this.$router.push({
                    //                     name: 'DashboardAdmin',
                    //                 });
                    //             }).catch(error => {
                    //                 this.error_message = error.response.data.message;
                    //                 this.color = "red";
                    //                 this.snackbar = true;
                    //                 localStorage.removeItem('token');
                    //                 this.load = false;
                    //             })
                    //         }else{
                    //             this.error_message = "We Are Sorry You Don't Have Permission For Entering This Website"; 
                    //             this.color = "red";
                    //             this.snackbar = true;
                    //             this.load = false;
                    //         }
                    //     }
                    // }

                }
            },
            register(){
                this.$router.push({
                    name: 'Register',
                });
            },
            clear() {
                this.$refs.form.reset() // clear form login
            },
            TampilVerifikasi() {
                if (this.$route.query.verified == "success") {
                    this.verified = true;
                    this.$router.push("/");
                }
            },
        },
        mounted() {
            this.TampilVerifikasi();
        },
    };
</script>