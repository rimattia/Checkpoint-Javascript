var test=true;
function couleur(monId) {
    var myID = monId; 
    var co = document.getElementById(myID);
    var col = co.style.color;
    if (col == "rgb(255, 0, 0)") {
        test= false;
    }
    else {test = true}
    if (test==true){
        co.style.color  = "#FF0000";
    }
    else if (test==false){
        co.style.color  = "#DCD9D8";
    }
    
}
function add( nom ) { 
    document.getElementById( nom ).value ++; 
    } 
function substract( nom ) { 
    if ( document.getElementById( nom ).value > 0 )
    document.getElementById( nom ).value --; 
} 
     
    function isNumberKey(evt) 
    { 
    var charCode = (evt.which) ? evt.which : event.keyCode 
    if (charCode > 31 && (charCode < 48 || charCode > 57)) 
    return false; 
     
    return true; 
    } 
/* function ajouter au panier*/
var total = 0 ;
var list = [];
var longueur =0;
function ajouter(n){
    var idd2 ="qte"+n;
    var idd1 = "id"+n;
    var idd3="prix"+n;
    var code = document.getElementById(idd1).innerHTML;
    var qte = document.getElementById(idd2).value;
    var pr = document.getElementById(idd3).innerHTML;
    var prix = pr.slice(0,2);
    if (qte>0){
    var exist = -1;
    for (var i =0 ; i<list.length;i++){
        var ab = list[i];
        if (code == ab){
            var exist = i;
        }
    }
    prixligne = qte * prix;

    if (exist ==-1){
        total  = total + prixligne;
        list.push(code,qte,prix,prixligne);
        var tableau = document.getElementById("tableau");
        var ligneTableau = tableau.insertRow(-1);
        var colonne1 = ligneTableau.insertCell(0);
        colonne1.innerHTML = qte ;
        var colonne2 = ligneTableau.insertCell(1);
        colonne2.innerHTML = code ;
        var colonne3 = ligneTableau.insertCell(2);
        colonne3.innerHTML = prixligne;
        var colonne4 = ligneTableau.insertCell(3);
        colonne4.innerHTML += "<button class=\"btn btn-warning\" type=\"submit\" onclick=\"supprimer(this.parentNode.parentNode.cells[1].innerHTML)\"><span class=\"glyphicon glyphicon-remove\"></span> Retirer</button>";
        longueur = longueur +1;
    } 
    else {
        list.splice((exist+1), 1,qte)
        list.splice((exist+3), 1,prixligne)
        total = total - list [exist+3];
        total = total + prixligne;
        var tableau = document.getElementById("tableau");
            for (var j=1; j<=longueur;j++){
                t = tableau.rows[j].cells[1].innerHTML;
                if (t == code){
                    tableau.rows[j].cells[0].innerHTML= qte;
                    tableau.rows[j].cells[2].innerHTML= prixligne;
                }
            }
    }
                
    document.getElementById("prixTotal").innerHTML = total + " TND";
    document.getElementById(idd2).value=1;
    if (qte==1){
        var phrase = qte +' '+ code +" a été ajouté au panier. "
    }
    else {
        var phrase = qte +' '+ code +" ont été ajouté au panier. "
    }
}
else{
    var phrase = "Séléctionnez une quantité svp !"
}
    alert (phrase)

    }
    function supprimer (sup){
        var trouve = -1;
        for (var i =0 ; i<list.length;i++){
            var abc = list[i];
            if (sup== abc){
                var trouve = i;
            }
        }
        prisup = list [trouve+3];
        list.splice(trouve,4);
        total = total - prisup ;
        var tableau = document.getElementById("tableau");
        for (var j=1; j<=longueur;j++){
            t = tableau.rows[j].cells[1].innerHTML;
            if (t == sup){
                document.getElementById('tableau').deleteRow(j);
                longueur = longueur -1;
            }
        }
        if (longueur == 0 ){
        total =0}
        document.getElementById("prixTotal").innerHTML = total + " TND";
    }

    function promo() {
        var prom = document.getElementById("prom").value;
        if (total>0){
            if (prom.toUpperCase()=="PROM55"){
                if (total>50){                
                total = total - 5;
                document.getElementById("prixTotal").innerHTML = total + " TND";
                document.getElementById("prom").value='';
                }
                else{
                    alert("Votre panier est inférieur à 50TND!")
                }
            }
            else {
            alert ("Ce code promo n'est pas valide")
            }
        }
        else {
            alert ("Votre Panier est vide ! ")
        }


    }
    var formValid = document.getElementById('bouton_envoi');
    var non = document.getElementById('inputnom');
    var prenom = document.getElementById('inputprenom');
    var missPrenom = document.getElementById('missPrenom');
    var missnom = document.getElementById('missnom');
    var prenomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    var nomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    var tell = document.getElementById('inputtel')
    var adresse = document.getElementById('inputAdresse');
    var misstel = document.getElementById('misstel');
    
    formValid.addEventListener('click', validation);
    
    function validation(event){
        //Si le champ est vide
        var ville = document.getElementById('inputState').value
        var tel =  document.getElementById('inputtel').value;
        var a = tel.toString();
       var l =a.length;
        if (total>0) {
            if (non.validity.valueMissing){
                event.preventDefault();
                missnom.textContent = 'Nom manquant';
                missnom.style.color = 'red';
            //Si le format de données est incorrect
            }else if (nomValid.test(non.value) == false){
                event.preventDefault();
                missnom.textContent = 'Format incorrect';
                missnom.style.color = 'orange';
            }
            else if (prenom.validity.valueMissing){
                missnom.textContent = '';
                event.preventDefault();
                missPrenom.textContent = 'Prénom manquant';
                missPrenom.style.color = 'red';
            //Si le format de données est incorrect
            }else if (prenomValid.test(prenom.value) == false){
                missnom.textContent = '';
                event.preventDefault();
                missPrenom.textContent = 'Format incorrect';
                missPrenom.style.color = 'orange';
            }
            else if (tell.validity.valueMissing){
                missPrenom.textContent = '';
                event.preventDefault();
                misstel.textContent = 'Numéro de téléphone incorrect';
                misstel.style.color = 'red';
            }
            else if (l<8){
                missPrenom.textContent = '';
                event.preventDefault();
                misstel.textContent = 'Numéro de téléphone incomplet';
                misstel.style.color = 'orange';
            }
            else if (l>8){
                missPrenom.textContent = '';
                event.preventDefault();
                misstel.textContent = 'Numéro de téléphone incorrect';
                misstel.style.color = 'orange';
            }
            else if (adresse.validity.valueMissing){
                    misstel.textContent='';
                    event.preventDefault();
                    missadresse.textContent = 'Adresse manquante';
                    missadresse.style.color = 'red';
            }
            else if (ville=="Choose..."){
                missadresse.textContent='';
                event.preventDefault();
                missville.textContent = 'Sélectionnez une Ville';
                missville.style.color = 'red';
        }
            else{ 
                alert (" Nous avons bien reçu votre commande. Nous vous contacterons au " + tel+".") 
            }
        }
        else {
            alert ("Votre panier est vide !")
        }
       
    }   

