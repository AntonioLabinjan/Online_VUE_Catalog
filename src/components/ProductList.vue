<template>
  <div>
    <h2>Dodaj novi proizvod</h2>
    <form @submit.prevent="addProduct" class="product-form">
      <!-- Unos proizvoda -->
      <div>
        <label for="name">Naziv proizvoda:</label>
        <input v-model="newProduct.name" id="name" type="text" required />
      </div>
      <div>
        <label for="price">Cijena:</label>
        <input v-model="newProduct.price" id="price" type="number" required />
      </div>
      <div>
        <label for="description">Opis proizvoda:</label>
        <textarea v-model="newProduct.description" id="description"></textarea>
      </div>
      <div>
        <label for="quantity">Količina:</label>
        <input v-model="newProduct.quantity" id="quantity" type="number" required />
      </div>
      <div>
        <label for="image">Slika proizvoda:</label>
        <input @change="handleImageUpload" type="file" accept="image/*" id="image" />
        <img v-if="newProduct.image" :src="newProduct.image" alt="Slika proizvoda" class="product-image" />
      </div>
      <div>
        <button type="submit">Dodaj proizvod</button>
      </div>
    </form>

    <!-- Prikaz proizvoda -->
    <div class="products-grid">
      <div v-for="(product, index) in products" :key="index" class="product-card">
        <h3>{{ product.name }}</h3>
        <p>Cijena: {{ product.price }} kn</p>
        <p>Opis: {{ product.description }}</p>
        <div>
          <label>Količina:</label>
          <button @click="updateQuantity(index, -1)">-</button>
          {{ product.quantity }}
          <button @click="updateQuantity(index, 1)">+</button>
        </div>
        <img v-if="product.image" :src="product.image" alt="Slika proizvoda" class="product-image" />
        <button @click="editProduct(index)">Uredi</button>
        <button @click="deleteProduct(index)">Obriši</button>
        <!-- <button @click="addToCartPrompt(product)">Dodaj u košaricu</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProduct: {
        name: '',
        price: 0,
        description: '',
        quantity: 0,
        image: null
      },
      products: [],
      editingIndex: -1,
      cartItems: []
    };
  },
  methods: {
    addProduct() {
      if (this.editingIndex === -1) {
        this.products.push({ ...this.newProduct });
      } else {
        this.products[this.editingIndex] = { ...this.newProduct };
        this.editingIndex = -1;
      }

      this.clearForm();
    },
    editProduct(index) {
      this.newProduct = { ...this.products[index] };
      this.editingIndex = index;
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
      this.clearForm();
    },
    clearForm() {
      this.newProduct = { name: '', price: 0, description: '', quantity: 0, image: null };
      this.editingIndex = -1;
    },
    updateQuantity(index, amount) {
      const updatedQuantity = this.products[index].quantity + amount;

      if (updatedQuantity >= 0) {
        this.products[index].quantity = updatedQuantity;
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.newProduct.image = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    addToCartPrompt(product) {
      const quantity = window.prompt(`Količina za dodavanje u košaricu (${product.name}):`, '1');
      const parsedQuantity = parseInt(quantity);

      if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
        const cartItem = {
          product: product,
          quantity: parsedQuantity
        };
        this.cartItems.push(cartItem);
        alert(`Dodano ${parsedQuantity} komada ${product.name} u košaricu.`);
      } else {
        alert('Unesite valjanu količinu.');
      }
    }
  }
};
</script>

<style scoped>
.product-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.product-card {
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #e0f0ff; /* Svjetloplava pozadina */
  margin-bottom: 20px; /* Razmak između proizvoda */
}

.product-card-inner {
  text-align: center;
}
</style>
