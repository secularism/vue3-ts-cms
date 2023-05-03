import sxRequest from '@/service'

import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return sxRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
