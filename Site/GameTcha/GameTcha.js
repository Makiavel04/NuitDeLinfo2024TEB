let monstres = [];
let compteurErreur = 0;
let compteurTrouve = 0;
let imageActive = null;
let monstreCible = null;
let clicked = false;

// Récupération des monstres du JSON
fetch('data/monstres.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load monsters');
    }
    return response.json();
  })
  .then(data => {
    console.log('Monsters loaded:', data);
    monstres = data;
    if (!monstres.length) {
      console.error('No monsters found in the data!');
      return;
    }
    startCaptcha();
  })
  .catch(error => {
    console.error('Error loading monsters:', error);
  });

function startCaptcha() {
    // Paramétrage du canvas
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
        
    // Vitesse de déplacement
    const speed = 0.6;

    // Choix du monstre cible
    monstreCible = choseMonster();
    console.log('Monstre cible:', monstreCible);
    const cible = document.createElement('img');
    cible.src = monstreCible.image; 
    cible.style.width = '50%';
    cible.style.height = '350%';
    document.querySelector('#target').appendChild(cible);

    // Gestion des clics
  canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (imageActive) {
      const img = imageActive;
      const xStart = img.xStart;
      const yStart = img.yStart;

      if (
        x >= xStart &&
        x <= xStart + img.width &&
        y >= yStart &&
        y <= yStart + img.height
      ) {
        clicked = true;
        if (img.goodTarget) {
          compteurTrouve++;
          console.log('Bonne cible ! Trouvée :', compteurTrouve);
        } else {
          compteurErreur++;
          console.log('Mauvaise cible ! Erreurs :', compteurErreur);
        }
        if (compteurTrouve >= 3) {
          alert('CAPTCHA validé ! 🎉');
          return;
        }
        if (compteurErreur >= 3) {
          alert('CAPTCHA échoué. 😢');
          return;
        }
      }
    }
  });

  // Lancement du jeu
  startGame(canvas, ctx, speed, monstreCible);
}

function startGame(canvas, ctx, speed) {
  const monstre = choseMonster();
  const goodTarget = monstre === monstreCible;
  const img = new Image();
  img.src = monstre.image;
  img.onload = () => {
    const [xStart, yStart] = generatePosition(canvas);
    const [xEnd, yEnd] = generateDirection([xStart, yStart], canvas);

    img.goodTarget = goodTarget;
    img.xStart = xStart;
    img.yStart = yStart;
    img.width = 40;
    img.height = 40;

    imageActive = img;

    animate(img, xStart, yStart, xEnd, yEnd, speed, ctx, canvas);
  };
}

function animate(img, xStart, yStart, xEnd, yEnd, speed, ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, xStart, yStart, img.width, img.height);

  const dx = xEnd - xStart;
  const dy = yEnd - yStart;
  speed=1;
  if (!clicked && 
    (Math.abs(img.xStart) >= 0 && Math.abs(img.xStart) <= canvas.width) ||
    (Math.abs(img.yStart) >= 0 && Math.abs(img.yStart) <= canvas.height)){
    xStart += speed;
    yStart += speed;
    img.xStart = xStart;
    img.yStart = yStart;
    requestAnimationFrame(() =>
      animate(img, xStart, yStart, xEnd, yEnd, speed, ctx, canvas)
    );
  } else {
    if (compteurErreur < 3 && compteurTrouve < 3) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      startGame(canvas, ctx, speed);
    }
  }
  clicked = false;
}

function generatePosition(canvas) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  return [x, y];
}

function generateDirection(position, canvas) {
  const [x, y] = position;
  return [Math.random() * canvas.width, Math.random() * canvas.height];
}

function choseMonster() {
  const index = Math.floor(Math.random() * monstres.length);
  return monstres[index];
}
