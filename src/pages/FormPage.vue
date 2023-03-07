<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { db } from 'boot/database'
const $q = useQuasar()
const form = ref({
  id: null,
  name: null,
  dateSobriety: null,
  addiction: null
})

const isFirstVicious = ref(null)

const activeKey = ref(null)
const stringOptions = [
  'Álcool',
  'Cocaína',
  'Maconha',
  'Crack',
  'Heroína',
  'LSD',
  'Êxtase',
  'Jogos de Azar',
  'Cigarro',
  'Sexo',
  'Pornografia',
  'Internet'
]

const options = ref(null)
const router = useRouter()
let parametros = useRoute()
parametros = parametros.params

db.collection('dadosUsuario').get({ keys: true }).then(retorno => {
  isFirstVicious.value = retorno.length === 0
  if (parametros.key !== 'new') {
    db.collection('dadosUsuario').doc(parametros.key).get({ keys: true }).then(ret => {
      form.value.id = ret.id
      form.value.name = ret.name
      form.value.dateSobriety = ret.dateSobriety
      form.value.addiction = ret.addiction
    })
  }
})

async function onSubmit () {
  let date = new Date(form.value.dateSobriety)
  date.setDate(date.getDate() + 1)
  date = new Intl.DateTimeFormat('en-US').format(date)
  let now = new Date()
  now = new Intl.DateTimeFormat('en-US').format(now)
  if (new Date(date) > new Date(now)) {
    $q.notify({
      type: 'negative',
      message: 'Não é permitido Data Futura!'
    })
    return
  }

  if (parametros.key === 'new') {
    await db.collection('dadosUsuario').add({
      id: new Date().getTime(),
      name: form.value.name === '' ? 'Anônimo' : form.value.name,
      dateSobriety: form.value.dateSobriety,
      addiction: form.value.addiction
    })
    await db.collection('dadosUsuario').orderBy('id', 'desc').get({ keys: true }).then(users => {
      activeKey.value = users[0].key
    })
  } else {
    await db.collection('dadosUsuario').doc(parametros.key).set({
      id: form.value.id,
      name: form.value.name === null ? 'Anônimo' : form.value.name,
      dateSobriety: form.value.dateSobriety,
      addiction: form.value.addiction
    })
    activeKey.value = parametros.key
  }
  router.push({ path: `/dateCounter/${activeKey.value}` })
}

function filterFn (val, update) {
  if (val === '') {
    update(() => {
      options.value = stringOptions
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
}

function setModel (val) {
  form.value.addiction = val
}

</script>

<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 1000px">
      <q-form
        class="q-gutter-md"
      >
        <q-input
          v-show="isFirstVicious"
          filled
          v-model="form.name"
          label="Seu Nome"
          hint="Deixe vazio caso não queira informar"
          lazy-rules
        ></q-input>
        <q-select
          label="Qual seu vício?"
          filled
          :options="options"
          :model-value="form.addiction"
          use-input
          hide-selected
          fill-input
          @filter="filterFn"
          input-debounce="0"
          @input-value="setModel"
          style="width: 250px; padding-bottom: 32px"
          hint="Caso não encontre, escreva seu vício."
        />
        <q-input
          filled
          type="date"
          v-model="form.dateSobriety"
          stack-label
          label="Data de Início da Abstinência"
          lazy-rules
        ></q-input>
        <div>
          <q-btn label="Salvar" @click="onSubmit" color="primary"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style scoped>
</style>
