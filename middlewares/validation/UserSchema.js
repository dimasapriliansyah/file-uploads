const onCreate = {
  username: {
    in: ['body'],

    // Sanitizers
    trim: true,
    escape: true,

    // Validators
    exists: {
      errorMessage: "username is not defined",
      checkFalsy: true
    },
    isEmpty: {
      negated: true,
      errorMessage: "username cannot be empty."
    },
    isAlphanumeric: {
      errorMessage: "username must contain only letters and numbers."
    },
    isLength: {
      options: {
        min: 5,
        max: 20,
        errorMessage: "username must contain only 5-20 alphanumeric lengths."
      }
    }
  },
  password: {
    in: ['body'],

    // Sanitizers
    trim: true,
    escape: true,

    // Validators
    exists: {
      errorMessage: "password is not defined",
      checkFalsy: true
    },
    isEmpty: {
      negated: true,
      errorMessage: "password cannot be empty."
    },
    isAlphanumeric: {
      errorMessage: "password must contain only letters and numbers."
    },
    isLength: {
      options: {
        min: 5,
        max: 20,
        errorMessage: "password must contain only 5-20 alphanumeric lengths."
      }
    }
  },
  tenant: {
    in: ['body'],
    // Sanitizers
    trim: true,
    escape: true,
    exists: {
      errorMessage: "tenant is not defined.",
      checkFalsy: true
    },
    isEmpty: {
      negated: true,
      errorMessage: "tenant cannot be empty."
    },

    isLength: {
      options: {
        min: 5,
        max: 50,
        errorMessage: "tenant must contain only 5-50 alphanumeric lengths."
      }
    }

  },
  pic: {
    in: ['body'],
    // Sanitizers
    trim: true,
    escape: true,
    // Validators
    exists: {
      errorMessage: "pic is not defined.",
      checkFalsy: true
    },
    isEmpty: {
      negated: true,
      errorMessage: "pic cannot be empty."
    },
    isLength: {
      options: {
        min: 5,
        max: 50,
        errorMessage: "pic must contain only 5-50 alphanumeric lengths."
      }
    }
  },
  email: {
    in: ['body'],
    // Sanitizers
    normalizeEmail: true,
    // Validators
    exists: {
      errorMessage: "email is not defined",
      checkFalsy: true
    },
    isEmail: {
      errorMessage: "Wrong email format."
    },
  }
}

const onUpdate = {
  id: {
    in: ['params'],
    // Sanitizers
    trim: true,
    escape: true,
    // Validators
    exists: {
      errorMessage: "id is not defined",
      checkFalsy: true
    },
    isEmpty: {
      negated: true,
      errorMessage: "id cannot be empty."
    },
  },

  username: {
    in: ['body'],
    optional: true,

    // Sanitizers
    trim: true,
    escape: true,

    // Validators
    exists: {
      errorMessage: "username is not defined",
      checkFalsy: true
    },
    isEmpty: {
      negated: true,
      errorMessage: "username cannot be empty."
    },
    isAlphanumeric: {
      errorMessage: "username must contain only letters and numbers."
    },
    isLength: {
      options: {
        min: 5,
        max: 20,
        errorMessage: "username must contain only 5-20 alphanumeric lengths."
      }
    }
  },
  password: {
    in: ['body'],
    optional: true,

    // Sanitizers
    trim: true,
    escape: true,

    // Validators
    exists: {
      errorMessage: "password is not defined",
      checkFalsy: true
    },
    isEmpty: {
      negated: true,
      errorMessage: "password cannot be empty."
    },
    isAlphanumeric: {
      errorMessage: "password must contain only letters and numbers."
    },
    isLength: {
      options: {
        min: 5,
        max: 20,
        errorMessage: "password must contain only 5-20 alphanumeric lengths."
      }
    }
  },
  tenant: {
    in: ['body'],
    optional: true,
    // Sanitizers
    trim: true,
    escape: true,
    exists: {
      errorMessage: "tenant is not defined.",
      checkFalsy: true
    },
    isEmpty: {
      negated: true,
      errorMessage: "tenant cannot be empty."
    },

    isLength: {
      options: {
        min: 5,
        max: 50,
        errorMessage: "tenant must contain only 5-50 alphanumeric lengths."
      }
    }

  },
  pic: {
    in: ['body'],
    optional: true,
    // Sanitizers
    trim: true,
    escape: true,
    // Validators
    exists: {
      errorMessage: "pic is not defined.",
      checkFalsy: true
    },
    isEmpty: {
      negated: true,
      errorMessage: "pic cannot be empty."
    },
    isLength: {
      options: {
        min: 5,
        max: 50,
        errorMessage: "pic must contain only 5-50 alphanumeric lengths."
      }
    }
  },
  email: {
    in: ['body'],
    optional: true,
    // Sanitizers
    normalizeEmail: true,
    // Validators
    exists: {
      errorMessage: "email is not defined",
      checkFalsy: true
    },
    isEmail: {
      errorMessage: "Wrong email format."
    },
  }

}

const onLogin = {
  username: {
    in: ['body'],

    // Sanitizers
    trim: true,
    escape: true,

    // Validators
    exists: {
      errorMessage: "username is not defined",
      checkFalsy: true
    },
    isEmpty: {
      negated: true,
      errorMessage: "username cannot be empty."
    },
    isAlphanumeric: {
      errorMessage: "username must contain only letters and numbers."
    },
    isLength: {
      options: {
        min: 5,
        max: 20,
        errorMessage: "username must contain only 5-20 alphanumeric lengths."
      }
    }
  },
  password: {
    in: ['body'],

    // Sanitizers
    trim: true,
    escape: true,

    // Validators
    exists: {
      errorMessage: "password is not defined",
      checkFalsy: true
    },
    isEmpty: {
      negated: true,
      errorMessage: "password cannot be empty."
    },
    isAlphanumeric: {
      errorMessage: "password must contain only letters and numbers."
    },
    isLength: {
      options: {
        min: 5,
        max: 20,
        errorMessage: "password must contain only 5-20 alphanumeric lengths."
      }
    }
  }
}

module.exports = { onCreate, onUpdate, onLogin }