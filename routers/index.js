import { Router } from "express";
import { categoryRouter } from "./category.js";
import { furnitureRouter } from "./furniture.js"


export const router = new Router()

router.use('/categories', categoryRouter)
router.use('/furnitures', furnitureRouter)
