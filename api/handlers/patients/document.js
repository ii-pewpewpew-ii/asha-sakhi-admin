const https = require('https');
const { bucketConfig } = require("../../config");

/**
 * Uploads a single file to BunnyCDN and returns document metadata.
 * @param {Object} file - Multer file object with buffer and originalname
 * @param {string} patientName
 * @param {number|string} checkupId
 * @returns {Promise<Object>} - Upload result with metadata
 */
const uploadSingleFileToBunny = async (file, patientName, checkupId) => {
  return new Promise((resolve) => {
    try {
      const storagePath = bucketConfig.getStoragePath(patientName, checkupId, file.originalname);

      const options = {
        ...bucketConfig.bucketOptions,
        path: storagePath ,
      };

      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => (responseData += chunk.toString('utf8')));
        res.on('end', () => {
          resolve({
            success: true,
            checkupId: checkupId,
            documentPath: storagePath,
            documentName: file.originalname,
            response: responseData,
          });
        });
      });

      req.on('error', (error) => {
        console.error('Bunny upload error:', error);
        resolve({
          success: false,
          checkupId,
          documentName: file.originalname,
          error: error.message,
        });
      });

      req.write(file.buffer);
      req.end();
    } catch (err) {
      console.error('Upload failed:', err);
      resolve({
        success: false,
        checkupId,
        documentName: file.originalname,
        error: err.message,
      });
    }
  });
};

module.exports = { uploadSingleFileToBunny };
