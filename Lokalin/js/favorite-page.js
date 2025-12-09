// js/favorites-page.js
const favoritesApp = new Vue({
    el: '#favoritesApp',
    data: {
        cartItemCount: 0, // Untuk navbar
        favoriteProducts: [],
        isLoading: true
    },
    methods: {
        loadFavoriteProducts() {
            this.isLoading = true;
            const favoritesFromStorage = localStorage.getItem('favoriteItems');
            if (favoritesFromStorage) {
                this.favoriteProducts = JSON.parse(favoritesFromStorage);
            } else {
                this.favoriteProducts = [];
            }
            this.isLoading = false;
        },
        formatCurrency(value) {
            if (value === null || value === undefined) return '';
            return 'Rp' + value.toLocaleString('id-ID');
        },
        removeFromFavorites(productId) {
            // Hapus dari tampilan (array favoriteProducts)
            this.favoriteProducts = this.favoriteProducts.filter(product => String(product.id) !== String(productId));
            
            // Update juga localStorage
            localStorage.setItem('favoriteItems', JSON.stringify(this.favoriteProducts));
            
            alert('Produk telah dihapus dari favorit.');

            // Jika Anda ingin status favorit di product detail page juga terupdate
            // saat produk yang sama dibuka, Anda perlu mekanisme event atau
            // memeriksa status favorit dari localStorage saat product detail page dimuat.
        },
        updateCartCountFromStorage() {
            this.cartItemCount = parseInt(localStorage.getItem('cartTotalItems') || '0');
        }
    },
    mounted() {
        this.loadFavoriteProducts();
        this.updateCartCountFromStorage(); // Update jumlah item keranjang di navbar
    }
});