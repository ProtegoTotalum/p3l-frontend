import VueRouter from "vue-router";
import Vue from "vue";


Vue.use(VueRouter);

function importComponent(path){
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes:[
        /*
        //Dashboard
        {
            path:"/dashboard",
            name:"Dashboard",
            component: importComponent("DashboardLayout"),
            children:[
                //Dashboard
                {
                    path: "/",
                    name: "Root",
                    component: importComponent("DashboardIndex")
                },
                //Instruktur
                {
                    path: "/instruktur",
                    name: "Instruktur",
                    component: importComponent("Instruktur")
                },
                //Member
                {
                    path: "/member",
                    name: "Member",
                    component: importComponent("Member")
                },
            ],
        },*/

        
        //Dashboard Kasir
        {
            path:"/dashboardkasir",
            name:"DashboardKasir",
            component: importComponent("DashboardLayoutKasir"),
            children:[
                //Member
                {
                    path: "/member",
                    name: "Member",
                    component: importComponent("Member")
                },
                //Transaksi Deposit Reguler
                {
                    path: "/transaksidepositreguler",
                    name: "TransaksiDepositReguler",
                    component: importComponent("TransaksiDepositReguler")
                },
                //Transaksi Aktivasi
                {
                    path: "/transaksiaktivasi",
                    name: "TransaksiAktivasi",
                    component: importComponent("TransaksiAktivasi")
                },
                //Deaktivasi Member
                {
                    path: "/deaktivasimember",
                    name: "DeaktivasiMember",
                    component: importComponent("DeaktivasiMember")
                },
                //Reset Deposit Kelas
                {
                    path: "/resetdepositkelas",
                    name: "ResetDepositKelas",
                    component: importComponent("ResetDepositKelas")
                },
            ],
        },

        //Dashboard MO
        {
            path:"/dashboardmo",
            name:"DashboardMO",
            component: importComponent("DashboardLayoutMO"),
            children:[
                //JadwalUmum
                {
                path: "/jadwalumum",
                name: "Jadwal Umum",
                component: importComponent("JadwalUmum")
                },
                //JadwalHarian
                {
                path: "/jadwalharian",
                name: "Jadwal Harian",
                component: importComponent("JadwalHarian")
                },
                //IjinInstruktur
                {
                path: "/ijin",
                name: "Ijin Instruktur",
                component: importComponent("IjinInstruktur")
                },
            ],
        },

        //Dashboard Admin
        {
            path:"/dashboardadmin",
            name:"DashboardAdmin",
            component: importComponent("DashboardLayoutAdmin"),
            children:[
                //Instruktur
                {
                    path: "/instruktur",
                    name: "Instruktur",
                    component: importComponent("Instruktur")
                },
            ],
        },

        // Halaman Utama
        {
            path: "/",
            name: "Home",
            meta: { title: 'Home'},
            component: importComponent('Home'),
        },

        // Login
        {
            path: "/login",
            name: "Login",
            meta: { title: 'Login'},
            component: importComponent('Login'),
        },
        // Register
        {
            path: '/register',
            name: 'Register',
            meta: { title: 'Register'},
            component: importComponent('Register'),
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.name != "Login" && localStorage.getItem("token") == null && to.name != "Register" && to.name != "Home") {
      next("home");
      document.to.meta.title = "Home";
    }
  
    document.title = to.meta.title;
    next();
  });
export default router;