/* 
* <license header>
*/

import React from 'react'
import { Provider, defaultTheme, Grid, View } from '@adobe/react-spectrum'
import { HashRouter as Router } from 'react-router-dom'
import SideBar from './components/SideBar'

import AppRouter from "./router/app-router";
import { ToastContainer } from '@react-spectrum/toast';

function App (_props: Record<any, any>) {

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
            <ToastContainer/>
          </Grid>
        </Provider>
      </Router>
  )
}

export default App
