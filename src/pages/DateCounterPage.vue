<script setup>
import SliderComponent from 'components/SliderComponent.vue'
import { db } from 'boot/database'
import { useRouter } from 'vue-router'

const router = useRouter()

db.collection('dadosUsuario').get({ keys: true }).then(retorno => {
  if (retorno.length === 0) {
    router.push({ path: '/' })
  }
})

</script>

<template>
  <q-page class="q-pa-sm">
    <div class="text-center">
      <SliderComponent></SliderComponent>
    </div>
  </q-page>
</template>
<style scoped>

</style>
