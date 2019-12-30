<template>
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
                                        <img :src="author.profile_image" alt="" class="" v-if="author.profile_image">
                                        <img src="~assets/images/images.jpg" class="img-fluid" width="100%" v-else>
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
									<a :href="'/tag/'+tag.slug">{{tag.name}} 
									<span class="count"></span></a>
								</li>                                           
								</ul>
								<a href="tag" class="view-all" >View All Categories</a>
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

</template>

