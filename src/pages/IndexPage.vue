<script setup>
import { useRouter } from 'vue-router'
import LocalBase from 'localbase'
import { onMounted } from 'vue'

const router = useRouter()
const db = new LocalBase('relogio-sobriedade')

onMounted(async () => {
  const retorno = await db.collection('dadosUsuario').get({ keys: true })
  console.log(retorno)
  if (retorno.length > 0) {
    router.push({ path: '/dateCounter' })
  }
})

function redirectForm () {
  router.push({ path: '/form' })
}

</script>
<template>
    <q-page class="flex flex-center">
      <div class="q-pa-md doc-container">
        <div class="row items-center">
          <div class="col text-center">
            <h5>Relógio da Sobriedade</h5>
          </div>
        </div>
        <div class="row items-center">
          <div class="col text-center">
            <img
              alt="Logo"
              src="~assets/logo.svg"
              style="width: 200px; height: 200px"
            >
          </div>
        </div>
        <br>
        <div class="row items-center">
          <div class="col text-center">
            <q-btn color="primary" @click="redirectForm" icon="start" label="Iniciar"></q-btn>
          </div>
        </div>
      </div>
    </q-page>
</template>
