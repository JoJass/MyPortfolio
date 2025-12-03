const categoryApp = new Vue({
    el: '#categoryApp',
    data: {
        cartItemCount: 0,
        categoryTitle: 'Makanan Khas Nusantara', 
        regions: [
            {
                name: 'Khas Sumatera',
                products: [
                    { id: 2, name: 'Rendang Padang Asli', image: '/assets/Food/rendang-padang.jpg', price: 75000, originalPrice: 80000 },
                    { id: 3, name: 'Pempek Palembang Super', image: '/assets/FOod/pempek.jpg', price: 50000 },
                    { id: 4, name: 'Bika Ambon Medan Lezat', image: '/assets//FOod/bika-ambon.jpg', price: 60000 },
                    { id: 5, name: 'Sate Padang Daging Sapi', image: '/assets/Food/sate-padang.jpg', price: 45000 },
                    { id: 6, name: 'Kopi Gayo Aceh Premium', image: '/assets//Food/kopi-gayo.jpg', price: 120000 },
                    { id: 7, name: 'Mie Aceh Kepiting Pedas', image: '/assets/Food/mie-kepiting-aceh.jpg', price: 55000 }
                ],
                initialDisplayLimit: 5,
                productDisplayLimit: 5 
            },
            {
                name: 'Khas Jawa',
                products: [
                    
                ],
                initialDisplayLimit: 5,
                productDisplayLimit: 5
            },
            {
                name: 'Khas Kalimantan',
                products: [
                    
                ],
                initialDisplayLimit: 5,
                productDisplayLimit: 5
            },
            {
                name: 'Khas Sulawesi',
                products: [
                    
                ],
                initialDisplayLimit: 5,
                productDisplayLimit: 5
            },
            {
                name: 'Khas Papua',
                products: [
                    
                ],
                initialDisplayLimit: 5,
                productDisplayLimit: 5
            }
                
        ]
    },
    methods: {
        formatCurrency(value) {
            if (value === null || value === undefined) return '';
            return 'Rp' + value.toLocaleString('id-ID');
        },
        getLimitedProducts(region) {
            
            return region.products.slice(0, region.productDisplayLimit);
        },
        toggleProductDisplay(region) {
            if (region.productDisplayLimit === region.initialDisplayLimit) {
                region.productDisplayLimit = region.products.length;
            } else {
                region.productDisplayLimit = region.initialDisplayLimit;
            }
        },
        isRegionExpanded(region) {
            return region.productDisplayLimit > region.initialDisplayLimit && region.products.length > region.initialDisplayLimit;
        }
    },
    mounted() {
    }
});