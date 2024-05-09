
import React from 'react'
import { Heading, View, TextArea, Button, Flex, Text, Grid, NumberField } from '@adobe/react-spectrum'
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
    },
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
    <View>
      <Heading level={1}>Generate Image</Heading>

      {/* Image Listing - Could be a component */}
      <View width={'100%'} paddingTop={'size-400'}>

        <Grid
          
          columns={['50%', '50%']}
          rows={['auto']}
          height='65vh'
          gap='size-100'
        >

          {
            images.map(image => (
              //TODO Map props
              <LoadingImage href={image.href} coverUrl={image.coverUrl} prompt='Prompt Sample' />
            ))
          }

        </Grid>

      </View>

      <View >
        <Flex direction={'row'} gap={'size-100'} wrap>
          <Text width={'100%'}>Insert a text prompt to generate new images.</Text>
          <TextArea label="Image Prompt" width={'60%'} maxWidth="100%" height="size-1600" />
          <Flex direction={'column'} gap={'size-500'}>
            <NumberField label="No. of Images" defaultValue={4} minValue={1} maxValue={4} />
            <Button variant="accent" onPress={generateImage}>Generate</Button>
          </Flex>
        </Flex>
      </View>

      
    </View>
  )
}
