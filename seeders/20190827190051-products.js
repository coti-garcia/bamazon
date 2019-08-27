'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      let date = new Date();
      return queryInterface.bulkInsert('Products', [
        {
          product_name: 'Becoming',
          department_name: 'Books',
          price: 18.95,
          stock_quantity: 100,
          createdAt: date,
          updatedAt: date
        },
        {
          product_name: 'Romba',
          department_name: 'Home',
          price: 199.99,
          stock_quantity: 0,
          createdAt: date,
          updatedAt: date
        },
        {
          product_name: 'Dyson',
          department_name: 'Home',
          price: 399.99,
          stock_quantity: 50,
          createdAt: date,
          updatedAt: date
        },
        {
          product_name: 'Apple USB-C',
          department_name: 'Electronics',
          price: 50.00,
          stock_quantity: 10,
          createdAt: date,
          updatedAt: date
        },
        {
          product_name: 'Magic Mouse',
          department_name: 'Electronics',
          price: 59.99,
          stock_quantity: 50,
          createdAt: date,
          updatedAt: date
        },
        {
          product_name: 'Kitchen Towels',
          department_name: 'Kitchen',
          price: 9.99,
          stock_quantity: 20,
          createdAt: date,
          updatedAt: date
        },
        {
          product_name: 'Oven Bakeware Baking Set',
          department_name: 'Kitchen',
          price: 18.50,
          stock_quantity: 32,
          createdAt: date,
          updatedAt: date
        },
        {
          product_name: '8-Pieces Non Stick Kitchen Cookware',
          department_name: 'Kitchen',
          price: 79.99,
          stock_quantity: 0,
          createdAt: date,
          updatedAt: date
        },
        {
          product_name: 'Silicone Cooking Utensiles',
          department_name: 'Kitchen',
          price: 28.99,
          stock_quantity: 20,
          createdAt: date,
          updatedAt: date
        },
        {
          product_name: 'Wook Spatula',
          department_name: 'Kitchen',
          price: 8.99,
          stock_quantity: 10,
          createdAt: date,
          updatedAt: date
        }
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
