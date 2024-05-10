
import React from 'react'
import { Flex, Image, ProgressCircle, View, Text, Button } from '@adobe/react-spectrum'
import { GeneratedImage } from '../../interfaces'
import { useNavigate } from 'react-router-dom';

export const LoadingImage = ({ href, coverUrl, prompt, isLoading, showEdit }: GeneratedImage & { showEdit?: boolean }) => {

  const navigate = useNavigate();

  const editImage = () => {
    navigate(href);
  }

  return (

    <View>
      <View width={'100%'} height={'100%'} backgroundColor={!coverUrl ? 'gray-200' : 'default'}>
        {
          isLoading ? (
            <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
              <ProgressCircle aria-label="Loading…" isIndeterminate/>
              <Text>Loading...</Text>
            </Flex>
          ) : coverUrl ? (
            <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} >
              <Image src={coverUrl} alt={prompt} maxHeight={'size-3600'} maxWidth={'size-3600'} />
              {
                showEdit ? (
                  <View paddingTop={'size-100'}>
                    <Button variant="accent" onPress={editImage}>Edit Image</Button>
                  </View>

                ) : null
              }
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
