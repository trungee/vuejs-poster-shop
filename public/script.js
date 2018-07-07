const PRICE = 9.99;
new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
        ],
        cart: [],
        search: 'Anime',
        lastSearch: '',
        loading: false
    },
    methods: {
        onSubmit: function() {
            this.loading = true;
            console.log('on submit');
            this.$http
                .get('/search/'.concat(this.search))
                .then(function(res) {
                    console.log(res);
                    this.lastSearch = this.search;
                    this.items = res.data;
                    this.loading = false;
                });
        },
        addItem: function(index) {
            this.total += PRICE;
            var item = this.items[index];
            var found = false;
            for (var i = 0; i < this.cart.length; i++) {
                console.log(this.cart[i].id);
                console.log(item.id);
                if (this.cart[i].id === item.id) {
                    console.log('equals');
                    this.cart[i].qty++;
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    qty: 1,
                    price: PRICE
                });
            }
        },
        inc: function(item) {
            item.qty++;
            this.total += PRICE;
        },
        dec: function(item) {
            item.qty--;
            this.total -= PRICE
            if (item.qty <= 0) {
                for (var i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id === item.id) {
                        if (this.cart[i].qty > 1) {
                            this.cart[i].qty--;
                        } else {
                            this.cart.splice(i, 1);
                        }
                        break;
                    }
                }
            }
        }
    },
    filters: {
        currency: function(price) {
            return '$'.concat(price.toFixed(2));
        }
    },
    mounted: function() {
        this.onSubmit();
    }
});
