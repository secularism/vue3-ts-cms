import { App } from 'vue'
import { globalRegister } from './register_element'

export function registerApp(app: App) {
  app.use(globalRegister)
}
