<style>
        /* Fond général : thème mer et ciel */
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(to bottom, #87CEEB, #4682B4); /* Ciel à océan */
            color: #fff;
            text-align: center;
        }

        /* Conteneur principal */
        .victory-screen {
            width: 80%;
            margin: 50px auto;
            padding: 20px;
            background: rgba(255, 255, 255, 0.2); /* Fond translucide */
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            animation: float 3s infinite ease-in-out; /* Animation de flottement */
        }

        /* Titre de victoire */
        .victory-title {
            font-size: 2.5em;
            font-weight: bold;
            text-shadow: 2px 2px 5px #000;
            margin-bottom: 20px;
        }

        /* Sous-titre */
        .victory-subtitle {
            font-size: 1.5em;
            margin-bottom: 20px;
        }

        /* Bouton pour rejouer */
        .play-again {
            font-size: 1.2em;
            background: #1E90FF;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        }

        .play-again:hover {
            background: #4682B4;
            transform: scale(1.1);
        }

        /* Animation de flottement */
        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        /* Images décoratives */
        .decorative {
            position: absolute;
            opacity: 0.7;
            animation: float 5s infinite ease-in-out;
        }

        .decorative.boat {
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
        }

        .decorative.fish {
            bottom: 10%;
            left: 10%;
            animation-delay: 1s;
        }

        .decorative.seagull {
            top: 5%;
            right: 10%;
            animation-delay: 2s;
        }
    </style>
</head>
<body>
    <!-- Conteneur principal de victoire -->
    <div class="victory-screen">
        <h1 class="victory-title">Félicitations ! Vous avez gagné !</h1>
        <p class="victory-subtitle">Votre bateau a traversé les eaux troubles pour une mer propre.</p>
        <form action="index.php?action=question" method="post">
            <button type="submit" class="play-again">Rejouer</button>
        </form>
    </div>

    <!-- Images décoratives -->
    <img src="./Data/quizz/mouette.png" alt="Mouette" class="decorative seagull">
</body>