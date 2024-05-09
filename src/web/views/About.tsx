/* 
* <license header>
*/

import React from 'react'
import { Heading, View, Content, Link } from '@adobe/react-spectrum'
export const About = () => (
  <View width="size-6000">
    <Heading level={1}>Useful documentation for your app</Heading>
    <Content>
      <ul style={{ listStyle: 'none' }}>
        <li>
          <Link>
            <a href='https://developer.adobe.com/firefly-services/' target='_blank'>
              Adobe Firefly Services
            </a>
          </Link>
        </li>
        <li>
          <Link>
            <a href='https://react-spectrum.adobe.com/react-spectrum/index.html' target='_blank'>
              React Spectrum
            </a>
          </Link>
        </li>
      </ul>
    </Content>
  </View>
)
