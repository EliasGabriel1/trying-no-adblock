// const express = require('express');
// const app = express();
// const cors = require('cors');
// const ffmpeg = require('fluent-ffmpeg');
// const fs = require('fs');

// app.use(cors());
// app.use(express.json({ limit: '10mb' })); // para receber base64

// let latestFrame = null; // Frame mais recente da câmera
// let waitingClients = []; // Clientes aguardando frames
// let videoFrames = []; // Frames do vídeo MP4
// let currentFrameIndex = 0; // Índice do frame atual do vídeo
// let source = 'camera'; // Fonte atual: 'camera' ou 'video'
// let videoStartTime = null; // Momento em que o vídeo começou

// function extractFrames(videoPath) {

//   console.log()
//   return new Promise((resolve, reject) => {
//     ffmpeg(videoPath)
//       .outputOptions(['-vf', 'fps=10'])
//       .save('frame-%03d.png') // Salva frames como imagens temporárias
//       .on('start', () => {
//         console.log("aq")

//         const frames = fs.readdirSync('.').filter(file => file.startsWith('frame-'));
//         frames.sort();

//         videoFrames = frames.map(file => fs.readFileSync(file, 'base64'));
//         // Remove os arquivos temporários após leitura
//         frames.forEach(file => fs.unlinkSync(file));
//         console.log(`Extraídos ${videoFrames.length} frames do vídeo`);
//         resolve();
//       })
//       .on('error', reject);
//   });
// }

// // Endpoint para receber frames da câmera
// app.post('/upload-frame', (req, res) => {
//   if (source === 'camera') {
//     latestFrame = req.body.frame;
//     // Envia frame para todos os clientes esperando
//     waitingClients.forEach(callback => callback(latestFrame));
//     waitingClients = [];
//   }
//   res.sendStatus(200);
// });

// // Endpoint para obter frames (câmera ou vídeo)
// app.get('/get-frame', (req, res) => {
//   if (source === 'camera' && latestFrame) {
//     res.json({ frame: latestFrame });
//   } else if (source === 'video' && videoFrames.length > 0) {
//     const frame = videoFrames[currentFrameIndex];
//     res.json({ frame: `data:image/png;base64,${frame}` });
//     currentFrameIndex = (currentFrameIndex + 1) % videoFrames.length;

//     // Verifica se 8 segundos se passaram desde o início do vídeo
//     const elapsedTime = (Date.now() - videoStartTime) / 1000;
//     if (elapsedTime >= 8) {
//       source = 'camera'; // Volta para a câmera após 8 segundos
//       currentFrameIndex = 0; // Reseta o índice para o próximo ciclo
//       videoStartTime = null;
//     }
//   } else {
//     // Aguarda até que um frame esteja disponível
//     waitingClients.push((frame) => res.json({ frame }));
//     setTimeout(() => {
//       const index = waitingClients.indexOf(res);
//       if (index !== -1) {
//         waitingClients.splice(index, 1);
//         res.json({ frame: null });
//       }
//     }, 10000); // Timeout de 10s
//   }
// });


// app.post('/start-video', (req, res) => {
//   if (videoFrames.length > 0) {
//     source = 'video';
//     currentFrameIndex = 0;
//     videoStartTime = Date.now();
//     res.sendStatus(200);
//   } else {
//     res.status(500).send('Vídeo não carregado');
//   }
// });



// app.listen(3000, async () => {
//   console.log('Servidor rodando em http://localhost:3000');
//   try {
//     await extractFrames('ad.mp4');
//   } catch (err) {
//     console.error('Erro ao extrair frames:', err);
//   }
// });



const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.json({ limit: '10mb' })); 

let latestFrame = null; 
let waitingClients = [];
let staticImage = null; 
let source = 'camera'; 

function loadStaticImage(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    staticImage = imageBuffer.toString('base64');
    console.log('Imagem estática carregada com sucesso');
  } catch (err) {
    console.error('Erro ao carregar imagem:', err);
  }
}


function startImageCycle() {
  setInterval(() => {
    if (source === 'camera') {
      source = 'image';
      console.log('Exibindo imagem estática');
      setTimeout(() => {
        source = 'camera';
        console.log('Voltando para a câmera');
      }, 6000); 
    }
  }, 30000);
}


app.post('/upload-frame', (req, res) => {
  if (source === 'camera') {
    latestFrame = req.body.frame;
    waitingClients.forEach(callback => callback(latestFrame));
    waitingClients = [];
  }
  res.sendStatus(200);
});


app.get('/get-frame', (req, res) => {
  if (source === 'camera' && latestFrame) {
    res.json({ frame: latestFrame });
  } else if (source === 'image' && staticImage) {
    res.json({ frame: `data:image/png;base64,${staticImage}` });
  } else {

    waitingClients.push((frame) => res.json({ frame }));
    setTimeout(() => {
      const index = waitingClients.indexOf(res);
      if (index !== -1) {
        waitingClients.splice(index, 1);
        res.json({ frame: null });
      }
    }, 10000); 
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
  loadStaticImage('ad.jpg'); 
  startImageCycle();
});