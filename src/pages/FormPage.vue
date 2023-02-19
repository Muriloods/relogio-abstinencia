<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LocalBase from 'localbase'
const form = ref({
  name: String,
  dateSobriety: String
})
const router = useRouter()
const db = new LocalBase('relogio-sobriedade')
onMounted(async () => {
  const retorno = await db.collection('dadosUsuario').get({ keys: true })
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
  if (form.value.key == null) {
    await db.collection('dadosUsuario').add({
      name: form.value.name,
      dateSobriety: form.value.dateSobriety
    })
  } else {
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
          :rules="[ val => val && val.length > 0 || 'When is missing']"
        ></q-input>
        <div>
          <q-btn label="Salvar" type="submit" @click="onSubmit" color="primary"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style scoped>
</style>
