<template>
    <v-main class="list">
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Ijin Instruktur</v-list-item-title>
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
            </v-card-title>
        </v-card>
        <v-card>
            <v-data-table :headers="headers" :items="ijins" :search="search">
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn small class="blue darken" @click="updateItem(item)" v-if="item.status_konfirmasi=='Belum Dikonfirmasi'"> Confirm </v-btn>
                <v-btn small class="red darken" @click="rejectItem(item)" v-if="item.status_konfirmasi=='Belum Dikonfirmasi'"> Reject </v-btn>
              </template>
            </v-data-table>
        </v-card>

    <v-dialog v-model="dialogConfirm" persistent max-width="327px">
        <div class="text-center">
            <v-sheet class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block" color="blue-grey darken-3" dark >
                <div class="grey--text text--lighten-1 text-body-2 mb-4">
                    Konfirmasi Ijin ?
                </div>
                <v-btn plain color="blue darken-1" @click="dialogConfirm = false">No</v-btn>
                <v-btn plain color="blue darken-1" @click="update()">Konfirmasi</v-btn>
            </v-sheet> 
        </div>
    </v-dialog>
    <v-dialog v-model="dialogReject" persistent max-width="327px">
        <div class="text-center">
            <v-sheet class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block" color="blue-grey darken-3" dark >
                <div class="grey--text text--lighten-1 text-body-2 mb-4">
                    Tolak Permintaan Ijin ?
                </div>
                <v-btn plain color="blue darken-1" @click="dialogConfirm = false">No</v-btn>
                <v-btn plain color="blue darken-1" @click="reject()">Yes</v-btn>
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
            dialogReject: false,
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
                { text: "Tanggal Pengajuan Ijin", value: "tanggal_pengajuan_ijin" },
                { text: "Tanggal Ijin", value: "tanggal_ijin_instruktur" },
                { text: "Hari", value: "hari_ijin" },
                { text: "Jam", value: "sesi_ijin" },
                { text: "Alasan", value: "alasan_ijin" },
                { text: "Instruktur Pengganti", value: "instrukturpengganti.nama_instruktur" },
                { text: "Status", value: "status_konfirmasi" },
                { text: "Action", value: "actions" },
            ],
            ijin: new FormData,
            ijins: ref([]),
            instrukturs: [],
            penggantis: [],
        };
    },
    methods: {
        // Read Data Product
        readData() {
            var url = this.$api + '/ijin';
            this.$http.get(url, {
            }).then(response => {
                this.ijins = response.data.data;
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
        getDataInstrukturPengganti() {
            var url = this.$api + '/instruktur';
            this.$http.get(url, {
                // headers: {
                //     'Authorization' : 'Bearer ' + localStorage.getItem('token')
                // }
            }).then(response => {
                this.penggantis = response.data.data;
            })
        },

        update() {
            let newData = {
                status_konfirmasi : "Dikonfirmasi",
            };
            var url = this.$api + '/ijin/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
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

        reject() {
            let newData = {
                status_konfirmasi : "Ditolak",
            };
            var url = this.$api + '/ijin/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
                this.closeReject();
                this.readData();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        updateItem(item) {
            this.editId = item.id;
            this.dialogConfirm = true;
        },
        rejectItem(item) {
            this.editId = item.id;
            this.dialogReject = true;
        },
        close(){
            this.dialogConfirm = false;
        },
        closeReject(){
            this.dialogReject = false;
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
        this.getDataInstrukturPengganti();
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