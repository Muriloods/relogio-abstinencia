<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { db } from 'boot/database'

const router = useRouter()
onMounted(async () => {
  const retorno = await db.collection('dadosUsuario').get({ keys: true })
  if (retorno.length > 0) {
    if (retorno[0].data.addiction === undefined) {
      await db.collection('dadosUsuario').delete()
    } else {
      router.push({ path: `/dateCounter/${retorno[0].key}` })
    }
  }
})
function redirectForm () {
  router.push({ path: '/form/new/' })
}

</script>
<template>
    <q-page class="flex flex-center">
      <div class="q-pa-md doc-container">
        <div class="row items-center">
          <div class="col text-center">
            <h5>Relógio da Abstinência</h5>
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
