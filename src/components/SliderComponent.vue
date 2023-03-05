<script setup>
import { ref, onMounted } from 'vue'
import { db } from 'boot/database'
import { calculoData } from 'src/utils/CalculoData'
import { useRoute } from 'vue-router'

const route = useRoute()
const keyActive = ref(route.params.key)
const diffInDays = ref(null)
const years = ref(null)
const slide = ref('fullCounter')
const dateSobriety = ref(null)
const name = ref(null)
const addiction = ref(null)
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
  db.collection('dadosUsuario').doc(keyActive.value).get({ keys: true }).then(retorno => {
    name.value = retorno.name
    addiction.value = retorno.addiction
    const date = new Date(retorno.dateSobriety)
    date.setDate(date.getDate() + 1)
    dateSobriety.value = new Intl.DateTimeFormat('pt-BR').format(date)
    let now = new Date()
    now = new Intl.DateTimeFormat('pt-BR').format(now)
    diffInDays.value = calculoData.calculaDias(dateSobriety.value, now)
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
      <div>Sem {{ addiction }} há</div>
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
      <div>Sem {{ addiction }} há</div>
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
