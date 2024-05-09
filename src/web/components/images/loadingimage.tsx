
import React from 'react'
import { Image, View } from '@adobe/react-spectrum'

export interface GeneratedImage {
  href: string,
  coverUrl: string,
  prompt: string
}

export const LoadingImage = ({ coverUrl, prompt }: GeneratedImage) => {

  return (
    
    <View>
      <Image src={coverUrl} alt={prompt} maxHeight={'size-4600'} maxWidth={'size-4600'} />

    </View>
  )
}
