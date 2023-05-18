<template>
    <v-main class="list">
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Jadwal Umum</v-list-item-title>
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
            <v-data-table :headers="headers" :items="jadwalumums" :search="search">
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn small class="white" @click="editItem(item)"> <v-icon color="blue darken-4">mdi-pencil</v-icon> </v-btn>
                <v-btn small class="white" @click="deleteItem(item.id)"><v-icon color="red darken-4">mdi-delete</v-icon> </v-btn>
              </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card class="grey lighten-3">
            <v-card-title>
                <span class="headline"> {{ formTitle }} Jadwal Umum</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-select
                        v-model="form.id_instruktur"
                        label="Nama Instruktur"
                        :items="instrukturs"
                        item-text="nama_instruktur"
                        item-value="id"
                        required
                    ></v-select>
                    <v-select
                        v-model="form.id_kelas"
                        label="Nama Kelas"
                        :items="kelas"
                        item-text="nama_kelas"
                        item-value="id"
                        required
                    ></v-select>
                    <v-select
                      v-model="form.hari"
                      label="Hari"
                      :items = "['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu']"
                      required 
                    ></v-select>
                    <v-select
                      v-model="form.jam"
                      label="Jam"
                      :items = "['08:00','09:00','10:00','11:00','12:00','13:00','14:00', '15:00', '16:00', '17:00']"
                      required 
                    ></v-select>
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
                    Yakin ingin hapus jadwal ini?
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
                    value: "instruktur.nama_instruktur",
                },
                { text: "Nama Kelas", value: "kelas.nama_kelas" },
                { text: "Hari", value: "hari" },
                { text: "Jam", value: "jam" },
                { text: "Action", value: "actions" },
            ],
            jadwalumum: new FormData,
            jadwalumums: [],
            kelas: [],
            instrukturs: [],
            form: {
                id_instruktur: null,
                id_kelas: null,
                hari: null,
                jam: null,
                action: null,
            },
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
            var url = this.$api + '/jadwalumum';
            this.$http.get(url, {
                // headers: {
                //     'Authorization' : 'Bearer ' + localStorage.getItem('token')
                // }
            }).then(response => {
                this.jadwalumums = response.data.data;
            })
        },
        getDataInstruktur() {
            var url = this.$api + '/instruktur';
            this.$http.get(url, {
                // headers: {
                //     'Authorization' : 'Bearer ' + localStorage.getItem('token')
                // }
            }).then(response => {
                this.instrukturs = response.data.data;
            })
        },
        getDataKelas() {
            var url = this.$api + '/kelas';
            this.$http.get(url, {
                // headers: {
                //     'Authorization' : 'Bearer ' + localStorage.getItem('token')
                // }
            }).then(response => {
                this.kelas = response.data.data;
            })
        },
        save(){
            this.load = true;
            this.$http.post(this.$api + '/jadwalumum', {
                id_instruktur : this.form.id_instruktur,
                id_kelas : this.form.id_kelas,
                hari : this.form.hari,
                jam : this.form.jam,
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
                id_instruktur : this.form.id_instruktur,
                id_kelas : this.form.id_kelas,
                hari : this.form.hari,
                jam : this.form.jam,
            };
            var url = this.$api + '/jadwalumum/' + this.editId;
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
            var url = this.$api + '/jadwalumum/' + this.deleteId;
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
                id_instruktur: null,
                id_kelas: null,
                hari: null,
                jam: null,
                action: null,
            };
        },
        editItem(item) {
            this.inputType = 'Edit';
            this.editId = item.id;
            this.form.id_instruktur = item.id_instruktur;
            this.form.id_kelas = item.id_kelas;
            this.form.hari = item.hari;
            this.form.jam = item.jam;
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
        this.getDataInstruktur();
        this.getDataKelas();
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