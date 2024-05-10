
import React, { useState } from 'react'
import { Flex, Heading, View, Slider } from '@adobe/react-spectrum'
import { useParams } from 'react-router-dom'
import { GeneratedImage } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { LoadingImage } from '../components/images/LoadingImage';
import { setActionButtonLoading, updateImage } from '../redux/app';
import axios from 'axios';
import { EditOptions } from '../../server/interfaces';
import { ToastQueue } from '@react-spectrum/toast';

export const EditImage = () => {

  //Get the image ID from the URL param
  //TODO We currently use an index, but a map reduce would allow an ID lookup
  const imageId = parseInt(useParams().id ?? '');

  const dispatch = useAppDispatch();

  //Setup local state values
  const [exposure, setExposure] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);


  //Image redux references
  const generatedImages: GeneratedImage[] = useAppSelector((state: RootState) => state.app.generatedImages);

  const editImage = () => {
    try {
      //Set loading state
      dispatch(setActionButtonLoading(true))


      //Define new image loaders
      dispatch(updateImage({index: imageId, image: {isLoading: true}}))

      axios.post(`${import.meta.env.VITE_SYSTEM_API_ENDPOINT}/lightroom/edit`, { 
        href: generatedImages[imageId].coverUrl, 
        exposure,
        contrast,
        saturation 
      } as EditOptions)
        .then((response) => {
          if (!response.data.outputs) {
            console.error(`Response code ${response.status} received from LightRoom API with message ${response.statusText}`);
            ToastQueue.negative('Image editing failed, please try again later.', { timeout: 5000 });
            return;
          }

          //Extract edited image link (with an on-the-fly interface)
          const editedImageHref = (response.data.outputs as { 
            input: string, 
            status: string, 
            _links: { 
              self: { 
                href: string, 
                storage: string
              }
            } 
          }[])[0]._links.self.href
     
          const fileName = editedImageHref.split('=')[1];

          dispatch(updateImage({index: imageId, 
            image: {
              coverUrl: `${import.meta.env.VITE_SYSTEM_API_ENDPOINT}/storage/get?fileName=${fileName}`
            }
          }))
          
        })
        .catch((error) => {
          console.error(error);
          ToastQueue.negative('Image editing failed, please try again later.', { timeout: 5000 });

          //Reset image loader
          dispatch(updateImage({index: imageId, image: {isLoading: false}}))
        })
        .finally(() => {
          //Always clear the loading state
          dispatch(setActionButtonLoading(false))
        })

    } catch (error) {
      console.error(error);
      ToastQueue.negative('Image editing failed, please review your configuration.', { timeout: 5000 });
      dispatch(setActionButtonLoading(false))
    }
  }

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
                  onChange={(val) => setExposure(val)}
                  onChangeEnd={editImage} 
                />
                <Slider
                  label="Saturation"
                  step={10}
                  minValue={-100}
                  maxValue={100}
                  defaultValue={0}
                  onChange={(val) => setSaturation(val)}
                  onChangeEnd={editImage} 
                />
                <Slider
                  label="Contrast"
                  step={10}
                  minValue={-100}
                  maxValue={100}
                  defaultValue={0}
                  onChange={(val) => setContrast(val)}
                  onChangeEnd={editImage}  
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
                  showDownload={true}
                />
              </Flex>
            </View>
          </Flex>
        </View>
      </Flex>
    </View>
  )
}
