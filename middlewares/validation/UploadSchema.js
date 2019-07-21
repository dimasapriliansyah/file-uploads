const onDownload = {
  filename: {
    in: ['body'],

    // Sanitizers
    trim: true,
    escape: true,

    // Validators
    exists: {
      errorMessage: "filename is not defined",
      checkFalsy: true
    },
    isEmpty: {
      negated: true,
      errorMessage: "filename cannot be empty."
    },
    isLength: {
      options: {
        min: 5,
        max: 500,
        errorMessage: "filename must contain only 5-20 alphanumeric lengths."
      }
    }
  }
}

module.exports = { onDownload }