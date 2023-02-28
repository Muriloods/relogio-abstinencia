import { boot } from 'quasar/wrappers'
import LocalBase from 'localbase'
const db = new LocalBase('relogio-sobriedade')
export default boot(({ app }) => {
  app.config.globalProperties.db = db
  app.provide('db', app.config.globalProperties.db)
})

export { db }
