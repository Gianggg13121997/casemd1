class Store{
    name;
    listProduct;
    constructor(nameInput){
        this.name= nameInput;
        this.listProduct = []
    }
    addProduct(newProduct){
        this.listProduct.push(newProduct);
    }
    remove(index){
        this.listProduct.splice(index,1)
    }
    getOneProduct(index){
        let Product = this.listProduct[index];
        return Product;

    }
    update(index,newProduct) {
        this.listProduct[index] = newProduct
    }
    searchProduct(keyword) {
        keyword = keyword.toLowerCase().trim();
        return this.listProduct.filter(product => {
            return product.name.toLowerCase().includes(keyword);
        });
    }
}  