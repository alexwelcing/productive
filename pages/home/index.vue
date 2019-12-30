<template>
  <section>
  <!-----------Navigation----------------->
                <div class="tv-main-menu tv-sticky-header bg-light">
                    <div class="navbar-default container">
                        <nav class="navbar navbar-expand-md navbar-light">
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
                                <span class="ti-menu"></span>
                            </button>
                            <div class="collapse navbar-collapse text-center" id="navbarSupportedContent">							
                                <ul class="navbar-nav tv-reset-navbar"> 								
                                    <li class="nav-item" v-for="navs in navigation">
                                        <a class="nav-link"  :href="navs.url">{{navs.label}}</a>
                                    </li>                                    
                                </ul>
                            </div>

                        </nav>
                    </div>
                </div>
                <!-----------End----------------->
				   <!-----------Slider Section----------------->
          <div class="carousel">
   <component
      :is="slickComp"
      ref="slick" 
      :options="slickOptions"	   
    >
						<div class="swiper-slide swiper-slide-duplicate" style="width: 449.667px;" v-for="fpost in featur_post">
                            <div class="tv-featured-post-image">
                                <img :src="fpost.feature_image"  alt="post-image">
                                <div class="tv-overlay-light-dark"></div>
                            </div>
                            <div class="tv-featured-content-wrapper">
                                <div class="post-categories">
								
                                    <a :href="tag.slug" v-for="tag in fpost.tags">{{tag.name}}</a>
									
                                </div>
                                <div class="tv-featured-content-title">
                                    <h2 class="tv-white-text"><a :href="fpost.slug">{{fpost.title}}</a></h2>
                                </div>
                                <div class="tv-featured-posted-date">
                                    <span class="posted-date"> {{ $moment(fpost.published_at).format('MM/DD/YYYY') }}</span>
                                </div>
                            </div>
                        </div>
						 
                        
    </component>
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
                                    <a class="tv-post-overlay" href="single-blog.html">
                                        <i class="ti-exchange-vertical"></i>
                                    </a>
                                </div>
                                <div class="post-extra-details">
                                    <div class="post-categories">
										<a :href="tag.slug" v-for="tag in fpost.tags">{{tag.name}}</a> 
										
									</div>
                                    <div class="post-title">
                                        <h4><a href="single-blog.html">{{fpost.title}}</a></h4>
                                    </div>
                                    <div class="post-meta">
                                        <span class="posts-date">
                                            <i class="ti-calendar"></i> {{ $moment(fpost.published_at).format('MM/DD/YYYY') }}</span>
                                        
                                         <span class="post-author" v-for="author in fpost.authors" >
											<a :href="author.slug">{{author.name}}</a>
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
                            <article class="tv-post-item"  v-for="post in posts.slice(0, 3)">
                                <div class="tv-post-wrapper">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="post-thumnail">
                                                <div class="post-thumnail-box">
                                                    <div class="post-image"  :style="{ backgroundImage: `url(${post.feature_image})` }"></div>
                                                </div>
                                                <a class="tv-post-overlay" :href="post.url">
                                                    <i class="ti-exchange-vertical"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col-md-6 tv-post-section-right">
                                            <div class="post-extra-details">
                                                <div class="post-categories">
													<a :href="tag.slug" v-for="tag in post.tags">{{tag.name}}</a> 
												</div>
                                                <div class="post-title">
                                                    <h2><a href="single-blog.html">{{post.title}}</a></h2>
                                                </div>
                                                <div class="post-content">
                                                    <p>{{post.excerpt}}</p>
                                                </div>
                                                <div class="post-meta">
                                                   <span class="posts-date">  
													 <i class="ti-calendar"></i> {{ $moment(post.published_at).format('MM/DD/YYYY hh:mm') }}
												   </span>                                       
												   <span class="post-author" v-for="author in post.authors" >
														<a :href="author.slug">{{author.name}}</a>
												   </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </article>   
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
                                        <img :src="author.profile_image" alt="" class="">
                                    </div>
                                    <div class="tv-about-me-content text-center">
										
                                        <div class="tv-author-name">
                                            <h3>{{author.name}}</h3>
                                            <span class="tv-author-profession">Ghost Blogger</span>
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
									
									<a :href="tag.slug">{{tag.name}} <span class="count"></span></a></li>                                            
								</ul>
							</div>
                                </div>
                                <div class="tv-widget tv-widget-image">
                                    <a href=""><img src="images/adv1.png" class="img-fluid" alt="custom-image"></a>
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
                                                <p>
                                                    <input name="EMAIL" placeholder="Your email address" required="" type="email">
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

import { ghostAPI, postIndexFields, settingIndexFields, authorsIndexFields, tagsIndexFields } from '@/utils/ghost'
import moment from 'moment'

 


export default { 
  data: () => ({
        'slickComp': '',
		 'slickOptions': {
                slidesToShow: 3,
				dots: true,
				arrows: false
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
    const posts = await ghostAPI().posts.browse({
	  order: 'published_at desc',
      fields: postIndexFields,
	  formats:'html,plaintext',
	  include:'authors,tags',
	  limit: 6,
	  page:2	  
    });
	
	const featur_post = await ghostAPI().posts.browse({
	  order: 'published_at desc',
      fields: postIndexFields,
	  formats:'html,plaintext',
	  include:'authors,tags',
	  filter:'featured:true',
	  limit: 6
    });
	
	const authors = await ghostAPI().authors.browse({	 
      fields: authorsIndexFields,
	  order: 'name desc',
	  limit: 1
    });
	
	const tags = await ghostAPI().tags.browse({	 
      fields: tagsIndexFields,
	  order: 'name desc',
	  limit: 6,
	  include: 'count.posts'
    });
	
	const setting = await ghostAPI().settings.browse({
      fields: settingIndexFields,
	  
    });
   
  const navigation = setting.navigation

    return {
      posts,setting,navigation,featur_post,authors,tags
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
