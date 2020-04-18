var firebaseConfig = {
    apiKey: "AIzaSyDWCEOU324y5NVFKrOQuxw-EgGYx-a8bF0",
    authDomain: "iginuu.firebaseapp.com",
    databaseURL: "https://iginuu.firebaseio.com",
    projectId: "iginuu",
    storageBucket: "iginuu.appspot.com",
    messagingSenderId: "346974463179",
    appId: "1:346974463179:web:ec6ef14a7b99aba569a74e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var firestore = firebase.firestore();
  const docRef = firestore.doc("clima/apiclima");
  const docReftareas = firestore.doc("organizacion/tareas");
  const temperatura = document.querySelector("#temp");
  const humedad = document.querySelector("#humedad");
  //const todomacri = document.querySelector("#tareademacri");
  //const entrada = document.querySelector("#campodetexto");
  //const guardar = document.querySelector("#mandar");
  //const loadbutton = document.querySelector("#loadbutton");
  const temperaturaRtime = document.querySelector("#temprealtime");
  const humedadRtime = document.querySelector("#humrealtime");



  //guardar.addEventListener("click", function(){
  //  const textoSave = entrada.value;
  //  console.log("voy a guardar" + textoSave + "tofirestore");
  //  docReftareas.set({
  //    macri: textoSave 
  //  }).then(function() {
  //    console.log("status saved");
  //  }).catch(function(error){

  //    console.log("tengounerror");

  //  });
    
  //});

  //loadbutton.addEventListener("click", function(){

  //  docReftareas.get().then(function(doc){
  //    if (doc && doc.exists){
  //      const mYdata = doc.data();
  //      todomacri.innerText = mYdata.macri;
  //    }
  //  }).catch(function(error){
  //    console.log("tengo un error", error);
  //  });

  //});



  getRealtimeUpdates = function(){
    docRef.onSnapshot(function(doc){
      if (doc && doc.exists){
        const mYdata = doc.data();
        temperatura.innerText = "Temperatura Open Weather: " + mYdata.temperature + "°";
        humedad.innerText = "Humedad Open Weather: " + mYdata.humedad + "%";

      }

    });
  }

  getRealtimeUpdates();

var realtime = firebase.database();
const realTimeTemp = realtime.ref().child('temperatura_actual');

realTimeTemp.on('value', snap => {
  temperaturaRtime.innerText = "Temperatura: " + snap.val() + "°";
});

const realTimeHum = realtime.ref().child('humedad_actual');

realTimeHum.on('value', snap => {
  humedadRtime.innerText = "Humedad: " + snap.val() + "%";
});
