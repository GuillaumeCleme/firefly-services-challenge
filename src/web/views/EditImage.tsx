
import React from 'react'
import { Flex, Heading, View, Slider } from '@adobe/react-spectrum'
import { useParams } from 'react-router-dom'
import { GeneratedImage } from '../interfaces';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { LoadingImage } from '../components/images/LoadingImage';

export const EditImage = () => {

  //Get the image ID from the URL param
  //TODO We currently use an index, but a map reduce would allow an ID lookup
  const imageId = parseInt(useParams().id ?? '');

  //Image redux references
  const generatedImages: GeneratedImage[] = useAppSelector((state: RootState) => state.app.generatedImages);

  return (
    <View>
      <Heading level={1}>Edit Image</Heading>
      <Flex justifyContent={'center'} width={'100%'}>
        <View width={'70%'} paddingTop={'size-400'}>
          <Flex direction={'row'} width={'100%'} justifyContent={'center'} alignItems={'center'}>

            <View width={'50%'}>
              <Heading level={2}>Image Controls</Heading>
              <Flex direction="column" maxWidth="size-3000" gap="size-300">
                {/* Sliders are set to match API definitions: https://developer.adobe.com/firefly-services/docs/lightroom/api/lightroom_edits/  */}
                <Slider
                  label="Exposure"
                  step={1}
                  minValue={-5}
                  maxValue={5}
                  defaultValue={0}
                />
                <Slider
                  label="Saturation"
                  step={10}
                  minValue={-100}
                  maxValue={100}
                  defaultValue={0}
                />
                <Slider
                  label="Contrast"
                  step={10}
                  minValue={-100}
                  maxValue={100}
                  defaultValue={0}
                />
              </Flex>
            </View>

            <View width={'50%'} height={'50vh'} backgroundColor={!generatedImages[imageId].coverUrl ? 'gray-200' : 'default'}>
              <Flex direction={'column'} justifyContent={'center'} alignContent={'center'} height={'100%'}>
                <LoadingImage
                  key={generatedImages[imageId].id}
                  id={generatedImages[imageId].id}
                  href={generatedImages[imageId].href}
                  coverUrl={generatedImages[imageId].coverUrl}
                  prompt={generatedImages[imageId].prompt}
                  isLoading={generatedImages[imageId].isLoading}
                />
              </Flex>
            </View>
          </Flex>
        </View>
      </Flex>
    </View>
  )
}
