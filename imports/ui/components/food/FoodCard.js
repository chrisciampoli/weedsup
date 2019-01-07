//TODO - propTypes
import {Component} from "react";
import {Meteor} from "meteor/meteor";
import React from "react";
import * as PropTypes from "prop-types";

import AppConfig from "../../constants/AppConfig";

class FoodCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: this.props.favorite ? this.props.favorite : false,
      removed : false
    };
  }

  addFavorite() {
    const {food} = this.props;
    Meteor.call('favorites.insert', {_id: food._id._str}, (error, resp) => {
      if (error) return;
      console.log('food inserted', food);
      this.setState({removed: false, favorite: true});
      this.props.onAddFavorite && this.props.onAddFavorite(food);
    })
  }

  removeFavorite() {
    const {food} = this.props;
    Meteor.call('favorites.remove', {_id: food._id._str}, (error, resp) => {
      if (error) return;
      console.log('food removed', food);
      this.setState({removed: true, favorite: false});
    })
  }

  render() {
    const addFav = !this.state.favorite ?
      <a onClick={this.addFavorite.bind(this)} className="btn btn-primary">+ Favorites</a> : <span/>;

      if (this.state.removed && this.props.view === 'favorites') {
        return null;
      }

    return <div className="card" key={this.props.food._id._str} style={{marginBottom: "1rem"}}>
      <img className="card-img-top" src={`${AppConfig.ASSET_URL}images/${this.props.food.image}`}
           alt={this.props.food.name}/>
      <div className="card-body">
        <h5 className="card-title">{this.props.food.name} - {this.props.food.companyName}</h5>
        <p className="card-text">{this.props.food.ingredients}</p>
        <div className="d-flex justify-content-between">
          {addFav}
          {this.state.favorite && !this.state.removed ? <a onClick={this.removeFavorite.bind(this)} className="btn btn-primary">- Favorite</a>  : null}
          <a href={`tel:${this.props.food.phone}`} className="btn btn-primary"><i className="fas fa-phone-volume"/></a>
        </div>
      </div>
    </div>;
  }
}

FoodCard.propTypes = {
  food: PropTypes.any,
  onClick: PropTypes.func,
  onAddFavorite: PropTypes.func
};

export default FoodCard;
