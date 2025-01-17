"use strict";
// Importando Views
import Welcome from './views/welcome.js';
import Wall from './views/wall.js';
import Error404 from './views/error.js';
// import Profile from './views/profile.js';

// Importando Components
import NavBar from './components/header.js';
import Footer from './components/footer.js';

// importing services

import Utils from './services/Utils.js';


//Lista de rutas soportadas. Cualquier otra arrojara un erroer 404

const routes = {
    '/': Welcome,
    '/wall': Wall
        // '/profile': Profile
};

// El código del enrutador. Toma una URL, verifica la lista de rutas admitidas y luego muestra la página de contenido correspondiente.

const router = async() => {
    // Elemento de vista de carga diferida:
    const header = null || document.getElementById('header');
    const content = null || document.getElementById('container');
    const footer = null || document.getElementById('footer');

    // Renderizando el header y el footer.
    header.innerHTML = await NavBar.render();
    await NavBar.after_render();

    footer.innerHTML = await Footer.render();
    await Footer.after_render();

    // Obtenemos el URL analizado de la barra de direcciones.
    let request = Utils.parseRequestURL()
        // Analizamos la URL y, si tiene una parte de ID, la cambiamos con la cadena ": id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
        // Obtenemos la página de nuestro hash de rutas compatibles.
        // Si la URL analizada no está en nuestra lista de rutas compatibles, selecciona la página 404 en su lugar.
    let page = routes[parsedURL] ? routes[parsedURL] : Error404; // routes[""] 
    content.innerHTML = await page.render();
    await page.after_render();
    // console.log(parsedURL);
}

// Evento que escucha el cambio de hash:
window.addEventListener('hashchange', router);

// Evento que escucha la carga de la página:
window.addEventListener('load', router);







// export const addPost = (contentPost, userId, userName, privacyPost) => {
//     firebase.firestore().collection('posts').add({
//         content: contentPost,
//         UID: userId,
//         name: userName,
//         privacyPost: privacyPost,
//         date: firebase.firestore.FileValue.serverTimestamp()
//     })
// };



// "use strict";
// console.log('app.js ligado correctamente');
// container = document.getElementById('container');

// import Error from '../src/views/error.js';
// import Welcome from '../src/views/Welcome.js';
// container.innerHTML = Welcome.render();