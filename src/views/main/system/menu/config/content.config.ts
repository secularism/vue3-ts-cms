export const contentTableConfig = {
  title: '菜单管理',
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '120' },
    { prop: 'url', label: '菜单地址', minWidth: '80' },
    { prop: 'icon', label: '菜单图标', minWidth: '80', slotName: 'icon' },
    { prop: 'permission', label: '权限', miWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  // 这个是控制table的树形结构
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}
