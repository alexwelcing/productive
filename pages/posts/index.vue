
<template>
	<div>
		<section class="tv-page-title-section tv-bg-theme-col tv-padd-tb-40">
			<div class="container">
				<div class="flex-box-view-one">
					<div class="tv-page-title"><h1>Posts</h1></div>
					<div class="tv-breadcrumb-box">
						<ul class="breadcrumb">
							<li class="breadcrumb-item">
								<nuxt-link to="/">Home</nuxt-link> /
								<nuxt-link to="/posts">Posts</nuxt-link> / 
								
							</li>
							
						</ul>
					</div>
				</div>
			</div>
		</section>
		<section class="tv-content-container tv-section-padding">	
			<div class="container">
				<div class="row tv-blog-style-grid">				
					<div class="col-lg-4 col-md-6 col-sm-6" v-for="fpost in posts"  v-bind:key="fpost.slug">
						<article class="author-blog">
							<div class="post-thumnail">
								<div class="post-thumnail-box">
									<div class="post-image" :style="{ backgroundImage: `url(${fpost.feature_image})` }" v-if="fpost.feature_image"></div>
									<div class="post-image" :style="{ backgroundImage: `url(${postimage})` }" v-else></div>
								</div>
								<nuxt-link class="tv-post-overlay" :to="'/posts/'+fpost.slug">
									<i class="ti-exchange-vertical"></i>
								</nuxt-link>
							</div>
							<div class="post-extra-details">
								<div class="post-categories">
									<nuxt-link :to="'/tag/'+tag.slug" v-for="tag in fpost.tags"  v-bind:key="tag.slug">{{tag.name}}, </nuxt-link> 
									
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
				
				<template>
					
				</template>
				
			</div>				
				
	</section>
	<infinite-loading
	v-if="posts.length"
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
		name: 'Posts',
		
		data() {
			return {
				posts: [],
				page: 1,
				postimage: postimageDefault,
			}
		},
		computed: {
			url() {
				
				return HOST_URL+'posts/?key='+API_KEY+'&limit=6&page='+this.page+'&include=tags,author'
			}
		},
		created() {
			this.fetchData()
		},  
		methods: {
			async fetchData() {
				const response = await axios.get(this.url)
				this.posts = response.data.posts	 
			},
			infiniteScroll($state) {
				
				setTimeout(() => {
					this.page++					
					axios
					.get(this.url)
					.then((response) => {
						
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