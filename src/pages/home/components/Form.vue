
<script>

import { inject } from 'vue';
import { Vue3Lottie } from 'vue3-lottie'
import {useMobile} from '../../../composables/useMobile.js'
import { activeEmail, resendEmail } from '../../../services/activeEmail';
import SendEmailJSON from "../../../assets/sendEmail.json"
import LoadingJSON from '../../../assets/loading.json'
import router from '../../../router/routes.js'
import { toast } from 'vue3-toastify';
import axios from 'axios';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/

export default {
    components:{
        Vue3Lottie
    },
    props:['isSignInFormActivedProps'],
    setup(){
        const dataProvide = inject('dataProvide')

        const { isMobile } = useMobile();

        return{
            isMobile,
            dataProvide,
            change : (boolean) => dataProvide.isSignInFormActived = boolean
        }
    },
    data(){
        return{
            signIn:{
                email : "",
                password:  ""
            },
            signUp : {
                firstName: "",
                lastName: "",
                email : "",
                confirmEmail : "",
                password:  "",
                confirmPassword: "",
                errors: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    confirmEmail: "",
                    password: "",
                    confirmPassword: ""
                }
            },
            emailToResend: "",
            typePassword : "password",
            isLoading: false,
            confirmEmail : false,
            SendEmailJSON : SendEmailJSON,
            LoadingJSON : LoadingJSON,
            activingEmail : null,
            emailActived : null,
            resendingEmail : null,
            activeResendEmailForm: false,
            emailAlreadyActive: null
        }
    },
    created(){
        if(this.dataProvide.isToken){
            this.confirmEmail = true
            this.activingEmail = true;
            activeEmail(this.dataProvide.isToken)
                    .then((res) => {
                        if(res){
                            this.activingEmail = false;
                            this.emailActived = true;
                            this.secondsCounterHandler();
                            setTimeout(() => router.push("/user"),5000)
                        } else {
                            this.activingEmail = false;
                            this.emailActived = false;
                        }
                    })
        }
    },
    methods:{
        activeRegister(){
            this.change(false)
        },
        backToLogin(){

            this.confirmEmail = false
            this.activingEmail = false;

        },
        clearForm(){
            this.signIn.email = "",
            this.signIn.password = ""

        },
        handleFormActive(){
            this.change(true)
            this.firstRender = false;
        },
        handleValidator(isSending){

            for(let [key] of Object.entries(this.signUp.errors)){

                if (isSending && !this.signUp[key]) this.signUp.errors[key] = "*required field";

                else if(this.signUp[key]) this.signUp.errors[key] = "";

                if(this.signUp[key] || key === "confirmEmail" && this.signUp.email || key === "confirmPassword" && this.signUp.password){

                    if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(this.signUp[key]) && 
                        (   key === "firstName" || 
                            key === "lastName" )) this.signUp.errors[key] = "*only letters";

                    else if(key === "email" && 
                    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.signUp[key])) {
                        
                        this.signUp.errors.email = "*format email valid";
                    
                    } else if(key === "confirmEmail" && this.signUp[key] !== this.signUp.email){

                        this.signUp.errors.confirmEmail = "*the emails must match";

                    }else if(key === "password" && !passwordRegex.test(this.signUp[key])){

                        this.signUp.errors.password =   "the password must 6 to 16 valid characters, " +
                                                        "has at least a number, and a special character. "

                    } else if(key === "confirmPassword" && this.signUp[key] !== this.signUp.password){

                        this.signUp.errors.confirmPassword = "*the passwords must match";

                    }

                } else if(this.signUp.errors[key] !== "*required field" && (key !== "confirmEmail" || key !== "confirmPassword")){

                    this.signUp.errors[key] = "";

                }

            }

        },
        handleViewPassword(){

            if(this.typePassword === "password"){

                this.typePassword = "text"

            } else {

                this.typePassword = "password"

            }

        },
        resendEmailHandler(){
            this.resendingEmail = true;
            this.isLoading = true;
            this.emailAlreadyActive = false;
            resendEmail(this.emailToResend)
                .then(res => {
                    if(res && res != "already active"){
                        this.activeResendEmailForm = false;
                        this.resendingEmail = false;
                        this.isLoading = false;
                    } else {
                        this.resendingEmail = false;
                        this.activeResendEmailForm = false;
                        this.isLoading = false;

                        if(res == "already active"){

                            this.emailAlreadyActive = true;

                        }

                    }
                })
        },
        login(email, password){
            this.isLoading = true;
            axios.post('http://localhost:8080/api/login',`email=${email}&password=${password}`,
                )
                    .then(res => {

                        this.isLoading = false;

                        router.push("/user")

                    })
                    .catch(err => {
                        console.log(err)
                        if(err.response.data.status === 403){

                            toast("Email not confirmed",
                            {toastStyle: {
                                            fontSize: '20px',
                                            background: "#9b1d1d",
                                            color: "white"
                                        }}
                            )

                        } else {

                            this.isLoading = false;
                            this.clearForm();
                            toast("Invalid credentials",
                            { toastStyle: {
                                            fontSize: '20px',
                                            background: "#9b1d1d",
                                            color: "white"
                                        }}
                            )
                        }

                    })
        }
    },
    computed: {

        validating(){

            this.handleValidator(false);

        }

    }
}

</script>

<template>
    {{validating}}
    <section class="position-relative grid__layout" style="height: fit-content">

        <img v-if="!isMobile" class="justify__self__right" src="../../../assets/loginImage.png" alt="login" style="width: 40vw;">

        <div class="container__form__title justify__self__left">
            <template v-if="dataProvide.isSignInFormActived && !confirmEmail" >
                <form   autocomplete="off"
                        class="login__container p-2 pe-4 ps-4 rounded-4 shadow">
                    <h3 class="text-center">Login</h3>
                    <div class="mt-2">
                        <label for="asdd" class="form-label">Email</label>
                        <input v-model="signIn.email" readonly onfocus="this.removeAttribute('readonly');" type="email" name="asd" class="form-control" id="asdd" placeholder="name@example.com">
                    </div>
                    <div class="mt-4">
                        <label for="pass" class="form-label">Password</label>
                        <div class="d-flex position-relative">
                            <input  v-model="signIn.password" 
                                    class="form-control" 
                                    id="pass" 
                                    :type="typePassword"
                                    >
                            <span class="position-absolute text-dark" style="top: 7px; right: 5px" @click="handleViewPassword" >
                                <i v-if="typePassword === 'password'" class="bi bi-eye"></i>
                                <i v-if="typePassword === 'text'" class="bi bi-eye-slash"></i>
                            </span>
                        </div>
                    </div>
                    <div class="d-flex flex-column mt-4">
                        <button class="btn text-light"
                                style="background-color: #e9605a;" 
                                @click.prevent="login(signIn.email, signIn.password)">
                                <div class="spinner-border spinner-border-sm text-light" role="status" v-if="isLoading">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <span v-if="!isLoading">
                                    Sign in
                                </span>
                        </button>
                    
                        <p class="mt-2">Don't have an account?
                            <span class="text-decoration-underline"
                                    style="cursor: pointer"
                                    @click="activeRegister">
                                    Register
                            </span>
                        </p>
                    </div>
                </form>
            </template>

            <template v-if="confirmEmail" >
                <div    class="login__container p-2 rounded-4 shadow d-flex flex-column justify-content-between"
                        style="min-height: 300px">
                    <h3 class="text-center mt-2">Confirm Email</h3>
                        <div v-if="!activingEmail && emailActived == null">
                            <Vue3Lottie     :animationData="SendEmailJSON" 
                                            :width="100" :height="100" 
                                            />
                            <p class="text-center">We sent you a link at your email to confirm.</p>
                        </div>
                        <div  v-if="activingEmail" >
                            <p class="fs-6 text-center">Confirming, <br/> please wait a moment</p>
                            <Vue3Lottie     :animationData="LoadingJSON"  
                                            :width="100" :height="100" 
                                />
                        </div>
                        
                        <div    class="d-flex flex-column"
                                v-if="!emailActived && emailActived !== null && !activeResendEmailForm">
                            <p v-if="emailAlreadyActive">The email is already confirmed</p>
                            <p  v-if="!resendingEmail && resendingEmail !== null && !emailAlreadyActive"
                                class="text-center mb-2">
                                Email resent <br/>
                                If you have a account with that email you will receive the link to confirm, please now check your email. If you do not receive the email within the next 5 minutes try again or maybe you don't have a account</p>
                            <p v-if="resendingEmail == null" class="text-center mb-2" style="color:#ff938e ">Link invalid or expired.</p>
                            <p class="text-center" v-if="resendingEmail === null">Try resend the link to your email</p>
                            <button class="btn text-light mt-2"
                                    style="background-color: #e9605a;" 
                                    @click="activeResendEmailForm = true">
                                    Resend email
                            </button>
                        </div>

                        <form   v-if="activeResendEmailForm" @submit.prevent="resendEmailHandler"
                                class="d-flex flex-column justify-content-between">
                            <p>introduce the account's email to resend activation token</p>
                            <div class="mt-2">
                                <label for="email" class="form-label">Email</label>
                                <input v-model="emailToResend" readonly onfocus="this.removeAttribute('readonly');" type="email" name="email" class="form-control" id="asdd" placeholder="name@example.com">
                            </div>
                            <button class="btn text-light mt-2"
                                    style="background-color: #e9605a;" type="submit">
                                <div    class="spinner-border spinner-border-sm text-light" 
                                        role="status" 
                                        v-if="isLoading">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <span v-if="!isLoading">
                                    Resend link
                                </span>
                            </button>
                        </form>

                        <p v-if="emailActived">Registration completed, email confirmed.</p>
                        <p v-if="emailActived">You will redirect to home page in {{secondsCounter}} seconds or click <a href="/web/accounts.html">Here</a></p>
                    
                        <button class="btn btn-link text-light" @click="backToLogin">Sign in</button>

                </div>
            </template>
            
            <template v-if="!dataProvide.isSignInFormActived && !confirmEmail">
                <form   
                        autocomplete="off" 
                        class="register__container p-2 pe-4 ps-4 rounded-4 shadow">
                    <h3 class="text-center">Join us</h3>
                        <div class="d-flex flex-column flex-sm-row gap-2">
                            <div class="mt-2">
                                <label for="name" class="form-label">First Name</label>
                                <input v-model="signUp.firstName" type="text" class="form-control" id="name">
                                <p class="error__text">{{signUp.errors.firstName}}</p>
                            </div>
                            <div class="mt-2">
                                <label for="lastName" class="form-label">Last Name</label>
                                <input v-model="signUp.lastName" type="text" class="form-control" id="lastName">
                                <p class="error__text">{{signUp.errors.lastName}}</p>
                            </div>
                        </div>
                        <div class="d-flex flex-column flex-sm-row gap-2">
                            <div class="mt-2">
                                <label for="email" class="form-label">Email</label>
                                <input v-model="signUp.email"  autocomplete="new-email" type="text" class="form-control" id="email1" placeholder="name@example.com">
                                <p class="error__text">{{signUp.errors.email}}</p>
                            </div>
                            <div class="mt-2">
                                <label for="email" class="form-label">Confirm email</label>
                                <input  v-model="signUp.confirmEmail" 
                                        type="text" 
                                        class="form-control" 
                                        id="email2" 
                                        placeholder="name@example.com"
                                        autocomplete="new-email"
                                        >
                                <p class="error__text">{{signUp.errors.confirmEmail}}</p>
                            </div>
                        </div>
                        <div class="d-flex flex-column flex-sm-row gap-2">
                            <div class="mt-2">
                                <label for="password" class="form-label">Password</label>
                                <input  v-model="signUp.password" 
                                        class="form-control" 
                                        id="password1" 
                                        :type="typePassword"
                                        autocomplete="new-password">
                                <p class="error__text">{{signUp.errors.password}}</p>
                            </div>
                            <div class="mt-2">
                                <label for="password" class="form-label">Confirm password</label>
                                <input  v-model="signUp.confirmPassword" 
                                        class="form-control" 
                                        id="password2" 
                                        :type="typePassword"
                                        autocomplete="new-password">
                                <p class="error__text">{{signUp.errors.confirmPassword}}</p>
                            </div>
                        </div>
                        
                        <div class="d-flex flex-column mt-4">
                            <button type="button" :disabled="isLoading" class="btn text-light" style="background-color: #e9605a;" @click="register">
                                <div    class="spinner-border spinner-border-sm text-light" 
                                        role="status" 
                                        v-if="isLoading">
                                        <span   span class="visually-hidden">Loading...</span>
                                </div>
                                <span v-if="!isLoading">
                                    Sign up
                                </span>
                            </button>
                        
                            <p class="mt-2">Do you have an account?
                                <span class="text-decoration-underline"
                                        style="cursor: pointer"
                                        @click="handleFormActive">
                                        Sign in
                                </span>
                            </p>
                        </div>
                </form>
            </template>

        </div>
    </section>
</template>

<style scoped>
    .grid__layout{
        width: 70vw;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        justify-items: center;
    }

    .login__container{
        width: 350px;
        max-width: 90vw;
        background: #216daf;  /* fallback for old browsers */
        color: white;
        z-index: 1;
        position: relative;
        z-index: 1;

    }
    .container__form__title{

        z-index: 1;
        width: fit-content;

    }

    .register__container{
        width: 35vw;
        display: grid;
        grid-template-columns: 1fr;
        min-width: 350px;
        max-width: 90vw;
        background: #216daf;  /* fallback for old browsers */
        color: white;
        max-width: fit-content;
        z-index: 1;
        position: relative;
        z-index: 1;
    }
    .error__text{
        color: rgb(255, 112, 112);
        font-size: 15px;
        max-width: 200px;
    }

    @media (max-width: 1200px) {
        .grid__layout{
            width: 90vw;
        }
    }
</style>