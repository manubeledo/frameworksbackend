let fs = require('fs')
const Contenedor = require('./Contenedor');

let readall = async (ctx) => {
    async function getAll() {
        try {
            ctx.response.implicitEnd = false
            let res = JSON.parse(await fs.promises.readFile('./db/productos.json'));
            console.log(ctx.request.all())
            console.log(res)
            ctx.response.send(res);
        }
        catch (err) {
            console.log(err);
        }
    }
    getAll()
}

let read = async (ctx) => {
    async function getById() {
        try {
            ctx.response.implicitEnd = false
            let id = ctx.request.get().id;
            let datos = JSON.parse(await fs.promises.readFile('./db/productos.json'));
            let responseFilter = datos.filter(elemento => elemento.id==id);
            if (responseFilter.length != 0){
            ctx.response.send(responseFilter);
            } else {
                ctx.response.send(`{error:'producto no encontrado'}`)
            }
        }
    catch (err) {
                console.log(err);
            }
        }
    getById()
}

let create = async (ctx) => {
    async function save(){
        try {
            ctx.response.implicitEnd = false

            let data = JSON.parse(await ctx.request.raw())

            console.log('esto viene de ctx ', data)
            
            let storedData = JSON.parse(await fs.promises.readFile('./db/productos.json', 'utf-8'))
           
            storedData.push(data)

            console.log(storedData)
   
            let datos = JSON.stringify(storedData)

            await fs.promises.writeFile('./db/productos.json', datos, 'utf-8')

            ctx.response.send(datos)
        }
        catch(err){
            console.log(err);
        }
    }
    save();
}

let update = async (ctx) => {
    async function put(){
        try{
            ctx.response.implicitEnd = false
            let id = ctx.request.get().id;
            let body = JSON.parse(await ctx.request.raw())
            const contenido = await fs.promises.readFile('./db/productos.json', 'utf-8');
            fs.promises.unlink('./db/productos.json');
            let data = JSON.parse(contenido);
            for (i=0; i < data.length; i++){
                if (data[i].id == id) {
                    data[i].title = body.title;
                    data[i].price = body.price;
                    data[i].thumbnail = body.thumbnail;
                    let datos = JSON.stringify(data);
                    await fs.promises.writeFile('./db/productos.json', datos);
                    console.log(data)
                    ctx.response.send(data[i]);
                }
        }

        } 
        catch(err) {
            console.log(err);
        }
    }
    put();
}

let deleted = async (ctx) => {
    async function deleteById(){
        try{
            console.log('desde deleted')
            ctx.response.implicitEnd = false
            const contenido = await fs.promises.readFile('./db/productos.json', 'utf-8');
            await fs.promises.unlink('./db/productos.json');
            let datos = JSON.parse(contenido);
            let responseFilter = datos.filter(elemento => elemento.id!=ctx.request.get().id);
            datos = JSON.stringify(responseFilter)
            await fs.promises.writeFile('./db/productos.json', datos);
        }
        catch(err){
            console.log(err);
        }
        ctx.response.send('delete ok');
    }
    deleteById();
}

module.exports = {
    readall,
    read,
    create,
    update,
    deleted
}