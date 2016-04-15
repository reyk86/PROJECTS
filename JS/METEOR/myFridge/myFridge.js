Products = new Mongo.Collection('products');

if (Meteor.isClient) {

    Template.fridge.helpers({
    products : function(){
      return Products.find({
          place: 'fridge'
      });
    }
  });

    // Declaring fridge as a droppable target and updating the product location
    Template.fridge.onRendered(function(){
        var templateInstance = this;

        templateInstance.$('#fridge').droppable({
            drop: function(evt, ui){
                var query ={ _id: ui.draggable.data('id')}; // Get the database ID from the HTML attribute data-id
                var changes = { $set: {place: 'fridge'}}; // Set the update statement to set place to fridge
                Products.update(query,changes); // Perform the database upsate
            }
        });
    });



    Template.productList.helpers({
        products : function(){
            return Products.find({
                place: 'supermarket'
            });
        }
    });

    // Declaring productList as a droppable target
    Template.productList.onRendered(function() {
       var templateInstance = this;

        templateInstance.$('#supermarket').droppable({
           drop: function(evt, ui){
               var query = {_id: ui.draggable.data('id')};
               var changes = {$set: {place: 'supermarket'}};
               Products.update(query,changes);
           }
        });
    });

    // declaring productListItem as a draggable item
    Template.productListItem.onRendered(function () {
        var templateInstance = this;

        templateInstance.$('.draggable').draggable({
            cursor: 'move',
            helper: 'clone'
        });
    });

}

if (Meteor.isServer) {

    Meteor.startup(function (){

        Products.remove({});

        //fill the database with some products
        Products.insert({
            name: 'Milk',
            img: '/milk.png',
            place:'fridge'
        });

        Products.insert({
            name: 'Bread',
            img: '/bread.png',
            place: 'supermarket'
        });

        Products.insert({
            name: 'Juice',
            img: '/juice.png',
            place: 'supermarket'
        });

        Products.insert({
            name: 'Banana',
            img: '/banana.png',
            place: 'supermarket'
        });
    });
}
