// @ts-ignore
export function formDataAppendFile(formData, fieldName, file) {
  // eslint-disable-next-line
  'name' in file ? formData.append(fieldName, file, file.name) : formData.append(fieldName, file)
}
