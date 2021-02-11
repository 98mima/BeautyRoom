<template>
    <div class="profile-info-page">
        <user-profile-info @openChangePasswordForm="openChangePasswordForm"/>
        <el-dialog
            width="30%" center class="changePasswordForm"
            @close="closeChangePasswordForm" 
            :visible="isChangePasswordFormVisible" 
            :modal-append-to-body="false">
            <el-popover>
                <img :src="Logo" style="height:130px; width: 170px; margin: 0 auto; display:flex; justify-self: center;" slot="reference"/> 
            </el-popover>
            <h6>Promena lozinke</h6>
            <change-password-form 
                @closeChangePasswordForm="closeChangePasswordForm" />
        </el-dialog>
    </div>
</template>

<script>
import UserProfileInfo from "./UserProfileInfo.vue";
import ChangePasswordForm from "./ChangePasswordForm.vue";
import logofirme2 from '../../../assets/logo2.png';
export default {
    components: { UserProfileInfo, ChangePasswordForm},
    data(){
        return{
            Logo: logofirme2,
            isChangePasswordFormVisible: false
        }
    },
    methods: {
        openChangePasswordForm() {
            this.isChangePasswordFormVisible = true;
        },
        closeChangePasswordForm() {
            this.isChangePasswordFormVisible = false;
        }
    }
}
</script>

<style scoped>
    .profile-info-page{
        width: 60%;
        margin-top: 5vh;
        display: flex;
        flex-direction: column;
        align-content: center;
    }
</style>