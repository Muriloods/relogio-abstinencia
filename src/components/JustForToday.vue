<script setup>
import { ref } from 'vue'
import jft from 'app/just-for-today'

const dayCitation = ref({
  description: String,
  header: String,
  title: String,
  date: String
})
const date = new Date()
const day = date.getDate()
let month = date.getMonth() + 1
month = month < 10 ? '0' + month : month
const jftNow = jft[0].pt_br.filter(citation => {
  return citation.date === `${day}/${month}`
})
dayCitation.value.description = jftNow[0].description
dayCitation.value.title = jftNow[0].title
dayCitation.value.header = jftNow[0].header
dayCitation.value.date = jftNow[0].date
dayCitation.value.jft = jftNow[0].jft

</script>
<template>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">{{ dayCitation.title }}</div>
      <div class="text-subtitle2">{{ dayCitation.date }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ dayCitation.header }}
      <br><br>
      {{ dayCitation.description }}
      <br><br>
      SÓ POR HOJE: {{ dayCitation.jft }}
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>
