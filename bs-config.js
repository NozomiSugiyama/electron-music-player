const historyApiFallback = require('connect-history-api-fallback')

module.exports = {
    middleware: [historyApiFallback()],
    server: ["build"],
    snippetOptions: {
        rule: {
            fn: (_, match) => match
        }
    },
    ui: false
}
