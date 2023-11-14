import { GraphQLUpload } from 'graphql-upload-ts'
// // EXAMPLES
// import { uploadFile, deleteFiles } from '../../services/storage'
// import logger from '../../logger'

export default {
  Upload: GraphQLUpload,
  Mutation: {
    // // EXAMPLES
    // uploadFile: async (_: any, { file }: any) => {
    //   try {
    //     const { createReadStream, filename: originalFilename } = await file
    //     const stream = createReadStream()
    //     const response = await uploadFile(stream, originalFilename)
    //     const { filename } = response.data
    //     return { filename }
    //   } catch (error) {
    //     logger.error(error)
    //     throw error
    //   }
    // },
    // uploadFiles: async (_: any, { files }: any) => {
    //   const results = []
    //   try {
    //     // eslint-disable-next-line no-restricted-syntax
    //     for (const file of files) {
    //       // eslint-disable-next-line no-await-in-loop
    //       const { createReadStream, filename: originalFilename } = await file
    //       const stream = createReadStream()
    //       // eslint-disable-next-line no-await-in-loop
    //       const response = await uploadFile(stream, originalFilename)
    //       const { filename } = response.data
    //       results.push({ filename })
    //     }
    //     return results
    //   } catch (error) {
    //     deleteFiles(results.map((result) => result.filename))
    //     logger.error(error)
    //     throw error
    //   }
    // },
  },
}
