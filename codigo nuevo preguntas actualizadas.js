// --- Referencias DOM ---
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const startGameButton = document.getElementById("start-game");
const gameArea = document.getElementById("game-area");
const currentPlayerDisplay = document.getElementById("current-player");
const questionDisplay = document.getElementById("question");
const answerOptions = document.getElementById("answer-options");
const submitAnswerButton = document.getElementById("submit-answer");
const scoreDisplay = document.getElementById("score");
const subjectButtons = document.querySelectorAll(".subject-button");
const playerInputsSection = document.getElementById("player-inputs");
const subjectSection = document.querySelector(".main-card:not(#player-inputs):not(#game-area)");
const subjectNameSpan = document.getElementById("subject-name");
const warningMessage = document.getElementById("warning-message");

// --- Variables ---
let players = [];
let currentPlayerIndex = 0;
let scores = [0, 0];
let questions = [];
let currentQuestionIndex = 0;
let selectedSubject = "";

// --- Nombres materias ---
const subjectNames = {
  sociales: "Ciencias Sociales",
  lectura: "Lectura Crítica",
  ciencias: "Ciencias, Física, Química y Tecnología",
  matematicas: "Matemáticas"
};

// --- Eventos ---
subjectButtons.forEach(btn =>
  btn.addEventListener("click", () => selectSubject(btn.dataset.subject))
);
startGameButton.addEventListener("click", startGame);
submitAnswerButton.addEventListener("click", handleAnswer);

// --- Funciones ---
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function selectSubject(subject) {
  if (subjectQuestions[subject]) {
    selectedSubject = subject;
    questions = shuffle([...subjectQuestions[subject]]); // preguntas aleatorias
    currentQuestionIndex = 0;
    subjectNameSpan.textContent = subjectNames[subject];
    subjectSection.classList.add("hidden");
    playerInputsSection.classList.remove("hidden");
  }
}

function startGame() {
  const player1 = player1Input.value.trim();
  const player2 = player2Input.value.trim();
  if (!player1 || !player2) {
    warningMessage.textContent = "⚠️ Ingresa los nombres de ambos jugadores.";
    return;
  }
  warningMessage.textContent = "";
  players = [player1, player2];
  currentPlayerIndex = Math.floor(Math.random() * 2);
  playerInputsSection.classList.add("hidden");
  gameArea.classList.remove("hidden");
  updateGameArea();
}

function handleAnswer() {
  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) {
    warningMessage.textContent = "⚠️ Por favor, selecciona una respuesta.";
    return;
  }
  warningMessage.textContent = "";
  if (selectedOption.value === currentQuestion.correct) {
    scores[currentPlayerIndex] = Math.min(scores[currentPlayerIndex] + 5, 100);
  } else {
    scores[currentPlayerIndex] = Math.max(scores[currentPlayerIndex] - 10, 0);
  }
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  if (currentQuestionIndex >= questions.length - 1) {
    endGame();
    return;
  }
  currentQuestionIndex++;
  updateGameArea();
}

function updateGameArea() {
  currentPlayerDisplay.textContent = `Turno de: ${players[currentPlayerIndex]}`;
  const currentQuestion = questions[currentQuestionIndex];
  questionDisplay.textContent = currentQuestion.question;
  answerOptions.innerHTML = "";
  currentQuestion.options.forEach(option => {
    const optionLetter = option.charAt(0);
    const optionElement = document.createElement("div");
    optionElement.innerHTML = `<label><input type="radio" name="option" value="${optionLetter}"> ${option}</label>`;
    answerOptions.appendChild(optionElement);
  });
  scoreDisplay.textContent = `Puntajes: ${players[0]}: ${scores[0]} | ${players[1]}: ${scores[1]}`;
}

function endGame() {
  const winner = scores[0] > scores[1] ? players[0] : scores[0] < scores[1] ? players[1] : "Empate";
  const msg = winner === "Empate"
    ? "¡Es un empate!"
    : `🎉 Felicidades ${winner}, ganaste con ${Math.max(...scores)} puntos.`;
  warningMessage.textContent = msg;
  setTimeout(() => location.reload(), 5000);
}

// --- Banco de Preguntas ---
const subjectQuestions = {
  sociales: [
    { question: "En qué periodo histórico se formaron las agremiaciones de Europa occidental", options: ["a) Revolución francesa", "b) Renacimiento", "c) Antigüedad", "d) Reforma protestante"], correct: "b" },
    { question: "El incremento del comercio durante la Edad Media fue muy importante porque", options: ["a) Permitió control sobre la producción y distribución de bienes", "b) Perdió relevancia en las ciudades", "c) Se centraron en religión y filosofía", "d) Fueron absorbidos por autoridades feudales"], correct: "a" },
    { question: "Qué caracteriza a las regiones naturales de Colombia", options: ["a) Economía y progreso", "b) Clima y paisaje geográfico", "c) Flora y límites geográficos", "d) Etnia y cultura"], correct: "b" },
    { question: "El concepto de ciudadanía se caracteriza por", options: ["a) Exclusión social", "b) Promover libertad, igualdad, justicia y participación", "c) Restringir la opinión pública", "d) Evitar la participación política"], correct: "b" },
    { question: "Cuando una persona se aprovecha de su posición de poder para beneficio propio se denomina", options: ["a) Solidaridad", "b) Liderazgo", "c) Empatía", "d) Abuso de autoridad"], correct: "d" },
    { question: "En contextos escolares, la mediación se considera", options: ["a) Un castigo disciplinario", "b) Un enfrentamiento directo", "c) Una herramienta para resolver conflictos", "d) Una falta de respeto"], correct: "c" },
    { question: "Si un estudiante tiene un conflicto y consulta al director de grupo es porque", options: ["a) Busca pelea", "b) Quiere evitar la solución", "c) Favorecerá un diálogo justo y común acuerdo", "d) Prefiere abandonar el conflicto"], correct: "c" },
    { question: "Cuando alguien expresa ideas sobre política se ampara en el derecho a la", options: ["a) Libertad de pensamiento", "b) Propiedad privada", "c) Libre tránsito", "d) Seguridad social"], correct: "a" },
    { question: "Diferencia entre ciudadanía liberal y comunitarista", options: ["a) Ambas excluyen minorías", "b) Son idénticas", "c) Rechazan la participación", "d) Liberal = libertad individual, Comunitarista = identidad colectiva"], correct: "d" },
    { question: "Aumentar el tiempo de recreo afecta rendimiento, ambas coinciden en que", options: ["a) Recreo no importa", "b) Disminuye productividad", "c) Reconocen importancia del bienestar y productividad", "d) No tiene relación"], correct: "c" },
    { question: "La Revolución Industrial significó", options: ["a) Declive de la ciencia", "b) Menos producción", "c) Regreso a modelos feudales", "d) Desarrollo tecnológico y producción en masa"], correct: "d" },
    { question: "Naciones 'civilizadas' hace referencia a", options: ["a) Potencias económicas y políticas dominantes", "b) Tribus indígenas", "c) Comunidades rurales", "d) Grupos religiosos"], correct: "a" },
    { question: "Mantener negociación y cuidado con otros es fundamental porque", options: ["a) Genera más conflictos", "b) Rompe comunicación", "c) Facilita comunicación honesta y constructiva", "d) No tiene importancia"], correct: "c" },
    { question: "Promover justicia social y DDHH en comunidad es fundamental porque", options: ["a) Aumenta la desigualdad", "b) Genera violencia", "c) No cambia nada", "d) Compromiso y solidaridad en pro de comunidad"], correct: "d" },
    { question: "Extraer minerales en territorio indígena genera conflicto por", options: ["a) Beneficio económico", "b) Conservación ambiental vs desarrollo económico", "c) Falta de recursos", "d) Interés político"], correct: "b" },
    { question: "Los indígenas no permiten extracción porque", options: ["a) Respeto a la madre tierra", "b) Negocio", "c) Valor del medio ambiente y madre tierra", "d) Falta de recursos"], correct: "a" }, // CORREGIDA: A
    { question: "Adaptar materiales para invidentes en la escuela es", options: ["a) Excepción", "b) Discriminación", "c) Inclusión social", "d) Desventaja"], correct: "c" }, // CORREGIDA: C
    { question: "Excluir personas con discapacidad genera consecuencias porque", options: ["a) Mejora productividad", "b) Fomenta integración", "c) Fomenta discriminación y obstaculiza integración", "d) No afecta"], correct: "c" },
    { question: "Tips para resolver conflictos son importantes porque", options: ["a) Generan violencia", "b) No ayudan", "c) Son innecesarios", "d) Promueven convivencia pacífica y respetuosa"], correct: "d" },
    { question: "Estado de derecho y social de derecho coinciden en que", options: ["a) Son iguales", "b) Garantizan desigualdad", "c) Buscan justicia e igualdad de oportunidades", "d) No protegen derechos"], correct: "c" }
  ],

  lectura: [
    { question: "La expresión 'Así mismo' se puede reemplazar por", options: ["a) Sin embargo", "b) Al contrario", "c) De la misma manera", "d) Por lo tanto"], correct: "c" },
    { question: "Simbolismo en literatura es", options: ["a) Uso de objetos que representan ideas", "b) Narración objetiva", "c) Explicación literal", "d) Cronología exacta"], correct: "a" },
    { question: "Diferencia entre novela y cuento", options: ["a) Son iguales", "b) Cuento es más largo", "c) Novela más larga y compleja", "d) Novela es más corta"], correct: "c" },
    { question: "Si se habla de osos polares se infiere que ocurre en", options: ["a) Desierto", "b) Selva", "c) Polo norte", "d) Sabana"], correct: "c" },
    { question: "Artículo sobre evolución de Facebook, intención comunicativa", options: ["a) Convencer", "b) Entretener", "c) Informar impacto", "d) Narrar anécdota"], correct: "c" },
    { question: "Definición de Facebook más aceptada", options: ["a) Red social con impacto económico y social", "b) Juego en línea", "c) Aplicación bancaria", "d) Medio de transporte"], correct: "a" },
    { question: "Característica de la ciencia ficción moderna", options: ["a) Relato histórico", "b) Reflexión sobre tecnología y su impacto", "c) Narración romántica", "d) Cuento infantil"], correct: "b" },
    { question: "Pintura con personas al aire libre tiene carácter", options: ["a) Festivo", "b) Triste", "c) Religioso", "d) Bélico"], correct: "a" },
    { question: "Sin embargo puede ser cambiado por", options: ["a) No obstante", "b) Además", "c) Igualmente", "d) En consecuencia"], correct: "a" },
    { question: "No es característica de literatura latinoamericana", options: ["a) Diversidad cultural", "b) Temática estática y sin cambios", "c) Realismo mágico", "d) Denuncia social"], correct: "b" },
    { question: "Aspecto importante de literatura latinoamericana actual", options: ["a) Ausencia de historia", "b) Presencia del Boom", "c) Eliminación de identidad", "d) Desinterés global"], correct: "b" },
    { question: "Documento sobre IA y extinción, tema central", options: ["a) Impacto de la IA en la sociedad", "b) Historia de la computación", "c) Literatura clásica", "d) Arte rupestre"], correct: "a" },
    { question: "Catastrófica se puede reemplazar por", options: ["a) Bonito", "b) Desastroso", "c) Tranquilo", "d) Feliz"], correct: "b" },
    { question: "En una fábula el cuervo está pensativo, actitud", options: ["a) Alegre", "b) Tranquilo", "c) Divertido", "d) Preocupado"], correct: "d" },
    { question: "PopCorn en Latinoamérica se conoce como", options: ["a) Palomitas", "b) Helado", "c) Dulce", "d) Pan"], correct: "a" },
    { question: "Uso de comillas en un texto es para", options: ["a) Decorar", "b) Traducir", "c) Remarcar palabra en inglés", "d) Quitar importancia"], correct: "c" },
    { question: "Niño destapando regalos y sonriendo expresa", options: ["a) Tristeza", "b) Enojo", "c) Confusión", "d) Felicidad"], correct: "d" },
    { question: "Madre con hijo llorando y niña tranquila, intención comunicativa", options: ["a) Mostrar obediencia", "b) Excluir emociones", "c) Comparar familias", "d) Mostrar derecho a expresar emociones"], correct: "d" },
    { question: "Artículo sobre beneficios de fresas en salud es un texto", options: ["a) Narrativo", "b) Poético", "c) Informativo", "d) Humorístico"], correct: "c" },
    { question: "Texto con zorro y cuervo que hablan pertenece a", options: ["a) Crónica", "b) Ensayo", "c) Novela", "d) Fábula"], correct: "d" }
  ],

  ciencias: [
    { question: "Enfermedades mitocondriales generan", options: ["a) Óseas", "b) Musculares y neurológicas", "c) Respiratorias", "d) Cutáneas"], correct: "b" },
    { question: "Importancia de planta de tratamiento de aguas residuales", options: ["a) Disminuye contaminación en ríos", "b) Evita que cultivos se contaminen y prevengan enfermedades", "c) Aumenta uso de químicos", "d) Reduce costos de producción"], correct: "b" }, // CORREGIDA: B
    { question: "Sal en carreteras heladas se debe a", options: ["a) Disminuye punto de congelación del agua", "b) Aumenta temperatura", "c) Hace agua más pura", "d) Genera energía"], correct: "a" },
    { question: "Gravedad en Marte vs Tierra", options: ["a) Igual", "b) Marte mayor", "c) Sin efecto", "d) Tierra mayor gravedad, peso mayor"], correct: "d" },
    { question: "Pelota no rebota igual se debe a", options: ["a) Aire", "b) Energía se transforma en calor y sonido", "c) No hay gravedad", "d) Error humano"], correct: "b" },
    { question: "Tabla periódica organizada en", options: ["a) 7 filas y 18 columnas", "b) 18 filas y 7 columnas", "c) 10 filas y 10 columnas", "d) Aleatoria"], correct: "a" },
    { question: "Empujar carrito vacío y lleno", options: ["a) Igual esfuerzo", "b) Más difícil mover lleno por más masa", "c) Vacío pesa más", "d) No hay diferencia"], correct: "b" },
    { question: "Estrategias de defensa cripsis, aposematismo, mimetismo", options: ["a) cripsis; aposematismo; mimetismo", "b) cripsis; mimetismo; aposematismo", "c) aposematismo; cripsis; mimetismo", "d) mimetismo; cripsis; aposematismo"], correct: "b" }, // CORREGIDA: B
    { question: "Agricultores usan drones →", options: ["a) Juegos", "b) Tecnología aplicada al campo", "c) Arte", "d) Medicina"], correct: "b" },
    { question: "Regar cultivos con aguas residuales puede ser perjudicial porque", options: ["a) Limpia suelos", "b) Contiene sustancias tóxicas", "c) Aumenta producción", "d) Mejora color"], correct: "b" },
    { question: "Globo se pega a la pared porque", options: ["a) Aire caliente", "b) Queda cargado eléctricamente", "c) Gravedad", "d) Vacío"], correct: "b" },
    { question: "Pirámide de energía se usa porque", options: ["a) Explica clima", "b) Muestra crecimiento", "c) Energía disminuye en niveles tróficos", "d) Flujo constante y uniforme"], correct: "d" }, // CORREGIDA: D
    { question: "Mezcla agua, azúcar y limón →", options: ["a) Homogénea", "b) Heterogénea", "c) Compuesta", "d) Elemental"], correct: "a" },
    { question: "Clavo de hierro oxidado se debe a", options: ["a) Agua limpia", "b) Reacción con oxígeno y agua", "c) Luz solar", "d) Frío"], correct: "b" },
    { question: "Agua hierve a 100 °C porque", options: ["a) Se congela", "b) Pasa de líquido a gas", "c) Se evapora solo en mares", "d) Cambia color"], correct: "b" },
    { question: "Red social creada por Google", options: ["a) TikTok", "b) YouTube", "c) Instagram", "d) Twitter"], correct: "b" },
    { question: "Red social asociada a Meta", options: ["a) TikTok", "b) Snapchat", "c) Instagram", "d) Telegram"], correct: "c" },
    { question: "Peso en Tierra ≠ Marte porque", options: ["a) Distancia al sol", "b) Diferencia de gravedad entre planetas", "c) Masa del aire", "d) Rotación"], correct: "b" },
    { question: "Smartphones permiten comunicación instantánea, esto es", options: ["a) Avance tecnológico en comunicación", "b) Problema", "c) Magia", "d) Tradición"], correct: "a" },
    { question: "Águilas son organismos", options: ["a) Autótrofos", "b) Productores", "c) Heterótrofos", "d) Minerales"], correct: "c" }
  ],

  fisica: [],
  quimica: [],
  tecnologia: [],
  matematicas: [
    { question: "Si el resultado de dividir 12 entre -3 es:", options: ["a) -4", "b) 4", "c) -9", "d) 36"], correct: "a" },
    { question: "En geometría, dos figuras son semejantes cuando:", options: ["a) Tienen la misma forma pero distinto tamaño", "b) Son exactamente iguales", "c) Son opuestas", "d) Tienen el mismo perímetro"], correct: "a" },
    { question: "Si 3x = 12, el valor de x es:", options: ["a) 4", "b) 36", "c) 9", "d) 15"], correct: "a" },
    { question: "La raíz cuadrada de 81 es:", options: ["a) 9", "b) 8", "c) -81", "d) 3"], correct: "a" },
    { question: "En una ecuación, la incógnita es:", options: ["a) El valor que se desconoce", "b) El número mayor", "c) El resultado", "d) El divisor"], correct: "a" },
    { question: "Un cuadrilátero que tiene todos sus lados iguales pero no necesariamente ángulos rectos se llama:", options: ["a) Rombo", "b) Cuadrado", "c) Trapecio", "d) Prisma"], correct: "a" },
    { question: "En una gráfica de barras, la altura de cada barra representa:", options: ["a) La frecuencia de un dato", "b) El color de la categoría", "c) El tamaño del eje", "d) El número de variables"], correct: "a" },
    { question: "El conjunto de los números racionales incluye:", options: ["a) Fracciones y decimales finitos o periódicos", "b) Solo números enteros", "c) Raíces irracionales", "d) Números negativos"], correct: "a" },
    { question: "Si duplicamos todos los lados de un cuadrado, el área resultante será:", options: ["a) Cuatro veces mayor", "b) Dos veces mayor", "c) Igual", "d) La mitad"], correct: "a" },
    { question: "En estadística, la moda representa:", options: ["a) El dato que más se repite", "b) El promedio de los datos", "c) El dato menor", "d) El total de la muestra"], correct: "a" },
    { question: "En un triángulo rectángulo, el teorema de Pitágoras permite:", options: ["a) Calcular el lado opuesto a un ángulo recto", "b) Sumar los tres lados", "c) Hallar el perímetro", "d) Determinar el volumen"], correct: "a" },
    { question: "Si el perímetro de un triángulo equilátero es 18 cm, ¿cuánto mide cada lado?", options: ["a) 6 cm", "b) 9 cm", "c) 12 cm", "d) 3 cm"], correct: "a" },
    { question: "Una función lineal se representa comúnmente con la forma:", options: ["a) y = mx + b", "b) y = x²", "c) x = y³", "d) m = a + b"], correct: "a" },
    { question: "En una encuesta, si el 50% de los estudiantes eligen Matemáticas, eso equivale a:", options: ["a) La mitad del grupo", "b) Una cuarta parte", "c) Todos los estudiantes", "d) Ninguno"], correct: "a" },
    { question: "El área de un rectángulo se obtiene:", options: ["a) Multiplicando base por altura", "b) Sumando los lados", "c) Dividiendo la base por 2", "d) Elevando el lado al cubo"], correct: "a" },
    { question: "Una homotecia conserva la forma pero cambia:", options: ["a) El tamaño", "b) Los ángulos", "c) El color", "d) La posición"], correct: "a" },
    { question: "Un número par elevado al cuadrado siempre es:", options: ["a) Par", "b) Impar", "c) Negativo", "d) Primo"], correct: "a" },
    { question: "Un mapa indica que 1 cm representa 5 km en la realidad. Si la distancia entre dos pueblos es de 4 cm en el mapa, ¿cuál es la distancia real?", options: ["a) 20 km", "b) 9 km", "c) 25 km", "d) 1 km"], correct: "a" },
    { question: "Si 2x + 3 = 9, ¿cuál es el valor de x?", options: ["a) 3", "b) 6", "c) 9", "d) 2"], correct: "a" },
    { question: "Al lanzar una moneda, la probabilidad de que salga cara o sello es:", options: ["a) 1/2", "b) 1", "c) 1/3", "d) 0"], correct: "a" }
  ]
}; 

