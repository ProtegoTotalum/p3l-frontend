<template>
    <v-main class="list">
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Booking Kelas</v-list-item-title>
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
            <v-data-table :headers="headers" :items="bookingkelast" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="white"
                        v-if="item.metode_pembayaran_booking_kelas === 'Reguler'"
                        @click="cetakStrukPresensiKelasReguler"
                    >
                        <svg-icon color="blue darken-1" type="mdi" :path="path"></svg-icon>
                    </v-btn>
                    <v-btn small class="white"
                        v-else-if="item.metode_pembayaran_booking_kelas === 'Deposit'"
                        @click="cetakStrukPresensiKelasDeposit"
                    >
                        <svg-icon color="blue darken-1" type="mdi" :path="path"></svg-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }} </v-snackbar>
    <div v-for= "bookingkelas in bookingkelast" :key="bookingkelas.nomor_booking_kelas">
        <div v-if="bookingkelas.metode_pembayaran_booking_kelas === 'Reguler'">
            <div class="bg light">
                <div  width="600px" id="printreguler" style=" display: none; margin:500px;" class=" text-dark">
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
                                <strong>Struk Presensi Kelas</strong>  
                            </td>
                        </tr>
                        <tr>
                            <td>No Struk</td>
                            <td>:</td>
                            <td>{{ bookingkelas.nomor_booking_kelas}}</td>
                        </tr>
                        <tr>
                            <td>Tanggal </td>
                            <td>:</td>
                            <td>{{ bookingkelas.tanggal_booking_kelas }}</td>
                        </tr>
                        <tr></tr>
                        <tr></tr>
                            <tr style="width: 20%;">
                                <td><strong>Member</strong></td>
                                <td>:</td>
                                <td>{{ bookingkelas.member.nomor_member }} / {{ bookingkelas.member.nama_member }}</td>
                            </tr>
                            <tr>
                                <td >Kelas</td>
                                <td>:</td>
                                <td>{{bookingkelas.jadwalharian.jadwalumum.kelas.nama_kelas}}</td>
                            </tr>
                            <tr>
                                <td >Instruktur</td>
                                <td>:</td>
                                <td>{{bookingkelas.jadwalharian.instruktur.nama_instruktur}}</td>
                            </tr>
                            <tr>
                                <td >Tarif</td>
                                <td>:</td>
                                <td>Rp. {{bookingkelas.jadwalharian.jadwalumum.kelas.harga_kelas}}</td>
                            </tr>
                            <tr>
                                <td >Sisa Deposit</td>
                                <td>:</td>
                                <td>Rp. {{bookingkelas.member.sisa_deposit_reguler}}</td>
                            </tr>
                    </table>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="bg light">
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
                                <strong>Struk Presensi Kelas Paket</strong>  
                            </td>
                        </tr>
                        <tr>
                            <td>No Struk</td>
                            <td>:</td>
                            <td>{{ bookingkelas.nomor_booking_kelas}}</td>
                        </tr>
                        <tr>
                            <td>Tanggal </td>
                            <td>:</td>
                            <td>{{ bookingkelas.tanggal_booking_kelas }}</td>
                        </tr>
                        <tr></tr>
                        <tr></tr>
                            <tr style="width: 20%;">
                                <td><strong>Member</strong></td>
                                <td>:</td>
                                <td>{{ bookingkelas.member.nomor_member }} / {{ bookingkelas.member.nama_member }}</td>
                            </tr>
                            <tr>
                                <td >Kelas</td>
                                <td>:</td>
                                <td>{{bookingkelas.jadwalharian.jadwalumum.kelas.nama_kelas}}</td>
                            </tr>
                            <tr>
                                <td >Instruktur</td>
                                <td>:</td>
                                <td>{{bookingkelas.jadwalharian.instruktur.nama_instruktur}}</td>
                            </tr>
                            <tr>
                                <td >Sisa Deposit</td>
                                <td>:</td>
                                <td>{{bookingkelas.depositkelas.sisa_deposit_kelas}}</td>
                            </tr>
                            <tr>
                                <td >Berlaku Sampai</td>
                                <td>:</td>
                                <td>{{bookingkelas.depositkelas.masa_berlaku_deposit_kelas}}</td>
                            </tr>
                    </table>
                    </div>
                </div>
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
                    text: "Nomor Booking Kelas",
                    align: "start",
                    sortable: true,
                    value: "nomor_booking_kelas",
                },
                { text: "Nama Member", value: "member.nama_member" },
                { text: "Nomor Member", value: "member.nomor_member" },
                { text: "Nama Instruktur", value: "jadwalharian.instruktur.nama_instruktur" },
                { text: "Nama Kelas", value: "jadwalharian.jadwalumum.kelas.nama_kelas" },
                { text: "Tanggal Booking Kelas", value: "tanggal_booking_kelas" },
                { text: "Tanggal Kelas", value: "jadwalharian.tanggal_jadwal_harian" },
                { text: "Metode Pembayaran", value: "metode_pembayaran_booking_kelas" },
                { text: "Sisa Deposit Reguler", value: "member.sisa_deposit_reguler" },
                { text: "Sisa Deposit Kelas", value: "depositkelas.sisa_deposit_kelas" },
                { text: "Masa Berlaku Deposit Kelas", value: "depositkelas.masa_berlaku_deposit_kelas" },
                { text: "Jam Presensi Member Kelas", value: "jam_presensi_kelas" },
                { text: "Status Presensi Member Kelas", value: "status_presensi_kelas" },
                { text: "Action", value: "actions" },
            ],
            bookingkelas: new FormData,
            bookingkelast: [],
            bookingkelastt: [],
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
            var url = this.$api + '/bookingkelas';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.bookingkelast = response.data.data;
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

        // cetakStrukPresensiKelas() {
        //     let regulerFound = false;
        //     let depositFound = false;
        //     for(let bookingkelas of this.bookingkelast){
        //         if(!regulerFound && bookingkelas.metode_pembayaran_booking_kelas === "Reguler"){
        //             console.log('cetak struk reguler')
        //             // window.jsPDF = window.jspdf.jsPDF;
        //             var elementHTML = document.querySelector('#printreguler');
        //             elementHTML.style.display = "block";
        //             elementHTML.style.fontSize = '5px';
        //             //Spasi
        //             elementHTML.style.lineHeight = '1.2'; 
        //             elementHTML.style.margin = '0';
        //             elementHTML.style.padding = '0';
                    
                    
        //             let doc = new jsPDF({
        //                 orientation: 'l', // orientasi landscape
        //                 unit: 'mm', // satuan millimeter
        //                 format: ['300','100'], // ukuran kertas A4
        //             });
        //             doc.html(elementHTML, {
        //             callback: function (doc) {
        //                 doc.save('Struk Presensi Kelas.pdf');
        //                 elementHTML.style.display = "none";
        //             },
        //             x: 10,
        //             y: 10
        //             });
        //             console.log('akhir dari cetak pdf reguler');
        //             regulerFound = true;
        //             break;
        //         }
        //         if (!depositFound && bookingkelas.metode_pembayaran_booking_kelas === "Deposit") {
        //             console.log('cetak struk kelas paket')
        //             // window.jsPDF = window.jspdf.jsPDF;
        //             var element = document.querySelector('#printtarget');
        //             element.style.display = "block";
        //             element.style.fontSize = '5px';
        //             //Spasi
        //             element.style.lineHeight = '1.2'; 
        //             element.style.margin = '0';
        //             element.style.padding = '0';
                    
                    
        //             let doc = new jsPDF({
        //                 orientation: 'l', // orientasi landscape
        //                 unit: 'mm', // satuan millimeter
        //                 format: ['300','100'], // ukuran kertas A4
        //             });
        //             doc.html(element, {
        //             callback: function (doc) {
        //                 doc.save('Struk Presensi Kelas Paket.pdf');
        //                 element.style.display = "none";
        //             },
        //             x: 10,
        //             y: 10
        //             });
        //             console.log('akhir dari cetak pdf kelas paket');
        //             depositFound = true;
        //              break;
        //         }  
        //     }
        // },
        cetakStrukPresensiKelasReguler() {
            // window.jsPDF = window.jspdf.jsPDF;
            var elementHTML = document.querySelector('#printreguler');
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
                doc.save('Struk Presensi Kelas Reguler.pdf');
                elementHTML.style.display = "none";
            },
            x: 10,
            y: 10
            });
            console.log('akhir dari cetak pdf')
        },
        cetakStrukPresensiKelasDeposit() {
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
                doc.save('Struk Presensi Kelas Deposit.pdf');
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