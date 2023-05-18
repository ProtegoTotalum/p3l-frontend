<template>
    <v-main class="list">
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Deaktivasi Member</v-list-item-title>
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
                <v-btn color="success" dark @click="dialogDeaktivasi = true"> Deaktivasi </v-btn>
            </v-card-title>
        </v-card>
        <v-card>
            <v-data-table :headers="headers" :items="members" :search="search">
              <template v-slot:[`item.details`]="{ item }">
                <v-btn small color="mr-2 blue" @click="showItem(item)"> Detail </v-btn>
              </template>
            </v-data-table>
        </v-card>


    <v-dialog v-model="dialogDeaktivasi" persistent max-width="327px">
        <div class="text-center">
            <v-sheet class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block" color="blue-grey darken-3" dark >
                <div class="grey--text text--lighten-1 text-body-2 mb-4">
                    Deaktivasi ?
                </div>
                <v-btn plain color="blue darken-1" @click="dialogDeaktivasi = false">No</v-btn>
                <v-btn plain color="blue darken-1" @click="deaktivasi">Yes</v-btn>
            </v-sheet> 
        </div>
    </v-dialog>

    <v-dialog v-model="dialogDetail" persistent max-width="600px">
        <v-card class="grey lighten-3">
            <v-card-title>
                <span class="headline"> Detail Member</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field
                      v-model="form.nomor_member"
                      label="Nomor Member"
                      variant="outlined"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      v-model="form.nama_member"
                      label="Nama Member"
                      variant="outlined"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      v-model="form.email_member"
                      label="Email Member"
                      variant="outlined"
                      readonly 
                    ></v-text-field>
                    <v-text-field
                      v-model="form.nomor_telepon_member"
                      label="Nomor Telepon Member"
                      variant="outlined"
                      readonly 
                    ></v-text-field>
                    <v-text-field
                      v-model="form.tanggal_lahir_member"
                      label="Tanggal Lahir Member"
                      variant="outlined"
                      readonly 
                    ></v-text-field>
                    <v-text-field
                      v-model="form.alamat_member"
                      label="Alamat Member"
                      required 
                    ></v-text-field>
                    <v-text-field
                      v-model="form.sisa_deposit_reguler"
                      label="Deposit Reguler"
                      variant="outlined"
                      readonly 
                    ></v-text-field>
                    <v-text-field
                      v-model="form.masa_berlaku_member"
                      label="Masa Berlaku Member"
                      variant="outlined"
                      readonly 
                    ></v-text-field>
                    <v-text-field
                      v-model="form.status_member"
                      label="Status Member"
                      variant="outlined"
                      readonly 
                    ></v-text-field>
                    <v-text-field
                      v-model="form.username_member"
                      label="Username Member"
                      variant="outlined"
                      readonly 
                    ></v-text-field>
                    <v-text-field
                      v-model="form.password_member"
                      label="Password Member"
                      variant="outlined"
                      readonly 
                    ></v-text-field>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancelDetail"> Cancel </v-btn>
            </v-card-actions>
        </v-card>
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
            dialogDeaktivasi: false,
            idUser: 0,
            editId: '',
            deleteId: '',
            resetId:'',
            formData: {
                sisa_deposit_reguler: 0,
                masa_berlaku_member: 'Belum Aktivasi',
            },
            heading: "Member Card",
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
                { text: "Email Member", value: "email_member" },
                { text: "Nomor Telepon Member", value: "nomor_telepon_member"},
                { text: "Tanggal Lahir Member", value: "tanggal_lahir_member" },
                { text: "Masa Berlaku Member", value: "masa_berlaku_member" },
                { text: "Detail", value: "details" },
            ],
            member: new FormData,
            members: [],
            form: {
                nama_member: null,
                email_member: null,
                nomor_telepon_member: null,
                tanggal_lahir_member: null,
                alamat_member:null,
                sisa_deposit_reguler: 0,
                masa_berlaku_member: null,
                status_member: null,
                username_member: null,
                password_member: null,
                action: null,
            },
        };
    },
    methods: {
        // Read Data Member
        readData() {
            var url = this.$api + '/masaberlakumember';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.members = response.data.data;
            })
        },
        deaktivasi() {
            var url = this.$api + '/deaktivasimember';
            this.$http.get(url, {
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        cancelDetail() {
            this.resetForm();
            this.readData();
            this.dialogDetail = false;
            this.dialog = false;
        },
        close() {
            this.resetForm();
            this.readData();
            this.dialogDeaktivasi = false;
        },

        resetForm() {
            this.form = {
                nama_member: null,
                email_member: null,
                nomor_telepon_member: null,
                tanggal_lahir_member: null,
                alamat_member: null,
                sisa_deposit_reguler: 0,
                masa_berlaku_member: null,
                status_member: null,
                username_member: null,
                password_member: null,
                action: null,
            };
        },
        showItem(item) {
            this.form.nomor_member = item.nomor_member;
            this.form.nama_member = item.nama_member;
            this.form.email_member = item.email_member;
            this.form.nomor_telepon_member = item.nomor_telepon_member;
            this.form.tanggal_lahir_member = item.tanggal_lahir_member;
            this.form.alamat_member = item.alamat_member;
            this.form.sisa_deposit_reguler = item.sisa_deposit_reguler;
            this.form.masa_berlaku_member = item.masa_berlaku_member;
            this.form.status_member = item.status_member;
            this.form.username_member = item.username_member;
            this.form.password_member = item.password_member;
            this.dialogDetail = true;
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