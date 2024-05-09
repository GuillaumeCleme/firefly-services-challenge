
import React from 'react'
import { Heading, View, TextArea, Button, Flex, Text, Grid, NumberField } from '@adobe/react-spectrum'
import { GeneratedImage, LoadingImage } from '../components/images/LoadingImage';

export const GenerateImage = () => {

  const images: GeneratedImage[] = [
    {
      href: '/edit',
      coverUrl: 'https://placehold.co/600x400?text=Loading',
      prompt: 'Prompt Sample',
      isLoading: true
    },
    {
      href: '/edit',
      coverUrl: 'https://placehold.co/600x400?text=Loading',
      prompt: 'Prompt Sample',
      isLoading: true
    },
    {
      href: '/edit',
      coverUrl: 'https://placehold.co/600x400?text=Loading',
      prompt: 'Prompt Sample'
    },
    {
      href: '/edit',
      coverUrl: 'https://placehold.co/600x400?text=Loading',
      prompt: 'Prompt Sample'
    }
  ];

  const generateImage = () => {
    console.log("Generate Image")
  }

  return (
    <View>
      <Heading level={1}>Generate Image</Heading>

      
      <View width={'100%'} paddingTop={'size-400'}>

        <Flex direction={'column'} width={'100%'} justifyContent={'center'} alignItems={'center'}>

        {/* Image Listing - Could be a component */}
        <Grid
          
          columns={['50%', '50%']}
          rows={['auto']}
          height='65vh'
          width={'100%'}
          gap='size-100'
        >

          {
            images.map(image => (
              //TODO Map props
              <LoadingImage href={image.href} coverUrl={image.coverUrl} prompt='Prompt Sample' isLoading={image.isLoading} />
            ))
          }

        </Grid>

      

        <Flex direction={'row'} gap={'size-100'} width={'100%'} wrap justifyContent={'center'}>
          <TextArea label="Image Prompt" width={'60%'} maxWidth="100%" height="size-2000" description="Insert a text prompt to generate new images."/>
          <Flex direction={'column'} gap={'size-500'}>
            <NumberField label="No. of Images" defaultValue={4} minValue={1} maxValue={4} />
            <Button variant="accent" onPress={generateImage}>Generate</Button>
          </Flex>
        </Flex>

        </Flex>

        </View>

      
    </View>
  )
}
