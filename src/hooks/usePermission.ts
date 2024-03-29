import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.loginModule.permission
  const verifyPermission = `system:${pageName}:${handleName}`

  // name = "coderwhy"
  // !name -> false
  // !!name -> true
  return !!permissions.find((item: any) => item === verifyPermission)
}
