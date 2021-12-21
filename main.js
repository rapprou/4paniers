
        window.onload = function () {
            
            // Déclaration variables
            const basePanier = [
                {
                    id: 1,
                    nom: 'Pommes',
                    prix: 1,
                    img: 'img/pommes1.jpeg'
                },
                {
                    id: 2,
                    nom: 'Onions',
                    prix: 1.2,
                    img: 'img/onion1.jpeg'
                },
                {
                    id: 3,
                    nom: 'Courgette',
                    prix: 2.1,
                    img: 'img/courgette1.jpeg'
                },
                {
                    id: 4,
                    nom: 'Fraises',
                    prix: 0.6,
                    img: 'img/fraise1.jpeg'
                }

            ];

            let cart = [];
            let total = 0;
            const DOMitems = document.querySelector('#items');
            const DOMcart = document.querySelector('#basket');
            const DOMtotal = document.querySelector('#total');
            const DOMboutonVide = document.querySelector('#bouton-vide');

            // Fonctions

            /**
            * * Dessinez tous les produits de la base de données. 
            */
            function renderProducts() {
                basePanier.forEach((info) => {
                    // structure
                    const myNoued = document.createElement('div');
                    myNoued.classList.add('card');
                    // Body
                    const myNouedBody = document.createElement('div');
                    myNouedBody.classList.add('card-body');
                    // Titre
                    const myNoeudTitle = document.createElement('h5');
                    myNoeudTitle.classList.add('card-title');
                    myNoeudTitle.textContent = info.nom;
                    // img
                    const myNoeudImage = document.createElement('img');
                    myNoeudImage.classList.add('img-fluid');
                    myNoeudImage.setAttribute('src', info.img);
                    // prix
                    const myNoeudPrix = document.createElement('p');
                    myNoeudPrix.classList.add('card-text');
                    myNoeudPrix.textContent = info.prix + '€';
                    // Bouton 
                    const myNoeudBouton = document.createElement('button');
                    myNoeudBouton.classList.add('btn', 'btn-info');
                    myNoeudBouton.textContent = '+';
                    myNoeudBouton.setAttribute('marcador', info.id);
                    myNoeudBouton.addEventListener('click', ajouterProduitAuCart);
                    // Insertamos
                    myNouedBody.appendChild(myNoeudImage);
                    myNouedBody.appendChild(myNoeudTitle);
                    myNouedBody.appendChild(myNoeudPrix);
                    myNouedBody.appendChild(myNoeudBouton);
                    myNoued.appendChild(myNouedBody);
                    DOMitems.appendChild(myNoued);
                });
            }

            /**
            * Evénement pour ajouter un produit au panier
            */
            function ajouterProduitAuCart(e) {
                // Ajouter les Noeuds à notre panier
                cart.push(e.target.getAttribute('marcador'))
                // Calcul  total
                calculTotal();
                // Mettre à jour le panier 
                updateCart();

            }

            /**
            * Dessinez tous les produits enregistrés dans le panier
            */
            function updateCart() {
                // Vider tout le html
                DOMcart.textContent = '';
                // Supprimer les doublons
                const panierSansDoublon = [...new Set(cart)];
                // Generer les nœuds à partir du mon panier
                panierSansDoublon.forEach((item) => {
                    // Obtenir l'élément à partir de la variable de base de données
                    const myItem = basePanier.filter((itemBaseDonnee) => {
                        // L'id correspond-il ? Il ne peut y avoir qu'un seul cas.
                        return itemBaseDonnee.id === parseInt(item);
                    });
                    // Compte le nombre de fois où le produit est répété
                    const nombreUnitesItem = cart.reduce((total, itemId) => {
                        // si l'identifiant correspond.. ? J'augmente le compteur, sinon je ne le garde pas
                        return itemId === item ? total += 1 : total;
                    }, 0);
                    // Creer le nœud du produit qui est dans le panier
                    const myNoued = document.createElement('li');
                    myNoued.classList.add('list-group-item', 'text-right', 'mx-2');
                    myNoued.textContent = `${nombreUnitesItem} x ${myItem[0].nom} - ${myItem[0].prix}€`;
                    // Bouton Supprimer
                    const miBoton = document.createElement('button');
                    miBoton.classList.add('btn', 'btn-danger', 'mx-5');
                    miBoton.textContent = 'X';
                    miBoton.style.marginLeft = '1rem';
                    miBoton.dataset.item = item;
                    miBoton.addEventListener('click', supprimerItemCart);
                    // Mélangeons les nœuds
                    myNoued.appendChild(miBoton);
                    DOMcart.appendChild(myNoued);
                });
            }

            /**
            * Event pour supprimer un produit du panier
            */
            function supprimerItemCart(e) {
                // comment obtenir l'ID du produit qui se trouve dans le bouton 
                const id = e.target.dataset.item;
                // Supprimer tous les produits
                cart = cart.filter((myCartId) => {
                    return myCartId !== id;
                });
                // reactualizer le panier
                updateCart();
                // Recalcule le prix
                calculTotal();
            }

            /**
            * 
            * Calculer le prix total en tenant compte des produits répétés
            */
            function calculTotal() {
                // Actualiser le prix précédent
                total = 0;
                // Parcourons le tableau ()array) 
                cart.forEach((item) => {
                    // De chaque élément on obtient son prix
                    const myItem = basePanier.filter((itemBaseDonnee) => {
                        return itemBaseDonnee.id === parseInt(item);
                    });
                    total = total + myItem[0].prix;
                });
                // Rendre le prix 
                DOMtotal.textContent = total.toFixed(2);
            }

            /**
            * Actualiser le panier pour ensuite le rendre visuel 
            */
            function emptyCart() {
                // Supprimer les produits stockés
                cart = [];
                // Reactualiser les changements
                updateCart();
                calculTotal();
            }

            // Event
            DOMboutonVide.addEventListener('click', emptyCart);

            // Start produits
            renderProducts();


        } 
    