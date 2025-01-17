const printPost = user => {
    console.log(user)
    let rootPost = document.getElementById('wall-posts');
    let userUid = JSON.parse(localStorage.getItem('user'));
    rootPost.innerHTML = '';
    user.forEach(msj => {
        let post = msj.data();
        if (post.usuario == userUid.uid) {
            // console.log(post.postId);
            let card = `
                            <div class="col s12 m7 box-post">
                             <div class="head-post">
                                <h2 class="header">post</h2></div>
                                <div class="card horizontal bgpost">
                                <div class="postpub">
                                    <div class="card-content posttxtcont">
                                    <p class="disp-name">${post.nombre}</p>
                                    <!--<p>${post.hora}</p>-->
                                    <div id="posttxt"class="posttxt">
                                    <input id="${post.postId}" placeholder="Editar post">${post.postContent}</input>
                                    <p id="issue-edit-post"></p>
                                    </div>
                                    <div class="admin-post">
                                    <a class="btns-edit btn-edit" id="${post.postId}"><i id="${post.postId}" class="material-icons">edit</i></a>
                                    <a class="btns-delete btn-delete" id="${post.postId}"><i id="${post.postId}" class="material-icons">delete</i></a>                                    
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            `
            rootPost.insertAdjacentHTML("afterbegin", card);
            // btnEdit = document.getElementById('btn-edit');
            // btnEdit.addEventListener('click', editPost);


            // btnEdit.addEventListener('DOMContentLoaded', function() {
            //     console.log('modal')
            //         // var elems = document.querySelectorAll('.modal');
            // var instances = M.Modal.init(elems, options);
            // });
        } else {
            let card = `
            <div class="col s12 m7 box-post">
            <div class="head-post">
               <h2 class="header">post</h2></div>
               <div class="card horizontal bgpost">
               <div class="postpub">
                   <div class="card-content posttxtcont">
                   <p class="disp-name">${post.nombre}</p>
                   <!--<p>${post.hora}</p>-->
                   <div id="posttxt"class="posttxt"><p>${post.postContent}</p></div>
                   </div>
               </div>
               </div>
           </div>
                        `
            rootPost.insertAdjacentHTML("afterbegin", card)
        }
    })
    const btnsEdit = document.getElementsByClassName('btns-edit');

    for (let i = 0; i < btnsEdit.length; i++) {
        btnsEdit[i].addEventListener('click', () => {
            let postId = event.target.id
            editPost(postId);
        })
    }
    const btnsDelete = document.getElementsByClassName('btns-delete');

    for (let i = 0; i < btnsDelete.length; i++) {
        btnsDelete[i].addEventListener('click', () => {
            let postId = event.target.id
            deletePost(postId);
        })
    }

}


let editPost = (postId) => {
    // console.log('funcion editando')
    // Asignamos un 'Guard' que indique si un usuario esta logueado y toda la informacion que tenemos de el
    firebase.auth().onAuthStateChanged((user) => {
        // User is signed in.
        if (user.uid) {
            // console.log(user);
            // Declaramos el input de edicion y obtenemos su valor
            let postTxt = document.getElementById(postId).value;
            let getPost = db.collection("post").doc(postId);
            getPost.get().then(function(doc) {
                if (doc.exists) {
                    if (postTxt != '') {
                        // console.log(doc.data().postId);
                        console.log("Document data:", doc.data());
                        //creamos una funcion que actualice el post a la base de datos en firestore con los campos: usuario, nombre, post content y hora
                        db.collection("post").doc(postId).update({
                                usuario: user.uid,
                                nombre: user.displayName,
                                postContent: postTxt,
                                hora: new Date(),
                                edit: 'Editado'
                            }).then(function(docRef) {
                                console.log("Document successfully updated!");
                            })
                            .catch(function(error) {
                                console.error("Error writing document: ", error);
                            });
                    } else {
                        const issueEditRoot = document.getElementById('issue-edit-post');
                        issueEditRoot.innerHTML = 'Por favor escribe algo';
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
            // console.log(postTxt);

        }
    });
}

let deletePost = (postId) => {
    // Asignamos un 'Guard' que indique si un usuario esta logueado y toda la informacion que tenemos de el
    firebase.auth().onAuthStateChanged((user) => {
        // si el documento existe
        if (user.uid) {
            // console.log(user);
            // traemos el post y lo guardamos en una variable
            let getPost = db.collection("post").doc(postId);
            getPost.get().then(function(doc) {
                let postId = doc.data().postId;
                if (doc.exists, postId) {
                    // console.log(doc.data().postId);
                    console.log("Document data:", doc.data());
                    //creamos una funcion que elimine el post de la base de datos en firestore y de la pantalla
                    db.collection("post").doc(postId).delete().then(function(docRef) {
                            console.log("Document successfully deleted!");
                        })
                        .catch(function(error) {
                            console.error("Error removing document: ", error);
                        });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                };
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
        // console.log(postTxt);


    });

}


// metodo update// let editPost = () => {
//     // console.log('funcion editando')
//     // Asignamos un 'Guard' que indique si un usuario esta logueado y toda la informacion que tenemos de el
//     firebase.auth().onAuthStateChanged((user) => {
//         // User is signed in.
//         if (user.uid) {
//             // console.log(user);
//             // Declaramos el input de edicion y obtenemos su valor
//             let postTxt = document.getElementById('post-txt-edit').value;
//             // console.log(postTxt);
//             //creamos una funcion que agregue el post a la base de datos en firestore con los campos: usuario, nombre, post content y hora
//             db.collection("post").doc("mipost").update({
//                     usuario: user.uid,
//                     nombre: user.displayName,
//                     postContent: postTxt,
//                     hora: new Date(),
//                     edit: 'Editado'
//                 }).then(function() {
//                     console.log("Document successfully updated!");
//                 })
//                 .catch(function(error) {
//                     console.error("Error writing document: ", error);
//                 });
//         }
//     });
// }

//metodo set:// let editPost = () => {
//     // console.log('funcion editando')
//     // Asignamos un 'Guard' que indique si un usuario esta logueado y toda la informacion que tenemos de el
//     firebase.auth().onAuthStateChanged((user) => {
//         // User is signed in.
//         if (user.uid) {
//             // console.log(user);
//             // Declaramos el input de edicion y obtenemos su valor
//             let postTxt = document.getElementById('post-txt-edit').value;
//             // console.log(postTxt);
//             //creamos una funcion que agregue el post a la base de datos en firestore con los campos: usuario, nombre, post content y hora
//             db.collection("post").doc("mipost").set({
//                     usuario: user.uid,
//                     nombre: user.displayName,
//                     postContent: postTxt,
//                     hora: new Date(),
//                     edit: 'Editado'
//                 }).then(function() {
//                     console.log("Document successfully written!");
//                 })
//                 .catch(function(error) {
//                     console.error("Error writing document: ", error);
//                 });
//         }
//     });
// }


// let editPost = () => {
//     console.log('funcion editando')
//         // Asignamos un 'Guard' que indique si un usuario esta logueado y toda la informacion que tenemos de el
//     firebase.auth().onAuthStateChanged((user) => {
//         // User is signed in.
//         if (user.uid) {
//             console.log(user);
//             // Declaramos el textArea y obtenemos su valor
//             let postTxt = document.getElementById('post-txt-edit').value;
//             console.log(postTxt);
//             //creamos una funcion que agregue el post a la base de datos en firestore con los campos: usuario, nombre, post content y hora
//             let postEdited = db.collection('post').doc('mipost');
//             return postEdited.update({
//                     postContent: postTxt,
//                     hora: new Date()
//                 })
//                 .then(function() {
//                     console.log("Document successfully updated!");
//                 })
//                 .catch(function(error) {
//                     // The document probably doesn't exist.
//                     console.error("Error updating document: ", error);
//                 });
//         }
//     });
// }



// let editTxtPost = () => {
//     console.log('modal');
// const modal = `
//         <!--Inicia la estructura del modal de editar Post-->
//         <div id="modal2" class="modal">
//             <div id="style-modal" class="modal-content">
//                 <header class="modal-header">
//                     <!--Header del modal-->
//                     <box>
//                         <p>¡Edita tu post!</p>
//                     </box>
//                 </header>
//                 <div id="container-post" class="col s12 m7 box-title-post">
//             <h2 class="header">Publica sobre tu amigo</h2>
//             <div class="card horizontal">
//             <div class="card-image">
//                 <img id="post-img" src="./img/240.jpg">
//             </div>
//             <div class="card-stacked">
//                 <div class="card-content">
//                 <form class="post-form">
//                 <textarea class="textarea post-form" name="post" id="post-txt" cols="30" rows="3" placeholder="¡Cuéntanos algo sobre ti!"></textarea>
//                 <a id="btn-post-edited" class="waves-effect waves-light btn">Publicar</a>
//                 </form>
//                 </div>
//             </div>
//             </div>
//         </div>

//         </div>
//         <div class="modal-footer" id="mod-footer-color">
//             <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
//         </div>
//     </div>
//     `

// });
// // document.getElementById('btn-post-edited').addEventListener('click', editPost);
// return modal
// }

// let editPost = () => {
//     // Asignamos un 'Guard' que indique si un usuario esta logueado y toda la informacion que tenemos de el
//     firebase.auth().onAuthStateChanged((user) => {
//         // User is signed in.
//         if (user.uid) {
//             // console.log(user);
//             // Declaramos el textArea y obtenemos su valor
//             let postTxt = document.getElementById('posttxt').value;
//             //creamos una funcion que agregue el post a la base de datos en firestore con los campos: usuario, nombre, post content y hora
//             let postedited = db.collection('post').doc(data);
//             return postedited.update({
//                     postContent: postTxt,
//                 })
//                 .then(function() {
//                     console.log("Document successfully updated!");
//                 })
//                 .catch(function(error) {
//                     // The document probably doesn't exist.
//                     console.error("Error updating document: ", error);
//                 });
//         }
//     });
// }

// let editPost = () => {
//     // Asignamos un 'Guard' que indique si un usuario esta logueado y toda la informacion que tenemos de el
//     firebase.auth().onAuthStateChanged((user) => {
//         // User is signed in.
//         if (user.uid) {
//             // console.log(user);
//             // Declaramos el textArea y obtenemos su valor
//             let postTxt = document.getElementById('posttxt').value;
//             //creamos una funcion que agregue el post a la base de datos en firestore con los campos: usuario, nombre, post content y hora
//             db.collection("post").doc().update({
//                     usuario: user.uid,
//                     nombre: user.displayName,
//                     postContent: postTxt,   
//                     hora: new Date()
//                 })
//                 // si es exitoso nos muestra en consola el id del post que utilizaremos mas tarde
//                 .then(function(docRef) {
//                     console.log("Document written with ID: ", docRef.id);
//                     let idPost = docRef.id
//                         // getPost(idPost);
//                 })
//                 //si no es exitoso nos muestra en consola el error
//                 .catch(function(error) {
//                     console.error("Error adding document: ", error);
//                 });
//         } else {
//             // No user is signed in.
//             console.log("no hay usuario logueado")

//         }
//     });
// }


// let printPost = user.data() => {
//     let rootPost = document.getElementById('wall-posts');
//     let userUid = JSON.parse(localStorage.getItem('user'));
//     // console.log(userId);    
//     rootPost.innerHTML = '';
//     user.forEach(user.data() => {
//         // console.log(post)
//         if (post.usuario == userUid.uid) {
//             console.log(post.data());
//             let post = post.data();
//             let card = `
//                             <div class="col s12 m7">
//                                 <h2 class="header">post</h2>
//                                 <div class="card horizontal">
//                                 <div class="card-stacked">
//                                     <div class="card-content">
//                                     <p>${post.nombre}</p>
//                                     <p>${post.hora}</p>
//                                     <p>${post.postContent}</p>
//                                     <a class="waves-effect waves-light btn"><i class="material-icons left">cloud</i>button</a>
//                                     </div>
//                                 </div>
//                                 </div>
//                             </div>
//                             `
//             rootPost.insertAdjacentHTML('beforeend', card);
//         } else {
//             let card = `
//                         <div class="col s12 m7">
//                             <h2 class="header">post</h2>
//                             <div class="card horizontal">
//                             <div class="card-stacked">
//                                 <div class="card-content">
//                                 <p>${post.nombre}</p>
//                                 <p>${post.hora}</p>
//                                 <p>${post.postContent}</p>
//                             </div>
//                             </div>
//                             </div>
//                         </div>
//                         `
//         }
//     });
// }