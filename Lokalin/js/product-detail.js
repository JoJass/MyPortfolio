const productDetailApp = new Vue({
    el: '#productDetailApp',
    data: {
        cartItemCount: 0,
        product: null,        
        quantity: 1,
        productNotFound: false,
        isLoading: true       
    },
    methods: {
        getProductIdFromURL() {
            const params = new URLSearchParams(window.location.search);
            return params.get('id');
        },
        loadProductData(productId, allProducts) { 
            const foundProduct = allProducts.find(p => String(p.id) === String(productId));
            
            if (foundProduct) {
                this.product = { ...foundProduct }; 
                this.calculateDiscountPercentage(); 
                this.productNotFound = false;
            } else {
                console.error('Produk dengan ID tidak ditemukan:', productId);
                this.productNotFound = true;
                this.product = null;
            }
            this.isLoading = false; 
        },
        calculateDiscountPercentage() {
            if (this.product && this.product.originalPrice && this.product.price < this.product.originalPrice) {
                const discount = ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100;
                
                this.$set(this.product, 'discountPercentage', Math.round(discount)); 
            } else if (this.product) {
                this.$set(this.product, 'discountPercentage', null);
            }
        },
        formatCurrency(value) {
            if (value === null || value === undefined) return '';
            return 'Rp' + value.toLocaleString('id-ID');
        },
        increaseQuantity() { this.quantity++; },
        decreaseQuantity() { if (this.quantity > 1) { this.quantity--; } },
        addToCart(product) {
            if (!product.inStock) return;
            console.log(`Menambahkan ${this.quantity} x ${product.name} ke keranjang.`);
            alert(`${this.quantity} x ${product.name} telah ditambahkan ke keranjang!`);

            let currentTotalItems = parseInt(localStorage.getItem('cartTotalItems') || '0');
            currentTotalItems += this.quantity;
            localStorage.setItem('cartTotalItems', currentTotalItems);
            this.cartItemCount = currentTotalItems;

            let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
            let existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += this.quantity;
            } else {
                cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: this.quantity });
            }
            localStorage.setItem('cartItems', JSON.stringify(cart));
        },
    
        toggleFavorite(product) {
            if (!product || !product.id || !product.name || !product.image || product.price === undefined) {
                console.error('Data produk tidak lengkap untuk toggleFavorite:', product);
                return;
            }

            product.isFavorite = !product.isFavorite; 
            let favorites = JSON.parse(localStorage.getItem('favoriteItems')) || [];

            if (product.isFavorite) {
                if (!favorites.find(fav => String(fav.id) === String(product.id))) {
                    favorites.push({
                        id: product.id,
                        name: product.name,
                        image: product.image,
                        price: product.price,
                        originalPrice: product.originalPrice, 
                    });
                }
                alert(`${product.name} ditambahkan ke favorit!`);
            } else {
                favorites = favorites.filter(fav => String(fav.id) !== String(product.id));
                alert(`${product.name} dihapus dari favorit.`);
            }
            localStorage.setItem('favoriteItems', JSON.stringify(favorites));  
        },
        checkoutNow(product) { 
            if (!product.inStock) return;
            this.addToCart(product);
            window.location.href = 'cart.html';
        },
        updateCartCountFromStorage() {
            this.cartItemCount = parseInt(localStorage.getItem('cartTotalItems') || '0');
        }
    },
    mounted() {
        this.isLoading = true;
        const productId = this.getProductIdFromURL();

        if (productId) {
            fetch('/Lokalin/json/product.json') 
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(allProducts => {
                    this.loadProductData(productId, allProducts);
                })
                .catch(error => {
                    console.error('Gagal memuat data produk:', error);
                    this.productNotFound = true;
                    this.isLoading = false;
                });
        } else {
            console.error('Tidak ada ID produk di URL.');
            this.productNotFound = true;
            this.isLoading = false;
        }
        this.updateCartCountFromStorage();
    }
});