import { App } from 'vue'
import { globalRegister } from './register_element'
import { registerProperties } from './register_properties'
export function registerApp(app: App) {
  app.use(globalRegister)
  app.use(registerProperties)
}
