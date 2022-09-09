import { Sequelize, DataTypes, Op } from 'sequelize';


const sequelize = new Sequelize('sqlite:db.sqlite3');
console.log('Hola');

// Define a model(table)
const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  age: DataTypes.SMALLINT
});


// Define a model for Sale
const Sale = sequelize.define('Sale', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  description: DataTypes.TEXT,
  orderDate: DataTypes.DATE,
  orderTotal: DataTypes.INTEGER,
});

// Define a model for product
const Product = sequelize.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  quantity: DataTypes.INTEGER,
  isAvailable: DataTypes.BOOLEAN,
});

// Associations
User.hasMany(Sale); // one-to-many relationship with the foreign key defined in model of sale
Product.hasMany(Sale); // one-to-many relationship with the foreign key defined in model of product

// Venta.belongsTo(User);
// Venta.belongsTo(Product);

// Send the request to create the model
await User.sync(); //top level await
// await User.sync({force: true}); force the creation

await Sale.sync(); //top level await
await Product.sync(); //top level await




// Create an element for user
// User.create({
//   name: 'Ricardo',
//   email: 'richard@gmail.com',
//   age: 20
// });

// Create an element for product
// Product.create({
//   name: 'Phone',
//   price: 13000.20,
//   quantity: 10,
//   isAvailable: true,
//   // description of the product
// });

// Create an element for sale
// Sale.create({
//   description: 'Laptop',
//   orderDate: Date.now(),
//   orderTotal: 20000,
//   UserId: 1,
//   ProductId: 1,
// });



// Get element
const users = await User.findAll();
const user1 = await User.findByPk(1);
const user2 = await User.findByPk(2); // it does not exist

console.log(users); // array [{}]
console.log(user1); // just the user - {}
console.log(user2); // null

const products = await Product.findAll();
console.log(products);
console.log('Total of products => ' + products.length);

const sales = await Sale.findAll();
console.log(sales);


// Get a product with teh proce less than 500
const laptopProduct = await Product.findAll({
  where: {
    price: 20000
  }
});

const cheapProducts = await Product.findAll({
  limit: 5,
  where: {
    price: { [Op.lte]: 500 }
  }
});

const expensiveProducts = await Product.findAll({
  where: {
    price: { [Op.gte]: 500 }
  }
});

const oneCheapProduct = await Product.findOne({
  where: {
    price: { [Op.gte]: 500 }
  }
}); //limit: 1

console.log('Cheap Products ' + cheapProducts);
console.log('Total of cheap products ' + cheapProducts.length);

console.log('Expensive Products ' + expensiveProducts);
console.log('Total of expensive products ' + expensiveProducts.length);

products.forEach(product => {
  console.log(product.name);
  console.log(product.id);
});


const productsSorted = await Product.findAll({
  limit: 6,
  offset: 1, //se salta el primer elemento
  order: [['id', 'DESC']],
  where: {
    price: { [Op.gte]: 500 }
  }
});

console.log(productsSorted);






// ================== UPDATE PRODUCTS ==========================

Product.update(
  {
    name: 'Television',
  },
  {
    where: {
      id: 4
    }
  }
);

// ======================= Delete products ===================
//having a product with id = 4
// const response = Product.destroy(
//   {
//     where: {
//       id: 4
//     }
//   }
// );

// console.log('Products deleted ' + response); //total of elements deleted
