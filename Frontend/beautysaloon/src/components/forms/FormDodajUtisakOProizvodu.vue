<template>
    <div class="utisak-o-proizvodu">
        <el-dialog visible class="dialog" width="30%" center>
            <el-popover>
                <img :src="Logo" style="height:130px; width: 150px; margin: 0 auto; display:flex; justify-self: center;" slot="reference"/> 
            </el-popover>
            <h5 style="color:rgba(0, 0, 0, 0.925);">Dodajte komentar o proizvodu</h5>
            <!-- <label class="form-line">Tekst:</label> -->
            <el-input type="textarea" v-model="utisakText" :rows="10"></el-input>
            <div class="dugme">
                <el-button @click="potvrdiUnos" type="success" icon="el-icon-check" circle style=" background-color:rgba(213, 34, 92, 0.925); border-color:rgba(213, 34, 92, 0.925);"></el-button>
                <el-button @click="ponisti" type="danger" round style="color:rgba(213, 34, 92, 0.925); background-color: white; border-color:white">Poništi</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import logo from '../../assets/logo2.png';
export default {
    data() {
        return{
            Logo: logo,
            utisakText:''
        }
    },
    methods: {
        potvrdiUnos: function(){
            if(this.utisakText==='')
            {
                this.$message('Morate uneti tekst utiska')
                return
            }
            var novo = {
                tekst: this.utisakText,
            }
            this.utisakText=''
            this.$emit('zavrsenUnos', novo)
        },
        ponisti: function(){
            this.$emit('zavrsenUnos','cancel')
        }
    }
}
</script>

<style scoped>
    .utisak-o-proizvodu{
        display: flex;
        width: 100%;
        height: 100%;
    }
    .form-line{
        display: block;
        margin-top: 1em;
    }
    .dugme{
        display: flex;
        justify-content: space-between;
        margin-top: 5%;
    }
</style>