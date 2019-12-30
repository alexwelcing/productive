<template>
 
  <section id="app-instasearch">
	<div class="search-form-box" :style="{ backgroundImage: `url(${bg})` }">
		<div class="search-form">
			<div class="post-image" >
			
			<form class="tv-widget-subscribe-form" data-v-47f9b8e5="">
			<h1 class="search-heading">Search</h1>
				<div class="tv-widget-subscribe-form-fields" data-v-47f9b8e5="">
					<p data-v-47f9b8e5="">
						<input name="key" id="search-field" placeholder="Enter a keyword to search..." required="" type="text" v-model="authorNameSearchString"> 
						<input value="Search" type="submit" data-v-47f9b8e5="">
					</p>
				</div>
			</form>
			</div>
		</div>
		
	</div>
	<div class="container">
	<div class="search-result search_items">
	<h2>Search Results</h2>
	<transition-group tag="ul" name="list-animation">
	
	<div class="tv-widget-post-extra-details search_item" v-for="post in filteredPhotoFeed" v-bind:key="post.slug">
	<div class="search-left">
		<a class="tv-widget-posts-slider-thumbnail" :style="{ backgroundImage: `url(${post.feature_image})` }"></a>
	</div>
	<div class="search-right">
		<div class="post-title">
			<h5><nuxt-link :to="'/posts/'+post.slug">{{post.title}}</nuxt-link></h5>
		</div> 
		<div class="post-meta">
			<span class="posts-date"><i class="ti-calendar"></i> {{ $moment(post.published_at).format('MM/DD/YYYY') }}</span>
		</div>
		</div>
	</div>
			
		</transition-group>
		</div>
		</div>
  </section>
</template>

<script>
import axios from 'axios'
import backgroundUrl from '~/assets/images/footer-bg.jpg'
import moment from 'moment'
import {  API_KEY, HOST_URL } from '../../config/constants'


export default { 
el: '#app-instasearch',
  data: () => ({
		bg: backgroundUrl, 
		authorNameSearchString: "",
		photoFeed: null
    }),
	mounted() {
		axios
			.get(HOST_URL+'/posts/?key='+API_KEY+'&limit=all&fields=title%2Cslug%2Cfeature_image%2Cpublished_at')
			.then(response => {
				this.photoFeed = response.data.posts;
			})
			.catch(error => console.log(error))
	},
	computed: {
        
        filteredPhotoFeed: function () {
			
            var photos = this.photoFeed;
            var authorNameSearchString = this.authorNameSearchString;

            
		if(authorNameSearchString.length > 2){

            var searchString = authorNameSearchString.trim().toLowerCase();

            photos = photos.filter(function(item){
		
                if(item.title.toLowerCase().indexOf(authorNameSearchString) !== -1){				
                    return item;
                }
            })
			console.log(photos);
            return photos;
        }else{
		 return photos={};
		}
		}
	 }
}
</script>

