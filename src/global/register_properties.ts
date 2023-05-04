import { App } from 'vue'
import { formatUtcString } from '@/utils/data-format'
import { getSingleIconName } from '@/utils/get-iconName'

export function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    },
    mapIcon(value: string) {
      // console.log(value)
      return getSingleIconName(value)
    }
  }
}
