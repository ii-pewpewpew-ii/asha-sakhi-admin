const responseUtil = (res, statusCode, payload) => {
    return res.status(statusCode).json(payload);
}

const errorMessageUtil = (errorMessage) => {
    return {message : errorMessage};
}

const payloadUtil = (data) =>{
    return {data : data};
}

module.exports = {
    responseUtil,
    errorMessageUtil,
    payloadUtil
}