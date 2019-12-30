<template>
  <div>
<section class="tv-page-title-section tv-bg-theme-col tv-padd-tb-40">
                <div class="container">
                    <div class="flex-box-view-one">
                        <div class="tv-page-title"><h1>Post</h1></div>
                        <div class="tv-breadcrumb-box">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><nuxt-link to="/"></nuxt-link></li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
			
 <section class="tv-content-container tv-section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-8 col-lg-8 col-md-12 order-xl-1 order-lg-1 order-2">
                            <div class="tv-single-blog tv-blog-style-one">
                                <article class="tv-single-blog-item">
                                    <div class="tv-post-image">
                                        <img :src="post.feature_image" class="img-fluid" :alt="post.title">
                                    </div>
                                    <div class="tv-post-content-holder">
                                        <div class="post-extra-details">
                                            <div class="post-categories">
												
												<nuxt-link :to="'/tag/'+tag.slug" v-for="tag in post.tags"  v-bind:key="tag.slug">{{tag.name}}</nuxt-link> 
											</div>
                                            <div class="post-title">
                                                <h2>{{post.title}}</h2>
                                            </div>
                                            <div class="single-post-meta">
                                                <span class="post-author" v-for="author in post.authors" >
													<nuxt-link :to="'/author/'+author.slug">{{author.name}}</nuxt-link>
											    </span>
                                                <span class="posts-date">
													<i class="ti-calendar"></i> {{ $moment(post.published_at).format('MM/DD/YYYY') }}
												</span>
                                            </div>
                                        </div>
                                        <div v-html="post.html">fff</div>
                                    </div>
                                    <div class="clearfix"></div>
                                    
                                    <div class="tv-tag-list tv-dark-color">
                                       
                                       <nuxt-link :to="'/tag/'+tag.slug" class="tv-tag-link" v-for="tag in post.tags"  v-bind:key="tag.slug">{{tag.name}}</nuxt-link> 
                                    </div>

                                </article>
                                
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-12 order-1 tv-right-sidebar" id="sidebar">
                            <div class="tv-sidebar-container">
                                
                                
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
                                           <li  v-for="tag in tags"  v-bind:key="tag.slug">									
											<nuxt-link :to="'/tag/'+tag.slug">{{tag.name}} <span class="count">{{tag.count.posts}}</span></nuxt-link></li>
                                        </ul>
										<div class="view-all">
											<nuxt-link to="/tag" class="view-all-btn" >View All Categories</nuxt-link>
										</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
	
  </div>
</template>

<script>
import axios from 'axios'
import { ghostAPI, tagsIndexFields } from '@/utils/ghost'
import moment from 'moment'

import {  API_KEY, HOST_URL } from '../config/constants'

export default {
data: () => ({   
    slug: '',
    post: '',
	tags: ''
    
  }),
  methods: { 
  
		getPost: function(){
		 const slug = this.$route.params.slug;
		 
			  axios.
			  get(HOST_URL+'/pages/slug/'+slug+'?key='+API_KEY)
			.then(response => {	
			
			  this.post = response.data.pages[0]
			  this.loading = false
			  console.log(this.post);
			})
			.catch(error => {
			  console.log(error)
			})
		},
		getTags: function(){		
		  
			  axios.
			  get(HOST_URL+'/tags/?key='+API_KEY+'&limit=10&include=count.posts')
			.then(response => {
				
			  this.tags = response.data.tags
			  this.loading = false
			 
			})
			.catch(error => {
			  console.log(error)
			})
		},
		
		
    },
  beforeMount(){
    
    this.getPost();
    this.getTags();
	
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
