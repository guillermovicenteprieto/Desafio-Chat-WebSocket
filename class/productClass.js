class ProductClass {
  constructor() {
    this.product = [];
    this.productId = 0;
  }
  get allProducts() {
    try {
      return this.product;
    } catch (error) {
      throw new Error("Se produjo un error en allProducts: " + error.message);
    }
  }

  getById(idProduct) {
    try {
      return this.product.find((product) => product.id == parseInt(idProduct));
    } catch (error) {
      throw new Error("Hubo un error en getById " + error.message);
    }
  }

  saveProduct(product) {
    try {
      this.productId++;
      const addNewProduct = {
        title: product.title,
        price: product.price,
        url: product.url,
        id: this.productId,
      };
      this.product.push(addNewProduct);
      return addNewProduct;
    } catch (error) {
      throw new Error(
        "Se produjo un error al guardar el producto : " + error.message
      );
    }
  }

  updateProduct(idProduct, body) {
    try {
      const updateProduct = {
        title: body.title,
        price: body.price,
        url: 'https://via.placeholder.com/200',
        id: idProduct
      };
      const findIndex = this.product.findIndex((product) => product.id === idProduct);
      this.product[findIndex] = updateProduct;
      return updateProduct;
    } catch (error) {
      throw new Error(
        "Se produjo un error al actualizar el producto : " + error.message
      );
    }
  }

  deleteProduct(idProduct) {
    try {
      this.product = this.product.filter((product) => product.id != idProduct);
    } catch (error) {
      throw new Error("Hubo un error al eliminar " + error.message);
    }
  }
}

module.exports = ProductClass;
