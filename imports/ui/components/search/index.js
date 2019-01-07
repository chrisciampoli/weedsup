import React, {Component, Fragment} from 'react';
import {Meteor} from "meteor/meteor";
import {withTracker} from 'meteor/react-meteor-data';
import Waypoint from 'react-waypoint';

import AppConfig from "../../constants/AppConfig";
import FoodCard from '../food/FoodCard';

const ITEMS_PER_PAGE = 10;

if (Meteor.isClient) {
  Meteor.startup(function () {
    // GoogleMaps.load({
    //   key: AppConfig.GOOGLE_MAPS_KEY,
    //   libraries: 'geometry'
    // });
  });
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      food: [],
      favorites: [],
      foodCount: 0,
      pageOffset: 0
    };
  }

  componentWillMount() {

    try {
      //only returned location once now returns null
      let location = Geolocation.currentLocation();
      if (!location) {
        navigator.geolocation.getCurrentPosition(this.onLocationLoaded);
      } else {
        this.onLocationLoaded(location);
      }
    } catch (ex) {
      console.log('Location Exception', ex);
    }
  }

  onLocationLoaded = (location) => {
    this.setState({location: location.coords});
  }

  onFoodSearchChange = (e) => {
    this.setState({term: e.target.value, pageOffset: 0, food: []});
    this.buildSearchQueryAndSearch(e.target.value, 0);
  }

  onWaypointEnter() {
    const {food, foodCount, term} = this.state;
    if (food.length < foodCount) {
      this.setState((prevState) => {
        const newOffset = ++(prevState.pageOffset);
        this.buildSearchQueryAndSearch(term, newOffset);

        return {
          pageOffset: newOffset
        }
      });
    }
  }

  buildSearchQueryAndSearch(term, offset) {
    if (!term.trim()) return;
    const query = {
      name: {
        $regex: term.trim(),
        $options: 'i'
      }
    };
    const options = {
      limit: ITEMS_PER_PAGE,
      skip: offset * ITEMS_PER_PAGE
    };
    this.search(query, options)
  }

  search = (query, options) => {
    //meteor does not like the spread operator when trying to send up coords so a little more verbose
    let location = this.state.location ? {
      latitude: this.state.location.latitude,
      longitude: this.state.location.longitude
    } : undefined;

    Meteor.call('food.search', {query, location, options}, (error, resp) => {
      console.log('location', this.state.location);
      if (error) return;
      this.setState((prevState) => {
        //TODO - server not setting offset
        return ({
          food: [...prevState.food, ...resp.food],
          foodCount: resp.count
        })
      })
    })
  };

  onAddFavorite(food) {
    let favorites = this.state.favorites;
    favorites.push(food._id._str);

    this.setState(favorites);
  }

  render() {
    let loadMore;
    const {food, foodCount} = this.state;
    //TODO - waypoint is still jacked, maybe just ubuntu
    if (foodCount > food.length) {
      loadMore = <Waypoint topOffset={-100} onEnter={() => this.onWaypointEnter()}/>
    } else {
      loadMore = <div className="text-center">
        {food.length ? "No More Results" : "Loading"}
      </div>
    }

    return (
      <Fragment>
        <div className="container">
          <div className="form-group">
            <input
              type="text"
              placeholder="Search for food"
              className="form-control"
              value={this.state.term}
              onChange={this.onFoodSearchChange}
            />
          </div>
          {this.state.food.map(food => {
            return (
              <FoodCard key={food._id._str}
                        food={food}
                        showAddFavorite={!!Meteor.user() && this.state.favorites.indexOf(food._id._str) === -1}
                        onAddFavorite={this.onAddFavorite.bind(this)}
                        favorite={this.state.favorites.indexOf(food._id._str) > -1}
              />
            );
          })}
        </div>
        {loadMore}
      </Fragment>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('food');
  return {};
})(Search);
