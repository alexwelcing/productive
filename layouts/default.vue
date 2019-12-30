<template>			
  <div>
	<Header/>
		<nuxt />
	<Footer/>	 
  </div> 
</template>


<script>
import { ghostAPI, settingIndexFields } from '@/utils/ghost'
import Footer from '~/components/inc/footer.vue'
import Header from '~/components/inc/header.vue'

export default {
 
   components: {
     Footer, Header
  }
  
}


</script>

