#include "DHTesp.h"
DHTesp dht;

#include <ESP8266WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#define WIFI_SSID "Casa2020"
#define WIFI_PASSWORD "48472220"
#include <FirebaseArduino.h>
#include <Firebase.h>  
#include <FirebaseArduino.h>  
#include <FirebaseCloudMessaging.h>  
#include <FirebaseError.h>  
#include <FirebaseHttpClient.h>  
#include <FirebaseObject.h>  
#define FIREBASE_HOST "iginuu.firebaseio.com"
#define FIREBASE_AUTH "eGgRuUAeaNyXqds2RNCGjBFz8JSiuMsRkuNXIaik" // secret (40 chars)  

#define MEASURES "apiclima_ahora" // Firebase Realtime Database node to store measures
#define MEASURE_DELAY_SEC 5

const long utcOffsetInSeconds = -10800;

char daysOfTheWeek[7][12] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);



void setup()
{
  Serial.begin(9600);
  Serial.println();
  Serial.println("Status\t\tHumidity (%)\t\tTemperature (C)\t");
  dht.setup(14, DHTesp::DHT11); // GPIO14

  Serial.begin(9600);
  delay(5000);

  // We start by connecting to a WiFi network

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(WIFI_SSID);
  
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  timeClient.begin();

  
  
}

int n = 0;

void loop()
{
  delay(10000);
  timeClient.update();
  String hora = timeClient.getFormattedTime();
  float humidity = dht.getHumidity();
  float temperature = dht.getTemperature();
  
  unsigned long epochTime = timeClient.getEpochTime();
  struct tm *ptm = gmtime ((time_t *)&epochTime);

  int monthDay = ptm->tm_mday;
  int currentMonth = ptm->tm_mon+1;
  int currentHour = timeClient.getHours();
  int currentMinute = timeClient.getMinutes();
  String minuto = String(currentMinute);
  Serial.print("Month: ");
  Serial.println(currentMonth);
  Serial.print("Month day: ");
  Serial.println(monthDay);
  int currentYear = ptm->tm_year+1900;
  Serial.print("Year: ");
  Serial.println(currentYear);
  
  
  Serial.print("Status: ");
  Serial.print(dht.getStatusString());
  Serial.print("\t");
  Serial.print("Humidity (%): ");
  Serial.print(humidity, 1);
  Serial.print("\t");
  Serial.print("Temperature (C): ");
  Serial.print(temperature, 1);
  Serial.print("\t");
  Serial.println();

  String monthday = String(monthDay);
  String currentmonth = String(currentMonth);
  String currentyear = String(currentYear);
  String currenthour = String(currentHour) + ":" + minuto;
  String dia = monthday + "-" + currentmonth + "-" + currentyear+ "/";
  
  String tempdir = "temperatura/" + dia  + currenthour;
  
  String humdir = "humedad/" +  dia  + currenthour;
  
  Firebase.setFloat("humedad_actual", humidity);
  
  Firebase.setFloat("temperatura_actual", temperature);
  
  Firebase.setFloat(humdir, humidity);

  Firebase.setFloat(tempdir, temperature);

  
  
  if (Firebase.failed()) {
      Serial.print("pushing failed:");
      Serial.println(Firebase.error());  
      return;
  }
  
  delay(15000);
}
