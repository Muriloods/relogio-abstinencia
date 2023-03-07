<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { db } from 'boot/database'
import { useQuasar } from 'quasar'
import { calculoData } from 'src/utils/CalculoData'

const $q = useQuasar()
const router = useRouter()
const route = useRoute()
const keyActive = ref(route.params.key)
const leftDrawerOpen = ref(false)
const addictions = ref(null)
const limitAddictions = ref(5)
const addictionActive = ref(null)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

db.collection('dadosUsuario').get({ keys: true }).then(retorno => {
  addictions.value = Object.values(retorno).map(item => {
    if (item.key === route.params.key) {
      addictionActive.value = item.data.addiction
    }
    let date = new Date(item.data.dateSobriety)
    date.setDate(date.getDate() + 1)
    date = new Intl.DateTimeFormat('pt-BR').format(date)
    let now = new Date()
    now = new Intl.DateTimeFormat('pt-BR').format(now)
    return {
      key: item.key,
      name: item.data.name,
      dateSobriety: item.data.dateSobriety,
      addiction: item.data.addiction,
      days: calculoData.calculaDias(date, now)
    }
  })
})

function redirect (key) {
  if (key === 'new') {
    if (addictions.value.length >= limitAddictions.value) {
      $q.notify({
        type: 'negative',
        message: `O limite é de ${limitAddictions.value} vícios!`
      })
      return
    }
    router.push({ path: `/form/${key}` })
  } else {
    window.location.href = `/#/dateCounter/${key}`
    location.reload()
  }
}
function edit (key) {
  router.push({ path: `/form/${key}` })
}

function delet (key) {
  db.collection('dadosUsuario').doc(key).delete().then(sucess => {
    db.collection('dadosUsuario').get({ keys: true }).then(retorno => {
      if (key === keyActive.value) {
        if (retorno.length > 0) {
          const first = retorno[0].key
          window.location.href = `/#/dateCounter/${first}`
          location.reload()
        } else {
          router.push({ path: '/form/new' })
        }
      } else {
        location.reload()
      }
    })
  })
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
          {{ addictionActive }}
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
        <q-item class="bg-primary">
          <q-item-label
            header
            class="text-white"
          >
            Menu
          </q-item-label>
        </q-item>
        <q-item v-ripple
                v-for="addiction in addictions"
                :key="addiction.key"
        >
          <q-item-section>
            <q-card>
              <q-card-section
                class="text-white"
                :class="{'bg-primary': (addiction.key === keyActive),
                'bg-blue-grey-13': (addiction.key !== keyActive)}"
              >
                <div class="text-body1">{{ addiction.addiction }}</div>
                <div class="text-caption">{{ addiction.days }} dias</div>
              </q-card-section>
              <q-card-actions align="around">
                <q-btn size="10px" @click="redirect(addiction.key)" round color="primary" icon="visibility" />
                <q-btn size="10px" @click="edit(addiction.key)" round color="secondary" icon="edit" />
                <q-btn size="10px" @click="delet(addiction.key)" round color="negative" icon="delete" />
              </q-card-actions>
            </q-card>
          </q-item-section>
        </q-item>
      </q-list>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" @click="redirect('new')" color="primary" />
      </q-page-sticky>
    </q-drawer>

    <q-footer elevated>
      <q-toolbar class="glossy text-center">
        <q-toolbar-title class="text-caption">Relógio da Abstinência 2023</q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
