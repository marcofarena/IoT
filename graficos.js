//import { parse } from "querystring";
  
//realTimeTemp.on('value', snap => {
//  temperaturaRtime.innerText = "Temperatura: " + snap.val() + "°";
//});

//const realTimeHum = realtime.ref().child('humedad_actual');

//realTimeHum.on('value', snap => {
//  humedadRtime.innerText = "Humedad: " + snap.val() + "%";
//});

var d = new Date();
var dia = d.getDate().toString();
var months = d.getMonth() + 1;
var mes = months.toString();
var año = d.getFullYear().toString();

var fecha = dia + "-" + mes + "-" + año;

var humdir = 'humedad/' + fecha;
var tempdir = 'temperatura/' + fecha;

const humRef = realtime.ref().child(humdir);

const tempRef = realtime.ref().child(tempdir);
var tempjson;
tempRef.on('value', snap => {
    tempjson = snap.val() ;
    tetiq = Object.keys(tempjson);
    valorestemp = Object.values(tempjson);
  });


humRef.on('value', snap => {
    humjson = snap.val() ;
    hetiq = Object.keys(humjson);
    valoreshum = Object.values(humjson);
  });



const todo = realtime.ref().child('humedad');

todo.on('value', snap => {
    
  

        var ctx = document.getElementById('myChart').getContext('2d');
                                        var chart = new Chart(ctx, {
                                            // The type of chart we want to create
                                            type: 'line',
                                        
                                            // The data for our dataset
                                            data: {
                                                labels: tetiq,
                                                datasets: [{
                                                    label: 'Temperatura',
                                                    backgroundColor: 'rgb(51, 159, 255)',
                                                    borderColor: 'rgb(51, 159, 255)',
                                                    data: valorestemp
                                                }]
                                            },
                                        
                                            // Configuration options go here
                                            options: {
                                                scales:{
                                                    yAxes:[{
                                                        ticks: {
                                                            max: 60,
                                                            min: 0,

                                                        }
                                                    }]
                                                }
                                            }
                                        });


        var ctx = document.getElementById('myChart2').getContext('2d');
                                        var chart = new Chart(ctx, {
                                            // The type of chart we want to create
                                            type: 'line',
                                        
                                            // The data for our dataset
                                            data: {
                                                labels: hetiq,
                                                datasets: [{
                                                    label: 'Humedad Relativa',
                                                    backgroundColor: 'rgb(51, 255, 156)',
                                                    borderColor: 'rgb(51, 255, 156)',
                                                    data: valoreshum
                                                }]
                                            },
                                        
                                            // Configuration options go here
                                            options: {

                                                scales:{
                                                    yAxes:[{
                                                        ticks: {
                                                            max: 60,
                                                            min: 0,

                                                        }
                                                    }]
                                                }


                                            }
                                        });
                                    });

                                




