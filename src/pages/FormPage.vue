<script setup>
import { ref, onMounted } from 'vue'
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

const activeKey = ref(null)

const options = ref([
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
])
const router = useRouter()
let parametros = useRoute()
parametros = parametros.params

onMounted(async () => {
  if (parametros.key !== 'new') {
    const retorno = await db.collection('dadosUsuario').doc(parametros.key).get({ keys: true })
    form.value.id = retorno.id
    form.value.name = retorno.name
    form.value.dateSobriety = retorno.dateSobriety
    form.value.addiction = retorno.addiction
  }
})

async function onSubmit () {
  const date = new Date(form.value.dateSobriety)
  date.setDate(date.getDate() + 1)
  if (date > new Date()) {
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

</script>

<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 1000px">
      <q-form
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="form.name"
          label="Seu Nome"
          hint="Deixe vazio caso não queira informar"
          lazy-rules
        ></q-input>
        <q-select
          filled
          v-model="form.addiction"
          :options="options"
          label="Qual seu vício?" />
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
