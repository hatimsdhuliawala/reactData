// @property {object} config                                      - The config object.
// @property {number} [config.bytesPerChunk = 1024*500]           - Bytes per chunk sent.
// @property {number} [config.chunksProcessingMax = 6]            - Max concurrent chunks to send.
// @property {number} [config.chunkSendInterval = 5]              - Interval to wait between chunk upload complete and start.
// @property {number} [config.maxChunkRetryFailures = 20]         - Max retry attempts per chunk.
// @property (number) [config.maxStartChunkRetryFailures = 10]    - Max retry attempts per start of chunk.
// @property (number) [config.maxCompleteChunkRetryFailures = 10] - Max retry attempts per complete of chunk.
// @property {number} [config.maxSimultaneousUploads = 2]         - Max amount of files to upload concurrently.

const DefaultState = {
  uploadData: [],
  fileQueue: [],
  uploadErrorFiles: [],
  uploadsInProgress: 0,
  uploadInProgress: false,
  totalFiles: 0,
}

export { DefaultState }
