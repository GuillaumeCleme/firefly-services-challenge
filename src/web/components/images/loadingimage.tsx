
import React from 'react'
import { Image, View } from '@adobe/react-spectrum'

export interface GeneratedImage {
  href: string,
  coverUrl: string,
  prompt: string
}

export const LoadingImage = ({ coverUrl, prompt }: GeneratedImage) => {

  return (
    <View width='size-6000'>
      <Image src={coverUrl} alt={prompt}  />

    </View>
  )
}
