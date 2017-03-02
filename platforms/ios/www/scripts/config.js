yogiApp.service("config", function() {
    return {
        RESTURLS: {
            HOST: {
                "BASE": "http://www.newsyogi.com/json"
                //"BASE": "data"
            },
            SUBURL: {
                "MENU": "/menu.json",
                "HOME": "/home.json",
                "INDIA": "/india.json",
                "BUSINESS": "/business.json",
                "SPORTS": "/sports.json",
                "TECHNOLOGY": "/technology.json",
                "HEALTH": "/health.json",
                "CRICKET": "/cricket.json",
                "CINEMA": "/cinema.json",
                "EDUCATION": "/education.json",
                "LIFESTYLE": "/lifestyle.json",
                "TRAVEL": "/travel.json",
                "WORLD": "/world.json"
            }

        },
        idNames: {
            "city1": "menu_city",
            "india": "menu_india",
            "world": "menu_world",
            "business": "menu_buisness",
            "technology": "menu_technology",
            "sports": "menu_sports",
            "moviereviews": "menu_reviews",
            "entertainment": "menu_entertainment",
            "health": "menu_health",
            "travel": "menu_travel",
            "horoscope": "menu_horoscope",
            "lifestyle": "menu_lifestyle"
        },
        classNames: {

        }
    }
});