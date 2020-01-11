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
  async index () {
    const establishments = Establishment.all()

    return establishments
  }

  /**
   * Create/save a new establishment.
   * POST establishments
   */
  async store ({ request, response }) {}

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
  async update ({ params, request, response }) {}

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