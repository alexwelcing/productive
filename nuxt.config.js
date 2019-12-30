const nodeExternals = require('webpack-node-externals')
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
	  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
	  '@/assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
	  '@/assets/fonts/themify-icons/themify-icons.css',
	  
	  '@/assets/css/bootstrap.css',
	  '@/assets/css/swiper.css',
	  '@/assets/css/slick.css',
	  '@/assets/css/gridrotator-custom.css',
	  '@/assets/css/style.css',
	  '@/assets/css/responsive.css',
  ],
	render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font', 'img'].includes(type)
      }
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [      
  
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
	  '@nuxtjs/moment'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
	   '@nuxtjs/pwa',
	   'bootstrap-vue/nuxt',
	   [
		  "nuxt-compress",
		  {
			gzip: {
			  cache: true
			},
			brotli: {
			  threshold: 10240
			}
		  }
		]
  ],
  /*
  ** Build configuration
  */
  build: {
  
    extend(config, ctx) {
    if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vue-slick/]
          })
        ]
      }
    }
  },
  generate: {
    routes: [
      'index',      
      '_slug',      
      'posts/index',      
      'posts/_slug',      
      'tag/index',      
      'tag/_slug',
	  'author/index',      
      'author/_slug',
    ],
	fallback: true	
  },
  
  manifest: {
	  name: 'Knowzone application with ghost and PWA',
	  short_name: 'Knowzone',
	  lang: 'en',
	  display: 'standalone',
	},
  /*
  ** Handle external assets
  */
  workbox: {
		cachingExtensions: '@/static/custom-sw.js',
		dev: true,
		production: true,
		debug: true,
    runtimeCaching: [
      {
        urlPattern: 'https://atrispina.stream/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern: 'http://res-3.cloudinary.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern: 'https://images.unsplash.com/.*',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
	  {
        urlPattern: ' http://storage.googleapis.com/.*',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      }
      
    ]
  }
}
