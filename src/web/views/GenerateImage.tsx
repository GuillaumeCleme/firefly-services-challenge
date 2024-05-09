
import React from 'react'
import { Heading, View, TextArea, Button, Flex, Grid, NumberField } from '@adobe/react-spectrum'
import { LoadingImage } from '../components/images/LoadingImage';
import { GeneratedImage } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { ToastQueue } from '@react-spectrum/toast';
import { setActionButtonLoading, setGenerationIsValid, setGenerationPrompt, updateImage } from '../redux/app';
import axios from 'axios';

export const GenerateImage = () => {

  const dispatch = useAppDispatch();

  //Image redux references
  const generatedImages: GeneratedImage[] = useAppSelector((state: RootState) => state.app.generatedImages);
  const defaultImageUrl = 'https://placehold.co/600x400?text=Get started with a text prompt';

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

      axios.post(`${import.meta.env.VITE_SYSTEM_API_ENDPOINT}/firefly/generate`, { prompt: generationPrompt, numImages })
        .then((response) => {

          if(!response.data.outputs){
            console.error(`Response code ${response.status} received from Firefly API with message ${response.statusText}`);
            ToastQueue.negative('Image generation failed, please try again later.', { timeout: 5000 });
            return;
          }
          (response.data.outputs as { seed: string, image: { id: string, presignedUrl: string}}[]).forEach((output, index) => {
            dispatch(updateImage({index, image: {
              coverUrl: output.image.presignedUrl,
              description: `Image generated from Adobe Firefly with prompt '${generationPrompt}' and seed ${output.seed} `,
              title: generationPrompt,
              isLoading: false,
            }}))
          })
        })
        .catch((error) => {
          console.error(error);
          ToastQueue.negative('Image generation failed, please try again later.', { timeout: 5000 });
        })

    } catch (error) {
      console.error(error);
      ToastQueue.negative('Image generation failed, please review your configuration.', { timeout: 5000 });
    }
    finally {
      //Always clear loading state
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

            columns={['50%', '50%']}
            rows={['auto']}
            height='65vh'
            width={'100%'}
            gap='size-100'
          >

            {
              generatedImages.map(image => (
                //TODO Map props
                <LoadingImage key={image.id} id={image.id} href={image.href} coverUrl={image.coverUrl || defaultImageUrl} prompt='Prompt Sample' isLoading={image.isLoading} />
              ))
            }

          </Grid>



          <Flex direction={'row'} gap={'size-100'} width={'100%'} wrap justifyContent={'center'}>
            <TextArea label="Image Prompt" width={'60%'} maxWidth="100%" height="size-2000"
              isRequired
              autoFocus={true}
              isDisabled={isLoading}
              validationState={isValid ? 'valid' : 'invalid'}
              onChange={(val) => dispatch(setGenerationPrompt(val))} defaultValue={generationPrompt}
              description="Insert a text prompt to generate new images."
            />
            <Flex direction={'column'} gap={'size-500'}>
              <NumberField label="No. of Images" defaultValue={4} minValue={1} maxValue={4}
                validationState={isValid ? 'valid' : 'invalid'}
                isDisabled={isLoading}
              />
              <Button variant="accent" onPress={generateImage} isPending={isLoading}>Generate</Button>
            </Flex>
          </Flex>

        </Flex>

      </View>


    </View>
  )
}
