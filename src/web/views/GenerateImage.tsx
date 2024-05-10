
import React from 'react'
import { Heading, View, TextArea, Button, Flex, Grid, NumberField } from '@adobe/react-spectrum'
import { LoadingImage } from '../components/images/LoadingImage';
import { GeneratedImage } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { ToastQueue } from '@react-spectrum/toast';
import { initiateImages, setActionButtonLoading, setGenerationIsValid, setGenerationNumImages, setGenerationPrompt, updateImage } from '../redux/app';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'

export const GenerateImage = () => {

  const dispatch = useAppDispatch();

  //Image redux references
  const generatedImages: GeneratedImage[] = useAppSelector((state: RootState) => state.app.generatedImages);

  //Form fields and actions
  const isLoading = useAppSelector((state: RootState) => state.app.actionButton.isLoading);
  const generationPrompt = useAppSelector((state: RootState) => state.app.generation.prompt);
  const numImages = useAppSelector((state: RootState) => state.app.generation.numImages);
  const isValid = useAppSelector((state: RootState) => state.app.generation.isValid);

  const generateImage = () => {

    try {
      //Set loading state
      dispatch(setActionButtonLoading(true))

      //Validate input fields
      if (!generationPrompt || generationPrompt.length == 0 || !numImages) {
        dispatch(setGenerationIsValid(false))
        ToastQueue.negative('Please enter a valid prompt and number of images', { timeout: 5000 });
        return;
      }

      //Clear previously failed validations
      dispatch(setGenerationIsValid(true))

      //Define new image loaders
      dispatch(initiateImages({numImages, isLoading: true}))

      axios.post(`${import.meta.env.VITE_SYSTEM_API_ENDPOINT}/firefly/generate`, { prompt: generationPrompt, numImages })
        .then((response) => {
          if (!response.data.outputs) {
            console.error(`Response code ${response.status} received from Firefly API with message ${response.statusText}`);
            ToastQueue.negative('Image generation failed, please try again later.', { timeout: 5000 });
            return;
          }

          //Iterate through results and dispatch new images
          (response.data.outputs as { seed: string, image: { id: string, presignedUrl: string } }[]).forEach((output, index) => {

            const generatedImage: GeneratedImage = {
              coverUrl: output.image.presignedUrl,
              prompt: generationPrompt,
              description: `Image generated from Adobe Firefly with prompt '${generationPrompt}' and seed ${output.seed} `,
              isLoading: false,
              href: `/edit/${index}`,
              id: uuidv4()
            }

            dispatch(updateImage({index, image: generatedImage}))
          })
        })
        .catch((error) => {
          console.error(error);
          ToastQueue.negative('Image generation failed, please try again later.', { timeout: 5000 });

          //Reset image loaders
          dispatch(initiateImages({numImages: 4, isLoading: false}))
        })
        .finally(() => {
          //Always clear the loading state
          dispatch(setActionButtonLoading(false))
        })

    } catch (error) {
      console.error(error);
      ToastQueue.negative('Image generation failed, please review your configuration.', { timeout: 5000 });
      dispatch(setActionButtonLoading(false))
    }
  }

  return (
    <View>
      <Heading level={1}>Generate Image</Heading>
      <View width={'100%'} paddingTop={'size-400'}>
        <Flex direction={'column'} width={'100%'} justifyContent={'center'} alignItems={'center'}>

          {/* Image Listing - Could be a component */}
          <Grid
            areas={[
              'image1 image2',
              'image3 image4',
            ]}
            rows={['auto']}
            minHeight={'65vh'}
            width={'80%'}
            gap='size-200'
          >

            {
              generatedImages.map(image => (
                <LoadingImage key={image.id} id={image.id} href={image.href} coverUrl={image.coverUrl} prompt='Prompt Sample' isLoading={image.isLoading} />
              ))
            }

          </Grid>

          <View paddingTop={'size-200'} width={'100%'}>
            <Flex direction={'row'} gap={'size-100'} width={'100%'} wrap justifyContent={'center'}>
              <TextArea label="Image Prompt" width={'60%'} maxWidth="100%" height="size-2000"
                isRequired
                autoFocus={true}
                isDisabled={isLoading}
                validationState={isValid ? 'valid' : 'invalid'}
                onChange={(val) => dispatch(setGenerationPrompt(val))} 
                defaultValue={generationPrompt}
                description="Insert a text prompt to generate new images."
              />
              <Flex direction={'column'} gap={'size-500'}>
                <NumberField label="No. of Images" defaultValue={4} minValue={1} maxValue={4}
                  validationState={isValid ? 'valid' : 'invalid'}
                  onChange={(val) => dispatch(setGenerationNumImages(val))} 
                  isDisabled={isLoading}
                />
                <Button variant="accent" onPress={generateImage} isPending={isLoading}>Generate</Button>
              </Flex>
            </Flex>
          </View>
        </Flex>
      </View>
    </View>
  )
}
