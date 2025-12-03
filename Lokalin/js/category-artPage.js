const categoryApp = new Vue({
    el: '#categoryApp',
    data: {
        cartItemCount: 0, 
        categoryTitle: 'Kerajinan Khas Nusantara', 
        regions: [
            {
                name: 'Khas Sumatera',
                products: [
                    { id: 301, name: 'Congklak Asli Sumatera', image: '/assets/mainan/congklak-kayu.jpg', price: 75000, originalPrice: 80000 },
                    { id: 302, name: 'Ukiran Palembang', image: '/assets/kerajinan/ukiran-palembang.jpg', price: 50000 },
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