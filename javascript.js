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
