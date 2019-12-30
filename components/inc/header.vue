<template>
<div class="header-section" id="page">
   <header class="tv-header-area">
               
                <div class="tv-middle-header">
                    <div class="container">
                        <div class="tv-logo text-center">
                            <nuxt-link to="/" aria-label="Knowzone home page">
								<img src="~assets/images/logo.svg" alt="logo" width="208px" sizes="50vw">
							</nuxt-link>
                        </div>
                    </div>
                </div>

             <!-----------Navigation----------------->
			    <div>
				  <b-navbar toggleable="lg" type="light" variant="info">
					<b-navbar-brand href="#" aria-label="Knowzone"></b-navbar-brand>
					<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

					<b-collapse id="nav-collapse" is-nav>
					<b-navbar-nav class="navbar-nav tv-reset-navbar" v-if="navigation">
						<b-nav-item class="nav-item" v-for="navs in navigation" :to="navs.url"  v-bind:key="navs.url" :aria-label="navs.url" >{{navs.label}}</b-nav-item>
						<b-nav-item class="nav-item" nuxt-link to="/search" aria-label="search"><i class="ti-search"></i> Search</b-nav-item>
					  </b-navbar-nav>
					  
					 <b-navbar-nav class="navbar-nav tv-reset-navbar" v-else>						
						<b-nav-item class="nav-item" nuxt-link to="/" aria-label="Home">Home</b-nav-item>
						<b-nav-item class="nav-item" nuxt-link to="/tag/quicktip/" aria-label="QuickTips">QuickTips</b-nav-item>
						<b-nav-item class="nav-item" nuxt-link to="/tag/videos" aria-label="VIDEOS">VIDEOS</b-nav-item>
						<b-nav-item class="nav-item" nuxt-link to="/tag/QRG" aria-label="REFERENCE GUIDES">REFERENCE GUIDES</b-nav-item>
						<b-nav-item class="nav-item" nuxt-link to="/faqs" aria-label="FAQS">FAQS</b-nav-item>
						<b-nav-item class="nav-item" nuxt-link to="/help" aria-label="help">HELP</b-nav-item>
						<b-nav-item class="nav-item" nuxt-link to="/upskilling" aria-label="UPSKILLING">UPSKILLING</b-nav-item>
						<b-nav-item class="nav-item" nuxt-link to="/search" aria-label="search"><i class="ti-search"></i> Search</b-nav-item>
					  </b-navbar-nav>
					  
					  					  
					</b-collapse>
				  </b-navbar>
				</div>
                <!-----------End----------------->
                
            </header>
			</div>
</template>


<script>
import axios from 'axios'
import moment from 'moment'


import {  API_KEY, HOST_URL } from '../../config/constants'
	 
export default {
  name: 'branch',
  data: () => ({   
    navigation: '',
    setting: ''
  }),
  methods: {
	 
	  getSettings: function(){		
		  
			  axios.
			  get(HOST_URL+'/settings/?key='+API_KEY)
			.then(response => {
				
			  this.setting = response.data.settings
			  this.navigation = response.data.settings.navigation
			  this.loading = false
			 
			})
			.catch(error => {
			  console.log(error)
			})
		}
    },
  beforeMount(){
    
    this.getSettings();
   
	
  }
}
 
</script>
