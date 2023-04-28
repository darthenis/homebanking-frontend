<script>
import Publish from './components/Publish.vue';
import Form from './components/Form.vue';

import firstImage from '../../assets/indexImage.png'
import secondImage from '../../assets/shop.png'
import thirdImage from '../../assets/24hrs.png'
import fourthImage from '../../assets/devicesResponsive.png'

import {provide, ref, reactive} from 'vue'

export default {
    setup(){
        const dataProvide = reactive({
            isSignInFormActived : true,
            isToken : null
        })
        
        provide('dataProvide', dataProvide)

        return {dataProvide}
    },
    data(){
        return{
            firstData: {
                            text: "With our user-friendly interface and advanced security measures, managing your finances has never been easier. Enjoy features such as mobile banking, bill payments, and instant money transfers all in one convenient location.",
                            imgUrl: firstImage
                        },
            data:   [{
                        text: "With our banking platform's credit and debit cards, you can shop at any business that accepts Visa worldwide. Whether you're traveling abroad or shopping locally, our cards provide you with the convenience and flexibility to make purchases anywhere.",
                        imgUrl: secondImage
                    },
                    {
                        text: "The World Bank Platform is a powerful tool designed to help people and communities all over the world access the resources they need to thrive. Whether you're a small business owner looking to expand your operations, a community organization seeking funding for a new project, or an individual looking to improve your financial literacy, the World Bank Platform has something to offer.",
                        imgUrl: thirdImage
                    },
                    {
                        text: "Our banking platform is designed to be responsive, providing you with an optimal experience no matter what device you're using. Whether you're accessing our platform from your desktop, laptop, tablet, or smartphone, you'll enjoy the same user-friendly interface and functionality.",
                        imgUrl: fourthImage
                    }],
            activeLogin : false
        }
    },
    created(){

        const token = this.getParamFromUrl("token");

        if(token){

            console.log(this.dataProvide.isToken)

            this.handleLogin();

            this.dataProvide.isToken = token;

            console.log(this.dataProvide.isToken)

        }

    },
    components: {
        Publish: Publish,
        Form : Form
    },
    methods:{
        activeRegister(){
            this.dataProvide.isSignInFormActived = false;
            this.activeLogin = true;
        },
        handleLogin(){
            this.dataProvide.isSignInFormActived = true;
            this.activeLogin = true;
        },
        getParamFromUrl(param){
            return new URLSearchParams(window.location.search).get(param);
        },
    }
}
</script>


<template>
    <div id="app">
        <main class="w-100 background__dark layout__login" style="height: fit-content">

            <header class="w-100 d-flex justify-content-center align-items-center" style="height: 70px; z-index: 100;">
                
                <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center w-100" style="max-width: 1200px">
                    <div    
                        class="title__icon d-flex justify-content-center align-items-end gap-1 text-white m-4"
                        @click="loadIndex">
                    
                    <img src="../../assets/new_logo.png" alt="logo"     >
                    <h1 @click="activeLogin = false" style="cursor:pointer">Huborange</h1>
                
                    </div>
                    <div>
                        <button class="btn p-1 m-2 text-light" @click="handleLogin" style="background-color: #e9605a;">Sign in</button>
                        <button class="btn p-1 m-2 text-light" @click="activeRegister" style="background-color: #e9605a;">Sign up</button>
                    </div>
                </div>
                
                
            </header>
            
            <template v-if="!activeLogin && !confirmEmail">



                <section  class="container d-flex flex-column justify-content-center align-items-center" style="max-width: 90vw;">

                    <div v-if="isMobileSmall">
                        <button v-if="!activeLogin" class="btn m-2 text-light" @click="activeLogin = true" style="background-color: #e9605a;">Sign in</button>
                        <button v-if="!activeLogin" class="btn text-light" @click="activeRegister" style="background-color: #e9605a;">Sign up</button>
                    </div>

                    <Publish :text="firstData.text" :imgUrl="firstData.imgUrl" :firstData="true"/>

                </section>
                
                <section    id="sec1" 
                            class="position-relative container d-flex flex-column justify-content-center align-items-center"
                            style="max-width: 90vw">
                    <template v-for="(art, index) in data">
                        <Publish :text="art.text" :imgUrl="art.imgUrl" :leftImg="(index % 2) != 0"/>
                    </template>
                </section>
            
                <footer class="footer d-flex justify-content-around align-items-center text-white p-3 ">

                    <ul class="m-0 ul_normalize" >
                        <li class="text__footer">Developer</li>
                        <li>Emiliano Acevedo</li>
                        <li>Buenos Aires, Argentina</li>
                    </ul>

                    <ul class="m-0 ul_normalize">
                        <li class="text__footer">Institute</li>
                        <li>Mindhub</li>
                        <li>Cohort 41</li>
                    </ul>

                    <ul class="m-0 ul_normalize">
                        <li class="text__footer">Links</li>
                        <li>
                            <a href="https://www.linkedin.com/in/emiliano-acevedo-a8263419a/">
                                Linkedin
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/darthenis">Github</a>
                        </li>
                    </ul>

                </footer>
            </template>
            <template v-else>
                <Form :isSignInFormActivedProps="dataProvide.isSignInFormActived"/>
            </template> 
        </main>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300&display=swap');

*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

html, body, #app{

    width: 100%;
    height: 100%;


}

h1, h2, h3, h4, h5, h6, p {

    margin: 0;
    padding: 0;

}

.background__dark{  

    /*background-color: #2b385c;*/
    background-image: url(https://www.toptal.com/designers/subtlepatterns/uploads/vintage-wallpaper.png);
    background-repeat: repeat;
    backface-visibility: visible;

}


.title__icon > h1{

    text-align: center;
    color: #fe7d72; 
    text-shadow: 2px 2px 1px rgba(54, 54, 54, 0.3);
    font-weight: 900; 
    font-size: 30px;
    text-transform: uppercase;
}

.text-shadow{

    text-shadow: 2px 2px 1px rgba(54, 54, 54, 0.3);
}

.title__icon > img {

    width: 50px;
    -webkit-filter: drop-shadow(2px 2px 2px rgb(54, 54, 54));
    filter: drop-shadow(2px 2px 2px rgb(54, 54, 54));

}


.layout__login{

    display: grid;
    grid-template-rows: 70px minmax(calc(100vh - 70px), 1fr);
    min-height: 100vh;
    height: fit-content;
    align-items: center;
    justify-items: center;

}

.justify-self-center{

    justify-self: center;

}

.container__img{

    overflow: hidden;
    object-position: center;
    min-width: 50vw;
    min-height: 100vh;
}

.img__login{
    position: relative;
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: 50% 75%;

}

.text__index{

    text-align: left;
    color: #e8eefd;
    font-weight: 900; 
    font-size: 20px;
    max-width: 500px;

}

.ul_normalize{

    list-style-position: inside;
    list-style-type: none;

}

.ul_normalize > li > a:link, a:visited, a:hover, a:active{

        color: #e8eefd;

}

.text__footer{

    text-align: left;
    color: #e8eefd;
    font-weight: 900; 
    font-size: 16px;
    max-width: 500px;
}

.text__index__highlight{
    font-size: 24px;
    text-transform: uppercase;

}

.phrase__login{
    align-self: center;
    z-index: 100;
    color: #71b5f8;
    text-shadow: 2px 2px 2px rgb(54, 54, 54);
    font-weight: 900; 
    font-size: calc(1rem + 2vw);
    text-transform: uppercase;
}

.button__bg{

    background-color: #619bd4;
    color: white;

}

.button__bg:hover{

    background-color: #79bbfd;
    
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



.animation__slide{

    left: -700px;
    animation-name: slide;
    animation-delay: 1s;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

.login__container > div {

    width: 100%;

}



.container__form__title{

    z-index: 1;
    width: fit-content;

}

section{

    overflow: hidden;
}

.circle {
    left: 0;
        position: absolute;
        z-index: 1;
        top: 0px;
        width: 100vh;
        height: 100%;
        shape-outside: circle(50% at 30%);
        clip-path: circle(50% at 0%);
        background: rgb(32, 128, 160);
      
}

.animation__circle{
    left: -500px;
    animation-name: slide;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

.title__index{
    opacity: 0;
    animation-name: vanish;
    animation-duration: 2s;
    animation-delay: 2s;
    animation-fill-mode: forwards;

}


@keyframes slide {
    from{
        left: -700;
    } 
    to {
        left: 0;
    }
}

@keyframes vanish {
    from{
        opacity: 0;
    } 
    to {
        opacity: 1;
    }
}

@media (max-width: 719px) {

    .layout__login{

        grid-template-columns: 1fr;

    }

    .container__img{

        height: 200px;
        min-height: 200px;

    }

    .img__login{
        width: 100vw;
        object-fit: cover;
        object-position: 50% -50vw;
    
    }

    
}

@media (max-width: 550px) {

    .img__login{
        object-fit: cover;
        object-position: 50% -40vw;
    
    }

    .circle{

        height: 100%;
        min-height: 100vh;
        shape-outside: circle(10% at 10%);
        clip-path: circle(40% at 40%);
        left:100px;

    }

    .login__container{

        min-width: 310px;

    }

}


@media (max-width: 400px){

    .title__icon{

        max-width: 100vw;

    }


}

@keyframes animatedBar2 {
    
    from {

        opacity: 1;

    } to {

        opacity: 0;

    }

}

@keyframes animatedBar1 {
    
    from{

        transform: rotate(0deg);

    }

    to{

        transform: rotate(45deg);

    }

}

@keyframes animatedBar3 {
    from{

        transform: rotate(0deg);

    }

    to{

        transform: rotate(-45deg);

    }
}


@keyframes animatedBar2Reverse {
    
    from {

        opacity: 0;

    } to {

        opacity: 1;

    }

}

@keyframes animatedBar1Reverse {
    
    from{

        transform: rotate(45deg);

    }

    to{

        transform: rotate(0deg);

    }

}

@keyframes animatedBar3Reverse {
    from{

        transform: rotate(-45deg);

    }

    to{

        transform: rotate(0deg);

    }
}


.footer{

    height: 150px;
    width: 100%;
    background-color: #435b94;


}

</style>