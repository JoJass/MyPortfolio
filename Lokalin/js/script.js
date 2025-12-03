const app = new Vue({
    el: '#app',
    data: {
        cartItemCount: 0, 
        countdownTimer: '00:00:00', 
        bigDeals: [
            {
                id: 1,
                name: 'Gudeg Jogja Komplit Mantap (Diskon Besar)',
                image: '/assets/Food/gudeg.jpg', 
                price: 21000,
                originalPrice: 35000
            },
            {
                id: 201,
                name: 'Batik Tulis Madura Eksklusif',
                image: '/assets/clothing/batik-madura.jpg', 
                price: 250000,
                originalPrice: null
            },
            {
                id: 301,
                name: 'Mainan Anak Congklak Kayu Jati',
                image: '/assets/mainan/congklak-kayu.jpg', 
                price: 75000,
                originalPrice: 100000
            },
            {
                id: 202,
                name: 'Aksesoris Kalung Etnik Dayak',
                image: '/assets/clothing/kalung-dayak.jpg', 
                price: 120000,
                originalPrice: null
            }
            
        ]
    },
    methods: {
        formatCurrency(value) {
            if (value === null || value === undefined) return '';
            return 'Rp' + value.toLocaleString('id-ID');
        },
        startCountdown() {
            let duration = 3600; 
            let timer = duration, minutes, seconds;
            setInterval(() => {
                hours = parseInt(timer / 3600, 10);
                minutes = parseInt((timer % 3600) / 60, 10);
                seconds = parseInt(timer % 60, 10);

                hours = hours < 10 ? "0" + hours : hours;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                this.countdownTimer = hours + ":" + minutes + ":" + seconds;

                if (--timer < 0) {
                    timer = duration; 
                }
            }, 1000);
        }
    },
    mounted() {
        this.startCountdown();
    }
});


document.addEventListener('DOMContentLoaded', function () {
    // slider
});