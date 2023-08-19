<template>
    <div class="container">
      <button @click="showAddProductModal" class="btn btn-primary">Add Item</button>
      <button @click="sortTableById" class="btn btn-secondary">Sort by ID</button>
      <table id="tblAdmin" class="table">
        <thead>
          <tr>
            <th>productId</th>
            <th>prodName</th>
            <th>Image</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.prodId">
            <td>{{ product.prodID }}</td>
            <td>{{ product.prodName }}</td>
            <td><img :src="product.image" alt="Product Image"></td>
            <td>{{ product.category }}</td>
            <td>{{ product.amount }}</td>
            <td>
              <button @click="editProduct(product.prodID)" class="btn btn-primary">Edit</button>
              <button @click="deleteProduct(product.prodID)" class="btn btn-secondary">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Modal -->
      <div id="modal" class="modal" v-if="isModalVisible">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">Add Item</h2>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="prodName" class="form-label">Name:</label>
                  <input type="text" class="form-control" v-model="newProduct.prodName" id="prodName">
                </div>
                <div class="mb-3">
                  <label for="image" class="form-label">Image:</label>
                  <input type="text" class="form-control" v-model="newProduct.image" id="image">
                </div>
                <div class="mb-3">
                  <label for="category" class="form-label">Category:</label>
                  <input type="text" class="form-control" v-model="newProduct.category" id="category">
                </div>
                <div class="mb-3">
                  <label for="amount" class="form-label">Amount:</label>
                  <input type="text" class="form-control" v-model="newProduct.amount" id="amount">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="addProduct">Add</button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newProduct: {
          prodName: '',
          image: '',
          category: '',
          amount: '',
        },
        isModalVisible: false,
      };
    },
    computed: {
      products() {
        return this.$store.state.Products;
      },
    },
    methods: {
      showAddProductModal() {
        this.newProduct = {
          prodName: '',
          image: '',
          category: '',
          amount: '',
        };
        this.isModalVisible = true;
      },
      sortTableById() {
        // Implement sorting logic here
      },
      editProduct(prodID) {
        // Implement editing logic here
      },
      deleteProduct(prodID) {
        // Implement deleting logic here
      },
      addProduct() {
        fetch('/api/Products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newProduct),
        })
          .then(response => response.json())
          .then(addedProduct => {
            this.$store.commit('setProduct', addedProduct);
            console.log('Product added');
            this.newProduct = {
              prodName: '',
              image: '',
              category: '',
              amount: '',
            };
            this.closeModal();
          })
          .catch(error => {
            console.error('Error adding product:', error);
          });
      },
      closeModal() {
        this.isModalVisible = false;
      },
    },
    mounted() {
      this.$store.dispatch('fetchProducts');
    },
  };
  </script>
  
  <style scoped>
  .modal {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  .modal-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  </style>
  