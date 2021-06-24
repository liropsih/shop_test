const {
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
    ItemBrand,
} = require('../models')

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
    await createTabRec(Role, 'Admin')
    let user = await User.findOne({ where: { email: 'aa@aa.aa' } })
    let adminRole = await Role.findOne({ where: { value: 'Admin' } })
    if (!user) {
        user = await User.create({ name: 'Admin', email: 'aa@aa.aa', password: '$2b$05$EjKH9/mDP5RojK34aAXrMus6CWU/.FLu92WuO4.Nn489R6Bspvy3S' })
        await user.addRole(adminRole)
        await user.createCart()
    }

    await createCat('Смартфоны и гаджеты') // 1
    await createCat('Телевизоры и мультимедиа') // 2
    await createCat('Компьютеры и офисная техника') // 3
    await createCat('Игры и развлечения') // 4
    await createCat('Бытовая и кухонная техника') // 5

    await createCat('Смартфоны', 1)
    await createCat('Планшеты', 1)
    await createCat('Смарт-часы', 1)
    await createCat('Аксессуары', 1)

    await createCat('Телевизоры', 2)
    await createCat('Домашние кинотеатры', 2)
    await createCat('ТВ приставки', 2)
    await createCat('Аксессуары', 2)

    await createCat('Стационарные компьютеры', 3)
    await createCat('Ноутбуки', 3)
    await createCat('Моноблоки', 3)
    await createCat('Комплектующие', 3)
    await createCat('Офисная техника', 3)

    await createCat('Игровые консоли', 4)
    await createCat('Игры', 4)
    await createCat('Настольные игры', 4)
    await createCat('Аксессуары', 4)

    await createCat('Холодильники', 5)
    await createCat('Стиральные машины', 5)
    await createCat('Посудомоечные машины', 5)
    await createCat('Микроволновые печи', 5)
    await createCat('Пылесосы', 5)


    await Brand.findOrCreate({ where: { name: 'Lenovo' } })
    await Brand.findOrCreate({ where: { name: 'LG' } })
    await Brand.findOrCreate({ where: { name: 'Samsung' } })
    await Brand.findOrCreate({ where: { name: 'Apple' } })
    await Brand.findOrCreate({ where: { name: 'HP' } })
}

module.exports = createTableRecords