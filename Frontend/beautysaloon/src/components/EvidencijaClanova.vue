<template>
    <div class="evidencija-clanova-container">
        <div class="evidencija-clanova">
            <filter-clanova hidden></filter-clanova>
            <label class="labela1">Evidencija članova</label>
            <el-table style="width:100%" height="250" :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
                <el-table-column prop="name" label="Ime" class="table-column"></el-table-column>
                <el-table-column prop="lastname" label="Prezime" class="table-column"></el-table-column>
                <el-table-column prop="usertype" label="Tip" class="table-column"></el-table-column>
                <el-table-column prop="username" label="Korisničko ime" class="table-column"></el-table-column>
                <el-table-column align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="search" style="margin:0" size="big" placeholder="Ime za pretragu" :focus="scope.search">
                        </el-input>
                    </template>
                    <template slot-scope="scope">
                        <el-button  size="mini" type="danger" @click="deleteUser(scope.row._id)" v-if="scope.row.usertype == userTypes[employedUserType]">
                            Obriši
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <form-dodaj-zaposlenog v-if="this.showComp == 'zaposleni'" @zatvoriDodavanjeClana="zavrsiDodavanje()"></form-dodaj-zaposlenog>
    </div>
</template>

<script>
import FilterClanova from './FilterClanova'
import { } from 'element-ui'
import { apiFetch, destinationUrl, UserTypes, EMPLOYED_USER_TYPE, REGULAR_USER_TYPE } from '../services/authFetch';
export default {
    components:{FilterClanova},
    data(){
        return{
            tableData:[],
            showComp:'',
            search:'',
            employedUserType:EMPLOYED_USER_TYPE,
            userTypes:UserTypes,
            user:''
        }
    },
    methods:{
        deleteUser(id){
            console.log(id);
            apiFetch('DELETE', destinationUrl+"/user/delete/" + id)
                .then(result=>{
                    if(result.Success){
                        this.$message("Korisnik je uspešno obrisan!");
                        this.$emit("loadDataTable");
                    }
                }).catch(error=>{console.log(error);})
        },
        zavrsiDodavanje(){
            this.showComp='';
            this.loadDataTable();
        },
        loadDataTable(){
            this.user=event;
            apiFetch('GET',destinationUrl+"/user/users")
                .then(result=>{
                    this.tableData=result.Data;
                    this.tableData.forEach((data,index)=>{
                        data.usertype = UserTypes[result.Data[index].usertype];
                    });
                });
        },
        setUser(event){
            this.user=event;

            if(this.user==UserTypes[EMPLOYED_USER_TYPE]){
                apiFetch('GET', destinationUrl+"/user/getAllEmployed")
                    .then(result=>{
                        this.tableData=result.Data;
                        this.tableData.forEach((data,index)=>{
                            data.usertype = UserTypes[result.Data[index].usertype];
                    });
                    });
            }
            else if(this.user==UserTypes[REGULAR_USER_TYPE]){
                apiFetch('GET', destinationUrl + "/user/getAllRegularUsers")
                        .then(result => {
                            this.tableData=result.Data;
                            this.tableData.forEach((data,index)=>{
                                data.usertype = UserTypes[result.Data[index].usertype];
                        });
                        });
            }
            else {
                apiFetch('GET', destinationUrl + "/user/users")
                    .then(result => {
                        this.tableData=result.Data;
                        this.tableData.forEach((data,index)=>{
                            data.usertype = UserTypes[result.Data[index].usertype];
                        });
                    });
            }
        },
        // handleResponse(result){
        //     if(result.Success){
        //         this.tableData=result.Data;
        //         this.tableData.forEach((data,index)=>{
        //             data.usertype = UserTypes[result.Data[index].usertype];
        //         });
        //     }
        //     else
        //         this.$message({message: "Došlo je do greške!", type: 'error'})
        // }
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
    #select{
        display:flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .evidencija-clanova-container{
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .evidencija-clanova{
        height: 85%;
        width: 90%;
        display: flex;
        flex-direction: column;
        opacity: 1;
        padding: 1em;
    }
    .el-table {
        margin-bottom: 15px;
        width: 100%;
    }
    .labela1{
    text-align: center;
    font-family: cursive;
    font-size:25px;
    justify-content: center;
    align-item:center;
    color:rgba(213, 34, 92, 0.979);
}
    
    @media screen and (max-width: 700px) {
        .evidencija-clanova {
            height: 100%;
            width: 100%;
            padding: 0.5em;
        }
    }
</style>