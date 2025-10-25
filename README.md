# OrgaNet — Red Blockchain de Donación de Órganos  
**Proyecto educativo implementado en Solidity y probado con Remix + BSC Testnet**

## 🧩 Descripción
OrgaNet es una **prueba de concepto (PoC)** que utiliza **blockchain** para conectar donantes y receptores de órganos en una red descentralizada.  
El sistema permite registrar usuarios y emparejarlos automáticamente cuando ambos coinciden en el tipo de órgano requerido.  
Todo se realiza **on-chain**, sin servidores centrales, asegurando transparencia y trazabilidad.

## ⚙️ Requisitos
Antes de comenzar, cada usuario que quiera probar el sistema debe tener:
1. **MetaMask** instalada (extensión o aplicación de navegador).  
2. **Configurada la red BSC Testnet**:
   - RPC: `https://data-seed-prebsc-1-s1.binance.org:8545/`
   - Chain ID: `97`
   - Moneda: `tBNB`
   - Explorador: `https://testnet.bscscan.com`
3. Una **cuenta de prueba** con **tBNB** (obtenido desde un faucet).
4. (Opcional) Su **clave privada de prueba**, que deberá **importar en MetaMask** para usar esa cuenta en Remix o el front.

## 🔒 Seguridad
> ⚠️ **Nunca pegues una clave privada dentro del código o el README.**  
> Cada usuario debe importar su clave privada **solo dentro de su MetaMask local**.  
> Este proyecto se ejecuta en **testnet**, pero las buenas prácticas valen igual.

## 🧠 Cómo probar el proyecto paso a paso

### 1️⃣ Configurar MetaMask
1. Abrí MetaMask → *Agregar red manualmente*.  
2. Pegá los datos de BSC Testnet indicados arriba.  
3. Conseguilo fondos de prueba (tBNB) desde el faucet [https://testnet.bnbchain.org/faucet-smart](https://testnet.bnbchain.org/faucet-smart).

### 2️⃣ Importar una cuenta de prueba (si querés usar clave privada)
1. En MetaMask, hacé clic en el ícono del perfil → **Importar cuenta**.  
2. Seleccioná “Clave privada”.  
3. Pegá tu clave privada **de prueba** (no real).  
4. MetaMask agregará esa cuenta lista para firmar transacciones.

### 3️⃣ Desplegar el contrato con Remix
1. Abrí [Remix IDE](https://remix.ethereum.org).  
2. Cargá el archivo `OrganDonation.sol` desde la carpeta `contracts/`.  
3. En el panel izquierdo:
   - Seleccioná el compilador Solidity `^0.8.x`.  
   - Compilá (`Compile OrganDonation.sol`).  
4. En **Deploy & Run Transactions**:
   - **Environment:** *Injected Provider - MetaMask*  
   - Asegurate de estar en **BSC Testnet (Chain ID 97)**.  
   - Hacé clic en **Deploy**.  
   - Confirmá la transacción en MetaMask.
5. Cuando termine, copiá la **dirección del contrato** (por ejemplo `0xAbC123...`).

### 4️⃣ Configurar el front
1. Abrí el archivo `Web/script.js`.  
2. Buscá esta línea:
   ```js
   const CONTRACT_ADDRESS = "0xPEGAAQUI_TU_CONTRATO";
   ```
3. Pegá ahí la **dirección real** del contrato que obtuviste en Remix.  
4. Guardá los cambios.

### 5️⃣ Ejecutar la interfaz
1. Abrí `Web/index.html` directamente en el navegador.  
2. Conectá MetaMask cuando te lo pida.  
3. Cargá los formularios con:
   - DNI / ID  
   - Nombre y apellido  
   - Email (ficticio si querés)  
   - Tipo de órgano (`0 = Sangre`, `1 = Corazón`, `2 = Pulmón`)  
4. Podés crear un **donante** y un **receptor** con el mismo tipo de órgano.  
5. Si hay coincidencia, el contrato emitirá un **evento `Match`**, visible:
   - En la consola del navegador.  
   - En pantalla, dentro del texto de resultados.

## 🧱 Estructura del repositorio
```
OrgaNet/
├─ contracts/
│  └─ OrganDonation.sol        → Contrato inteligente en Solidity
└─ Web/
   ├─ index.html               → Interfaz visual (HTML)
   ├─ script.js                → Lógica de conexión con MetaMask y el contrato
   └─ styles.css               → Estilos visuales
```

## 📈 Funcionamiento técnico
- Los usuarios se registran como **Donantes** o **Receptores**.
- Cada tipo de órgano tiene su **cola FIFO** (primero en entrar, primero en salir).  
- Cuando se registra un nuevo usuario:
  - Si existe contraparte compatible, el contrato emite `Match`.  
  - Si no, queda en espera en la cola correspondiente.
- No se almacenan datos médicos reales; solo identificadores de prueba.

## 🧰 Tecnologías utilizadas
- **Solidity** para el contrato inteligente.  
- **Remix IDE** para compilación y despliegue.  
- **MetaMask** para firma y conexión a la red.  
- **Ethers.js v6** para la interacción desde el front.  
- **BSC Testnet** como entorno blockchain.  
- **HTML / CSS / JS** puro para la interfaz.

## 🪪 Licencia
MIT License — Uso educativo y demostrativo.
