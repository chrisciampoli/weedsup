import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const FoodAPI = new Mongo.Collection('FoodItem');

if (Meteor.isServer) {
  Meteor.methods({
    'food.search'({query, location, options}) {
      GLOBAL.user = Meteor.users.findOne(this.userId);

      let searchQuery;
      if (location) {
        searchQuery = {
          location: {
            $nearSphere: {
              $geometry: {
                type: "Point",
                coordinates: [location.latitude, location.longitude]
              },
              $minDistance: 0,
              $maxDistance: 30 * 1100
            }
          },
          $and: {
            ...query
          }
        };
      } else {
        searchQuery = query
      }
      console.log("Total Results: ", FoodAPI.find(query, options).fetch().length, FoodAPI.find(query).count());
      return {
        food: FoodAPI.find(query, options).fetch(),
        count: FoodAPI.find(query).count()
      }
    }
  });
}


