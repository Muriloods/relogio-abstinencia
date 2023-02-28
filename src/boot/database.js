import { boot } from 'quasar/wrappers'
import LocalBase from 'localbase'
export default boot(({ app }) => {
  const db = new LocalBase('relogio-sobriedade')
  app.config.globalProperties.db = db
  app.provide('db', app.config.globalProperties.db)
})
