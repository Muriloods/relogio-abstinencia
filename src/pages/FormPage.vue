<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import { useQuasar } from 'quasar'
import LocalBase from 'localbase'

const form = ref({
  name: String,
  dateSobriety: String
})
// const $q = useQuasar()
const router = useRouter()
const db = new LocalBase('relogio-sobriedade')
onMounted(async () => {
  const retorno = await db.collection('dadosUsuario').get({ keys: true })
  console.log(retorno)
  form.value.name = null
  form.value.dateSobriety = null
  form.value.key = null
  if (retorno.length > 0) {
    form.value.name = retorno[0].data.name
    form.value.dateSobriety = retorno[0].data.dateSobriety
    form.value.key = retorno[0].key
  }
})

async function onSubmit () {
  console.log(form.value.dateSobriety)
  if (form.value.key == null) {
    if (new Date(form.value.dateSobriety) > new Date()) {
      alert('Não é permitido Data Futura!')
      // $q.notify('Não é permitido Data Futura!')
      return
    }
    await db.collection('dadosUsuario').add({
      name: form.value.name,
      dateSobriety: form.value.dateSobriety
    })
  } else {
    if (new Date(form.value.dateSobriety) > new Date()) {
      alert('Não é permitido Data Futura!')
      // $q.notify('Não é permitido Data Futura!')
      return
    }
    await db.collection('dadosUsuario').doc(form.value.key).set({
      name: form.value.name,
      dateSobriety: form.value.dateSobriety
    })
  }
  router.push({ path: '/dateCounter' })
}

</script>

<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">
      <q-form
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="form.name"
          label="Seu Nome"
          hint="Nome e Sobrenome"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        ></q-input>
        <q-input
          filled
          type="date"
          v-model="form.dateSobriety"
          stack-label
          label="Quando usou pela última vez?"
          lazy-rules
          hint="Seja honesto, álccol também é droga!"
        ></q-input>
        <div>
          <q-btn label="Salvar" @click="onSubmit" color="primary"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
  <Notify></Notify>
</template>

<style scoped>
</style>
