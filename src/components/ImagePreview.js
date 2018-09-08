import React from 'react'
import { Image } from 'semantic-ui-react'

export default ({ images, deleteImage }) => <Image.Group size='tiny'>
  {images && images.map(img => <Image key={img.name || img.filename} src={img.url || window.URL.createObjectURL(img)}
                                      label={deleteImage ? {
                                        as: 'a',
                                        corner: 'right',
                                        icon: 'remove circle',
                                        onClick: () => deleteImage(img),
                                      } : null}
  />)}
</Image.Group>