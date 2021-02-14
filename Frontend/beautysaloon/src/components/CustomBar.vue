<template>
    <div class="menu-container">
        <div class="header-bar" text-color="white">
            <div class="naslov">
                <h3 style="color:rgba(213, 34, 92, 0.938); margin-top:5px; font-family:Georgia, 'Times New Roman', Times, serif; font-size:30px;"> Beauty Room </h3> 
            </div>
             <div class="top-menu-button-container">
                <el-button round size="small" class="top-menu-button" @click="zatvoriMeni"  style="color: rgba(213, 34, 92, 0.925); border-color:white; background-color:white;">
                    <el-icon class="el-icon-more"></el-icon>
                </el-button>
                <el-button class="odjava" round size="small" @click="logout()" style="margin-right:5px; color:white; background-color: rgba(213, 34, 92, 0.925); border-color:rgba(213, 34, 92, 0.925);"> 
                    <el-icon class="el-icon-switch-button"></el-icon>
                </el-button>
            </div> 
        </div>
        <div class="body-container">
            <transition name="el-zoom-in-center">
            <div class="side-menu" v-if="this.menuShown">
                <el-menu style="width:100%; background: linear-gradient(0deg, rgba(39, 160, 150, 0.938), rgba(111, 201, 37, 0.979) );"
                class="el-menu-demo"
                mode="horizontal"
                @select="emitMenuSelect($event)"
                text-color="white"
                active-text-color="rgba(144, 225, 240, 0.938)"
                :router="false">
                    <el-menu-item v-for="item in itemList" :key="item.key" class="side-menu-item" :index="item.index"
                        style=" background: linear-gradient(0deg, rgba(39, 160, 150, 0.938), rgba(111, 201, 37, 0.979) );">
                       <img v-if="item.slika != undefined" style="height:30%; margin-right: 1em; margin-left:0.1em; position:left;
                       margin-top:20px;" :src="getImgUrl(item.slika)"/>{{item.label}}
                    </el-menu-item>
                </el-menu>
            </div>
            </transition>
            <slot></slot>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import {Button,Menu, MenuItem,Icon} from 'element-ui'
import { deleteCredentials } from '../services/authFetch';
import {clearUserInfo, clearFormMode, clearPageShown} from "../services/contextManagement";
export default {
    // eslint-disable-next-line vue/no-unused-components
    components: {Icon,Button,Menu,MenuItem},
    data() {
        return{
            itemList: this.list,
            menuShown: true
        }
    },
    methods: {
        zatvoriMeni: function(){
            this.menuShown = !this.menuShown;
        },
        getImgUrl(slika){
            return require("../assets/" + slika)
        },
        emitMenuSelect: function(event){
            this.$emit('changeView', event)
        },
        logout(){
            deleteCredentials()
            clearUserInfo()
            clearFormMode()
            clearPageShown()
            window.location.href = '/login'
            // apiFetch('POST', destinationUrl + "/User/SignOut")
            //     .then(result => {
            //         if(result.Success) {
            //             clearLocalStorage();
            //             clearSessionStorage();
            //             setUserInfo(null, ANONYMOUS_USER_TYPE);
            //             window.location.href = "/";
            //         }
            //     });
        }
    },
    props: ['list']
    
}
</script>
<style scoped> 
.naslov{
    display: flex;

    margin-top: 5px;
    padding-left: 2em;
}
.menu-container{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%
}
.header-bar{
    height: 56px;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    background: linear-gradient(0deg, rgba(111, 201, 37, 0.979),rgba(196, 238, 162, 0.938) );
}
.top-menu-button-container{
    display: flex;
    width: 100%;
    justify-content: flex-end;
    opacity: 0.95;
    position: absolute;
    top: 0;
    padding-right: 3em;
    padding-top: 0.5em;
    padding-bottom: 0.3em;
}
.body-container{
    /* justify-content: center; */
    height: 100%;
    padding-top: 56px;
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    position: absolute;
}
.side-menu{
    height: 56px;
    width: 100%;
     /*background-color: #2980c7d3;*/

}
.side-menu-item{
    display: flex;
    
}
@media screen and (max-width: 700px){
    .body-container{
        flex-direction: column;
    }
    .side-menu{
        height: 225px;
        width: 100%;
    }
}

</style>


