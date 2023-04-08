import sxRequest from '@/service'

import { IDataType } from '../../types'

export function getPageListData(url: string, userInfo: any) {
  return sxRequest.post<IDataType>({
    url: url,
    data: userInfo
  })
}
