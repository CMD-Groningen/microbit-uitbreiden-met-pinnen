# Micro:bit uitbreiden met pinnen
### Verander de Micro:bit in een Arduino of Makey Makey

https://github.com/CMD-Groningen/microbit-uitbreiden-met-pinnen/assets/5694412/1db22cac-5a21-40f8-b2c6-d2d7c5012b52

Hieronder staan de stappen die je kunt volgen om je project werkend te krijgen. Volg deze instructies om de bestanden te openen, te testen in de browser en de code te downloaden naar de Micro:bit met de aangesloten Tru Components TC-9072548 Sensormodule.

### Benodigdheden:

- Visual Studio Code (VSCode)
- Micro:bit
- Tru Components TC-9072548 Sensormodule
- Micro USB-kabel
- 4 bestanden (meegeleverd) HTML, CSS, Javascript, en de HEX file voor de Micro:bit

### Stappenplan:

#### 1. Voorbereiding

1. **Installeer VSCode**: Download en installeer Visual Studio Code vanaf [de officiële website](https://code.visualstudio.com/).
2. **Maak een projectmap**: Maak een map aan genaamd `project`.

#### 2. Bestanden Plaatsen

1. **HTML Bestand**:

   - Maak een nieuw bestand in de project map genaamd index.html en plak de volgende code erin:

     ```html
     html
     Copy code
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <link rel="stylesheet" href="style.css">
         <title>Test voor Microbit slider</title>
     </head>
     <body>
         <section class="een" id="een">1</section>
         <section class="twee" id="twee">2</section>
         <section class="drie" id="drie">3</section>
         <section class="vier" id="vier">4</section>
         <section class="vijf" id="vijf">5</section>
     </body>
     <script src="javascript.js"></script>
     </html>
     ```

2. **CSS Bestand**:

   - Maak een nieuw bestand in de project map genaamd style.css en voeg je CSS-stijlen toe.

3. **JavaScript Bestand**:

   - Maak een nieuw bestand in de project map genaamd javascript.js en plak de volgende code erin:

     ```javascript
     javascript
     Copy code
     // Define a function to handle key events
     function handleKey(eventKey) {
         const een = document.getElementById("een");
         const twee = document.getElementById("twee");
         const drie = document.getElementById("drie");
         const vier = document.getElementById("vier");
         const vijf = document.getElementById("vijf");
     
         if (eventKey === "L") {
             een.style.display = "grid";
             twee.style.display = "none";
             drie.style.display = "none";
             vier.style.display = "none";
             vijf.style.display = "none";
         } else if (eventKey === "R") {
             een.style.display = "none";
             twee.style.display = "grid";
             drie.style.display = "none";
             vier.style.display = "none";
             vijf.style.display = "none";
         } else if (eventKey === "U") {
             een.style.display = "none";
             twee.style.display = "none";
             drie.style.display = "grid";
             vier.style.display = "none";
             vijf.style.display = "none";
         } else if (eventKey === "D") {
             een.style.display = "none";
             twee.style.display = "none";
             drie.style.display = "none";
             vier.style.display = "grid";
             vijf.style.display = "none";
         } else if (eventKey === "W") {
             een.style.display = "none";
             twee.style.display = "none";
             drie.style.display = "none";
             vier.style.display = "none";
             vijf.style.display = "grid";
         }
     }
     
     // Add event listener to handle keydown events
     document.addEventListener("keydown", function (event) {
         handleKey(event.key.toUpperCase());
     });
     
     // Check if the Web Serial API is supported
     if ("serial" in navigator) {
         const connectButton = document.createElement("button"); // Create a connect button
         connectButton.textContent = "Micro:bit linken"; // Set button text
         document.body.appendChild(connectButton); // Append button to the document body
     
         async function connect() {
             try {
                 const port = await navigator.serial.requestPort();
                 await port.open({ baudRate: 115200 });
     
                 console.log("Er is verbinding met de micro:bit!");
     
                 const decoder = new TextDecoderStream();
                 const inputDone = port.readable.pipeTo(decoder.writable);
                 const inputStream = decoder.readable;
     
                 const reader = inputStream.getReader();
                 let buffer = "";
     
                 while (true) {
                     const { value, done } = await reader.read();
                     if (done) {
                         console.log("Serial poort gesloten");
                         break;
                     }
     
                     if (value) {
                         // Append received data to buffer
                         buffer += value;
     
                         // Process buffer to extract complete lines
                         let newlineIndex;
                         while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
                             const completeLine = buffer.substring(0, newlineIndex).trim();
                             buffer = buffer.substring(newlineIndex + 1);
     
                             if (completeLine) {
                                 console.log("Ontvangen data van micro:bit:", completeLine);
                                 handleKey(completeLine);
                             }
                         }
                     }
                 }
             } catch (error) {
                 console.error("Er is een probleem met het aanroepen van de micro:bit: ", error);
             }
         }
     
         connectButton.addEventListener("click", connect);
     } else {
         console.log("Web Serial API wordt niet ondersteund door deze browser.");
     }
     ```

4. **HEX bestand**:

   - Zorg dat je de HEX file met de Micro:bit code klaar hebt staan. Deze kan je later naar de Micro:bit uploaden.

#### 3. Project Openen en Testen in de Browser

1. **Open VSCode** en open de `project` map.

2. Live Server Extensie

   : Installeer de Live Server extensie in VSCode om je project live te bekijken in de browser.

   - Ga naar de Extensions (Ctrl+Shift+X) en zoek naar "Live Server".
   - Installeer de extensie.

3. Start Live Server

   :

   - Klik met de rechtermuisknop op `index.html` en selecteer "Open with Live Server".
   - Je browser opent nu je project, en je kunt de verschillende secties (1-5) testen door op de knoppen L, R, U, D, en W te drukken.

#### 4. Micro:bit Voorbereiden

1. **Verbind de Micro:bit** met je computer via een Micro USB-kabel.

2. Upload de HEX file:

   - Open de HEX file in de Micro:bit MakeCode editor of een andere geschikte omgeving.
- Download de code naar je Micro:bit.

#### 5. Micro:bit Verbinden met de Browser

1. **Sensormodule Aansluiten**: Verbind de Tru Components TC-9072548 Sensormodule aan de Micro:bit.

2. Verbinding Maken:

   - Open je project in de browser via Live Server.
   - Klik op de "Micro:bit linken" knop om verbinding te maken met de Micro:bit.
   - Wanneer de verbinding tot stand is gebracht, kun je de sensoren op de sensormodule gebruiken om de secties op je webpagina te veranderen.

### Testen

1. **Druk op de verschillende knoppen/sensoren** op de Tru Components TC-9072548 Sensormodule om te controleren of de corresponderende secties op de webpagina veranderen.
2. **Controleer de console** in je browser om te zien of er gegevens van de Micro:bit worden ontvangen.

Met deze stappen zou je project volledig functioneel moeten zijn. Als er problemen zijn, controleer dan de verbindingen en zorg ervoor dat je browser de Web Serial API ondersteunt.
