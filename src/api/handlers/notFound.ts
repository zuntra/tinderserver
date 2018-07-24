import Boom from 'boom'

export default {
  description: 'The catch-all 404 endpoint',
  tags: ['private'],
  auth: false,
  handler(request, h) {
    throw Boom.notFound('Endpoint does not exist')
  },
}
