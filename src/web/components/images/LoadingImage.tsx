
import React from 'react'
import { Flex, Image, ProgressCircle, View, Text } from '@adobe/react-spectrum'
import { GeneratedImage } from '../../interfaces'

export const LoadingImage = ({ coverUrl, prompt, isLoading }: GeneratedImage) => {

  return (

    <View>
      <View width={'100%'} height={'100%'} paddingTop={'size-400'}>
        {
          isLoading ? (
            <Flex direction={'column'} gap={'size-100'} justifyContent={'center'} alignItems={'center'} >
              <ProgressCircle aria-label="Loading…" isIndeterminate margin={'auto'} />
              <Text>Loading...</Text>
            </Flex>
          ) : (
            <Flex direction={'column'} gap={'size-100'} justifyContent={'center'} alignItems={'center'} >
              <Image src={coverUrl!} alt={prompt} maxHeight={'size-4600'} maxWidth={'size-4600'} />
            </Flex>
          )
        }
      </View>

    </View>
  )
}
