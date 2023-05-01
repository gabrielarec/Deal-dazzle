// import models
const Category = require('./Category');
const Product = require('./Product');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const sequelize = require('../config/connection');

// Categories have many Products
Category.hasMany(Product , {foreignKey:'product_id'})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: 'ProductTag', foreignKey: 'tag_id' });

// Products belongsTo Category
Product.belongsTo(Category, { foreignKey: 'category_id' });


// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: 'ProductTag', foreignKey: 'product_id' });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
