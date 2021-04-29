import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/HomeView/Home/Home';
import Account from './Components/Account/Account';
import BucketList from './Components/BucketList/BucketList';
import AllTrips from './Components/AllTrips/AllTrips';
import SearchPage from './Components/SearchPage/SearchPage';
import SingleTrip from './Components/SingleTrip/SingleTrip';

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/account/:id" component={Account} />
    <Route path="/bucketlist/:id" component={BucketList} />
    <Route path="/all-trips/:id" component={AllTrips} />
    <Route path="/search-page" component={SearchPage} />
    <Route path="/single-trip/:id" component={SingleTrip} />
  </Switch>
)