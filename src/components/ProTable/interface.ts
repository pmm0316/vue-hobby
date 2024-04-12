export type SearchModelType = { [key: string]: string | number | Array<string> }

export type ProColumnType = {
  label: string
  prop: string
  search?: boolean
  valueType?: 'select' | 'selectMultiple' | 'dateRange' | 'option' | 'radio' | 'checkbox'
  hideInTable?: boolean
  options?: Array<{ value: string; label: string }>
  fixed?: 'left' | 'right'
  width?: number
}

export type ProTableSearchType = {
  searchText?: string // 查询按钮的文本
  resetText?: string // 重置按钮的文本
  labelWidth?: number // 标签的宽度
  defaultCollapsed?: boolean // 默认是否收起
  span?: number // 配置查询表单的列数
}

export interface ProTableProps {
  search?: boolean | ProTableSearchType
  columns: ProColumnType[]
  dataSource?: any[]
  request?: Function
  rowKey?: string
  params?: Object // 用于 request 查询的额外参数，一旦变化会触发重新加载
  selection?: {
    width?: number
  } | false
}
