<script setup>
// import DateCounter from 'components/DateCounter.vue'
import { ref, onMounted } from 'vue'
import LocalBase from 'localbase'

const dateSobriety = ref(null)
const name = ref(null)
const db = new LocalBase('relogio-sobriedade')
const diffInDays = ref(null)

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
  const diffInMs = Math.abs(new Date(now)) - Math.abs(new Date(dateSobriety.value))
  diffInDays.value = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
})

</script>

<template>
  <q-page class="flex flex-center">
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
