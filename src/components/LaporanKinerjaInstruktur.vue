<template>
    <v-main class="list">
        <div>
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Laporan Kinerja Instruktur Bulanan</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  Label="Search"
                  outlined
                  hide-details 
                  style="margin-top: 30px"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="cetakLaporanAktivitasKelas"> Print </v-btn>
            </v-card-title>
        </v-card>
        <v-card>
            <v-data-table
            id="printable"  
            :headers="headers"
            :items="laporankinerjas"
            :search="search"
            >
            </v-data-table>
        </v-card>
    </div>
    <div  class="bg light">
        <div width="600px" id="printtarget" style="display: none; margin: 500px;" class="text-dark">
            <div width="600px" class="p-1">
            <table class="border">
                <tr>
                <td style="width: 50%;">
                    <strong>Gofit</strong>
                </td>
                </tr>
                <tr>
                <td>
                    <p>Jl Centralpark No. 10 Yogyakarta</p>
                </td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr>
                <td style="width: 50%;">
                    <strong>Laporan Kinerja Instruktur Bulanan</strong>
                </td>
                </tr>
                <tr>
                <td>
                    Bulan: Juni Tahun: 2023
                </td>
                </tr>
                <tr>
                <td>
                    Tanggal cetak: {{ laporankinerja.tanggal_cetak }}
                </td>
                </tr>
                <tr>
                    <table style="border-collapse: collapse; width: 50%;">
                        <thead>
                            <tr>
                            <th style="border: 1px solid black; border-width: 0.5px; padding: 2px; width: 50%;">Nama</th>
                            <th style="border: 1px solid black; border-width: 0.5px; padding: 2px; width: 50%;">Jumlah Hadir</th>
                            <th style="border: 1px solid black; border-width: 0.5px; padding: 2px; width: 50%;">Jumlah Libur</th>
                            <th style="border: 1px solid black; border-width: 0.5px; padding: 2px; width: 50%;">Waktu Terlambat</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for= "(laporankinerja,index) in laporankinerja.data" :key="index">
                            <td style="border: 1px solid black; border-width: 0.5px; padding: 2px; width: 50%;">{{ laporankinerja.nama_instruktur }}</td>
                            <td style="border: 1px solid black; border-width: 0.5px; padding: 2px; width: 50%;">{{ laporankinerja.jumlah_hadir }}</td>
                            <td style="border: 1px solid black; border-width: 0.5px; padding: 2px; width: 50%;">{{ laporankinerja.jumlah_ijin }}</td>
                            <td style="border: 1px solid black; border-width: 0.5px; padding: 2px; width: 50%;">{{ laporankinerja.jumlah_keterlambatan_instruktur }}</td>
                            </tr>
                        </tbody>
                    </table>
                </tr>
            </table>
            </div>
        </div>
        </div>
    </v-main>
  </template>
  
  
<script>
  
//   import {  ref } from 'vue';
  import jsPDF from 'jspdf'
  
  export default {
   
    data () {
      return {
        dialogConfirm2: false,
        dialogConfirm: false,
        color: '',
        search: '',
        headers: [
          { text: 'Nama Instruktur', value: 'nama_instruktur' },
          { text: 'Jumlah Hadir Kelas', value: 'jumlah_hadir' },
          { text: 'Jumlah Ijin Kelas', value: 'jumlah_ijin' },
          { text: 'Jumlah Keterlambatan Kelas', value: 'jumlah_keterlambatan_instruktur' },
          
        ],
        totalMember: 0,
        editId: '',
        deleteId: '',
        laporakinerja : {},
        laporankinerjas: [],
        
    }
  },
    methods: {
        printTable() {
            window.print();
        },

        cetakLaporanAktivitasKelas() {
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
                format: ['300','200'], // ukuran kertas A4
            });
            doc.html(elementHTML, {
            callback: function (doc) {
                doc.save('Laporan Kinerja Instruktur.pdf');
                elementHTML.style.display = "none";
            },
            x: 10,
            y: 10
            });
            console.log('akhir dari cetak pdf')
        },

        readData() {
            var url = this.$api + '/laporankinerjainstruktur';
            this.$http.get(url, {
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.laporankinerjas = response.data.data;
                this.laporankinerja = {
                    data: response.data.data,
                    tanggal_cetak: response.data.tanggal_cetak
                };

            });
        },
  
        
    },
    mounted (){
        // this.getDataJadwalGymBulanan();
        this.readData();
    }
  }
  </script>
<style>
@media print {
  /* Hide unnecessary elements when printing */
  /* * v-data-table {
    visibility: visible !important;
}
body * {
    visibility: hidden; */
    body > *:not(#printable) {
      display: none 
    }
  } 

  /* Show only the data table when printing */
  .text {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-size: 40px;
    font-style: italic;
  }
  .border{
    border: 1px solid;
    border-color: black;
    border-right: 1px solid black;
    
}
</style>