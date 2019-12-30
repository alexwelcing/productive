<template>
	<!-----------Footer----------------->
	<footer class="tv-footer" :style="{ backgroundImage: `url(${bg})` }">
		<div class="tv-footer-top-widget">
			<div class="container">
				<div class="row">
					<div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
						
						<div class="tv-footer-widget tv-footer-tag-widget">
							<div class="tv-heading-section tv-footer-widget-title">
								<div class="tv-heading-title">
									<h3 class="tv-white-text">Tags</h3>
								</div>
								<div class="tv-seperator-content">
									<div class="tv-seperator-line"></div>
								</div>
							</div>
							<div class="tv-tag-list">
								<nuxt-link :to="'/tag/'+tag.slug" class="tv-tag-link"  v-for="tag in tags"  v-bind:key="tag.slug">{{tag.name}}</nuxt-link>
								
							</div>
						</div>
					</div>
					<div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
						<div class="tv-footer-widget tv-footer-trend-slider-widget">
							<div class="tv-footer-trend-slider-arrow-box" style="position: relative">
								<div class="tv-heading-section tv-footer-widget-title">
									<div class="tv-heading-title">
										<h3 class="tv-white-text">Trending Posts</h3>
									</div>
									<div class="tv-seperator-content">
										<div class="tv-seperator-line"></div>
									</div>
									<div class="tv-widget-slider-arrows">
									</div>
								</div>
								
							</div>
							<div class="tv-footer-widget-slider tv-widget-posts-slider">
								<component
								:is="slickComp"
								ref="slick" 
								:options="slickOptions"	   
								>
									<article class="tv-footer-widget-slider-item" v-for="post in posts.slice(0, 1)">
										<div class="post-thumnail">
											<div class="post-thumnail-box">
												<div class="post-image" :style="{ backgroundImage: `url(${post.feature_image})` }" v-if="post.feature_image"> </div>
												<div class="post-image" :style="{ backgroundImage: `url(${bg})` }" v-else> </div>
											</div>
										</div>
										<div class="post-extra-details">
											<div class="post-categories">
												<nuxt-link :to="'/tag/'+tag.slug"  v-for="tag in post.tags" v-if="tag.name"  v-bind:key="tag.slug">{{tag.name}}, </nuxt-link> 
											</div>
											<div class="post-title">
												<h5><nuxt-link :to="'/posts/'+post.slug">{{post.title}}</nuxt-link></h5>
											</div>
										</div>
									</article>  
								</component>
								
							</div>
						</div>
					</div>
					<div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
						<div class="tv-footer-widget tv-footer-post-tab-widget">
							<div class="tv-heading-section tv-footer-widget-title">
								<div class="tv-heading-title">
									<h3 class="tv-white-text">Latest</h3>
								</div>
								<div class="tv-seperator-content">
									<div class="tv-seperator-line"></div>
								</div>
							</div>
							<no-ssr>
								<infinite-loading v-if="counts<2" spinner="spiral" @infinite="infiniteScroll">
								</infinite-loading>
							</no-ssr>
							<div class="tv-footer-widget-post-item tv-footer-widget-style-one" v-for="post in posts.slice(1, 4)">
								<a class="tv-widget-posts-slider-thumbnail" :style="{ backgroundImage: `url(${post.feature_image})` }"></a>
								<div class="tv-widget-post-extra-details">
									<div class="post-title">
										<h5><nuxt-link :to="'/posts/'+post.slug">{{post.title}}</nuxt-link></h5>
									</div>
									<div class="post-meta">
										<span class="posts-date">
										<i class="ti-calendar"></i> {{ $moment(post.published_at).format('MM/DD/YYYY') }}</span>
										
									</div>
								</div>
							</div>
							
							
							
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="tv-footer-copyrights">
			<div class="container">
				<div class="flex-box-view-one">
					<div class="tv-footer-logo">
						<a href=""><img src="~/assets/images/logo.svg" alt="logo" width="208px"  sizes="50vw" ></a>
					</div>
					<div class="copyright">
						<!--Do not remove Backlink from footer of the template. To remove it you can purchase the Backlink !-->
						<p> &copy; All right reserved. Designed by Paradise</p>
					</div>
				</div>
			</div>
		</div>
	</footer>
	<!-----------End----------------->
	
</template>

<script>
	import axios from 'axios'
	import moment from 'moment'
	
	import {  API_KEY, HOST_URL } from '../../config/constants'
	import InfiniteLoading from 'vue-infinite-loading'
	import backgroundUrl from '~/assets/images/footer-bg.jpg'
	export default {
		name: 'branch',
		data: () => ({
			bg: '',
			tags: '',
			posts: [],
			counts: '',
			'slickComp': '',
			'slickOptions': {
                slidesToShow: 1,
				dots: true,
				arrows: false,
				autoplay: true
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
							
							this.bg = backgroundUrl;
							$state.loaded()							
							} else {							
							$state.complete()
						}
					})
					.catch((err) => {
						console.log(err)
					})
				}, 1000)
			},
			
			getTags: function(){		
				
				axios.
				get(HOST_URL+'/tags/?key='+API_KEY+'&limit=30&order=count.posts desc')
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
			this.getTags();
		}
	}
</script>
