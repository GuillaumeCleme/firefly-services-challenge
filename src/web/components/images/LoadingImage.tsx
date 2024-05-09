
import React from 'react'
import { Flex, Image, ProgressCircle, View, Text } from '@adobe/react-spectrum'
import { GeneratedImage } from '../../interfaces'

export const LoadingImage = ({ coverUrl, prompt, isLoading }: GeneratedImage) => {

  return (

    <View>
      <View width={'100%'} height={'100%'} backgroundColor={isLoading ? 'gray-200' : 'default'}>
        {
          isLoading ? (
            <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
              <ProgressCircle aria-label="Loading…" isIndeterminate/>
              <Text>Loading...</Text>
            </Flex>
          ) : coverUrl ? (
            <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} >
              <Image src={coverUrl} alt={prompt} maxHeight={'size-3600'} maxWidth={'size-3600'} />
            </Flex>
          ) : (
            <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
              <Text>Generate an image to get started.</Text>
            </Flex>
          )
        }
      </View>

    </View>
  )
}
