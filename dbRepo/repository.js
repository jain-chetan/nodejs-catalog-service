const mongoose = require('mongoose');
mongoose.set('debug', true)

const Catalog = mongoose.model("Catalog");

const insertProduct = (data) => {
    const product = new Catalog(data);
    return product.save();
}

const getAllProducts = (params) => {
    return Catalog.find(params, {"IsDeleted" : 0});
} 

const getEssentialProducts = () => {
    console.log("In essential ")
    return Catalog.find({"essentialNeed" : true,IsDeleted : false},{"IsDeleted" : 0});
}

const getProductById = (id) => {
    product = Catalog.findOne({ _id: id , IsDeleted : false}, {"IsDeleted" : 0});
    return product
}

const deleteProduct = (id) => {
    return Catalog.updateOne({_id : id}, {IsDeleted : true})
}

const updateProduct = (productID, data) => Catalog.updateOne({"_id":productID}, {$set:data})


module.exports = { insertProduct, getAllProducts, getProductById, deleteProduct, updateProduct, getEssentialProducts };