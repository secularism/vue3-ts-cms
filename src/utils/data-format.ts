import dayjs from 'dayjs'
// 使用utc 需要先导入
import utc from 'dayjs/plugin/utc'
// 然后再继承
dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).format(format)
}
