<template>
				 <div class="carousel" v-if="featur_post">
			   
   <component
      :is="slickComp"
      ref="slick" 
      :options="slickOptions"	   
   >
						<div class="swiper-slide swiper-slide-duplicate" style="width: 449.667px;" v-for="fpost in featur_post">
                            <div class="tv-featured-post-image">
                                <img :src="fpost.feature_image.replace(/(^\w+:|^)\/\//, 'https://')"  :alt="fpost.title">
                                <div class="tv-overlay-light-dark"></div>
                            </div>
                            <div class="tv-featured-content-wrapper">
                                <div class="post-categories">
								
                                    <nuxt-link :to="'/tag/'+tag.slug" v-for="tag in fpost.tags" :aria-label="tag.name"  v-bind:key="tag.slug">{{tag.name}}</nuxt-link>
									
                                </div>
                                <div class="tv-featured-content-title">
                                    <h2 class="tv-white-text"><nuxt-link :to="'/posts/'+fpost.slug" :aria-label="fpost.title">{{fpost.title}}</nuxt-link></h2>
                                </div>
                                <div class="tv-featured-posted-date">
                                    <span class="posted-date"> {{ $moment(fpost.published_at).format('MM/DD/YYYY') }}</span>
                                </div>
                            </div>
                        </div>
						 
                        
    </component>
	
  </div>

</template>

<script>

import { ghostAPI, postIndexFields, authorsIndexFields, tagsIndexFields } from '@/utils/ghost'
import moment from 'moment'

export default { 
  data: () => ({		
        'slickComp': '',
		 'slickOptions': {
                slidesToShow: 2,
				dots: true,
				arrows: false,
				autoplay: true,
				responsive: [{
				breakpoint: 600,
				  settings: {
					slidesToShow: 1,
					dots: true
				  }
				}]
            },
    }),
    components: {
        Slick: () => import('vue-slick')
    },
    mounted: function () {
        this.$nextTick(function () {
          this.slickComp = 'Slick'
        })
    },
	
  async asyncData () {
    
	
	const featur_post = await ghostAPI().posts.browse({
	  order: 'published_at desc',
      fields: postIndexFields,
	  formats:'html,plaintext',
	  include:'authors,tags',
	  filter:'featured:true',
	  limit: 3
    });
	
		
    return {
      featur_post
    }
  },
  
	
  
}
</script>

<style scoped>
@import 'node_modules/slick-carousel/slick/slick.css';
.blog-post {
  margin: 25px 0;
  align-content: center;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.title {
  margin: 50px 0;
}

p {
  color: #000;
  margin: 15px 0 5px;
  max-width: 450px;
  line-height: 1.44;
}
</style>

