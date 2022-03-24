const fs = require('fs')

const root = {
    products: () => {
        let datos = JSON.parse(fs.readFileSync('./db/productos.json'))
        console.log(datos)
        return datos;
    },
    product: ({id}) => {
        let datos = JSON.parse(fs.readFileSync('./db/productos.json'))
        let producto = datos.find(element=> element.id == id)
        return producto;
    },
    createProduct: (args) => {

        let productArr = JSON.parse(fs.readFileSync('./db/productos.json'));

        let newId = Object.values(productArr).length + 1
    
        const newProduct = {
            id: String(newId),
            titulo: args.titulo,
            descripcion: args.descripcion
        }
        
        productArr.push(newProduct)

        fs.writeFileSync('./db/productos.json', JSON.stringify(productArr, null, 2),'utf-8')
        return productArr
    },
    updateProduct: async (args) => {
        try{
            let id = args.id;
            const contenido = fs.readFileSync('./db/productos.json', 'utf-8');
            fs.unlinkSync('./db/productos.json');
            let data = JSON.parse(contenido);
            for (i=0; i < Object.values(data).length; i++){
                if (Object.values(data)[i].id == id) {
                    Object.values(data)[i].titulo = args.titulo;
                    Object.values(data)[i].descripcion = args.descripcion;
                    let datos = JSON.stringify(data)
                    fs.writeFileSync('./db/productos.json', datos, 'utf-8');
                    return Object.values(data)[i];
                }
            }
        } 
        catch(err) {
            console.log(err);
        }
    },
    deleteProduct: async ({id}) => {
        try{
            const contenido = fs.readFileSync('./db/productos.json', 'utf-8');
            await fs.unlinkSync('./db/productos.json');
            let datos = JSON.parse(contenido);
            let responseFilter = datos.filter(elemento => elemento.id!= id);
            datos = JSON.stringify(responseFilter)
            fs.writeFileSync('./db/productos.json', datos, 'utf-8');
            return Object.values(responseFilter);
        }
        catch(err){
            console.log(err);
        }
    }
};

module.exports = { root };