const jwt = require('jsonwebtoken')
const axios = require('axios')

const URL_PROVIDERS = {
    'facebook'  :   'https://graph.facebook.com/me',
    'google'    :   'https://www.googleapis.com/oauth2/v1/tokeninfo'
};

const login = (req, res, next) => {
    const id = req.body.id || ''
    const email = req.body.email || ''
    const outToken = req.body.outToken || ''
    const provider = req.body.provider || ''

    axios.post(`${URL_PROVIDERS[provider]}?access_token=${outToken}`)
        .then(response => {
            if (response.data.success || !response.data.error) {
                const user = {id: id, email: email};
                const token = jwt.sign(user, process.env.REACT_APP_authSecret, {
                    expiresIn: "1 day"
                });
    
                res.json({ token })
            } else {
                res.status(400).send({ errors: ['error validating access_token'] })
            }
        })
        .catch(err => {
            return res.status(400).send({ errors: [err.response.data.error.message] })
        });
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''

    jwt.verify(token, process.env.REACT_APP_authSecret, function (err, decoded) {
        return res.status(200).send({ valid: !err })
    })
}

module.exports = { login, validateToken }