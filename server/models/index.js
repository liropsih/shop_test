const sequelize = require('@@/database')
const { DataTypes } = require('sequelize')
const moment = require('moment')

const User = sequelize.define(
    'user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    patronymic: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    birthdate: {
        type: DataTypes.DATEONLY,
        get() {
            const date = this.getDataValue('birthdate')
            if (date) {
                return moment(date).format('DD.MM.YYYY')
            } else {
                return date
            }
        },
        set(value) {
            const date = moment(value, 'DD.MM.YYYY')
            this.setDataValue('birthdate', date)
        }
    }
})

const Role = sequelize.define(
    'role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.STRING, unique: true, allowNull: false }
},
    { timestamps: false }
)

const UserRole = sequelize.define(
    'user_role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Request = sequelize.define(
    'request', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    value: { type: DataTypes.STRING, unique: true, allowNull: false }
},
    { timestamps: false })

const RequestRole = sequelize.define(
    'request_role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
},
    { timestamps: false })

const Cart = sequelize.define(
    'cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const CartItem = sequelize.define(
    'cart_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count: { type: DataTypes.INTEGER }
})

const Order = sequelize.define(
    'order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const OrderItem = sequelize.define(
    'order_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Item = sequelize.define(
    'item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    oldPrice: { type: DataTypes.INTEGER },
    sale: { type: DataTypes.BOOLEAN, defaultValue: 'false' },
    sale_tag: { type: DataTypes.STRING, defaultValue: 'SALE', allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: '0' },
    img: { type: DataTypes.STRING, allowNull: false },
    count: { type: DataTypes.INTEGER }
})

const Cat = sequelize.define(
    'cat', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    parentId: { type: DataTypes.INTEGER }
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

const ItemBrand = sequelize.define(
    'cat_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Item, { through: CartItem })
Item.belongsToMany(Cart, { through: CartItem })

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Item, { through: OrderItem })
Item.belongsToMany(Order, { through: OrderItem })

User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })

Request.belongsToMany(Role, { through: RequestRole })
Role.belongsToMany(Request, { through: RequestRole })

User.hasMany(Rating)
Rating.belongsTo(User)

Cat.hasMany(Cat, {
    onDelete: 'cascade',
    foreignKey: 'parentId',
    as: 'children'
})

Cat.hasMany(Item)
Item.belongsTo(Cat)

Brand.hasMany(Item)
Item.belongsTo(Brand)

Item.hasMany(Rating)
Rating.belongsTo(Item)

Item.hasMany(ItemInfo, { as: 'info' })
ItemInfo.belongsTo(Item)

Item.belongsToMany(Brand, { through: ItemBrand })
Brand.belongsToMany(Item, { through: ItemBrand })

module.exports = {
    User,
    Role,
    Request,
    Cart,
    Item,
    Cat,
    Brand,
    Rating,
    UserRole,
    RequestRole,
    CartItem,
    ItemInfo,
    ItemBrand
}