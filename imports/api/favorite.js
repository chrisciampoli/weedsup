import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

import {FoodAPI} from './food';

export const FavoritesAPI = new Mongo.Collection('Favorites');
//TODO - auth middleware, auth middleware
if (Meteor.isServer) {
  Meteor.methods({
    'favorites.load'() {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      const query = {userId: this.userId};
      const favorites = FavoritesAPI.find(query).fetch();
      console.log('user favorites', favorites)
      return {
        favorites: FoodAPI.find({_id: {$in: favorites.map(fav => fav._id)}}, {sort: {createdAt: -1}}).fetch(),
        count: FavoritesAPI.find(query).count()
      }
    },
    'favorites.insert'({_id}) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      check(_id, String);
      const id = new Mongo.ObjectID(_id);
      const query = {_id: id, userId: this.userId};
      if (!FoodAPI.find(query).fetch().length) {
        FavoritesAPI.insert({
          ...query,
          createdAt: new Date()
        });
      }
    },
    'favorites.remove'(id) {
      check(id._id, String);
      const mongoId  = new Mongo.ObjectID(id._id);
      const favorite = FavoritesAPI.findOne({_id: mongoId});

      if (favorite.userId !== this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      FavoritesAPI.remove({_id: mongoId});
    },
  });
}

