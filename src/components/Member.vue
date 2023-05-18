<template>
    <v-main class="list">
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Member</v-list-item-title>
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
            <v-data-table :headers="headers" :items="members" :search="search">
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn small class="mr-2 white" @click="editItem(item)"> <v-icon color="blue darken-4">mdi-pencil</v-icon> </v-btn>
                <v-btn small class="mr-2 white" @click="deleteItem(item.id)"> <v-icon color="red darken-4">mdi-delete</v-icon> </v-btn>
              </template>
              <template v-slot:[`item.details`]="{ item }">
                <v-btn small color="mr-2 blue" @click="showItem(item)"> Detail </v-btn>
              </template>
              <template v-slot:[`item.actionsReset`]="{ item }">
                <v-btn small class="mr-2 white" @click="resetItem(item.id)"> <svg-icon type="mdi" :path="path"></svg-icon> </v-btn>
              </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialogUpdate" persistent max-width="600px">
        <v-card class="grey lighten-3">
            <v-card-title>
                <span class="headline"> Update Member</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field
                      v-model="form.nama_member"
                      label="Nama Member"
                      required 
                    ></v-text-field>
                    <v-text-field
                      v-model="form.email_member"
                      label="Email Member"
                      readonly
                      required 
                    ></v-text-field>
                    <v-text-field
                      v-model="form.nomor_telepon_member"
                      label="Nomor Telepon Member"
                      required 
                    ></v-text-field>
                    <v-text-field
                      v-model="form.tanggal_lahir_member"
                      label="Tanggal Lahir Member"
                      required 
                    ></v-text-field>
                    <v-text-field
                      v-model="form.alamat_member"
                      label="Alamat Member"
                      required 
                    ></v-text-field>
                    <v-text-field
                      v-model="form.sisa_deposit_reguler"
                      label="Deposit Reguler"
                      required 
                      readonly
                    ></v-text-field>
                    <v-text-field
                      v-model="form.masa_berlaku_member"
                      label="Masa Berlaku Member"
                      required 
                      readonly
                    ></v-text-field>
                    <v-text-field
                      v-model="form.status_member"
                      label="Status Member"
                      required 
                      readonly
                    ></v-text-field>
                    <v-text-field
                      v-model="form.username_member"
                      label="Username Member"
                      required 
                    ></v-text-field>
                    <v-text-field
                      v-model="form.password_member"
                      label="Password Member"
                      required 
                    ></v-text-field>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancelUpdate"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="update"> Save </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card class="grey lighten-3">
            <v-card-title>
                <span class="headline"> Tambah Member</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field
                      v-model="form.nama_member"
                      label="Nama Member" 
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      v-model="form.email_member"
                      label="Email Member"
                      required 
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      v-model="form.nomor_telepon_member"
                      label="Nomor Telepon Member"
                      required 
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      v-model="form.tanggal_lahir_member"
                      label="Tanggal Lahir Member"
                      required 
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      v-model="form.alamat_member"
                      label="Alamat Member"
                      required 
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      v-model="form.sisa_deposit_reguler"
                      label="Deposit Reguler"
                      required 
                      readonly
                    ></v-text-field>
                    <v-text-field
                      v-model="form.status_member"
                      label="Status Member"
                      required 
                      readonly
                    ></v-text-field>
                    <!-- <v-text-field
                      v-model="form.masa_berlaku_member"
                      label="Masa Berlaku Member"
                      required 
                      readonly
                    ></v-text-field> -->
                    <v-text-field
                      v-model="form.username_member"
                      label="Username Member"
                      required 
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      v-model="form.password_member"
                      label="Password Member"
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
                    Yakin ingin hapus data member ini?
                </div>
                <v-btn plain color="blue darken-1" @click="dialogConfirm = false">No</v-btn>
                <v-btn plain color="blue darken-1" @click="deleteData">Yes</v-btn>
            </v-sheet> 
        </div>
    </v-dialog>

    <v-dialog v-model="dialogReset" persistent max-width="327px">
        <div class="text-center">
            <v-sheet class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block" color="blue-grey darken-3" dark >
                <div class="grey--text text--lighten-1 text-body-2 mb-4">
                    Yakin ingin mereset password member ini?
                </div>
                <v-btn plain color="blue darken-1" @click="dialogReset = false">No</v-btn>
                <v-btn plain color="blue darken-1" @click="resetPas">Yes</v-btn>
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
                      required 
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
                <v-btn color="blue darken-1" text @click='generatePDF'> Generate Member Card </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }} </v-snackbar>
    </v-main>
</template>

<script>
import jsPDF from 'jspdf'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLockReset } from '@mdi/js';

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
            dialogDetail: false,
            dialogUpdate:false,
            dialogReset: false,
            idUser: 0,
            editId: '',
            deleteId: '',
            resetId:'',
            formData: {
                sisa_deposit_reguler: 0,
                masa_berlaku_member: 'Belum Aktivasi',
            },
            heading: "Member Card",
            alamat: "Jl. Centralpark No.10 Yogyakarta",
            path: mdiLockReset,
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
                { text: "Action", value: "actions" },
                { text: "Detail", value: "details" },
                { text: "Reset Password", value: "actionsReset" },
            ],
            member: new FormData,
            members: [],
            form: {
                id_user: null,
                nama_member: null,
                email_member: null,
                nomor_telepon_member: null,
                tanggal_lahir_member: null,
                alamat_member:null,
                sisa_deposit_reguler: 0,
                masa_berlaku_member: null,
                status_member: "Tidak Aktif",
                username_member: null,
                password_member: null,
                action: null,
            },
            rules: [
                (v) => !!v || 'Field is required',
            ]
        };
    },
    methods: {
        // Read Data Member
        readData() {
            var url = this.$api + '/member';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.members = response.data.data;
            })
        },
        save(){
            // this.member.append('nama_member', this.form.nama_member);
            // this.member.append('email_member', this.form.email_member);
            // this.member.append('nomor_telepon_member', this.form.nomor_telepon_member);
            // this.member.append('tanggal_lahir_member', this.form.tanggal_lahir_member);
            // this.member.append('alamat_member', this.form.alamat_member);
            // this.member.append('sisa_deposit_reguler', this.form.sisa_deposit_reguler);
            // this.member.append('masa_berlaku_member', this.form.masa_berlaku_member);
            // this.member.append('username_member', this.form.username_member);
            // this.member.append('password_member', this.form.password_member);


            // var url = this.$api + '/member'
            this.load = true;
            this.$http.post(this.$api + '/member', {
                nama_member : this.form.nama_member,
                email_member : this.form.email_member,
                nomor_telepon_member : this.form.nomor_telepon_member,
                tanggal_lahir_member : this.form.tanggal_lahir_member,
                alamat_member : this.form.alamat_member,
                sisa_deposit_reguler : this.form.sisa_deposit_reguler,
                status_member : this.form.status_member,
                username_member : this.form.username_member,
                password_member : this.form.password_member
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
                nama_member : this.form.nama_member,
                email_member : this.form.email_member,
                nomor_telepon_member : this.form.nomor_telepon_member,
                tanggal_lahir_member : this.form.tanggal_lahir_member,
                alamat_member : this.form.alamat_member,
                sisa_deposit_reguler : this.form.sisa_deposit_reguler,
                masa_berlaku_member : this.form.masa_berlaku_member,
                status_member : this.form.status_member,
                username_member : this.form.username_member,
                password_member : this.form.password_member
            };
            var url = this.$api + '/member/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' +localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.closeUpdate();
                this.readData();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        deleteData(){
            // Menghapus Data
            var url = this.$api + '/member/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' +localStorage.getItem('token')
                }
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
        resetPas(){
            // Mereset Password Member
            var url = this.$api + '/reset/' + this.resetId;
            this.load = true;
            this.$http.put(url, {
                headers: {
                    'Authorization' : 'Bearer ' +localStorage.getItem('token')
                }
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
        cancel() {
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogConfirm = false;
        },
        cancelDetail() {
            this.resetForm();
            this.readData();
            this.dialogDetail = false;
            this.dialog = false;
        },
        cancelUpdate() {
            this.resetForm();
            this.readData();
            this.dialogUpdate = false;
        },
        closeUpdate() {
            this.resetForm();
            this.readData();
            this.dialogUpdate = false;
            this.dialog = false;
        },
        close(){
            this.dialog = false;
            this.dialogConfirm = false;
            this.dialogReset = false;
            this.readData();
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
                status_member: "Tidak Aktif",
                username_member: null,
                password_member: null,
                action: null,
            };
        },
        editItem(item) {
            this.inputType = 'Edit';
            this.editId = item.id;
            this.form.id_user = item.id_user;  
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
            this.dialogUpdate= true;
        },
        deleteItem(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        resetItem(id) {
            this.resetId = id;
            this.dialogReset = true;
        },
        showItem(item) {
            this.form.nomor_member = item.nomor_member;
            this.form.id_user = item.id_user;
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

        generatePDF() {
            const doc = new jsPDF({
                orientation: "portrait",
                unit: "in",
                format: "letter"
            });
            // text is placed using x, y coordinates
     
            doc.setFontSize(14).setFont("Times").text("GoFit", 0.5, 1.0);
            doc.setFontSize(12).setFont("Times").text(this.alamat, 0.5, 1.2);
            // create a line under heading
            // doc.setLineWidth(0.01).line(0.5, 1.3, 8.0, 1.3);
            // Using array of sentences
            doc.setFontSize(14).setFont("Times").text("Member Card", 0.5, 1.6);
            doc
                .setFont("Times")
                .setFontSize(12)
                .text("Nomor Member               :", 0.5, 1.8, { align: "left", maxWidth: "7.5" });
            doc
                .setFont("Times")
                .setFontSize(12)
                .text(this.form.nomor_member, 2.3, 1.8, { align: "left", maxWidth: "7.5" });
            doc
                .setFont("Times")
                .setFontSize(12)
                .text("Nama Member                 :", 0.5, 2.0, { align: "left", maxWidth: "7.5" });
            doc
                .setFont("Times")
                .setFontSize(12)
                .text(this.form.nama_member, 2.3, 2.0, { align: "left", maxWidth: "7.5" });
            doc
                .setFont("Times")
                .setFontSize(12)
                .text("Alamat Member               :", 0.5, 2.2, { align: "left", maxWidth: "7.5" });
            doc
                .setFont("Times")
                .setFontSize(12)
                .text(this.form.alamat_member, 2.3, 2.2, { align: "left", maxWidth: "7.5" });
            doc
                .setFont("Times")
                .setFontSize(12)
                .text("Nomor Telepon Member :", 0.5, 2.4, { align: "left", maxWidth: "7.5" });
            doc
                .setFont("Times")
                .setFontSize(12)
                .text(this.form.nomor_telepon_member, 2.3, 2.4, { align: "left", maxWidth: "7.5" });

            // Creating footer and saving file
            doc
                /*.setFont("times")
                .setFontSize(11)
                .setFontStyle("italic")
                .setTextColor(0, 0, 255)
                .text(
                    "This is a simple footer located .5 inches from page bottom",
                    0.5,
                    doc.internal.pageSize.height - 0.5
                )*/
                .save(`${this.heading}.pdf`);
        }
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