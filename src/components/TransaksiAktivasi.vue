<template>
    <v-main class="list">
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Transaksi Aktivasi</v-list-item-title>
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
            <v-data-table :headers="headers" :items="aktivasis" :search="search">
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
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
                    <v-text-field
                      v-model="form.nominal_transaksi_aktivasi"
                      label="Nominal Transaksi"
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
    <div class="bg light" >
        <div  width="600px" id="printtarget" style=" display: none; margin:500px;" class=" text-dark">
            <div width="600px" class="p-1 ">
              
              <table class="border">
                <tr>
                  <td style="width: 50%;">
                    <strong>Gofit</strong>  
                  </td>
                  <td>
                    No Struk : {{ hasil.nomor_struk_transaksi_aktivasi}}
                  </td>
                </tr>
                <td>
                  <p>Jl Centralpark No 10 Yogyakarta</p>
                </td>
                <td>
                  Tanggal : {{ hasil.transaksi_aktivasi.tanggal_transaksi_aktivasi}}
                </td>
                
                <tr></tr>
                <tr>
                  <td>
                    <table>
                      <tr style="width: 80%;">
                        <td><strong>Member</strong></td>
                        <td>:</td>
                        <td>{{ hasil.nomor_member }} / {{ hasil.nama_member }}</td>
                      </tr>
                      <tr>
                        <td >Aktivasi Tahunan</td>
                        <td>:</td>
                        <td>Rp.{{hasil.transaksi_aktivasi.nominal_transaksi_aktivasi}}</td>
                      </tr>
                      <tr>
                        <td>Masa Aktif Member</td>
                        <td>:</td>
                        <td>{{  (hasil.masa_berlaku_member)}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td></td>
                    <td>Kasir : {{hasil.transaksi_aktivasi.id_pegawai}}/{{ hasil.nama_pegawai }} </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
    </v-main>
</template>

<script>
import jsPDF from 'jspdf'
import { ref } from 'vue';
export default {
    name: "List",
    data() {
        return{
            search: null,
            dialog: false,
            dialogConfirm: false,
            idUser: 0,
            error_message : '',
            alamat: "Jl. Centralpark No.10 Yogyakarta",
            snackbar: false,
            headers: [
                {
                    text: "Nomor Transaksi",
                    align: "start",
                    sortable: true,
                    value: "nomor_struk_transaksi_aktivasi",
                },
                { text: "Nama Member", value: "member.nama_member" },
                { text: "Tanggal Transaksi", value: "tanggal_transaksi_aktivasi"},

            ],
            aktivasi: new FormData,
            aktivasis: [],
            members: [],
            promos: [],
            pegawais:[],
            hasil : ref({
                transaksi_aktivasi : {},
                nomor_struk_transaksi_aktivasi : null,
                nama_member : null,
                nomor_member : null,
                nama_pegawai : null,
                masa_berlaku_member : null,
            }),
            form: {
                id_pegawai: null,
                id_member: null,
                nominal_transaksi_aktivasi: null,
            },
            rules: [
                (v) => !!v || 'Field is required',
            ]
        };
    },
    methods: {
        // Read Data Product
        readData() {
            var url = this.$api + '/transaksiaktivasi';
            this.$http.get(url, {
            }).then(response => {
                this.aktivasis = response.data.data;
            })
        },
        getDataPegawai(){
            var url = this.$api + '/pegawai';
            this.$http.get(url, {
                // headers: {
                //     'Authorization' : 'Bearer ' + localStorage.getItem('token')
                // }
            }).then(response => {
                this.pegawais = response.data.data;
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
        save(){
            this.load = true;
            this.$http.post(this.$api + '/transaksiaktivasi', {
                id_pegawai : this.form.id_pegawai,
                id_member : this.form.id_member,
                nominal_transaksi_aktivasi : this.form.nominal_transaksi_aktivasi,
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.hasil = response.data.data;
                this.close();
                this.readData();
                this.resetForm();
                this.cetakStrukTransaksiAktivasi();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        cetakStrukTransaksiAktivasi() {
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
                doc.save('struk.pdf');
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
        resetForm() {
            this.form = {
                id_pegawai: null,
                id_member: null,
                id_promo: null,
                nominal_deposit_reguler: null,
            };
        },
    },

    computed: {
        formTitle() {
            return this.inputType;
        },
    },

    mounted() {
        this.readData();
        this.getDataMember();
        this.getDataPegawai();
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