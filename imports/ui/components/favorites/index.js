import React, {Component} from 'react';
import {Meteor} from "meteor/meteor";
import {withTracker} from 'meteor/react-meteor-data';
import {FavoritesStore} from '../../../api/favorite';
import FoodCard from "../food/FoodCard";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      isLoading: true,
      error: false
    }
  }

  componentWillMount() {
    Meteor.call('favorites.load', undefined, (error, resp) => {
      if (error) return;
      this.setState((prevState) => {
        return {
          favorites: resp.favorites
        }
      })
    })
  }

  render() {
    return (
      <div>
        <h2>Favorites</h2>
        {this.state.favorites.map(food => {
          return (
            <FoodCard view={'favorites'} key={food._id._str} food={food} favorite={true} showAddFavorite={false} onAddFavorite={this.onAddFavorite}/>
          );
        })}
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    // favorites: FavoritesStore.find({}).fetch(),
    // currentUser: Meteor.user(),
  };
})(Favorites);
