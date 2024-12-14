async function routeDelay (req, res, next) {
    const delay = process.env.ROUTE_DELAY || 500;
    return new Promise(function (resolve, reject) {
        const to = setTimeout(function () {
            next();
            clearTimeout(to)
        }, delay)
    })
}

export default routeDelay;