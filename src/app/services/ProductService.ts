import axios from 'axios'
import { serverApi } from '../../libs/config';
import type { Product, ProductInquiry } from '../../libs/types/product';



class ProductService {
    private readonly path: string

    constructor() {
        this.path = serverApi
    }


    public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
        try {

            let url = `${this.path}/product/all?page=${inquiry.page}&limit=${inquiry.limit}&order=${inquiry.order}`
            if (inquiry.productCategory) url += `&productCategory=${inquiry.productCategory}`
            if (inquiry.productMaterial) url += `&productMaterial=${inquiry.productMaterial}`
            if (inquiry.productColor) url += `&productColor=${inquiry.productColor}`
            if (inquiry.search) url += `&search=${inquiry.search}`

            const result = await axios.get(url)
            console.log("PRODUCTS", result)
            return result.data.result

        } catch (err) {
            console.log("getProducts", err)
            throw err
        }
    }



}

export default ProductService