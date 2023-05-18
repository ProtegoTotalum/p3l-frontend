<template>
    <v-main class="list">
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Instruktur</v-list-item-title>
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
                <v-btn color="success" dark @click="dialog = true"> Add </v-btn>
            </v-card-title>
        </v-card>
        <v-card>
            <v-data-table :headers="headers" :items="instrukturs" :search="search">
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn small class="white" @click="editItem(item)"> <v-icon color="blue darken-4">mdi-pencil</v-icon> </v-btn>
                <v-btn small class="white" @click="deleteItem(item.id)"><v-icon color="red darken-4">mdi-delete</v-icon> </v-btn>
              </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card class="grey lighten-3">
            <v-card-title>
                <span class="headline"> {{ formTitle }} Instruktur</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field
                      v-model="form.nama_instruktur"
                      label="Nama Instruktur"
                      required 
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      v-model="form.email_instruktur"
                      label="Email Instruktur"
                      required 
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      v-model="form.nomor_telepon_instruktur"
                      label="Nomor Telepon Instruktur"
                      required 
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      v-model="form.username_instruktur"
                      label="Username Instruktur"
                      required 
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field type="password"
                      v-model="form.password_instruktur"
                      label="Password Instruktur"
                      required 
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      v-model="form.jumlah_keterlambatan_instruktur"
                      label="Jumlah Keterlambatan Instruktur"
                      required 
                      :rules="rules"
                    ></v-text-field>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="327px">
        <div class="text-center">
            <v-sheet class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block" color="blue-grey darken-3" dark >
                <div class="grey--text text--lighten-1 text-body-2 mb-4">
                    Yakin ingin hapus data instruktur ini?
                </div>
                <v-btn plain color="blue darken-1" @click="dialogConfirm = false">No</v-btn>
                <v-btn plain color="blue darken-1" @click="deleteData">Yes</v-btn>
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
            inputType: 'Tambah',
            search: null,
            dialog: false,
            dialogConfirm: false,
            idUser: 0,
            editId: '',
            deleteId: '',
            error_message : '',
            snackbar: false,
            headers: [
                {
                    text: "Nama Instruktur",
                    align: "start",
                    sortable: true,
                    value: "nama_instruktur",
                },
                { text: "Email Instruktur", value: "email_instruktur" },
                { text: "Nomor Telepon Instruktur", value: "nomor_telepon_instruktur" },
                { text: "Username Instruktur", value: "username_instruktur"},
                { text: "Jumlah Keterlambatan Instruktur", value: "jumlah_keterlambatan_instruktur" },
                { text: "Action", value: "actions" },
            ],
            instruktur: new FormData,
            instrukturs: [],
            form: {
                id_user: null,
                nama_instruktur: null,
                email_instruktur: null,
                nomor_telepon_instruktur: null,
                username_instruktur: null,
                password_instruktur: null,
                jumlah_keterlambatan_instruktur: null,
                action: null,
            },
            rules: [
                (v) => !!v || 'Field is required',
            ]
        };
    },
    methods: {
        setForm() {
            if(this.inputType !== 'Tambah'){
                this.update();
            }
            else{
                this.save();
            }
        },
        // Read Data Product
        readData() {
            var url = this.$api + '/instruktur';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.instrukturs = response.data.data;
            })
        },
        save(){
            this.load = true;
            this.$http.post(this.$api + '/instruktur', {
                nama_instruktur : this.form.nama_instruktur,
                email_instruktur : this.form.email_instruktur,
                nomor_telepon_instruktur :this.form.nomor_telepon_instruktur,
                username_instruktur : this.form.username_instruktur,
                password_instruktur : this.form.password_instruktur,
                jumlah_keterlambatan_instruktur : this.form.jumlah_keterlambatan_instruktur,
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
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
        update() {
            let newData = {
                id_user : this.form.id_user,
                nama_instruktur : this.form.nama_instruktur,
                email_instruktur : this.form.email_instruktur,
                nomor_telepon_instruktur : this.form.nomor_telepon_instruktur,
                username_instruktur : this.form.username_instruktur,
                password_instruktur : this.form.password_instruktur,
                jumlah_keterlambatan_instruktur : this.form.jumlah_keterlambatan_instruktur
            };
            var url = this.$api + '/instruktur/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                // headers: {
                //     'Authorization' : 'Bearer ' +localStorage.getItem('token')
                // }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        deleteData(){
            // Menghapus Data
            var url = this.$api + '/instruktur/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                // headers: {
                //     'Authorization' : 'Bearer ' +localStorage.getItem('token')
                // }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        cancel() {
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },
        close(){
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.dialogAddToCart = false;
            this.readData();
        },
        resetForm() {
            this.form = {
                nama_instruktur: null,
                email_instruktur: null,
                nomor_telepon_instruktur: null,
                username_instruktur: null,
                password_instruktur: null,
                jumlah_keterlambatan_instruktur: null,
                action: null,
            };
        },
        editItem(item) {
            this.inputType = 'Edit';
            this.editId = item.id;
            this.form.id_user = item.id_user;
            this.form.nama_instruktur = item.nama_instruktur;
            this.form.email_instruktur = item.email_instruktur;
            this.form.nomor_telepon_instruktur = item.nomor_telepon_instruktur;
            this.form.username_instruktur = item.username_instruktur;
            this.form.password_instruktur = item.password_instruktur;
            this.form.jumlah_keterlambatan_instruktur = item.jumlah_keterlambatan_instruktur;
            this.dialog = true;
        },
        deleteItem(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
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