const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var ModelGame = require('./ModelConnection')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// var DB = {
//     games: [
//         {
//             id: 23,
//             title: "Call of Duty MW",
//             year: 2019,
//             price: 60
//         },
//         {
//             id: 65,
//             title: "GTA",
//             year: 2012,
//             price: 90
//         },
//         {
//             id: 91,
//             title: "Fifa",
//             year: 2022,
//             price: 120
//         }
//     ]
// }

app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games)
})

app.get("/game/:id", (req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
        res.send("Isso nao é um numero")
    }else{
        
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if(game != undefined){
            res.statusCode = 200;
            res.json(game)
        }else{
            res.sendStatus(404)
        }
    }
})



















app.post('/game', (req, res) => {
    var title = req.body.title;
    var year = req.body.year;
    var price = req.body.price;
    ModelGame.create({
        title: title,
        year: year,
        price: price
    }).then(() => {
        res.send("ok")
    })
});













// app.post("/game", (req, res) => {

//     var {title, price, year} = req.body

//     DB.games.push({
//         id: 2323,
//         title,
//         price,
//         year
//     });

//     res.sendStatus(200)

// })

app.delete("/game/:id", (req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404)
        }else{
            DB.games.splice(index, 1);
            res.sendStatus(200)
        }

    }
})

app.put("/game/:id", (req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
        res.send("Isso nao é um numero")
    }else{
        
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if(game != undefined){
          

            var {title, price, year} = req.body

            if(title != undefined){
                game.title = title;
            }

            if(price != undefined){
                game.price = price;
            }

            if(year != undefined){
                game.year = year;
            }

            res.sendStatus(200)



        }else{
            res.sendStatus(404)
        }
    }
})




app.listen(2222,() => {
    console.log("API RODANDO!")
})