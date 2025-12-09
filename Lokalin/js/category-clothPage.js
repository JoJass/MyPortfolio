const categoryApp = new Vue({
    el: '#categoryApp',
    data: {
        cartItemCount: 0,
        categoryTitle: 'Pakaian Khas Nusantara', 
        regions: [
            {
                name: 'Khas Sumatera',
                products: [
                    { id: 205, name: 'Motif Batik Sumatera Barat', image: '/assets/clothing/batik-sumbar.jpg', price: 75000, originalPrice: 80000 },
                    { id: 206, name: 'Motif Batik Medan', image: '/assets/clothing/batik-medan.jpg', price: 50000 },
                    { id: 207, name: 'Motif Batik Sumatera Selatan', image: '/assets/clothing/batik-sumsel.jpg', price: 60000 },
                    { id: 201, name: 'Motif Batik Madura', image: '/assets/clothing/batik-madura.jpg', price: 45000 },
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