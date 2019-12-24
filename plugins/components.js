import Vue from 'vue'
import Responsive from 'vue-responsive-component';
import nodata from '@/components/NoData.vue'
import login from '@/components/login.vue'

const components = { 
    nodata,
    login,
    Responsive
}

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})
