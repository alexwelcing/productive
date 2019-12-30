console.log('service worker');
const API_KEY = '100cea2c2958f98d14e2336240';
const HOST_URL = 'https://atrispina.stream/ghost/api/v2/content/';
var tags='';
var posts='';

fetch(HOST_URL+'/tags/?key='+API_KEY+'&limit=10&fields=slug')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
	tags = response.data.tags			  
			  for(var i=0; i<tags.length; i++) {		
			  console.log('/tag/'+tags[i].slug);
				  workbox.routing.registerRoute(new RegExp('/tag/'+tags[i].slug), new workbox.strategies.NetworkFirst ({}), 'GET')				  
				}
  })
  .catch(err => {
    // Do something for an error here
  });
  
  fetch(HOST_URL+'/posts/?key='+API_KEY+'&limit=50&fields=slug')
  .then(response => {
    return response.json()
  })
  .then(data => {    
	posts = response.data.posts
			  for(var i=0; i<posts.length; i++) {				 
				  workbox.routing.registerRoute(new RegExp('/posts/'+posts[i].slug), new workbox.strategies.NetworkFirst ({}), 'GET')				  
				}
  })
  .catch(err => {
    // Do something for an error here
  })
  
  
	
