import { App } from 'vue'
import { formatUtcString } from '@/utils/data-format'
export function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
