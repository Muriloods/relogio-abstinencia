<script setup>
import { ref, onMounted } from 'vue'
import { db } from 'boot/database'
import { calculoData } from 'src/utils/CalculoData'

const diffInDays = ref(null)
const years = ref(null)
const slide = ref('fullCounter')
const dateSobriety = ref(null)
const name = ref(null)
const fullCounter = ref(null)
const progress = ref({
  year: {
    value: 1,
    label: ''
  },
  month: {
    value: 0,
    label: ''
  },
  day: {
    value: 0,
    label: ''
  }
})
onMounted(async () => {
  db.collection('dadosUsuario').get({ keys: true }).then(retorno => {
    name.value = retorno[0].data.name
    dateSobriety.value = retorno[0].data.dateSobriety
    let date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    let now = `${year}-${month}-${day}`

    date = new Date(dateSobriety.value)
    date.setDate(date.getDate() + 1)
    dateSobriety.value = date
    const diffInMs = Math.abs(new Date(now)) - Math.abs(dateSobriety.value)
    diffInDays.value = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
    dateSobriety.value = dateSobriety.value.toLocaleDateString()
    now = new Date(now)
    now = new Intl.DateTimeFormat('pt-BR').format(now)
    fullCounter.value = calculoData.calculaData(dateSobriety.value, now)
    progress.value.year.label = `${fullCounter.value.anos} anos`
    progress.value.month.label = `${fullCounter.value.meses} meses`
    progress.value.day.label = `${fullCounter.value.dias} dias`
    progress.value.month.value = fullCounter.value.meses / 12
    progress.value.day.value = fullCounter.value.dias / 30
    years.value = fullCounter.value.anos
  })
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
    <q-carousel-slide name="fullCounter" class="column no-wrap flex-center">
      <div>Livre das drogas há</div>
      <q-linear-progress v-show="years > 0" size="50px" :value="progress.year.value" color="orange-4" class="q-mt-sm">
        <div class="absolute-full flex flex-center">
          <q-badge color="orange-4" text-color="white" :label="progress.year.label" />
        </div>
      </q-linear-progress>
      <q-linear-progress size="50px" :value="progress.month.value" color="green-6" class="q-mt-sm">
        <div class="absolute-full flex flex-center">
          <q-badge color="green-6" text-color="white" :label="progress.month.label" />
        </div>
      </q-linear-progress>
      <q-linear-progress size="50px" :value="progress.day.value" color="indigo-3" class="q-mt-sm">
        <div class="absolute-full flex flex-center">
          <q-badge color="indigo-3" text-color="white" :label="progress.day.label" />
        </div>
      </q-linear-progress>
    </q-carousel-slide>
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
