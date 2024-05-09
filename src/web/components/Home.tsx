
const actions = [
  {
    title: 'Generate Image',
    description: 'Generate an image from a text prompt',
    href: '/generate',
    coverUrl: 'https://developer.adobe.com/firefly-services/static/ed3e4e7b5490078d2ca538b4e67a0870/96755/UseCase4_new.webp'
  }
]

import React from 'react'
import { Heading, View } from '@adobe/react-spectrum'
import ActionCard from './cards/actioncard'

export const Home = () => (
  <View width='size-6000'>
    <Heading level={1}>Welcome to Firefly Services</Heading>

    {/* Show all action cards */}
    {
      actions.map(action => (
        <ActionCard title={action.title} description={action.description} href={action.href} coverUrl={action.coverUrl} />
      ))
    }
  </View>
)
