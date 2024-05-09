
import React from 'react'
import { Heading, View, TextArea, Button, Flex, Text, Grid, NumberField, Form } from '@adobe/react-spectrum'
import { LoadingImage } from '../components/images/LoadingImage';
import { GeneratedImage } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { ToastQueue } from '@react-spectrum/toast';
import { setActionButtonLoading, setGenerationIsValid, setGenerationPrompt } from '../redux/app';

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
      if(!generationPrompt || generationPrompt.length == 0 || !numImages){
        dispatch(setGenerationIsValid(false))
        ToastQueue.negative('Please enter a valid prompt and number of images', {timeout:5000});
        return;
      }

      dispatch(setGenerationIsValid(true))



      
    } catch (error) {
      
    }
    finally{
      //Always clear loading state
      dispatch(setActionButtonLoading(false))
    }

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
