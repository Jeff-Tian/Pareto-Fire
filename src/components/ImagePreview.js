import React from 'react'
import { Image } from 'semantic-ui-react'

export default ({ images, deleteImage }) => <Image.Group size='tiny'>
  {images && images.map(img => <Image key={img.name} src={window.URL.createObjectURL(img)}
                                      label={{
                                        as: 'a',
                                        color: 'transparent',
                                        corner: 'right',
                                        icon: 'remove circle',
                                        onClick: () => deleteImage(img),
                                      }}
  />)}
</Image.Group>