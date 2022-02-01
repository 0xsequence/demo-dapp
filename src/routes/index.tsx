import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeRoute from '~/routes/HomeRoute'

const Routes = () => (
  <>
    <Switch>
      <Route path="/" component={HomeRoute} />
    </Switch>
  </>
)

export default React.memo(Routes)
