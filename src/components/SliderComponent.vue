<script setup>
import { ref, onMounted } from 'vue'
import { db } from 'boot/database'
import { calculoData } from 'src/utils/CalculoData'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const keyActive = ref(route.params.key)
const diffInDays = ref(null)
const years = ref(null)
const months = ref(null)
const slide = ref('fullCounter')
const dateSobriety = ref(null)
const name = ref(null)
const addiction = ref(null)
const fullCounter = ref(null)
const confirm = ref(false)
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
const urlShare = ref(null)
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
    months.value = fullCounter.value.meses
    const textShare = `Estou abstinente de ${retorno.addiction} há ${diffInDays.value} dias!%0AComemore Comigo esta conquista!!%0Ahttps://play.google.com/store/apps/details?id=app.netlify.sobriety_watch.twa`
    urlShare.value = `https://api.whatsapp.com/send?text=${textShare}`
  })
})
function restart () {
  let now = new Date()
  const ano = now.getFullYear()
  const mes = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1
  const dia = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()
  now = `${ano}-${mes}-${dia}`
  db.collection('dadosUsuario').doc(keyActive.value).update({
    dateSobriety: now
  }).then(sucess => {
    location.reload()
  })
}

function edit () {
  router.push({ path: `/form/${keyActive.value}` })
}

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
    height="300px"
    class="bg-primary text-white shadow-1 rounded-borders article"
  >
    <q-carousel-slide name="fullCounter" class="column no-wrap flex-center">
      <div>Sem {{ addiction }} há</div>
      <q-linear-progress v-show="years > 0" size="50px" :value="progress.year.value" color="orange-4" class="q-mt-sm">
        <div class="absolute-full flex flex-center">
          <q-badge color="orange-4" text-color="white" :label="progress.year.label" />
        </div>
      </q-linear-progress>
      <q-linear-progress v-show="months > 0" size="50px" :value="progress.month.value" color="green-6" class="q-mt-sm">
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
      <div>Minha data de início de abstinência</div>
      <div class="q-mt-md text-center text-h4">
        {{ dateSobriety }}
      </div>
    </q-carousel-slide>
  </q-carousel>
  <br><br>
  <div class="text-center" style="max-width: 700px; width: 50%; margin: 0 auto">
      <q-card-actions align="around">
        <q-btn :href="urlShare" round color="positive" icon="share" />
        <q-btn round color="warning" @click="confirm = true" icon="replay" />
        <q-btn round color="secondary" @click="edit" icon="edit" />
      </q-card-actions>
  </div>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Tudo bem recomeçar, o importante é não desistir</span>
        <span class="q-ml-sm">Deseja mesmo zerar a data de {{ addiction }}?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn flat label="Sim" @click="restart" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped>
  @media screen and (min-width: 900px) {
    .article {
      max-width: 700px;
      margin: 0 auto;
      margin-top: 200px;
    }
  }
</style>
