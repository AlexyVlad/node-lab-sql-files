import fs from 'fs'
import { Furniture, Category } from './db/models.js'

function createFolder(folderName) {
    if (!fs.existsSync(`./${folderName}`)) {
        fs.mkdirSync(`./${folderName}`)
    }
}

async function isTablesExists() {
    let furniture = await Furniture.findOne()
    let category = await Category.findOne()

    return !furniture || !category
  }

export { createFolder, isTablesExists }
