module.exports = (isSuccess, message, data) => {
  return {
    success: isSuccess,
    message,
    data
  }
}