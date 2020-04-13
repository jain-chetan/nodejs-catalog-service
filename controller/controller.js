const repository = require('../dbRepo/repository')
const httpStatus = require("http-status-codes")

//insertProduct - Handler to create product
exports.insertProduct = async (req, res) => {
    try {
        const savedProduct = await repository.insertProduct(req.body);
        res.set({
            'Content-Type': 'application/json',
            'Status' : 201})
        res.send({ "code": 201, "type":httpStatus.getStatusText(201), "message":"Successfull Operation", "productID": savedProduct._id })
    } catch (err) {
        logger.info(`Error in storing products and Error is: ${err}`);
        res.status(405).json({code: 405, type: httpStatus.getStatusText(405), message:"Invalid Input! Please try again"})
    }
}

//getAllHandler - Handler to get all products
exports.getAllHandler = async (req, res) => {
    try {
        for (var key in req.query) {
            req.query[key]= '/' + req.query[key] + '/i'
            req.query[key] = eval(req.query[key]) //To remove quotes
        }
        
        req.query["IsDeleted"]=false
        const products = await repository.getAllProducts(req.query);
        console.log(req.query) 
        res.set({
            'Content-Type': 'application/json',
            'Status' : 200})
        res.send(products);
    }
    catch (err) {
        logger.info(`Error in getting all products and Error is: ${err}`);
        res.status(405).json({code: 405, type: httpStatus.getStatusText(405), message:"Invalid Input! Please try again"})
    }
}

//getSingleHandler - Handler to get single product based on ID
exports.getSingleHandler = async (req, res) => {
    try {
        const product = await repository.getProductById(req.params.productID);
        if (product == null){
            throw "No Data"
        }
        res.set({
            'Content-Type': 'application/json',
            'Status' : 200})  
        res.send(product);
       
    }
    catch (err) {
        logger.info(`Error in getting products and Error is: ${err}`)
        res.status(404).json({code: 404, type: httpStatus.getStatusText(404), message:"Invalid Input"})
    }
}

//deleteHandler - Handler to delete single product based on ID
exports.deleteHandler = async (req, res) => {
    try {
        const product = await repository.deleteProduct(req.params.productID);
        if (product.nModified === 0) {
            throw "No Data"
        }
        res.set({
            'Content-Type': 'application/json',
            'Status' : 200})
        res.send({ "code": "200", "type":httpStatus.getStatusText(200), "message":"Successfull Operation"});
    }
    catch (err) {
        logger.info(`Error in deleting products and Error is: ${err}`);
        res.status(404).json({code: 404, type: httpStatus.getStatusText(404), message:"Invalid Input"})
    }
}

//updateHandler - Handler to edit single product based on ID
exports.updateHandler = async (req, res) => {
    try {
        const product = await repository.getProductById(req.params.productID);
        if (product == null) {
            throw "No Data"
        }
        const editedProduct = await repository.updateProduct(req.params.productID, req.body);
        if (editedProduct.nModified === 0){
            throw "Error in updating record"
        } 
        res.set({
            'Content-Type': 'application/json',
            'Status' : 200})
        res.send({ "code": "200", "type":httpStatus.getStatusText(200), "message":"Successfull Operation"});
    }
    catch (err) {
        logger.info(`Error in updating products and Error is: ${err}`);
        res.status(405).json({code: 405, type: httpStatus.getStatusText(405), message: "Invalid Input! Please try again"})
    }
}

//getEssentialHandler - Handler to get all essential products
exports.getEssentialHandler = async (req, res) => {
    try {
       
        const products = await repository.getEssentialProducts();
       console.log(products) 
        res.set({
            'Content-Type': 'application/json',
            'Status' : 200})
        res.send(products);
    }
    catch (err) {
        logger.info(`Error in getting all essential products and Error is: ${err}`);
        res.status(405).json({code: 405, type: httpStatus.getStatusText(405), message:"Invalid Input! Please try again"})
    }
}