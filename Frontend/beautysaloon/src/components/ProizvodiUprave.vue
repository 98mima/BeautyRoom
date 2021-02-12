<template>
    <div class="proizvodi-uprave-container">
        <div class="proizvodi-uprave">
            <h5 style="text-align:center; font-family: cursive; font-size:25px; color:rgba(213, 34, 92, 0.979);">Lista proizvoda</h5>
            <el-table :data="this.listaProizvoda" style="width=100%;" height="250" border>
                <el-table-column prop="title" label="Naziv" class="table-column"></el-table-column>
                <el-table-column prop="price" label="Cena" class="table-column"></el-table-column>
                <el-table-column prop="description" label="Opis" class="table-column"></el-table-column>
                <el-table-column align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle size="mini" 
                            @click="deleteProductItem(scope.row._id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="dodaj-dugme">
                <el-button circle style="color:white; border-color:rgba(213, 34, 92, 0.925); background-color:rgba(213, 34, 92, 0.925);" @click="dodajProizvod" icon="el-icon-plus"></el-button> 
            </div>
        </div>
        <form-dodaj-proizvod v-if="this.showComp == 'dodaj'" @zatvoriDodavanjeProizvoda="zavrsiDodavanje"></form-dodaj-proizvod>
    </div>
</template>

<script>
import FormDodajProizvod from './forms/FormDodajProizvod'
import { apiFetch, destinationUrl } from '../services/authFetch'
import { setPageShown } from '../services/contextManagement'
export default {
    components:{FormDodajProizvod},
    data(){
        return{
            listaProizvoda:[],
            showComp:''
        }
    },
    methods:{
        deleteProductItem(index){
            //let productId = getProductInfo().productID;
             //this.indeksIzabranogProizvoda = index;
             console.log(index);
            //console.log(id);
            apiFetch('DELETE', destinationUrl + "/admin/deleteProduct/" + index)
                .then(result =>{
                    if(result.Success){
                        this.$message("Proizvod je uspešno obrisan!");
                        this.$emit("loadDataTable");
                    }
                }).catch(error=>{console.log(error);})
        },
        dodajProizvod:function(){
            this.showComp='dodaj';
            setPageShown('dodaj');
        },
        zavrsiDodavanje(){
            this.showComp='';
            this.loadDataTable();
        },
        loadDataTable(){
            apiFetch('GET', destinationUrl + "/admin/products")
                .then(result=>{
                    console.log(result)
                    this.listaProizvoda=result.Data;
                });
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
    .proizvodi-uprave-container{
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .proizvodi-uprave{
        height: 85%;
        width: 90%;
        display: flex;
        flex-direction: column;
        opacity: 1;
        padding: 1em;
    }
    .dodaj-dugme{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .el-table {
        margin-bottom: 15px;
        width: 100%;
    }
    @media screen and (max-width: 700px) {
        .proizvodi-uprave {
            height: 100%;
            width: 100%;
            padding: 0.5em;
        }
    }
</style>