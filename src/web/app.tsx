/* 
* <license header>
*/

import React from 'react'
import { Provider, defaultTheme, Grid, View } from '@adobe/react-spectrum'
import { HashRouter as Router } from 'react-router-dom'
import SideBar from './components/SideBar'

import AppRouter from "./router/app-router";

function App (props: Record<any, any>) {

  return (
      <Router>
        <Provider theme={defaultTheme} colorScheme={'light'}>
          <Grid
            areas={['sidebar content']}
            columns={['256px', '3fr']}
            rows={['auto']}
            minHeight={'100vh'}
            gap='size-100'
          >
            <View
              gridArea='sidebar'
              backgroundColor='gray-200'
              padding='size-200'
            >
              <SideBar></SideBar>
            </View>
            <View gridArea='content' padding='size-200' width={'100%'}>
              <AppRouter />
            </View>
          </Grid>
        </Provider>
      </Router>
  )
}

export default App
