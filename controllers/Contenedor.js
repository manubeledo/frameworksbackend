

class Contenedor {
    
    static productos = {};
    

    constructor(body){
        this.title = body[0].title;
        this.price = body[0].price;
        this.thumbnail = body[0].thumbnail;
    }
}

module.exports = Contenedor;