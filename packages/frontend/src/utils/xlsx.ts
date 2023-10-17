import { utils, write } from 'xlsx'
import { saveAs } from 'file-saver'

export const exportXLSX = (data: any, fileName: string) => {
  const wb = utils.book_new()
  const ws = utils.json_to_sheet(data)
  utils.book_append_sheet(wb, ws, fileName)
  const wbout = write(wb, { bookType: 'xlsx', type: 'array' })
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${fileName}.xlsx`)
}
