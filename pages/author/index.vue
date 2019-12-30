
<template>
	<div>
		<section class="tv-page-title-section tv-bg-theme-col tv-padd-tb-40">
			<div class="container">
				<div class="flex-box-view-one">
					<div class="tv-page-title"><h1>Authors</h1></div>
					<div class="tv-breadcrumb-box">
						<ul class="breadcrumb">
							<li class="breadcrumb-item">
								<a href="/">Home</a> /
								<a href="/author">Authors</a>
							</li>
							
						</ul>
					</div>
				</div>
			</div>
		</section>
		<section class="tv-content-container tv-section-padding">	
			<div class="container">
				<div class="row tv-blog-style-grid">				
					<div class="col-lg-4 col-md-6 col-sm-6" v-for="fpost in authors">
						<article class="author-blog">
							<div class="post-thumnail">
								<div class="post-thumnail-box">
									<div class="post-image" :style="{ backgroundImage: `url(${fpost.profile_image})` }" v-if="fpost.profile_image"></div>
									<div class="post-image" :style="{ backgroundImage: `url(${postimage})` }" v-else></div>
								</div>
								<a class="tv-post-overlay" :href="'/author/'+fpost.slug">
									<i class="ti-exchange-vertical"></i>
								</a>
							</div>
							<div class="post-extra-details">
								
								<div class="post-title">
									<h4><a :href="'/author/'+fpost.slug">{{fpost.name}}</a></h4>
								</div>
								<span class="post-author" >
											<a :href="'/author/'+fpost.slug">{{fpost.count.posts}}</a>
									   </span>
							</div>
						</article>
					</div>
				</div>
				
				
			</div>				
				
	</section>
	<infinite-loading
	v-if="authors.length"
	spinner="spiral"
	@infinite="infiniteScroll"
	
    ></infinite-loading>
</div>
</template>



<script>
	
	import axios from 'axios'
	import InfiniteLoading from 'vue-infinite-loading'
	import postimageDefault from '~/assets/images/images.jpg'
	import {  API_KEY, HOST_URL } from '../../config/constants'

	export default {
		name: 'Tags',
		
		data() {
			return {
				authors: [],
				page: 1,
				postimage: postimageDefault,
			}
		},
		computed: {
			url() {	
			
				return HOST_URL+'authors/?key='+API_KEY+'&limit=6&page='+this.page+'&include=count.posts'
			}
		},
		created() {
			this.fetchData()
		},  
		methods: {
			async fetchData() {
				const response = await axios.get(this.url)
				this.authors = response.data.authors	 
			},
			infiniteScroll($state) {
				
				setTimeout(() => {
					this.page++					
					axios
					.get(this.url)
					.then((response) => {
						console.log(response.data);
						if (response.data.authors.length > 0) {
							response.data.authors.forEach((item) => this.authors.push(item))
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