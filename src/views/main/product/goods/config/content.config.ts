export const contentTableConfig = {
  title: '商品列表',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '80' },
    { prop: 'oldPrice', label: '原价', minWidth: '80' },
    { prop: 'newPrice', label: '折扣价', minWidth: '80' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '120', slotName: 'imgUrl' },
    { prop: 'address', label: '地址', minWidth: '80' },
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
  showIndexColumn: true,
  showSelectColumn: true
}
