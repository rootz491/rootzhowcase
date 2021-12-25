
function isAuthenticated(req, res, next) {
    // check if user is authenticated
}

function isAuthorized(req, res, next) {
    //  check role and privilidges
}

module.exports = { isAuthenticated, isAuthorized };