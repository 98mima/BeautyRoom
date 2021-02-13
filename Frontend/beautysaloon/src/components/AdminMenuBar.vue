<template>
         <div class="profil-container">
             <side-bar-profil @changeView="setComponent($event)" :list="this.menuItems" />
             <div class="container">
               <evidencija-clanova v-if="this.showComp == 'evidencijaclanova'"></evidencija-clanova>
                <narudzbina v-if="this.showComp == 'narudzbina'"></narudzbina>
                <!-- <utisak-uprave v-if="this.showComp == 'utisakuprave'"></utisak-uprave> -->
                <zakazivanja v-if="this.showComp == 'zakazivanja'" ></zakazivanja>
                <proizvodi-uprave v-if="this.showComp == 'proizvodiuprave'"></proizvodi-uprave>
             </div>
        </div>
</template>

<script>
import FooterBar from "./appBar/FooterBar.vue";
import SideBarProfil from "./appBar/MenuBar.vue";
import EvidencijaClanova from "./EvidencijaClanova.vue"
import Narudzbina from "./Narudzbina.vue"
// import UtisakUprave from "../components/UtisakUprave.vue"
import Zakazivanja from "./Zakazivanja.vue"
import ProizvodiUprave from "./ProizvodiUprave.vue"
export default {
    components: {
        // eslint-disable-next-line vue/no-unused-components
        FooterBar, SideBarProfil, EvidencijaClanova, Narudzbina, Zakazivanja, ProizvodiUprave
    },
    data() {
        return{
            ProfilData: [],
            showComp: 'profil',
            menuItems: [
                {
                    key: 1,
                    label: 'Zakazivanja',
                    index: 'zakazivanja',
                    slika: 'zakazivanje.png'
                },
                {
                    key: 2,
                    label: 'Narudžbine',
                    index: 'narudzbina',
                    slika: 'narudzbine.png'
                },
                // {
                //     key: 3,
                //     label: 'Utisci',
                //     index: 'utisakuprave',
                //     slika: 'utisak.png'
                // },
                {
                    key: 3,
                    label: 'Proizvodi',
                    index: 'proizvodiuprave',
                    slika: 'proizvodi.png'
                },
                {
                    key: 4,
                    label: 'Evidencija članova',
                    index: 'evidencijaclanova',
                    slika: 'evidencijaclanova.png'
                }
            ],
            user: {name: '', lastname: '', username:'', email: '', password: '',
                address: '', number: '' }
        }
    },
    methods: {
        setComponent(component){
            this.showComp = component;
        }
    }
}
</script>

<style scoped>
.profil-container{
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    background-color: rgba(224, 224, 235, 0.445);
}
.container{
    display: flex;
    justify-content: center;
    height: calc(100% - 112px);
    width: 100%;
    padding: 0px;
}

@media screen and (max-width: 700px){
    .profil-container{
        flex-direction: column;
    }
}
</style>
