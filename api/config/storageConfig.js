const dotenv = require("dotenv");
dotenv.config();

const bucketOptions = {
    method: 'PUT',
    host: process.env.STORAGE_HOSTNAME,
    headers: {
      AccessKey: process.env.STORAGE_ACCESS_KEY,
      'Content-Type': 'application/octet-stream',
    }
}

const getStoragePath = (patientName,checkupId, fileName) => {
    return `/${process.env.STORAGE_ZONE_NAME}/${patientName}/${checkupId}/${fileName}`;
}

module.exports = {bucketOptions, getStoragePath};