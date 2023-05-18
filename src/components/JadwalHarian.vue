<template>
    <v-main class="list">
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Jadwal Harian</v-list-item-title>
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
                <v-btn color="success" dark @click="dialogConfirm = true"> Generate Jadwal </v-btn>
            </v-card-title>
        </v-card>
        <v-card>
            <v-data-table :headers="headers" :items="jadwalharians" :search="search">
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn small class="white" @click="update(item)"> <v-icon color="blue darken-4">mdi-pencil</v-icon> </v-btn>
              </template>
            </v-data-table>
        </v-card>

    <v-dialog v-model="dialogConfirm" persistent max-width="327px">
        <div class="text-center">
            <v-sheet class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block" color="blue-grey darken-3" dark >
                <div class="grey--text text--lighten-1 text-body-2 mb-4">
                    Generate Jadwal ?
                </div>
                <v-btn plain color="blue darken-1" @click="dialogConfirm = false">No</v-btn>
                <v-btn plain color="blue darken-1" @click="save()">Generate</v-btn>
            </v-sheet> 
        </div>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }} </v-snackbar>
    </v-main>
</template>

<script>

import {  ref } from 'vue';
//import axios from 'axios';

export default {
    name: "List",
    data() {
        return{
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
                    text: "Tanggal",
                    align: "start",
                    sortable: true,
                    value: "tanggal_jadwal_harian",
                },
                { text: "Nama Instruktur", value: "nama_instruktur" },
                { text: "Kelas", value: "nama_kelas" },
                { text: "Hari", value: "hari" },
                { text: "Jam", value: "jam" },
                { text: "Status", value: "status" },
                { text: "Action", value: "actions" },
            ],
            jadwalharian: new FormData,
            jadwalharians: ref([]),
            instrukturs: [],
            jadwalumums: [],
            kelas:[],
        };
    },
    methods: {
        // Read Data Product
        readData() {
            var url = this.$api + '/jadwalharian';
            this.$http.get(url, {
            }).then(response => {
                this.jadwalharians = response.data.data;
            })
        },
        // async readData() {
        //     const url = "http://127.0.0.1:8000/api/jadwalharian";
        //     const request = await axios.get(url)
        //     console.log(request.data.data)
        //     this.jadwalharians=request.data.data
        //     console.log(request)
        // },
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
        getDataJadwalUmum() {
            var url = this.$api + '/jadwalumum';
            this.$http.get(url, {
                // headers: {
                //     'Authorization' : 'Bearer ' + localStorage.getItem('token')
                // }
            }).then(response => {
                this.jadwalumums = response.data.data;
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
            this.$http.post(this.$api + '/jadwalharian', {
            }).then(response => {
                this.error_message = response.data.message;
                //alert(response.data.message);
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.readData();
                this.close();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
                this.readData();
                this.close();
            });
        },
        // async save(){
        //     this.dialogConfirm = false;
        //     console.log(this.dialogConfirm)
        //     const url = "http://127.0.0.1:8000/api/jadwalharian";
        //       const request = await axios.post(url)
        //       this.readData();
        //       // console.log(request.data.success)
        //       if(!request.data.success){
        //         alert(request.data.message)
        //       }else{
        //         alert('Berhasil Melakukan Generate')
        //       }
        // },
        update(item) {
            //var url = this.$api + '/instruktur/';
            this.load = true;
            this.$http.put(`http://127.0.0.1:8000/api/jadwalharian/${item.id}`, {
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
        // update(item) {
        //     console.log(item);
        //     const konfirmasi = confirm('Apakah anda yakin ingin meliburkan jadwal ?');
        //     if(konfirmasi){
        //         axios
        //         .put(`http://127.0.0.1:8000/api/jadwalharian/${item.id}`,{})
        //         .then((response)=>{
        //         console.log(response)
        //         this.readData()
        //         })
        //     }
        // },
        close(){
            this.dialogConfirm = false;
        },
    },

    computed: {
        formTitle() {
            return this.inputType;
        },
    },

    mounted() {
        this.readData();
        //this.getDataInstruktur();
        //this.getDataJadwalUmum();
        //this.getDataKelas();
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