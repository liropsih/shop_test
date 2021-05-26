const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
    'user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    patronymic: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    birthdate: { type: DataTypes.DATE }
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
})

const RequestRole = sequelize.define(
    'request_role', {
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

const CatBrand = sequelize.define(
    'cat_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

User.hasOne(Cart)
Cart.belongsTo(User)

User.belongsToMany(Role, { through: UserRole })

Role.belongsToMany(User, { through: UserRole })

Request.belongsToMany(Role, { through: RequestRole })

Role.belongsToMany(Request, { through: RequestRole })

User.hasMany(Rating)
Rating.belongsTo(User)

Cart.hasMany(CartItem)
CartItem.belongsTo(Cart)

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

Item.hasMany(CartItem)
CartItem.belongsTo(Item)

Item.hasMany(ItemInfo, { as: 'info' })
ItemInfo.belongsTo(Item)

Item.belongsToMany(Brand, { through: CatBrand })
Brand.belongsToMany(Item, { through: CatBrand })

async function createTabRec(table, value, name) {
    try {
        const val = await table.findOne({ where: { value } })
        if (!val) {
            name ? await table.create({ value, name }) : await table.create({ value })
            console.log('Запись', value, 'в таблице', table, 'создана')
        }
    } catch { console.log(e) }
}

async function createCat(name, parentId) {
    try {
        const cat = await Cat.findOne({ where: { name } })
        if (!cat) {
            await Cat.create({ name, parentId })
            console.log('Каталог', name, 'создан')
        }
    } catch { console.log(e) }
}

async function createTableRecords() {
    await createTabRec(Role, 'User')
    await createTabRec(Role, 'Admin')
    let user = await User.findOne({ where: { email: 'aa@aa.aa' } })
    let adminRole = await Role.findOne({ where: { value: 'Admin' } })
    if (!user) {
        user = await User.create({ email: 'aa@aa.aa', password: '$2b$05$EjKH9/mDP5RojK34aAXrMus6CWU/.FLu92WuO4.Nn489R6Bspvy3S' })
        await user.addRole(adminRole)
    }

    await createCat('Смартфоны и гаджеты') // 1
    await createCat('Телевизоры и мультимедиа') // 2
    await createCat('Компьютеры') // 3
    await createCat('Игры и развлечения') // 4
    await createCat('Бытовая техника') // 5

    await createCat('Смартфоны', 1)
    await createCat('Планшеты', 1)
    await createCat('Смарт-часы', 1)
    await createCat('Аксесуары', 1)

    await createCat('Телевизоры', 2)
    await createCat('Домашние кинотеатры', 2)
    await createCat('ТВ приставки', 2)
    await createCat('Аксесуары', 2)

    await createCat('Стационарные компьютеры', 3)
    await createCat('Ноутбуки', 3)
    await createCat('Моноблоки', 3)
    await createCat('Комплектующие', 3)

    await createCat('Игровые консоли', 4)
    await createCat('Игры', 4)
    await createCat('Настольные игры', 4)

    await createCat('Холодильники', 5)
    await createCat('Стиральные машины', 5)
    await createCat('Посудомоечные машины', 5)
    await createCat('Пылесосы', 5)

    await Brand.findOrCreate({ where: { name: 'Samsung' } })
    await Brand.findOrCreate({ where: { name: 'Apple' } })
}

module.exports = {
    User,
    Role,
    Request,
    Cart,
    CartItem,
    Item,
    Cat,
    Brand,
    Rating,
    UserRole,
    RequestRole,
    ItemInfo,
    CatBrand,
    createTableRecords
}