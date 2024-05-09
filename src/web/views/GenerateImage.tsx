
import React from 'react'
import { Heading, View, TextArea, Button } from '@adobe/react-spectrum'
import { GeneratedImage, LoadingImage } from '../components/images/LoadingImage';

export const GenerateImage = () => {

  const images: GeneratedImage[] = [
    {
      href: '/edit',
      coverUrl: 'https://developer.adobe.com/firefly-services/static/ed3e4e7b5490078d2ca538b4e67a0870/96755/UseCase4_new.webp',
      prompt: 'Prompt Sample'
    },
    {
      href: '/edit',
      coverUrl: 'https://developer.adobe.com/firefly-services/static/ed3e4e7b5490078d2ca538b4e67a0870/96755/UseCase4_new.webp',
      prompt: 'Prompt Sample'
    }
  ];

  const generateImage = () => {
    console.log("Generate Image")
  }

  return (
    <View width='size-6000'>
      <Heading level={1}>Generate Image</Heading>

      {
      images.map(image => (
        //TODO Map props
        <LoadingImage href={image.href} coverUrl={image.coverUrl} prompt='Prompt Sample' />
      ))
    }

      <TextArea label="Image Prompt" width="size-6000" maxWidth="100%" />
      <Button variant="accent" onPress={generateImage}>Generate</Button>
    </View>
  )
}
