const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 7000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
//app.set('views','/home/opc/front/views');
app.set('views','/var/www/html/views');

app.use(express.static(__dirname + '/assets'));

app.get('/', async (req, res) => {

    return res.status(200).send("Bienvenido a la API de juegos");

});

app.get('/registro', async (req, res) => {

    try {

        console.log("entro a get plataformas")

        const settings = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        
  
        const respuesta  = await fetch('https://apyi7ymuuu2wd2wu44zb36oiwi.apigateway.us-ashburn-1.oci.customer-oci.com/api/getPlataformas', settings)
        const plataformas = await respuesta.json();
        console.log(plataformas[0],"plataformas") 
        

        return res.status(200).render('registro.ejs',{plataformas: plataformas});
    } catch (error) {
        console.log(error)
        return res.status(200).render('registro.ejs',{plataformas: []});
    }


    
});

app.post('/registrar', async (req, res) => {

    try {

        const data = req.body;  

        console.log(data,"entro a registrar juego")
    
        const settings = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          }
        }
 
        const respuesta  = await fetch('https://apyi7ymuuu2wd2wu44zb36oiwi.apigateway.us-ashburn-1.oci.customer-oci.com/api/registrarJuego', settings)
        console.log(respuesta.status,"respuesta")
        console.log(respuesta.statusText,"respuesta")  
        console.log(respuesta.message,"respuesta") 

        const datos = await respuesta.json();
        console.log(datos) 
        
        return res.status(200).redirect('/registro');
    } catch (error) {
        console.log(error)
        return res.status(200).redirect('/registro')
    }


    
});

app.get('/reporte', async (req, res) => {

    try {

        console.log("entro a get reporte juegos")
    
        const settings = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
        }
    
        const respuesta  = await fetch('https://apyi7ymuuu2wd2wu44zb36oiwi.apigateway.us-ashburn-1.oci.customer-oci.com/api/getReporteJuegos', settings)
        const reporte = await respuesta.json();
        console.log(reporte)
        
        return res.status(200).render('reporte.ejs',{datos: reporte});
    } catch (error) {
        console.log(error)
        return res.status(200).render('reporte.ejs',{datos: []});
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});