import { Router } from 'express'
import purchaseController from './purchase-controller'
import authMiddleware from '../middlewares/auth-middleware'
import adminMiddleware from '../middlewares/admin-middleware'


const purchasesRouter = Router()

purchasesRouter.get('/purchase/find/fn',authMiddleware, adminMiddleware, purchaseController.findPurchaseForNumber)
purchasesRouter.get('/purchase/find/fs',authMiddleware, adminMiddleware, purchaseController.findPurchaseForStatus)
purchasesRouter.get('/purchase/find',authMiddleware, adminMiddleware, purchaseController.findPurchase)
purchasesRouter.post('/purchase/create',authMiddleware, purchaseController.createPurchase)




export default purchasesRouter