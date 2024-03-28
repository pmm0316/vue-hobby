export type SearchModelType = { [key: string]: string | number | Array<string> }

import { type Column } from 'element-plus'

export type ProColumnType = {
  label: string
  prop: string
  search?: boolean
  valueType?: string
  options?: any[]
}
