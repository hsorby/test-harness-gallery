import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_PORTAL_API,
  withCredentials: false,
  timeout: 10000,
})

const search = query => {
  return apiClient.get('search/' + query)
}

const getDatasetInfo = async id => {
  return apiClient.get('dataset_info/' + id)
}

const getImageInfo = async id => {
  return apiClient.get('image/' + id)
}

const getCollectionInfo = async id => {
  return apiClient.get('collections/' + id)
}

export default {
  getDatasetInfo,
  search,
  getImageInfo,
  getCollectionInfo,
}
