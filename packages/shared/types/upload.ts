export interface IUpload {
  filename: string
  fieldName: string
  mimetype: string
  encoding: string
  createReadStream: () => ReadableStream
}
