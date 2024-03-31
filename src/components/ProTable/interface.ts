export type SearchModelType = { [key: string]: string | number | Array<string> }

export type ProColumnType = {
  label: string
  prop: string
  search?: boolean
  valueType?: 'select' | 'selectMultiple' | 'dateRange' | 'option'
  hideInTable?: boolean
  options?: Array<{value: string, label: string}>
}
