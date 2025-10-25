const owner = "";
const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
const privateKey = "";
const wallet = new ethers.Wallet(privateKey, provider);
const contractAddress = "";
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_first_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_last_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "enum OrganDonation.Organ",
				"name": "_organ",
				"type": "uint8"
			}
		],
		"name": "createDonee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_first_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_last_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "enum OrganDonation.Organ",
				"name": "_organ",
				"type": "uint8"
			}
		],
		"name": "createDonor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "donee",
				"type": "address"
			}
		],
		"name": "Match",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getDonee",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "first_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "last_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "_address",
						"type": "address"
					},
					{
						"internalType": "enum OrganDonation.Organ",
						"name": "organ",
						"type": "uint8"
					},
					{
						"internalType": "enum OrganDonation.PatientType",
						"name": "patientType",
						"type": "uint8"
					}
				],
				"internalType": "struct OrganDonation.Person",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getDonor",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "first_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "last_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "_address",
						"type": "address"
					},
					{
						"internalType": "enum OrganDonation.Organ",
						"name": "organ",
						"type": "uint8"
					},
					{
						"internalType": "enum OrganDonation.PatientType",
						"name": "patientType",
						"type": "uint8"
					}
				],
				"internalType": "struct OrganDonation.Person",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractWithSigner = new ethers.Contract(contractAddress, abi, wallet);
const contract = new ethers.Contract(contractAddress, abi, provider);



let userAccount;

const connectButton = document.getElementById("connect-button");
const sendButtonDonor = document.getElementById("send-button-donor");
const sendButtonDonee = document.getElementById("send-button-donee");



// Funcion para conectar wallet
connectButton.addEventListener("click", async () => {
    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed.");
        return;
    }

    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        userAccount = accounts[0];
        alert("Connected wallet:\n" + userAccount);
    } catch (error) {
        console.error("Error connecting wallet: ", error);
        alert("The wallet could not be connected.");
    }
});



// Funcion para crear nuevo Donor
sendButtonDonor.addEventListener("click", async () => {
    if (!ethers.isAddress(userAccount)) {
        alert("Invalid destination account.");
        return;
    }

    try {
        // Obtenemos los valores ingresados por teclado
        const userDNI = document.getElementById("donor-dni").value;
        const userFirstName = document.getElementById("donor-first-name").value;
        const userLastName = document.getElementById("donor-last-name").value;
        const userEmail = document.getElementById("donor-email").value;
        const userOrgan = document.getElementById("donor-organ").value;

        // Llamar a createDonor
        const tx = await contractWithSigner.createDonor(userDNI, userFirstName, userLastName, userEmail, userAccount, userOrgan);
        console.log("Transaccion en proceso...");

        await tx.wait();
        console.log("Transaccion completada!");
        alert("Usuario creado correctamente!");
        return;
    } catch (error) {
        console.log(contractWithSigner);
        console.log('¿Existe createDonor?', typeof contractWithSigner.createDonor);
        console.error("Error: ", error);
        alert("Error: ", error);
    }
});



// Funcion para crear nuevo Donee
sendButtonDonee.addEventListener("click", async () => {
    if (!ethers.isAddress(userAccount)) {
        alert("Invalid destination account.");
        return;
    }

    try {
        // Obtenemos los valores ingresados por teclado
        const userDNI = document.getElementById("donee-dni").value;
        const userFirstName = document.getElementById("donee-first-name").value;
        const userLastName = document.getElementById("donee-last-name").value;
        const userEmail = document.getElementById("donee-email").value;
        const userOrgan = document.getElementById("donee-organ").value;

        // Llamar a createDonor
        const tx = await contractWithSigner.createDonee(userDNI, userFirstName, userLastName, userEmail, userAccount, userOrgan);
        console.log("Transaccion en proceso...");

        await tx.wait();
        console.log("Transaccion completada!");
        alert("Usuario creado correctamente!");
        return;
    } catch (error) {
        console.error("Error: ", error);
        alert("Error: ", error);
    }
});



// Escuchamos el evento "Match"
contract.on("Match", (timestamp, donor, donee) => {
    alert("Hay un nuevo match!");

    let miliseconds = Number(timestamp) * 1000;
    let fecha = new Date(miliseconds);

    let text = `Fecha: ${fecha}\n Donante: ${donor}\n Receptor: ${donee}`;
    console.log(text);
    const parrafo = document.getElementById("matches-text");
    parrafo.textContent = text;
});
