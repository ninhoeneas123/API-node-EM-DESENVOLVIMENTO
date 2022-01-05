import CasesUserDataBase from '../../users/database-cases/users-database-cases'
import CasesCoursesDataBase from '../../cousers/database-cases/courses-database-cases'
import CasesPurchaseDataBase from '../database-cases/purchases-database-cases'

class PurchasesCases {

    async namePurchasedProducts(products: any) {
        let productData = []
        for (let i = 0; i < products.length; i++) {
            const productsId = products[i].id
            const courseData = await CasesCoursesDataBase.findCoursesForId(productsId)
            const courseDataObj = {
                id: courseData[i].id,
                name: courseData[i].name,
                value: courseData[i].value
            }
            productData.push(courseDataObj)
        }
        return productData
    }

    totalPurchaseAmount(productData: any) {
        let price = []
        let amount = 0
        for (let i = 0; i < productData.length; i++) {
            const productPrice = productData[i].value
            price.push(productPrice)
        } CasesPurchaseDataBase
        return amount
    }

    async caseCreatePurchase(data: any, userId: string): Promise<any> {
        let returnStatus = {}
        const purchaseData = data
        const User = await CasesUserDataBase.findUserForId(userId)
        const purchaseNumber = Math.floor(Math.random() * 1000000 + 1).toString()

        const productData = await this.namePurchasedProducts(purchaseData.products)
        const amountPurchase = this.totalPurchaseAmount(productData)

        const newPurchase = {
            purchaseNumber: purchaseNumber,
            products: productData,
            amount: amountPurchase,
            client: {
                id: User._id,
                name: User.name
            },
            typePayment: purchaseData.typePayment,
        }
        await CasesPurchaseDataBase.createNewPurchase(newPurchase)
        returnStatus = {
            code: 200,
            return: { message: "pedido de compra criado com sucesso" }
        }
        return returnStatus

    }

    async casefindPurchase(queryData: any, queryType: any): Promise<any> {
        let returnStatus = {}
        let purchasesFound
        switch (queryType) {
            case 'status':
                purchasesFound = await CasesPurchaseDataBase.findPurchaseForStatus(queryData)
                break

            case 'number':
                purchasesFound = await CasesPurchaseDataBase.findPurchaseForNumber(queryData)
                break

            default:
                returnStatus = {
                    code: 400,
                    return: { message: "Tipo de consulta invalido, as consultas devem ser por Number ou status" }
                }
                return returnStatus
        }
        returnStatus = {
            code: 200,
            return: purchasesFound
        }
        return returnStatus;
    }

    async casefindPurchaseForNumber(numberPurchase: any): Promise<any> {
        let returnStatus = {}
        console.log(typeof numberPurchase)
        const purchasesFound = await CasesPurchaseDataBase.findPurchaseForNumber(numberPurchase)
        if (!purchasesFound) {
            returnStatus = {
                code: 400,
                return: { message: "Compra não encontrada, confira o número e tente novamente" }
            }
        }
        returnStatus = {
            code: 200,
            return: purchasesFound
        }
        return returnStatus;
    }

    async casefindPurchaseForStatus(status: any): Promise<any> {
        let returnStatus = {}
        const purchasesFound = await CasesPurchaseDataBase.findPurchaseForStatus(status)
        if (purchasesFound.length == 0) {
            returnStatus = {
                code: 200,
                return: { message: "Não existe compras no estado pesquisado" }
            }
            return returnStatus
        }
        const amountReturns = purchasesFound.length
        returnStatus = {
            code: 200,
            return: { amountReturns: amountReturns, purchasesFound }
        }
        return returnStatus;
    }


}


export default new PurchasesCases()

