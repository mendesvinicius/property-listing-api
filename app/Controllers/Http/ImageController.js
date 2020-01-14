'use strict'

const Image = use('App/Models/Image')
const Establishment = use('App/Models/Establishment')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
    async show ({ params, response }) {
        return response.download(Helpers.tmpPath(`uploads/${params.path}`))
    }
    /**
     * Create/save a new image.
     * Post images
     */
    async store({ params, request }){
      const establishment = await Establishment.findOrFail(params.id)

      const images = request.file('image', {
         types: ['image'],
         size: '2mb' 
      })
    

    await images.moveAll(Helpers.tmpPath('uploads'), file =>({
        name: `${Date.now()}-${file.clientName}`
    }))

    if (!images.movedAll()){
        return images.errors()
    }

    await Promisse.all(
        images
        .movedList()
        .map(image => establishment.images().create({ path: image.fileName}))
    )
  }
}

module.exports = ImageController
