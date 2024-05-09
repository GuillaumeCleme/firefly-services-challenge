import React from 'react'
import { Heading, View } from '@adobe/react-spectrum'
import ActionCard from '../components/cards/ActionCard'
import { ActionListing } from '../interfaces'
import { useAppSelector } from '../redux/hooks'
import { RootState } from '../redux/store'

export const Home = () => {

  const actions: ActionListing[] = useAppSelector((state: RootState) => state.app.actions);

  return (
    <View width='size-6000'>
      <Heading level={1}>Welcome to Firefly Services</Heading>

      {/* Show all action cards */}
      {
        actions.map(action => (
          <ActionCard key={action.title} title={action.title} description={action.description} href={action.href} coverUrl={action.coverUrl} />
        ))
      }
    </View>
  )
}
