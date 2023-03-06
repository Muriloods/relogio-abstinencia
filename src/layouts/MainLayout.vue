<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { db } from 'boot/database'

const router = useRouter()
const route = useRoute()
const keyActive = ref(route.params.key)
const leftDrawerOpen = ref(false)
const addictions = ref(null)
function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

db.collection('dadosUsuario').get({ keys: true }).then(retorno => {
  addictions.value = Object.values(retorno).map(item => {
    return {
      key: item.key,
      name: item.data.name,
      dateSobriety: item.data.dateSobriety,
      addiction: item.data.addiction
    }
  })
})

function redirect (key) {
  if (key === 'new') {
    router.push({ path: `/form/${key}` })
  } else {
    window.location.href = `/#/dateCounter/${key}`
    location.reload()
  }
}

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Relógio da Sobriedade
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-light-blue-1"
    >
      <q-list>
        <q-item class="bg-teal-6">
          <q-item-label
            header
            class="text-white"
          >
            Menu
          </q-item-label>
        </q-item>
        <q-item clickable
                v-ripple
                v-for="addiction in addictions"
                :key="addiction.key"
                >
          <q-item-section v-show="addiction.key !== keyActive"
            @click="redirect(addiction.key)"
            class="bg-blue-grey-13 text-center q-pa-xs rounded-borders"
          >
            <q-item-label class="text-white">{{ addiction.addiction }}</q-item-label>
          </q-item-section>
          <q-item-section v-show="addiction.key === keyActive"
                          @click="redirect(addiction.key)"
                          class="bg-primary text-center q-pa-xs rounded-borders"
          >
            <q-item-label class="text-white">{{ addiction.addiction }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="text-center bg-teal q-pa-xs">
        <q-btn round color="primary" icon="add" @click="redirect('new')" />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
