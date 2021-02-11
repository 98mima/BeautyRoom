<template>
    <div class="container">
        <form-zakazi :date="datum" @zakazano="osveziPrikaz"></form-zakazi>
    </div>
</template>

<script>
import FormZakazi from "../forms/FormZakazi.vue"
import { getUserInfo } from '../../services/contextManagement';
import { destinationUrl, apiFetch } from '../../services/authFetch'
export default {
    // eslint-disable-next-line vue/no-unused-components
    components: {FormZakazi},
    data() {
        return{
            value: new Date(),
            datum: '',
            listaZahteva: [],
            datumi:[],
            counts: [],
            userId:''
        }
    },
    methods: {
        radi(date){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd  ;
            if(date > today){
                this.datum = date
            }    
            else{
                this.$message({message: "Morate izabrati predstojeći datum!", type: 'warning'})
                this.datum = ''
            }
        },
        vratiZahteve(data) {
            this.datumi.forEach(el=>{
                if(data.day==el)
                    data.isSelected=true
            });
        },
        pribaviDatum(datumi) {
            this.datumi=[];
            datumi.forEach(el=>{
                this.datumi.push(el.Date);
            });
            this.countDate();
        },
        countDate(){
            let counts=[];
            this.datumi.forEach(function(x)
            {
                counts[x] = (counts[x] || 0) + 1;
            });
            this.counts=counts;
        },
        osveziPrikaz(zahtev){
            this.listaZahteva.push(zahtev);
            this.datumi.push(zahtev.Date)
            this.countDate();
        }
    },
    mounted: function() {
            apiFetch('GET', destinationUrl + "/request/getByUserId/" + getUserInfo().userID)
             .then(result => {
                    console.log(result.Data)
                if(result.Success) {
                    this.listaZahteva=result.Data;
                    this.listaZahteva=this.listaZahteva.filter(x=>x.RequestStatus != 2);
                    this.pribaviDatum(this.listaZahteva);
                }
            }).catch(error => console.log(error));
        
    }
}
</script>

<style scoped>
    .container{
        display: flex;
            height: 100%;
            width: 100%;
            flex-direction: column;
            overflow: auto;
            background-color: rgba(224, 224, 235, 0.445);
    }
    .element{
        height: 100%;
        width: 100%;
    }
    .item{
        height: 60px;
        width: 60px;
        font: 20px;
    }
    .kalendar{
        margin: 20px 100px 50px;
    }
    /* footer-bar{
        justify-content: flex-end;
    } */
</style>