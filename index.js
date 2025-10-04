// import de las cuatro dependencias de node que he usado
import axios from "axios";
import gradient from "gradient-string";
import open from "open";
import ora from "ora";

async function obtenerGato() {
    try {
        // llamada a la api. La respuesta que se espera esta dentro de un array, por eso
        // uso el 0 para acceder al primer objeto (en este caso el unico)
        const respuesta = await axios.get("https://api.thecatapi.com/v1/images/search");
        const gato = respuesta.data[0]; 

        // mensaje de título
        console.log(gradient.pastel(`~ ~ ~ Aquí tienes tu gatito random ~ ~ ~`));

        // construcción de una caja para url con caracteres, aplicando estilo a la linea superior e inferior
        // y a la propia url. Luego se improme la caja con la url dentro
        const url = `URL: ${gato.url}`;
        const line = '-'.repeat(url.length + 4); // líneas horizontales
        const caja = `
            ${gradient.rainbow(line)}
            | ${gradient.rainbow(url)} |
            ${gradient.rainbow(line)}
            `;
        console.log(caja);

        // incorporo un snipper el cual inicio y le hago esperar 2000 milisegundos para que se aprecie
        // se abre la url en una ventana del navegador y se detiene el snipper mostrando un mensaje
        const spinner = ora('Abriendo tu navegador...').start();
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        await open(gato.url); 
        spinner.succeed('¡Imagen abierta!'); 
    
    } catch (error) {
        //en caso de error, se muestra un mensaje y el tipo de error
        console.error("No se pudo obtener el gatito T-T");
        console.error(error.message);
    }
}

obtenerGato();




