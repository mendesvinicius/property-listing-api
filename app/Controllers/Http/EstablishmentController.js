'use strict'

const Establishment = use('App/Models/Establishment')

/**
 * Resourceful controller for interacting with establishments
 */
class EstablishmentController {
  /**
   * Show a list of all establishments.
   * GET establishments
   */
  async index ({ request }) {
    const { latitude, longitude } = request.all()

    const establishments = Establishment.query()
    .with('images')
    .nearBy(latitude, longitude, 10)
    .fetch()
    
    return establishments
  }

  /**
   * Create/save a new establishment.
   * POST establishments
   */
  async store ({ request, response }) {
    const { id } = auth.user
    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude'
    ])

    const establishment = await Establishment.create({...data, user_id: id})

    return establishment

  }
     
  /**
   * Display a single establishment.
   * GET establishments/:id
   */
  async show ({ params }) {
    const establishment = await Establishment.findOrFail(params.id)

    await establishment.load('images')

    return establishment
  }

  /**
   * Update establishment details.
   * PUT or PATCH establishments/:id
   */
  async update ({ params, request, response }) {
    const establishment = await Establishment.findOrFail(params.id)

    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude'
    ])

    establishment.merge(data)

    await establishment.save()

    return establishment
  }

  /**
   * Delete a establishment with id.
   * DELETE establishments/:id
   */
  async destroy ({ params, auth, response }) {
    const establishments = await Establishments.findOrFail(params.id)

    if (establishments.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await establishments.delete()
  }
}

module.exports = EstablishmentController
