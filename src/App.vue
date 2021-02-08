<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <gallery :items="galleryItems" :max-width="maxWidth" :show-indicator-bar="true" :show-card-details="true" :highlight-active="true" />
  </div>
</template>

<script>
import biolucida from '@/services/biolucida'
import scicrunch from '@/services/scicrunch'
import Gallery from '@abi-software/gallery'

export default {
  name: 'App',
  components: {
    Gallery,
  },
  data() {
    let galleryItems = [
      { title: 'bob', type: '3D Image', thumbnail: require('./assets/logo.png') },
      {
        title: 'dave',
        type: '2D Image',
        thumbnail: require('./assets/logo.png'),
      },
      { title: 'gus', type: '3D Scaffold', thumbnail: require('./assets/logo.png') },
      { title: 'angus', type: '3D Image', thumbnail: require('./assets/logo.png') },
    ]
    return {
      ro: null,
      maxWidth: 300,
      galleryItems,
    }
  },
  mounted() {
    this.ro = new ResizeObserver(this.onResize).observe(this.$el)
    biolucida.getImageInfo(1300).then(response => {
      const imageInfo = response.data
      let imageName = imageInfo.name
      imageName = imageName.substring(0, imageName.lastIndexOf('.')) || imageName
      this.galleryItems[0].title = imageName
    })
    biolucida.getThumbnail(1300).then(response => {
      this.galleryItems[0].thumbnail = 'data:' + response.headers['content-type'] + ';base64,' + response.data
    })
    scicrunch.getDatasetInfo('N:dataset:9dd7a07b-2037-4ce7-829d-395cc4382518').then(response => {
      const datasetInfo = response.data
      if (datasetInfo.numberOfHits == 1) {
        const result = datasetInfo.results[0]
        console.log('====================')
        console.log(result)
        for (const o of result.objects) {
          if (o.mimetype) {
            console.log(o)
          }
        }
      }
    })
  },
  destroyed() {
    delete this.ro
  },
  methods: {
    onResize() {
      this.maxWidth = this.$el.clientWidth
      // this.$emit('resize', this.$el.clientWidth)
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
