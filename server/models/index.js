const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
    'user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    // role: { type: DataTypes.STRING, defaultValue: 'User' }
    // role: { type: DataTypes.STRING, ref: 'Role' }
})

const Role = sequelize.define(
    'role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.STRING, unique: true, defaultValue: 'User' }
})

const UserRole = sequelize.define(
    'user_role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Cart = sequelize.define(
    'cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const CartItem = sequelize.define(
    'cart_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Item = sequelize.define(
    'item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: '0' },
    img: { type: DataTypes.STRING, allowNull: false }
})

const Type = sequelize.define(
    'type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Brand = sequelize.define(
    'brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Rating = sequelize.define(
    'rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false }
})

const ItemInfo = sequelize.define(
    'item_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false }
})

const TypeBrand = sequelize.define(
    'type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasOne(UserRole)
UserRole.belongsTo(User)

Role.hasOne(UserRole)
UserRole.belongsTo(Role)

User.hasMany(Rating)
Rating.belongsTo(User)

Cart.hasMany(CartItem)
CartItem.belongsTo(Cart)

Type.hasMany(Item)
Item.belongsTo(Type)

Brand.hasMany(Item)
Item.belongsTo(Brand)

Item.hasMany(Rating)
Rating.belongsTo(Item)

Item.hasMany(CartItem)
CartItem.belongsTo(Item)

Item.hasMany(ItemInfo, { as: 'info' })
ItemInfo.belongsTo(Item)

Item.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Item, { through: TypeBrand })

module.exports = {
    User,
    Role,
    UserRole,
    Cart,
    CartItem,
    Item,
    Type,
    Brand,
    Rating,
    ItemInfo,
    TypeBrand
}