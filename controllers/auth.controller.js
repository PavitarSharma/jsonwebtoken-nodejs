exports.register = async (req, res, next) =>  {
    res.send("Register route")
}

exports.login = async (req, res, next) =>  {
    res.send("Login route")
}

exports.refreshToken = async (req, res, next) =>  {
    res.send("refresh token route")
}

exports.logout = async (req, res, next) =>  {
    res.send("Logout route")
}