<template>
    <div class="zakazi-container">
        <el-form class="zakazi-forma">
            <div class="stavka">
                <label>Datum:</label>
                <el-date-picker v-model="value1" type="date" placeholder="Pick a day">
                </el-date-picker>
             <!--   <el-input
                    :disabled="false" :value="this.date" readonly
                    v-model="this.date" placeholder="Datum iz kalendara">{}</el-input>-->
            </div>
            <div class="stavka">
                <label>Dodatni zahtevi:</label>
                <el-input type="textarea"
                    :autosize="{minRows: 4, maxRows: 4}" v-model="podaciZakazi.Description">
                </el-input>
            </div>
            <div class="stavka">
                <label>Tip:</label>
                <el-select  v-model="podaciZakazi.EventType" placeholder="Izaberite tip usluge">
                    <el-option v-for="item in options" :key="item.tip" :label="item.label" :value="item.tip"></el-option>
                </el-select>
            </div>
            <div class="stavka">
                <label>Vreme:</label>
                <el-time-select  v-model="podaciZakazi.Time" :picker-options="{ start: '10:00', step: '00:45', end: '21:00' }" placeholder="Select time"></el-time-select>
            </div>
            <div class="dugme">
                <el-button id="dugmeZakazi" plain @click="proslediZahtev" style="color: white; border-color:rgba(213, 34, 92, 0.925); background-color:rgba(213, 34, 92, 0.925);">Zakaži</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import { getUserInfo } from '../../services/contextManagement';
import { apiFetch, destinationUrl } from '../../services/authFetch';
import { ERRORS } from '../../data/errorsCode';
export default {
    data(){
        return{
            value1:'',
            podaciZakazi: {
                Date: '',
                Description: '',
                EventType: '',
                Time: '',
                UserId: ''
            },
            user: {FirstName:'', LastName:''},
            options: [{
                tip:'Masaza',
                label:'Masaza'
                },{
                tip:'Depilacija',
                label:'Depilacija'
                },{
                tip:'Sminkanje',
                label:'Sminkanje'
                },{
                tip:'Manikir',
                label:'Manikir'
                },{
                tip:'Pedikir',
                label:'Pedikir'
                }
            ],
        }
    },
    props: {date:String},
    watch: {
        date: function(pom){
            this.podaciZakazi.Date=pom;
        }
    },
    methods: {
        validacija() {
            if(this.podaciZakazi.value1 == '' || this.podaciZakazi.EventType == '' || this.podaciZakazi.Time == ''){
                this.$message({message: "Morate popuniti sva polja!", type: 'warning'})
                return false
            }
            return true
        },
        proslediZahtev() {
             if(!this.validacija())
                 return

            this.podaciZakazi.Date = this.date;
            this.podaciZakazi.FirstName = this.user.FirstName;
            this.podaciZakazi.LastName = this.user.LastName;
            this.podaciZakazi.UserId = getUserInfo().userID;
            apiFetch('POST', destinationUrl + "/request/add", this.podaciZakazi)
            .then(result => {
                if(result.Success){
                    this.$message({message: "Uspesno ste zakazali termin.", type: 'success'});
                    this.$emit("zakazano",this.podaciZakazi);
                    this.clearForm();
                }
                else if(result.Errors != null) {
                    result.Errors.forEach(error => {
                        this.$message({message: ERRORS[error.Code], type: "warning"});
                    })
                }
            }).catch(error => {
                console.log(error);
            });


        },
        pribaviKorisnika(){
            let userId = getUserInfo().userID;
            fetch(destinationUrl + '/User/GetUserById/?id=' + userId, {method: "GET"})
                .then(response => response.ok ? response.json() : new Error())
                .then(result => {
                    this.user.FirstName = result.Data.FirstName;
                    this.user.LastName = result.Data.LastName;
                })
        },
        clearForm() {
            this.podaciZakazi.Date = "";
            this.podaciZakazi.AdditionalRequests = "";
            this.podaciZakazi.EventType = "";
            this.podaciZakazi.Time = "";
        },
        radi(value1){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd  ;
            if(value1 > today){
                this.datum = value1
            }    
            else{
                this.$message({message: "Morate izabrati predstojeći datum!", type: 'warning'})
                this.datum = ''
            }
        }
    },
    beforeMount(){
        this.pribaviKorisnika()
    }
}
</script>

<style scoped>
    .zakazi-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding:50px;
        padding-top: 0px;
    }
    .zakazi-forma{
        height: 500px;
        width: 450px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .stavka{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
    }
    .el-select{
        display: flex;
        width: 100%;
        margin: 0px;
    }
    .el-input{
        display: flex;
        width: 100%;
        margin: 0px;
    }
    .dugme{
        display: flex;
        flex-direction: row-reverse;
        margin: 5px;
        width: 100%;
    }
</style>