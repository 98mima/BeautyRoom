<template>
    <div class="zahtev-container">
        <label class="labela1">Neobrađeni zahtevi</label>
        <div class="zahtev-container-table">
            <el-table :data="this.listaZahteva" highlight-current-row @current-change="handleCurrentChange" height="700" border>
                <el-table-column prop="korIme" label="Ime" class="table-column"></el-table-column>
                <el-table-column prop="date" label="Datum" class="table-column"></el-table-column>
                <el-table-column prop="comment" label="Dodatni zahtevi" width="400"  class="table-column"></el-table-column>
                <el-table-column prop="type" label="Tip" class="table-column"></el-table-column>
                <el-table-column prop="time" label="Vreme" class="table-column"></el-table-column>
                <el-table-column prop="status" label="Status" class="table-column"></el-table-column>
            </el-table>
            <div class="zahtevDugmici">
                <div class="dugmici">
                    <el-button round size="mini" style="margin-left: 20%;" @click="potvrdiZahtev()" icon="el-icon-check" ></el-button>
                    <el-button type="danger" round size="mini" style="margin-left: 20%;" @click="odbijZahtev()" icon="el-icon-close" ></el-button>
                    <!-- <el-button type="info" icon="el-icon-message" style="padding: 12px; margin-left: 20%; background-color:orange; border-color:orange;" circle size="mini" @click="poruka()"></el-button> -->
                </div>
            </div>
        </div>
        <label class="labela2">Potvrđeni zahtevi</label>
        <div class="zahtev-container-table">
            <el-table :data="this.listaPotvrdjenihZahteva" max-height="400" border style="width: 1300px" >
             <el-table-column prop="korIme" label="Ime"  class="table-column"></el-table-column>
                <el-table-column prop="date" label="Datum"  class="table-column"></el-table-column>
                <el-table-column prop="comment" label="Dodatni zahtevi"  class="table-column"></el-table-column>
                <el-table-column prop="type" label="Tip"  class="table-column"></el-table-column>
                <el-table-column prop="time" label="Vreme" class="table-column"></el-table-column>
                <el-table-column prop="status" label="Status" class="table-column"></el-table-column>
             </el-table>
        </div>
        <!-- <obavesti-korisnika-zakazivanja v-if="this.showComp == 'obavestenje'" @zatvoriPoruku="zatvori" @proslediPoruku="prosledi($event)"></obavesti-korisnika-zakazivanja > -->
    </div>
</template>

<script>
import { apiFetch, destinationUrl } from '../../services/authFetch';
import { sortReuquestByDate } from '../../services/sort';
// import {ObavestiKorisnikaZakazivanja} from "../ObavestiKorisnikaZakazivanja.vue"
// import { ERRORS } from '../../data/errorsCode';

// const eventTypes = ['Obuka', 'Servis aparata', 'Preventivni godišnji pregled'];
export default {
    // components:{ObavestiKorisnikaZakazivanja},
    data(){
        return{
            listaZahteva:[],
            listaPotvrdjenihZahteva:[],
            currentRow:null,
            selectedIndex:'',
            obavestenje:'',
            showComp:''
        }
    },
    methods:{
        // zatvori(){
        //     this.showComp='';
        //     this.selectedIndex='';
        // },
        // poruka(){
        //     console.log(this.currentRow);
        //     this.showComp='obavestenje';
        //     // this.selectedIndex=index;  
        // },
        // prosledi(prosledjenoObavestenje){
        //     // console.log(this.listaNarudzbina[this.selectedIndex]);

        //      let Data = {reqId: '', notification: ''};
        //         Data.reqId = this.listaZahteva[this.selectedIndex]._id
        //         Data.notification = prosledjenoObavestenje
        //         console.log(Data);
        //     apiFetch('PUT', destinationUrl + "/request/updateRequestNotification", Data)
        //         .then(result =>{
        //             if(result.Success)
        //             {
        //                 console.log(result);
        //                 // console.log(this.listaNarudzbina[this.selectedIndex])
        //                 // this.listaNarudzbina[this.selectedIndex].notification = prosledjenoObavestenje;
        //                 // this.$emit("proslediPoruku", this.notification);
        //                 this.$message({message: "Uspešno ste dodali notifikaciju.", type: 'success'});
        //             }
        //             else
        //                  this.$message({message: "Notifikacija nije dodata.", type: 'error'});
        //         }).catch(error=>console.log(error));
        //     this.showComp='';
        //     this.selectedIndex='';
        // },
        // poruka(){
        //     // this.currentRow = value
        //     console.log(value)
        //     this.$emit('poruka');
        //     this.$emit(this.currentRow);
        // },
        pribaviListuZahteva(){
            apiFetch('GET', destinationUrl + "/request/all")
                .then(result=>{
                        this.listaZahteva = sortReuquestByDate(result.Data.filter(x=>x.status == "neobradjen"), true);
                        this.listaPotvrdjenihZahteva = sortReuquestByDate(result.Data.filter(x=>x.status == "potvrdjen"), true);
                        // this.listaPotvrdjenihZahteva = sortReuquestByDate(result.Data.filter(x=>x.status == "odbijen"), true);
                        this.$emit('datum', this.listaZahteva);
                        this.$emit('potvrdjeni', this.listaPotvrdjenihZahteva);
                }).catch(error=>{console.log(error);})
        },
        
        potvrdiZahtev(){
            if(this.currentRow != null){
                let Data = {date:'', time:'', comment:'', type:'', requestId:'', korisnikid:''};
                Data.date = this.currentRow.date;
                Data.time = this.currentRow.time;
                Data.comment = this.currentRow.comment;
                Data.requestId = this.currentRow._id;
                Data.type = this.currentRow.type;
                // Data.notification = this.notification;
                Data.numberKorisnika = this.currentRow.numberKor;
                console.log(this.currentRow)
                apiFetch('POST', destinationUrl + "/task/assign", Data)
                    .then(result=>{
                        if(result.Success){
                            this.$message({message: "Uspešno dodeljivanje obaveze", type:'success'})
                            this.listaZahteva.splice(this.listaZahteva.indexOf(this.currentRow),1);
                            this.listaPotvrdjenihZahteva.push(this.currentRow);
                            this.$emit('datum',this.listaZahteva);
                            this.$emit('potvrdjeni', this.listaPotvrdjenihZahteva);
                            this.$message({message: "Uspesno ste potvrdili zahtev", type: 'success'})
                        }
                        // else    
                        //     this.$message({message: ERRORS[result.Errors[0].Code], type: "warning"});
                    }).catch(error=>{console.log(error);})
            }
            else if(this.currentRow == null){
                 this.$message({message: "Morate selektovati zahtev pre potvrde.", type: 'error'})
            }
        },
        odbijZahtev(){
            if(this.currentRow != null){
               let Data = {reqId: ''};
                Data.reqId = this.currentRow._id;
                console.log(Data)
                apiFetch('PUT',destinationUrl + "/request/rejectRequest", Data)
                    .then(result=>{
                        // if(result.Success){
                            console.log(result)
                            this.$message({message: "Uspešno ste odbili zahtev.", type: 'warning'})
                            this.listaZahteva.splice(this.listaZahteva.indexOf(this.currentRow),1);
                            this.$emit('datum',this.listaZahteva);
                        // }
                        // else
                        //     this.$message("Došlo je do greške!");
                    }).catch(error => {console.log(error);})
            }
            else
                this.$message({message: "Morate selektovati zahtev pre odbijanja.", type: 'error'});
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        }
    },
    mounted: function() {
        this.pribaviListuZahteva();
    },
    props: ['notification']
}
</script>

<style scoped>
.zahtev-container{
    //background-color: rgba(249, 227, 254, 0.986);
}
.zahtev-container-table{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    height: 440px;
}

.zahtevDugmici{
    display: flex;
    justify-content: space-between;
    margin-top: 1%;
    margin-bottom: 1%;
}

.labela1{
    color: rgba(213, 34, 92, 0.979);
    text-align: center;
    font-family: cursive;
    font-size:30px;
    margin-left: 45px;
}

.labela2{
    color: rgba(213, 34, 92, 0.979);
    text-align: center;
    font-family: cursive;
    font-size:30px;
    margin-left: 155px;
}

.dugmici{
    display: flex;
    margin-right: 10%;
}
</style>