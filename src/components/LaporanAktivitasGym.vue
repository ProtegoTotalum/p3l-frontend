<template>
    <v-main class="list">
        <div>
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Laporan Aktivitas Gym Bulanan</v-list-item-title>
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
                <v-btn color="success" dark @click="cetakLaporanAktivitasGym"> Print </v-btn>
            </v-card-title>
        </v-card>
        <v-card>
            <v-data-table
            id="printable"  
            :headers="headers"
            :items="laporangyms"
            :search="search"
            >
            </v-data-table>
        </v-card>
    </div>
    <div class="bg light">
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
                    <p>Jl Centralpark No 10 Yogyakarta</p>
                </td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr>
                <td style="width: 50%;">
                    <strong>Laporan Aktivitas Gym Bulanan</strong>
                </td>
                </tr>
                <tr>
                <td>
                    Bulan: Mei Tahun: 2023
                </td>
                </tr>
                <tr>
                <td>
                    Tanggal cetak: {{ laporangym.tanggal_cetak }}
                </td>
                </tr>
                <tr>
                    <table style="border-collapse: collapse; width: 50%;">
                        <thead>
                            <tr>
                            <th style="border: 1px solid black; border-width: 0.5px; padding: 2px; width: 50%;">Tanggal</th>
                            <th style="border: 1px solid black; border-width: 0.5px; padding: 2px; width: 50%;">Jumlah Member</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in laporangym.data" :key="index">
                            <td style="border: 1px solid black; border-width: 0.5px; padding: 2px; width: 50%;">{{ row.tanggal }}</td>
                            <td style="border: 1px solid black; border-width: 0.5px; padding: 2px; width: 50%;">{{ row.count }}</td>
                            </tr>
                            <tr>
                            <td style="border: 1px solid black; border-width: 0.5px; padding: 2px; width: 50%;">Total</td>
                            <td style="border: 1px solid black; border-width: 0.5px; padding: 2px; width: 50%;">{{ calculateTotalMember() }}</td>
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
  import axios from 'axios';
  import jsPDF from 'jspdf'
  
  export default {
   
    data () {
      return {
        dialogConfirm2: false,
        dialogConfirm: false,
        color: '',
        search: '',
        headers: [

          { text: 'Tanggal', value: 'tanggal' },
          { text: 'Jumlah Member', value: 'count' },
          
        ],
        totalMember: 0,
        editId: '',
        deleteId: '',
        laporangym : {},
        // dataJadwals : ref([]),
        laporangyms: [],
        // member : {}
        // router: useRouter(),
        
    }
  },
    methods: {
        printTable() {
            window.print();
        },

        printData() {
            // Membuka jendela baru untuk mencetak konten
            const printWindow = window.open('', '', 'width=800,height=600');
            printWindow.document.open();
            printWindow.document.write(`
                <html>
                <head>
                    <style>
                    @media print {
                        /* Gaya untuk menyembunyikan elemen yang tidak perlu dicetak */
                        #printable {
                            visibility: visible;
                        }
                        /* Gaya khusus lainnya sesuai kebutuhan Anda */
                    }
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                
                th {
                    background-color: #f2f2f2;
                }
                </style>
                </head>
                <body>
                    <h3>GoFit</h3>
                    <h4>Jl. Centralpark No. 10 Yogyakarta</h4>
                    <h2>Laporan Kinerja Instruktur</h2>
                    <h3>Bulan: Mei   Tahun: 2023</h3>
                    <h4>Tanggal Cetak: 30 Mei 2023</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Jumlah Member</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.dataJadwal.map(row => `
                                <tr>
                                    <td>${row.tanggal}</td>
                                    <td>${row.count}</td>
                                </tr>
                            `).join('')}
                            <tr>
                                <td>Total</td>  
                                <td>${this.totalMember}</td>  
                            </tr>
                        </tbody>
                    </table>
                </body>
                </html>
            `);
            printWindow.document.close();

            // console.log(printWindow);
            // Tunggu beberapa saat sebelum mencetak untuk memastikan konten dimuat
            setTimeout(() => {
            printWindow.print();
            printWindow.close();
            }, 500);
        },

        cetakLaporanAktivitasGym() {
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
                doc.save('Laporan Aktivitas Gym.pdf');
                elementHTML.style.display = "none";
            },
            x: 10,
            y: 10
            });
            console.log('akhir dari cetak pdf')
        },

        calculateTotalMember() {
          return this.laporangyms.reduce((total, row) => total + row.count, 0);
        },

        // async getDataJadwalGymBulanan(){
        //     const url = "http://127.0.0.1:8000/api/laporanaktivitasgym";
        //     const request = await axios.get(url)
        //     console.log(request.data.data)
        //     this.dataJadwal=request.data.data
        //     this.calculateTotalMember();
        // },

        readData() {
            var url = this.$api + '/laporanaktivitasgym';
            this.$http.get(url, {
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.laporangyms = response.data.data;
                this.calculateTotalMember();

                this.laporangym = {
                    data: response.data.data,
                    tanggal_cetak: response.data.tanggal_cetak
                };
            });
        },

        
        editHandler(item){
            // this.dialogConfirm = true;
            console.log('Gagal')
            console.log(item)
            this.$router.push({name: 'Mo-Jadwal-UmumViewEdit', query : item})
        },
  
        deleteHandler(id){
          this.deleteId = id;
          this.dialogConfirm = true;
        },
        deleteData(id) {
          console.log(id)
          axios
          .delete(`http://127.0.0.1:8000/api/jadwal_umum/${id}`)
            .then((response) => {
              this.error_message = response.data.message;
              this.color = "green";
              this.dialogConfirm = false;
              this.snackbar = true;
              // this.load = false;
              // this.close();
              this.getDataJadwalGymBulanan();
              // this.type = "Tambah";
            })
            .catch((error) => {
              this.error_message = error.response.data.message;
              this.color = "red";
              // this.snackbar = true;
              // this.load = false;
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
}
</style>