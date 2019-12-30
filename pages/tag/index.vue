
<template>
	<div>
		<section class="tv-page-title-section tv-bg-theme-col tv-padd-tb-40">
			<div class="container">
				<div class="flex-box-view-one">
					<div class="tv-page-title"><h1>Tags</h1></div>
					<div class="tv-breadcrumb-box">
						<ul class="breadcrumb">
							<li class="breadcrumb-item">
								<nuxt-link to="/">Home</nuxt-link> /
								<nuxt-link to="/tag">Tag</nuxt-link>
							</li>
							
						</ul>
					</div>
				</div>
			</div>
		</section>
		<section class="tv-content-container tv-section-padding">	
			<div class="container">
				<div class="row tv-blog-style-grid">				
					<div class="col-lg-4 col-md-6 col-sm-6" v-for="fpost in tags">
						<article class="author-blog">
							<div class="post-thumnail">
								<div class="post-thumnail-box">
									<div class="post-image" :style="{ backgroundImage: `url(${fpost.feature_image})` }" v-if="fpost.feature_image"></div>
									<div class="post-image" :style="{ backgroundImage: `url(${postimage})` }" v-else></div>
								</div>
								<nuxt-link class="tv-post-overlay" :to="'/tag/'+fpost.slug">
									<i class="ti-exchange-vertical"></i>
								</nuxt-link>
							</div>
							<div class="post-extra-details">
								
								<div class="post-title">
									<h4><nuxt-link :to="'/tag/'+fpost.slug">{{fpost.name}}</nuxt-link></h4>
									 <span class="post-author" >
											<nuxt-link :to="'/tag/'+fpost.slug">{{fpost.count.posts}}</nuxt-link>
									   </span>
									
								</div>
								
							</div>
						</article>
					</div>
				</div>
				
				
			</div>				
				
	</section>
	<infinite-loading
	v-if="tags.length"
	spinner="spiral"
	@infinite="infiniteScroll"
	
    ></infinite-loading>
</div>
</template>



<script>
	
	import axios from 'axios'
	import InfiniteLoading from 'vue-infinite-loading'
	import postimageDefault from '~/assets/images/post2.jpg'
	import {  API_KEY, HOST_URL } from '../../config/constants'

	export default {
		name: 'Tags',
		
		data() {
			return {
				tags: [],
				page: 1,
				postimage: postimageDefault,
			}
		},
		computed: {
			url() {				
				return HOST_URL+'tags/?key='+API_KEY+'&limit=6&page='+this.page+'&include=count.posts'
			}
		},
		created() {
			this.fetchData()
		},  
		methods: {
			async fetchData() {
				const response = await axios.get(this.url)
				this.tags = response.data.tags	 
			},
			infiniteScroll($state) {
				
				setTimeout(() => {
					this.page++					
					axios
					.get(this.url)
					.then((response) => {
						
						if (response.data.tags.length > 1) {
							response.data.tags.forEach((item) => this.tags.push(item))
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
		},
		components: {
			InfiniteLoading
		}
	}
</script>

<style scoped>
	.theme--light.v-card {
	background-color: #f5f5f5;
	}
</style>