import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../components/Home/Home'

import { ClientRoutes } from '../config/enums'

const RestaurantMenuPage: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.HOME}>
      <Home />
    </Route>
  )
}

export default RestaurantMenuPage
