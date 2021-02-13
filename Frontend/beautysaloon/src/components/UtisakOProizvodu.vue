<template>
    <div class="utisci-korisnika-container">
        <div class="utisci-korisnika" >
            <label class="labela1">Lista utisaka o proizvodima</label>
            <el-table :data="this.listaUtisaka" height="250" style="height:300px; width:1000px; background: linear-gradient(0deg, #fbbdfc, #ffffff);">
                <el-table-column prop="date" label="Datum" class="table-column"></el-table-column>
                <el-table-column prop="nameProduct" label="Ime proizvoda" class="table-column" sortable></el-table-column>
                <el-table-column prop="content" label="Komentar" class="table-column"></el-table-column>
                <el-table-column prop="korisnikid" label="Ime korisnika" class="table-column"></el-table-column>
                <el-table-column align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle size="mini" 
                            @click="deleteProductItem(scope.row._id)"   v-if="scope.row.usertype == userTypes[regularUserType]"></el-button>
                    </template>
                </el-table-column> 
            </el-table>
            <div class="dodaj-dugme">
            <el-button @click="AddCommentForm" style="color:white; border-color:rgba(213, 34, 92, 0.925); background-color:rgba(213, 34, 92, 0.925);" type="success" class="dugme-za-dodavanje" circle>
                <el-icon class="el-icon-edit"></el-icon>    
            </el-button>         
            </div>
            <el-dialog  :visible.sync="formaDodavanje" @close="closeForm">
                <form-dodaj-utisak-o-proizvodu :visible.sync="formaDodavanje" @close="closeForm" @zavrsenUnos="prihvatiUnos($event)" :openDialog="this.openDialog" @closeForm="closeForm"></form-dodaj-utisak-o-proizvodu>
            </el-dialog>
        </div>
        <!--<form-dodaj-proizvod v-if="this.showComp == 'dodaj'" @zatvoriDodavanjeProizvoda="zavrsiDodavanje"></form-dodaj-proizvod>-->
    </div>
</template>

<script>
import PrikazUtisakaOProizvodu from "./prikazi/PrikazUtisakaOProizvodu.vue";
import FormDodajUtisakOProizvodu from "./forms/FormDodajUtisakOProizvodu.vue";
import { apiFetch, destinationUrl } from '../services/authFetch'
import { setPageShown } from '../services/contextManagement'
export default {
        // eslint-disable-next-line vue/no-unused-components
    components:{ PrikazUtisakaOProizvodu, FormDodajUtisakOProizvodu},
    data(){
        return{
            listaUtisaka:[],
            formaDodavanje: false,
            showComp:'',
            openDialog: false
        }
    },
    methods:{
        deleteProductItem(index){
            apiFetch('DELETE', destinationUrl + "/comment/delete/" + index)
                .then(result =>{
                    if(result.Success){
                        this.$message("Proizvod je uspešno obrisan!");
                        this.$emit("loadDataTable");
                    }
                }).catch(error=>{console.log(error);})
        },
        handleFormClose: function () {
            this.formaDodavanje = false;
        },
        AddCommentForm: function(){
            this.formaDodavanje = true;
            this.openDialog = !this.openDialog;
        },
        prihvatiUnos: function(event){
            this.formaDodavanje = false
            if (event === 'cancel')
                return
            // if (this.userId == '') {
            //     this.$message({message: "Problem sa autentifikacijom. Molimo vas prijavite se ponovo.", type: 'error'})
            // }
            // event.id_zaposleni = this.userId;
            // this.sacuvajUtisak(event)
            this.$emit("loadDataTable");
        },
        dodajProizvod:function(){
            this.showComp='dodaj';
            setPageShown('dodaj');
        },
        loadDataTable(){
            apiFetch('GET', destinationUrl + "/comment/all")
                .then(result=>{
                    this.listaUtisaka=result.Data;
                });
        },
        closeForm(){
            this.formaDodavanje=false;
        }
    },
    mounted:function(){
        this.$emit('loadDataTable');
    },
    created(){
        this.$on('loadDataTable', this.loadDataTable);
    }
}
</script>

<style scoped>
    .utisci-korisnika-container{
        height: 100%;
        width: 100%;
        display:flex;
    }
    .utisci-korisnika{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        opacity: 1;
        padding: 1em;
        justify-content: center;
        align-items: center;
    }
    .dodaj-dugme{
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    
    .el-table {
        /* display: flex; */
        /* justify-content: center; */
        margin-bottom: 15px;
        /* margin-left: 20%; */
        margin-right: 15%;
        width: 100%;
    }
    .labela1{
    text-align: center;
    font-family: cursive;
    font-size:30px;
    margin-left: 45px;
}
    @media screen and (max-width: 700px) {
    
    }
</style>