import { STRING, INTEGER, FLOAT } from 'sequelize'
import { seq } from './index.js'


const Furniture = seq.define('furniture', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    name: {
        type: STRING,
        allowNull: false,
    },
    color: {
        type: STRING,
        allowNull: false,
    },
    width: {
        type: FLOAT,
        allowNull: false,
    },
    height: {
        type: FLOAT,
        allowNull: false,
    },
    deep: {
        type: FLOAT,
        allowNull: false,
    },
    image: {
        type: STRING,
        allowNull: false,
    }
})

const Category = seq.define('category', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    name: {
        type: STRING,
        allowNull: false,
    }
})

Category.hasOne(Furniture, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})

export { Furniture, Category }
