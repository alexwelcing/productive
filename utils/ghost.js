import GhostContentAPI from '@tryghost/content-api'
import {
  API_KEY, HOST_URL
} from '../config/constants'

const ghost = (url, key) => {
  return new GhostContentAPI({
    url,
    key,
    version: 'v2'
  })
}

const postIndexFields = [
  'id',
  'uuid',
  'title',
  'slug',
  'feature_image',
  'published_at',
  'html',
  'excerpt',
 'plaintext',
 
]
const settingIndexFields = [
  'title',
  'description',
  'logo',
  'icon',
  'navigation'
]
const authorsIndexFields = [
  'slug',
  'name',
  'profile_image',
  'cover_image',
  'bio',
  'website',
  'location',
  'facebook',
  'twitter'
]

const tagsIndexFields = [
  'slug',
  'name',
  'description',
  'feature_image',
  'url',
  'count.posts'
]

const postsPerPage = 8

const ghostAPI = () => {
  return ghost('https://atrispina.stream', API_KEY)
}

export {
  ghostAPI,
  postsPerPage,
  postIndexFields,
  settingIndexFields,
  authorsIndexFields,
  tagsIndexFields
}
