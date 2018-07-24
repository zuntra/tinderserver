/* eslint max-len: [2, 100, 2] */

import Status from './handlers/status'
import NotFound from './handlers/notFound'

exports.register = (plugin, options, next) => {
  plugin.route([
    { method: 'GET', path: '/status', config: Status },
    { method: 'GET', path: '/{path*}', config: NotFound },
  ])
}
exports.name = 'api'
