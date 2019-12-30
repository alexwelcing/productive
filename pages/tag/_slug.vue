<template>
  <div>
<section class="tv-page-title-section tv-bg-theme-col tv-padd-tb-40">
                <div class="container">
                    <div class="flex-box-view-one">
                        <div class="tv-page-title"><h1>{{slug}}</h1></div>
                        <div class="tv-breadcrumb-box">
                            <ul class="breadcrumb">
                             <li class="breadcrumb-item">
								<nuxt-link to="/">Home</nuxt-link> /
								<nuxt-link to="/tag">Tag</nuxt-link> / 
								<nuxt-link :to="'/tag/'+slug">{{slug}}</nuxt-link>
							</li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
			
<section class="tv-content-container tv-section-padding"> 
		<div class="container">
			<div class="row tv-blog-style-grid">
		
				
                        <div class="col-lg-4 col-md-6 col-sm-6" v-for="fpost in posts" v-bind:key="fpost.slug">
                            <article class="author-blog">
                                <div class="post-thumnail">
                                    <div class="post-thumnail-box">
                                        <div class="post-image" :style="{ backgroundImage: `url(${fpost.feature_image})` }" v-if="fpost.feature_image"></div>
                                        <div class="post-image" :style="{ backgroundImage: `url(${bg})` }" v-else></div>
                                    </div>
                                    <nuxt-link class="tv-post-overlay" :to="'/posts/'+fpost.slug">
                                        <i class="ti-exchange-vertical"></i>
                                    </nuxt-link>
                                </div>
                                <div class="post-extra-details">
                                    <div class="post-categories">
										<nuxt-link :to="'/tag/'+tag.slug" v-for="tag in fpost.tags.slice(0,5)" v-bind:key="tag.slug">{{tag.name}}, </nuxt-link> 
										
									</div>
                                    <div class="post-title">
                                        <h4><nuxt-link :to="'/posts/'+fpost.slug">{{fpost.title}}</nuxt-link></h4>
                                    </div>
                                    <div class="post-meta">
                                        <span class="posts-date">
                                            <i class="ti-calendar"></i> {{ $moment(fpost.published_at).format('MM/DD/YYYY') }}</span>
                                        
                                         <span class="post-author" v-for="author in fpost.authors" >
											<nuxt-link :to="'/author/'+author.slug">{{author.name}}</nuxt-link>
									   </span>
                                    </div>
                                </div>
                            </article>
                        </div>						
		</div>				
		</div>				
    </section>
	
  </div>
</template>

<script>

import { ghostAPI, postIndexFields } from '@/utils/ghost'
import moment from 'moment'
import backgroundUrl from '~/assets/images/footer-bg.jpg'
 


export default {
data: () => ({   
    slug: '',
    posts: '',
	bg: backgroundUrl,
  }),
   async asyncData ({route, params}) {  
		
		
		const slug = params.slug
		const posts = await ghostAPI().posts.browse({
				  order: 'published_at desc',
				  fields: postIndexFields,
				  formats:'html,plaintext',
				  include:'authors,tags',
				  filter:'tag:'+slug,
				  limit: 12				  	  
				});
				
	return {
     posts,slug
    }
   }
  
}
</script>


