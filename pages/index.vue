<template>
  <section>
		  
				   <!-----------Slider Section----------------->
		  
          <div class="carousel" v-if="featur_post">
			   
			<component :is="slickComp" ref="slick" :options="slickOptions">
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
  <div class="skeletonslide" v-else>
	  <div class="demo"></div>
	  <div class="demo"></div>
  </div>
	
	
            <!-----------End slider----------------->
			 <!-----------Author Blog----------------->
            <section class="tv-author-block tv-section-padding">
                <div class="container">
                    <div class="tv-heading-section">
                        <div class="tv-heading-title">
                            <h2>Featured posts</h2>
                        </div>
                        <div class="tv-seperator-content">
                            <div class="tv-seperator-line"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-6" v-for="fpost in featur_post.slice(0, 3)">
                            <article class="author-blog">
                                <div class="post-thumnail">
                                    <div class="post-thumnail-box">
                                        <div class="post-image" :style="{ backgroundImage: `url(${fpost.feature_image})` }" ></div>
                                    </div>
                                    <nuxt-link  class="tv-post-overlay" :to="'/posts/'+fpost.slug" :aria-label="fpost.title">
                                        <i class="ti-exchange-vertical"></i>
                                    </nuxt-link>
                                </div>
                                <div class="post-extra-details">
                                    <div class="post-categories">
										<nuxt-link :aria-label="tag.name" :to="'/tag/'+tag.slug" v-for="tag in fpost.tags"  v-bind:key="tag.slug">{{tag.name}}, </nuxt-link> 
										
									</div>
                                    <div class="post-title">
                                        <h4><nuxt-link :to="'/posts/'+fpost.slug" :aria-label="fpost.title">{{fpost.title}}</nuxt-link></h4>
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
            <!-----------End----------------->
			 <!-----------Middle content----------------->
            <section class="tv-content-container tv-section-padding">
                <div class="container">
                    <div class="row">
                        <!-----------Latest Blog----------------->
                        <div class="col-xl-8 col-lg-8 col-md-12 order-xl-1 order-lg-1 order-2">
                            <div class="tv-heading-section tv-offspace-bottom-40">
                                <div class="tv-heading-title">
                                    <h2>Latest posts</h2>
                                </div>
                                <div class="tv-seperator-content">
                                    <div class="tv-seperator-line"></div>
                                </div>
                            </div>
							<no-ssr>
	<infinite-loading v-if="counts<2"	
	spinner="spiral"
	@infinite="infiniteScroll"	
							></infinite-loading></no-ssr>
                            <article class="tv-post-item"  v-for="post in posts.slice(0, 4)">
                                <div class="tv-post-wrapper">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="post-thumnail">
                                                <div class="post-thumnail-box">
                                                    <div class="post-image"  :style="{ backgroundImage: `url(${post.feature_image})` }"></div>
                                                </div>
                                                <nuxt-link class="tv-post-overlay" :to="'/posts/'+post.slug"  :aria-label="post.title">
                                                    <i class="ti-exchange-vertical"></i>
                                                </nuxt-link>
                                            </div>
                                        </div>
                                        <div class="col-md-6 tv-post-section-right">
                                            <div class="post-extra-details">
                                                <div class="post-categories">
													<nuxt-link :to="'/tag/'+tag.slug" v-for="tag in post.tags" :aria-label="tag.name"  v-bind:key="tag.slug">{{tag.name}}, </nuxt-link>
												</div>
                                                <div class="post-title">
                                                    <h2><nuxt-link :to="'/posts/'+post.slug" :aria-label="post.title">{{post.title}}</nuxt-link></h2>
                                                </div>
                                                <div class="post-content" >
                                                    <p v-if="post.excerpt">{{post.excerpt}}</p>
                                                   
                                                </div>
                                                <div class="post-meta">
                                                   <span class="posts-date">  
													 <i class="ti-calendar"></i> {{ $moment(post.published_at).format('MM/DD/YYYY hh:mm') }}
												   </span>                                       
												   <span class="post-author" v-for="author in post.authors" >
														<nuxt-link :to="'/author/'+author.slug"  :aria-label="author.name">{{author.name}}</nuxt-link>
												   </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </article>  
							<div class="view-all">
							<nuxt-link to="posts" class="view-all-btn" >View All Posts</nuxt-link>
							</div>
                        </div>
                        <!-----------End----------------->

                        <!-----------Right Sidebar----------------->
                        <div class="col-xl-4 col-lg-4 col-md-12 order-1 tv-right-sidebar" id="sidebar">
                            <div class="tv-sidebar-container">
                                <div class="tv-widget tv-widget-about"  v-for="author in authors">
                                    <div class="tv-heading-section">
                                        <div class="tv-heading-title">
                                            <h3>Meet the Author</h3>
                                        </div>
                                        <div class="tv-seperator-content">
                                            <div class="tv-seperator-line"></div>
                                        </div>
                                    </div>
                                    <div class="tv-about-me-profile text-center">
                                        <img :src="author.profile_image" :alt="author.name" class="" v-if="author.profile_image">
                                       <img src="~assets/images/images.svg" alt="author" class="" v-else>
                                    </div>
                                    <div class="tv-about-me-content text-center">
										
                                        <div class="tv-author-name">
                                            <h3>{{author.name}}</h3>
                                           
                                        </div>
                                        <div class="tv-author-bio">
                                            <p>{{author.bio}}</p>
                                        </div>
                                        <div class="tv-author-social">
                                            <ul>
                                                <li><a :href="author.facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                                <li><a :href="author.twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>                                               
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                               
                                <div class="tv-widget tv-widget-category">
                                    <div class="tv-heading-section">
                                        <div class="tv-heading-title">
                                            <h3>Category</h3>
                                        </div>
                                        <div class="tv-seperator-content">
                                            <div class="tv-seperator-line"></div>
                                        </div>
                                    </div>
							<div class="tv-widget-category-box">
								<ul class="tv-widget-category-list">
								<li  v-for="tag in tags" >									
									<nuxt-link :to="'/tag/'+tag.slug"  v-bind:key="tag.slug">{{tag.name}} 
									<span class="count">{{tag.count}}</span></nuxt-link>
								</li>                                           
								</ul>
								<div class="view-all">
								<nuxt-link to="/tag" class="view-all-btn" >View All Categories</nuxt-link>
								</div>
							</div>
                                </div>
                               <div class="tv-widget tv-widget-subscribe">
                                    <div class="tv-heading-section">
                                        <div class="tv-heading-title">
                                            <h3>Subscribe Now</h3>
                                        </div>
                                        <div class="tv-seperator-content">
                                            <div class="tv-seperator-line"></div>
                                        </div>
                                    </div>
                                    <div class="tv-widget-subscribe-box">
                                        <form class="tv-widget-subscribe-form">
                                            <div class="tv-widget-subscribe-form-fields">
                                                <p> <label for="email">Email</label>
                                                    <input name="EMAIL" id="email" placeholder="Your email address" required="" type="email">
                                                    <input value="Sign up" type="submit">
                                                </p>
                                            </div>
                                        </form>
                                        <p class="tv-widget-subscribe-description">* Nullam luctus mauris luctus lacus facilisis accumsan lectus sagittis maximus nunc sit amet!</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <!-----------End----------------->
                    </div>
                </div>
            </section>
            <!-----------End----------------->

    
  </section>
</template>

<script>

import { ghostAPI, postIndexFields, authorsIndexFields, tagsIndexFields } from '@/utils/ghost'
import moment from 'moment'
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'
import {  API_KEY, HOST_URL } from '../config/constants'

export default { 
  data: () => ({
		posts: [],
		counts: 1,
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
        Slick: () => import('vue-slick'),
		InfiniteLoading
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
	
	const authors = await ghostAPI().authors.browse({	 
      fields: authorsIndexFields,
	  order: 'name desc',
	  limit: 1
    });
	
	const tags = await ghostAPI().tags.browse({	 
      fields: tagsIndexFields,
	  order: 'count.posts desc',
	  limit: 10,
	  include: 'count.posts'
    });			
    return {
      featur_post,authors,tags
    }
  },
  created() {
			this.fetchData()
		},
		computed: {
			url() {				
				return HOST_URL+'posts/?key='+API_KEY+'&limit=6&page=1&include=tags,author'
			}
		},
		methods: {
			async fetchData() {
					
				 
			},
			
			infiniteScroll($state) {
				
				setTimeout(() => {									
					axios
					.get(this.url)
					.then((response) => {
						this.counts++;
						if (response.data.posts.length > 1) {
							response.data.posts.forEach((item) => this.posts.push(item))
							$state.loaded()							
							} else {							
							$state.complete()
						}
					})
					.catch((err) => {
						console.log(err)
					})
				}, 1000)
			}
			
		}
	
  
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
