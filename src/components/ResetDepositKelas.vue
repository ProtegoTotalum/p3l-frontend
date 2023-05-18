<template>
    <v-main class="list">
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Reset Deposit Kelas</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  Label="Search"
                  outlined
                  hide 
                  details 
                  style="margin-top: 30px"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialogReset = true"> Reset </v-btn>
            </v-card-title>
        </v-card>
        <v-card>
            <v-data-table :headers="headers" :items="depositkelast" :search="search">
            </v-data-table>
        </v-card>


    <v-dialog v-model="dialogReset" persistent max-width="327px">
        <div class="text-center">
            <v-sheet class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block" color="blue-grey darken-3" dark >
                <div class="grey--text text--lighten-1 text-body-2 mb-4">
                   Reset Deposit ?
                </div>
                <v-btn plain color="blue darken-1" @click="dialogReset = false">No</v-btn>
                <v-btn plain color="blue darken-1" @click="reset">Yes</v-btn>
            </v-sheet> 
        </div>
    </v-dialog>
      <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }} </v-snackbar>
    </v-main>
</template>

<script>

export default {
    name: "List",
    data() {
        return{
            search: null,
            dialogDetail: false,
            dialogReset: false,
            idUser: 0,
            editId: '',
            deleteId: '',
            resetId:'',
            error_message : '',
            snackbar : false,
            headers: [
                {
                    text: "Nomor Member",
                    align: "start",
                    sortable: true,
                    value: "nomor_member",
                },
                { text: "Nama Member", value: "nama_member" },
                { text: "Nama Kelas", value: "nama_kelas" },
                { text: "Sisa Deposit Kelas", value: "sisa_deposit_kelas"},
                { text: "Masa Berlaku Deposit Kelas", value: "masa_berlaku_deposit_kelas" },
            ],
            depositkelas: new FormData,
            depositkelast: [],
            // form: {
            //     nama_member: null,
            //     email_member: null,
            //     nomor_telepon_member: null,
            //     tanggal_lahir_member: null,
            //     alamat_member:null,
            //     sisa_deposit_reguler: 0,
            //     masa_berlaku_member: null,
            //     username_member: null,
            //     password_member: null,
            //     action: null,
            // },
        };
    },
    methods: {
        // Read Data Member
        readData() {
            var url = this.$api + '/masaberlakudepositkelas';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.depositkelast = response.data.data;
            })
        },
        reset() {
            var url = this.$api + '/resetdeposit';
            this.$http.get(url, {
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        close() {
            this.readData();
            this.dialogReset= false;
        },

},

    computed: {
        formTitle() {
            return this.inputType;
        },

    },

    mounted() {
        this.readData();
        this.idUser = localStorage.getItem('id');
    },
};
</script>

<style>
  .text {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-size: 40px;
    font-style: italic;
  }
</style>