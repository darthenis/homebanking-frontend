import { onMounted, ref } from "vue";

export const useMobile = () => {

    const isMobile = ref(false)

    onMounted(() => {

        window.addEventListener('resize', () => {

            if(window.screen.width <= 646){
          
                isMobile.value = true;
        
              } else {
        
                isMobile.value = false;
        
              }
    
        })

    })

    return {isMobile}

}