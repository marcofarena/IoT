var jason;
var apiobj;
var ndvii;

function cambiarTamaño(){
    imag = document.getElementById("imagen-ndvi");
    imag.width = 400;
    
};

axios.get('http://api.agromonitoring.com/agro/1.0/image/search?start=158468100&end=1585806286&polyid=5e686dc0f6e0ca81cd7089e3&appid=53913c0107e2b16f9bd23a1dec600251')
  .then(response => {
       
  
      jason = response.data;
      apiobj = jason[59];
      ndvii = apiobj.image.ndvi;
      document.getElementById("imagen-ndvi").src = ndvii;
      cambiarTamaño();
});





//




