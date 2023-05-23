<template>
    <v-main class="list">
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Transaksi Deposit Reguler</v-list-item-title>
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
                <!-- <v-btn color="success" dark @click="dialog = true"> Add </v-btn> -->
            </v-card-title>
        </v-card>
        <v-card>
            <v-data-table :headers="headers" :items="bookinggyms" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="white" @click="update(item)"> <v-icon color="blue darken-4">mdi-pencil</v-icon> </v-btn>
                    <v-btn small class="white" @click='cetakStrukPresensiGym'> <svg-icon color="blue darken-1" type="mdi" :path="path"></svg-icon> </v-btn>
                </template>
            </v-data-table>
        </v-card>

        <!-- <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card class="grey lighten-3">
            <v-card-title>
                <span class="headline"> Tambah Transaksi</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-select
                      v-model="form.id_pegawai"
                      label="Nama Pegawai"
                      :items="pegawais"
                      item-text="nama_pegawai"
                      item-value="id"
                      required 
                    ></v-select>
                    <v-select
                        v-model="form.id_member"
                        label="Nomor Member"
                        :items="members"
                        item-text="nomor_member"
                        item-value="id"
                        required 
                    ></v-select>
                    <v-select
                        v-model="form.id_promo"
                        label="Jenis Promo"
                        :items="promos"
                        item-text="jenis_promo"
                        item-value="id"
                        required 
                    ></v-select>
                    <v-text-field
                      v-model="form.nominal_deposit_reguler"
                      label="Nominal Deposit Reguler"
                      required 
                      :rules="rules"
                    ></v-text-field>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog> -->

    <!-- <v-dialog v-model="dialogConfirm" persistent max-width="327px">
        <div class="text-center">
            <v-sheet class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block" color="blue-grey darken-3" dark >
                <div class="grey--text text--lighten-1 text-body-2 mb-4">
                    Presensi Member Ini?
                </div>
                <v-btn plain color="blue darken-1" @click="dialogConfirm = false">No</v-btn>
                <v-btn plain color="blue darken-1" @click="update">Yes</v-btn>
            </v-sheet> 
        </div>
    </v-dialog> -->
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }} </v-snackbar>
    <div class="bg light" v-for="bookinggym in bookinggyms" :key="bookinggym.nomor_booking_gym">
        <div  width="600px" id="printtarget" style=" display: none; margin:500px;" class=" text-dark">
            <div width="600px" class="p-1 ">
              
              <table class="border">
                <tr>
                  <td style="width: 50%;">
                    <strong>Gofit</strong>  
                  </td>
                </tr>
                <td>
                  <p>Jl Centralpark No 10 Yogyakarta</p>
                </td>
                <tr></tr>
                <tr></tr>
                <tr>
                    <td style="width: 50%;">
                        <strong>Struk Presensi Gym</strong>  
                    </td>
                </tr>
                <tr>
                    <td>No Struk</td>
                    <td>:</td>
                    <td>{{ bookinggym.nomor_booking_gym}}</td>
                </tr>
                <tr>
                    <td>Tanggal </td>
                    <td>:</td>
                    <td>{{ bookinggym.tanggal_booking_gym }}</td>
                </tr>
                <tr></tr>
                <tr></tr>
                      <tr style="width: 20%;">
                        <td><strong>Member</strong></td>
                        <td>:</td>
                        <td>{{ bookinggym.nomor_member }} / {{ bookinggym.nama_member }}</td>
                      </tr>
                      <tr>
                        <td >Slot Waktu</td>
                        <td>:</td>
                        <td>{{bookinggym.jam_sesi_booking_gym}}</td>
                      </tr>
              </table>
            </div>
          </div>
        </div>
    </v-main>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPrinterPos } from '@mdi/js';
import jsPDF from 'jspdf'
// import { ref } from 'vue';
export default {
    name: "List",
    components: {
        SvgIcon
    },
    data() {
        return{
            search: null,
            dialog: false,
            dialogConfirm: false,
            idUser: 0,
            error_message : '',
            alamat: "Jl. Centralpark No.10 Yogyakarta",
            snackbar: false,
            path: mdiPrinterPos,
            headers: [
                {
                    text: "Nomor Booking Gym",
                    align: "start",
                    sortable: true,
                    value: "nomor_booking_gym",
                },
                { text: "Nama Member", value: "nama_member" },
                { text: "Nomor Member", value: "nomor_member" },
                { text: "Tanggal Booking Gym", value: "tanggal_booking_gym" },
                { text: "Tanggal Gym", value: "tanggal_pelaksanaan_gym"},
                { text: "Sesi Gym", value: "jam_sesi_booking_gym" },
                { text: "Jam Presensi Member Gym", value: "jam_presensi_gym" },
                { text: "Action", value: "actions" },
            ],
            bookinggym: new FormData,
            bookinggyms: [],
            members: [],
            // hasil : ref({
            //     booking_gym : {},
            //     nomor_booking_gym : null,
            //     nama_member : null,
            //     nomor_member : null,
            // }),
            form: {
                id_pegawai: null,
                nama_pegawai: null,
                id_member: null,
                id_promo: null,
                nominal_deposit_reguler: null,
            },
            rules: [
                (v) => !!v || 'Field is required',
            ]
        };
    },
    methods: {
        // Read Data Product
        readData() {
            var url = this.$api + '/bookinggym';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.bookinggyms = response.data.data;
            })
        },
        getDataMember() {
            var url = this.$api + '/member';
            this.$http.get(url, {
                // headers: {
                //     'Authorization' : 'Bearer ' + localStorage.getItem('token')
                // }
            }).then(response => {
                this.members = response.data.data;
            })
        },
        // save(){
        //     this.load = true;
        //     this.$http.post(this.$api + '/transaksireguler', {
        //         id_pegawai : this.form.id_pegawai,
        //         id_member : this.form.id_member,
        //         id_promo : this.form.id_promo,
        //         nominal_deposit_reguler : this.form.nominal_deposit_reguler,
        //     }).then(response => {
        //         this.error_message = response.data.message;
        //         this.color = "green";
        //         this.snackbar = true;
        //         this.load = true;
        //         this.hasil = response.data.data;
        //         this.close();
        //         this.readData();
        //         this.resetForm();
        //         this.cetakStrukTransaksiDepositReguler();
        //     }).catch(error => {
        //         this.error_message = error.response.data.message;
        //         this.color = "red";
        //         this.snackbar = true;
        //         this.load = false;
        //     });
        // },
        update(item) {
            this.load = true;
            this.$http.put(`http://127.0.0.1:8000/api/bookinggym/${item.nomor_booking_gym}`, {
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

        cetakStrukPresensiGym() {
            console.log('cetak struk')
            // window.jsPDF = window.jspdf.jsPDF;
            var elementHTML = document.querySelector('#printtarget');
            elementHTML.style.display = "block";
            elementHTML.style.fontSize = '5px';
            //Spasi
            elementHTML.style.lineHeight = '1.2'; 
            elementHTML.style.margin = '0';
            elementHTML.style.padding = '0';
            
            
            let doc = new jsPDF({
                orientation: 'l', // orientasi landscape
                unit: 'mm', // satuan millimeter
                format: ['300','100'], // ukuran kertas A4
            });
            doc.html(elementHTML, {
            callback: function (doc) {
                doc.save('Struk Presensi Gym.pdf');
                elementHTML.style.display = "none";
            },
            x: 10,
            y: 10
            });
            console.log('akhir dari cetak pdf')
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
        // resetForm() {
        //     this.form = {
        //         id_pegawai: null,
        //         id_member: null,
        //         id_promo: null,
        //         nominal_deposit_reguler: null,
        //     };
        // },
    },

    computed: {
        formTitle() {
            return this.inputType;
        },
    },

    mounted() {
        this.readData();
        this.getDataMember();
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
  .border{
    border: 1px solid;
    border-color: black;
}
</style>