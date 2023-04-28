
<script>

export default {
    props: ['text', 'imgUrl', 'leftImg', 'firstData']
}

</script>

<template>
     <article   class="d-flex text-light align-items-center justify-content-between flex-column flex-md-row"
                style="max-width: 1200px">
                    <img v-if="leftImg" :src="imgUrl" alt="shop" style="width: 50vw; max-width: 600px; min-width: 300px;">

                    <p v-if="!firstData" class="text__index"> <span class="text-shadow text__index__highlight" style="color:#fe7d72; font-size: 30px;"> Cards service</span>
                                            <br/>
                                            <br/>{{text}}</p>

                    <div v-else class="d-flex flex-column justify-content-between align-items-end">
                        <p class="text__index"> <span class="text__index__highlight"><span class="text-shadow" style="color:#fe7d72;">Welcome</span> <br/>to our online banking platform!</span>
                            <br/>
                            <br/>  
                            With our user-friendly interface and advanced security measures, managing your finances has never been easier. 
                            Enjoy features such as mobile banking, bill payments, and instant money transfers all in one convenient location. 
                        </p>
                        <a class="btn text-light mt-5"  style="background-color: #e9605a; width: fit-content;" href="#sec1">Read more</a>
                    </div>

                    <img v-if="!leftImg" :src="imgUrl" alt="shop" style="width: 50vw; max-width: 600px; min-width: 300px;">

    </article>
</template>

<style scoped>
    .text__index{
        text-align: left;
        color: #e8eefd;
        font-weight: 900; 
        font-size: 20px;
        max-width: 500px;
    }

    .text__index__highlight{
        font-size: 24px;
        text-transform: uppercase;
    }

</style>