import _ from "lodash"
import { initDB } from "./db/init.js"
import { createFolder, isTablesExists } from './helpers.js'

const baseURL = 'http://127.0.0.1:8080'
const categoriesAPI = `${baseURL}/api/categories`
const furnituresAPI = `${baseURL}/api/furnitures`

let products_ids = []
let categories_ids = []
let category;
let furniture;

createFolder('uploads')

if (await isTablesExists()) {
    await initDB()
}

await fetch(new Request(`${categoriesAPI}`, {
    "method": "GET"
})).then(res => res.json()).then(data => {
    console.log('\nСписок всех категорий мебели')
    for (let category of data) {
        categories_ids.push(category["id"])
        console.log(category)
    }
})

let randomCategoryId = _.sample(categories_ids)
await fetch(new Request(`${categoriesAPI}/${randomCategoryId}`, {
    "method": "GET"
})).then(res => res.json()).then(data => console.log(`\nКатегория мебели с ID: ${randomCategoryId}\n${JSON.stringify(data, null, 4)}`))

const newCategory = { "name": "New Furniture Category Name" }
await fetch(new Request(`${categoriesAPI}`, {
    "method": "POST",
    "body": JSON.stringify(newCategory),
    "headers": {
        "content-type": "application/json"
    }
})).then(res => res.json()).then(data => console.log(`\nНовая категория мебели\n${JSON.stringify(data, null, 4)}`))

randomCategoryId = _.sample(categories_ids)
await fetch(new Request(`${categoriesAPI}/${randomCategoryId}`, {
    "method": "GET"
})).then(res => res.json()).then(data => category = JSON.stringify(data, null, 4))

await fetch(new Request(`${categoriesAPI}/${randomCategoryId}`, {
    "method": "PUT",
    "body": JSON.stringify({ "name": "New Furniture Category Name2" }),
    "headers": {
        "content-type": "application/json"
    }
})).then(res => res.json()).then(data => console.log(`\nКатегория мебели до обновления\n${category}\nКатегория мебели после обновления\n${JSON.stringify(data, null, 4)}\n`))

randomCategoryId = _.sample(categories_ids)
categories_ids = []
await fetch(new Request(`${categoriesAPI}/${randomCategoryId}`, {
    "method": "DELETE"
})).then(res => res.json()).then(async (data) => {
    console.log(`ID: ${randomCategoryId} - ${JSON.stringify(data, null, 4)}`)

    await fetch(new Request(`${categoriesAPI}`, {
        "method": "GET"
    })).then(res => res.json()).then(data => {
        for (let category of data) {
            categories_ids.push(category["id"])
            console.log(category)
        }
    })
})

await fetch(new Request(`${furnituresAPI}/`, {
    "method": "GET"
})).then(res => res.json()).then(data => {
    console.log('\nСписок всей мебели')
    for (let furniture of data) {
        products_ids.push(furniture["id"])
        console.log(furniture)
    }
})

let randomProductId = _.sample(products_ids)
await fetch(new Request(`${furnituresAPI}/${randomProductId}`, {
    "method": "GET"
})).then(res => res.json()).then(data => {
    console.log(`\nМебель с ID: ${randomProductId}\n${JSON.stringify(data, null, 4)}\n`)
})

const res = await fetch("https://ufa.pushe.ru/upload/iblock/a17/vtezqogj35jn5hzgroouvgvr65c1v5ts.jpg")
const blob = await res.blob()

randomCategoryId = _.sample(categories_ids)
const newFurniture= {
    categoryId: randomCategoryId,
    name: "Furniture NameB",
    color: "RED",
    width: 120,
    height: 120,
    deep: 120,
    image: blob
}
const form = new FormData()

for (let key of Object.keys(newFurniture)) {
    form.append(key, newFurniture[key])
}

await fetch(new Request(`${furnituresAPI}/`, {
    "method": "POST",
    "body": form,
})).then(res => res.json()).then(data => console.log(`Новая мебель\n${JSON.stringify(data, null, 4)}`))

randomProductId = _.sample(products_ids)
await fetch(new Request(`${furnituresAPI}/${randomProductId}`, {
    "method": "GET"
})).then(res => res.json()).then(data => { furniture = JSON.stringify(data, null, 4) })

await fetch(new Request(`${furnituresAPI}/${randomProductId}`, {
    "method": "PUT",
    "body": JSON.stringify({"width": _.random(50, 120.0, true)}),
    "headers": {
        "content-type": "application/json"
    }
})).then(res => res.json()).then(data => console.log(`\nМебель до обновления\n${furniture}\nМебель после обновления\n${JSON.stringify(data, null, 4)}\n`))

randomProductId = _.sample(products_ids)
await fetch(new Request(`${furnituresAPI}/${randomProductId}`, {
    "method": "DELETE"
})).then(res => res.json()).then(async (data) => {
    console.log(`ID: ${randomProductId} - ${JSON.stringify(data, null, 4)}`)

    await fetch(new Request(`${furnituresAPI}/`, {
        "method": "GET"
    })).then(res => res.json()).then(data => {
        for (let furniture of data) {
            console.log(furniture)
        }
    })
})
