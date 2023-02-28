<script setup>
import { onMounted, ref } from 'vue'
import { db } from 'boot/database'
const diffInDays = ref(null)
const slide = ref('days')
const dateSobriety = ref(null)
const name = ref(null)

onMounted(async () => {
  const retorno = await db.collection('dadosUsuario').get({ keys: true })
  name.value = retorno[0].data.name
  dateSobriety.value = retorno[0].data.dateSobriety
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  const now = `${year}-${month}-${day}`

  date = new Date(dateSobriety.value)
  date.setDate(date.getDate() + 1)
  day = date.getDate()
  month = date.getMonth() + 1
  year = date.getFullYear()
  dateSobriety.value = new Date(`${year}-${month}-${day}`)
  const diffInMs = Math.abs(new Date(now)) - Math.abs(dateSobriety.value)
  diffInDays.value = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
  dateSobriety.value = dateSobriety.value.toLocaleDateString()
})
</script>
<template>
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
    height="230px"
    class="bg-primary text-white shadow-1 rounded-borders"
  >
    <q-carousel-slide name="days" class="column no-wrap flex-center">
      <div>Livre das drogas há</div>
      <div class="q-mt-md text-center text-h1">
        {{ diffInDays }}
      </div>
      <div> dias</div>
    </q-carousel-slide>
    <q-carousel-slide name="dateSobriety" class="column no-wrap flex-center">
      <div>Minha data de início de sobriedade</div>
      <div class="q-mt-md text-center text-h4">
        {{ dateSobriety }}
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<style scoped>

</style>
