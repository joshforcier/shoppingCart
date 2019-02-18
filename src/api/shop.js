const _products =
    [
        {
            "id": 9,
            "title": "MULTRON",
            "price": "3289.38",
            "inventory": 3
        },
        {
            "id": 6,
            "title": "DEVILTOE",
            "price": "1984.81",
            "inventory": 62
        },
        {
            "id": 2,
            "title": "ZENSUS",
            "price": "1401.76",
            "inventory": 33
        },
        {
            "id": 4,
            "title": "CENTREXIN",
            "price": "2153.37",
            "inventory": 7
        },
        {
            "id": 2,
            "title": "EXOZENT",
            "price": "2959.47",
            "inventory": 91
        },
        {
            "id": 7,
            "title": "ZENSOR",
            "price": "3377.86",
            "inventory": 41
        }
    ];

export default {
    getProducts (cb) {
        setTimeout(() => cb(_products), 100);
    },

    buyProducts (products, cb, errorCb) {
        setTimeout(() => {
            // simulate random checkout failure.
            (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
                ? cb()
                : errorCb();
        }, 100)
    }
}