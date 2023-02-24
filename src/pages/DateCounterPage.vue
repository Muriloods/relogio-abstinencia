<script setup>
import { ref, onMounted } from 'vue'
import LocalBase from 'localbase'

const dateSobriety = ref(null)
const name = ref(null)
const db = new LocalBase('relogio-sobriedade')
const diffInDays = ref(null)
const slide = ref('style')
const lorem = 'teste'

onMounted(async () => {
  const retorno = await db.collection('dadosUsuario').get({ keys: true })
  name.value = retorno[0].data.name
  dateSobriety.value = retorno[0].data.dateSobriety
  const date = new Date()
  const day = await date.getDate()
  let month = await date.getMonth() + 1
  month = month < 10 ? '0' + month : month
  const year = await date.getFullYear()
  const now = `${year}-${month}-${day}`
  dateSobriety.value = new Date(dateSobriety.value)
  const diffInMs = Math.abs(new Date(now)) - Math.abs(dateSobriety.value)
  diffInDays.value = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
  dateSobriety.value = dateSobriety.value.toLocaleDateString()
})

</script>

<template>
  <q-page class="q-pa-sm">
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="white"
          navigation
          padding
          arrows
          height="200px"
          class="bg-primary text-white shadow-1 rounded-borders"
        >
          <q-carousel-slide name="style" class="column no-wrap flex-center">
            <q-icon name="style" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="tv" class="column no-wrap flex-center">
            <q-icon name="live_tv" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="layers" class="column no-wrap flex-center">
            <q-icon name="layers" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="map" class="column no-wrap flex-center">
            <q-icon name="terrain" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
        </q-carousel>

    <div class="q-pa-md doc-container">
      <div class="row items-center">
        <div class="col text-center">
          <h5>Olá {{ name }}</h5>
          <h5>{{ dateSobriety }}</h5>
        </div>
      </div>
      <div class="row items-center">
        <div class="col text-center">
          <h5>Você está sóbrio há {{ diffInDays }} dias</h5>
        </div>
      </div>
    </div>
  </q-page>
</template>
<style scoped>

</style>
