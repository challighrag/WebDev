const loggerMiddleware = (req,res,next) => {
    const {method,url} = req;
    const now = new Date().toString();

    console.log(`
        Date: ${now}
        Url: ${url}
        Method: ${method}
    `);
    next();
};

module.exports = loggerMiddleware;