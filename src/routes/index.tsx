import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeRoute from '~/routes/HomeRoute'
import HomeEthersRoute from '~/routes/HomeEthersRoute'

const Routes = () => (
  <>
    <Switch>
      <Route path="/" component={HomeRoute} />
      {/* <Route path="/" component={HomeEthersRoute} /> */}
    </Switch>
  </>
)

export default React.memo(Routes)
