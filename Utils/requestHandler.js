class RequestHandler {
  // constructor() {
  //     const logger = new Logger();
  //     this.logger = logger;
  // }

  sendSuccess(res, message, data = null, status = 200) {
    return res.status(status).json({
      success: true,
      message: message || 'Success result',
      data,
    });
  }

  sendSuccess(res, message, data = null, status = 200) {
    return res.status(status).json({
      success: true,
      message: message || 'Success result',
      data,
    });
  }

  sendSuccessWithFalse(res, message, data = null, status = 200) {
    return res.status(status).json({
      success: false,
      message: message || 'Success result',
      data,
    });
  }

  sendError(req, res, error) {
    // this.logger.log(`message: ${error.message}`, "error");
    return res.status(error.status || 500).json({
      status: 'error',
      message: error.message || error.message || 'Unhandled Error',
      error,
    });
  }

  sendErrorMsg(res, message, status = 500, data) {
    // this.logger.log(`message: ${message}`, "error");
    return res.status(status).json({
      success: false,
      message: message || 'Unhandled Error',
      data: data || null,
    });
  }
}

module.exports = RequestHandler;
