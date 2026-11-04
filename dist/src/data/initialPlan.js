/**
 * Eimendi Running - Plantilla Base de Plan de Entrenamientos
 * Extraída fielmente de los PDFs originales (Semanas 1 a 11, Semana Competición y Post-Competición).
 */

export const DEFAULT_PLAN_TEMPLATE = [
  {
    weekNumber: 1,
    title: "Semana 1 - Test de 5 Minutos y Adaptación",
    phase: "Adaptación & Calibración VAM",
    focus: "Test de campo para fijar zonas de ritmo y rodaje aeróbico suave",
    days: [
      { dayIndex: 0, dayName: "Lunes", type: "rest", workout: "DESCANSO", observations: "Recuperación activa o descanso total", category: "Descanso" },
      { 
        dayIndex: 1, 
        dayName: "Martes", 
        type: "strength", 
        workout: "FUERZA - Rutina 1", 
        observations: "Aeróbico & Core funcional", 
        category: "Fuerza",
        videoUrl: "https://drive.google.com/file/d/1JTfupKP8tmrWv_08aNGSSySXzsUu71L9/view?usp=sharing"
      },
      { dayIndex: 2, dayName: "Miércoles", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 3, 
        dayName: "Jueves", 
        type: "test", 
        workout: "2 km calentamiento a ritmo cómodo Z1 + 5’ a ritmo máximo pero constante + 2 km enfriamiento Z1", 
        observations: "Test 5 Minutos VAM. Cronometrar sólo los 5 minutos y registrar el ritmo medio.", 
        category: "Test" 
      },
      { dayIndex: 4, dayName: "Viernes", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 5, 
        dayName: "Sábado", 
        type: "long_run", 
        workout: "10Km Z2", 
        observations: "Tirada larga suave a ritmo cómodo de conversación", 
        category: "Tirada Larga",
        distanceKm: 10
      },
      { dayIndex: 6, dayName: "Domingo", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" }
    ]
  },
  {
    weekNumber: 2,
    title: "Semana 2 - Primer Bloque Fartlek & Cuestas",
    phase: "Desarrollo Aeróbico & Fuerza Muscular",
    focus: "Introducción a cambios de ritmo controlados y fuerza en cuesta",
    days: [
      { 
        dayIndex: 0, 
        dayName: "Lunes", 
        type: "fartlek", 
        workout: "2km Z1 + 6 x (1´Z4 + 2´Z2) + 4 x 200m + 1Km Z1", 
        observations: "Fartlek. En las series de 200m, 1´ de descanso entre ellas.", 
        category: "Fartlek" 
      },
      { 
        dayIndex: 1, 
        dayName: "Martes", 
        type: "strength", 
        workout: "FUERZA - Rutina 2", 
        observations: "Fuerza tren inferior & prevención", 
        category: "Fuerza",
        videoUrl: "https://drive.google.com/file/d/1GOu6OOinjPaAyVi2w_ilAeWqP8Omy2Qq/view?usp=sharing"
      },
      { dayIndex: 2, dayName: "Miércoles", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 3, 
        dayName: "Jueves", 
        type: "hills", 
        workout: "2km Z1 + 10 x 200 (en cuestas) + 1km Z3 + 1km Z1", 
        observations: "Series en cuesta, recuperamos en la bajada trotando suave.", 
        category: "Series" 
      },
      { dayIndex: 4, dayName: "Viernes", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 5, 
        dayName: "Sábado", 
        type: "long_run", 
        workout: "3 x (3Km Z2 + 1km Z4)", 
        observations: "Tirada larga 12km con toques a ritmo de carrera", 
        category: "Tirada Larga",
        distanceKm: 12
      },
      { dayIndex: 6, dayName: "Domingo", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" }
    ]
  },
  {
    weekNumber: 3,
    title: "Semana 3 - Volumen de Cuestas & Fartlek 4'",
    phase: "Potencia & Resistencia a la Fatiga",
    focus: "Aumento progresivo de tiempo en Z4 y series mixtas",
    days: [
      { 
        dayIndex: 0, 
        dayName: "Lunes", 
        type: "hills", 
        workout: "2km Z1 + 10 x 200m Z4 cuestas + 1km Z3 + 8x200m + 2km Z1", 
        observations: "Series en cuesta, recuperamos 1´ entre series.", 
        category: "Series" 
      },
      { 
        dayIndex: 1, 
        dayName: "Martes", 
        type: "strength", 
        workout: "FUERZA - Rutina 3", 
        observations: "Potencia y pliometría suave", 
        category: "Fuerza",
        videoUrl: "https://drive.google.com/file/d/1yQ0fcCMexIJgVgW14b69UBDZk5SP6Cjt/view?usp=sharing"
      },
      { 
        dayIndex: 2, 
        dayName: "Miércoles", 
        type: "fartlek", 
        workout: "2km Z1 + 3 x (4´Z4 + 4´Z2) + 4 x 200m + 1km Z1", 
        observations: "Fartlek largo con transfer final a velocidad", 
        category: "Fartlek" 
      },
      { dayIndex: 3, dayName: "Jueves", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 4, 
        dayName: "Viernes", 
        type: "long_run", 
        workout: "14Km Z2", 
        observations: "Tirada larga aeróbica continua", 
        category: "Tirada Larga",
        distanceKm: 14
      },
      { dayIndex: 5, dayName: "Sábado", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { dayIndex: 6, dayName: "Domingo", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" }
    ]
  },
  {
    weekNumber: 4,
    title: "Semana 4 - Consolidación de Umbral",
    phase: "Umbral & Rodaje Tempo",
    focus: "Rodaje Z3 y tirada larga fraccionada en Z4",
    days: [
      { 
        dayIndex: 0, 
        dayName: "Lunes", 
        type: "fartlek", 
        workout: "2km Z1 + 6 x (2´Z4 + 2´Z2) + 4 x 200m + 1Km Z1", 
        observations: "Fartlek. En las series de 200m, 1´ de descanso.", 
        category: "Fartlek" 
      },
      { 
        dayIndex: 1, 
        dayName: "Martes", 
        type: "strength", 
        workout: "FUERZA - Rutina 4", 
        observations: "Fuerza resistencia para tirada larga", 
        category: "Fuerza",
        videoUrl: "https://drive.google.com/file/d/1g65mMe9OeVKEgybM7mURfcjZw_ZkLjd/view?usp=sharing"
      },
      { 
        dayIndex: 2, 
        dayName: "Miércoles", 
        type: "easy_run", 
        workout: "7km Z3", 
        observations: "Easy run vivo a ritmo tempo", 
        category: "Rodaje",
        distanceKm: 7
      },
      { dayIndex: 3, dayName: "Jueves", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 4, 
        dayName: "Viernes", 
        type: "long_run", 
        workout: "6 x (1km Z4 + 1km Z3)", 
        observations: "Tirada larga 12km con alternancia sostenida Z4/Z3", 
        category: "Tirada Larga",
        distanceKm: 12
      },
      { dayIndex: 5, dayName: "Sábado", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { dayIndex: 6, dayName: "Domingo", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" }
    ]
  },
  {
    weekNumber: 5,
    title: "Semana 5 - Bloques Largos Z3-Z4 & 16km",
    phase: "Carga Progresiva",
    focus: "Tirada larga de 16km y repeticiones de 200m en pista",
    days: [
      { 
        dayIndex: 0, 
        dayName: "Lunes", 
        type: "hills", 
        workout: "2Km Z1 + 10 x 200 en cuestas + 2x (8´Z3-Z4 + 2´Z2) + 1Km Z1", 
        observations: "Series en cuestas + bloque de mantenimiento a umbral", 
        category: "Series" 
      },
      { 
        dayIndex: 1, 
        dayName: "Martes", 
        type: "strength", 
        workout: "FUERZA - Rutina 5", 
        observations: "Cadena posterior & glúteo medio", 
        category: "Fuerza",
        videoUrl: "https://drive.google.com/file/d/1I1Kjy6zq0tUacebrsr0qd3uNXhJGx1Op/view?usp=sharing"
      },
      { 
        dayIndex: 2, 
        dayName: "Miércoles", 
        type: "intervals", 
        workout: "2km Z1 + 16 x 200m + 1km Z1", 
        observations: "Series de velocidad, descanso de 1´ entre cada una", 
        category: "Series" 
      },
      { dayIndex: 3, dayName: "Jueves", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 4, 
        dayName: "Viernes", 
        type: "long_run", 
        workout: "16km Z2", 
        observations: "Tirada larga 16km ritmo Z2 constante", 
        category: "Tirada Larga",
        distanceKm: 16
      },
      { dayIndex: 5, dayName: "Sábado", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { dayIndex: 6, dayName: "Domingo", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" }
    ]
  },
  {
    weekNumber: 6,
    title: "Semana 6 - Series Clave 6x1000m Z4",
    phase: "Ritmo Específico de Competición",
    focus: "Sesión reina de 1000s con recuperación fija y tirada progresiva",
    days: [
      { 
        dayIndex: 0, 
        dayName: "Lunes", 
        type: "intervals", 
        workout: "2km Z1 + 6 x 1000 Z4 + 1Km Z1", 
        observations: "Series clave, 1´30” recuperación entre series", 
        category: "Series" 
      },
      { 
        dayIndex: 1, 
        dayName: "Martes", 
        type: "strength", 
        workout: "FUERZA - Rutina 6", 
        observations: "Potencia de zancada", 
        category: "Fuerza",
        videoUrl: "https://drive.google.com/file/d/1vx-EvvhiEXNgx_5AsSeFYreO54OoSnY/view?usp=sharing"
      },
      { dayIndex: 2, dayName: "Miércoles", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 3, 
        dayName: "Jueves", 
        type: "tempo", 
        workout: "2km Z1 + 7Km Z3 + 1km Z1", 
        observations: "Rodaje controlado en zona tempo Z3", 
        category: "Rodaje",
        distanceKm: 10
      },
      { dayIndex: 4, dayName: "Viernes", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 5, 
        dayName: "Sábado", 
        type: "long_run", 
        workout: "2km Z1 + 6 km Z2 + 6km Z3 + 2km Z1", 
        observations: "Tirada larga 16km progresiva terminando en Z3", 
        category: "Tirada Larga",
        distanceKm: 16
      },
      { dayIndex: 6, dayName: "Domingo", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" }
    ]
  },
  {
    weekNumber: 7,
    title: "Semana 7 - 20' Z4 + Series 400m & Tirada 18km",
    phase: "Volumen Pico Intermedio",
    focus: "Resistencia a ritmo sostenido y tirada larga de 18km",
    days: [
      { 
        dayIndex: 0, 
        dayName: "Lunes", 
        type: "tempo", 
        workout: "2KM Z1 + 10 x 200 (en cuestas) + 20´Z4 + 1KM Z1", 
        observations: "Series en cuesta, recuperamos en bajada + 20 min ritmo carrera Z4", 
        category: "Series" 
      },
      { 
        dayIndex: 1, 
        dayName: "Martes", 
        type: "strength", 
        workout: "FUERZA - Rutina 7", 
        observations: "Trabajo compensatorio y simetría", 
        category: "Fuerza",
        videoUrl: "https://drive.google.com/file/d/1AFsBOsdqE4yV1Xx_a0p5_17IpHdhzUN6/view?usp=sharing"
      },
      { 
        dayIndex: 2, 
        dayName: "Miércoles", 
        type: "intervals", 
        workout: "2KM Z1 + 8 X 400 + 4 X 200 + 1Km Z1", 
        observations: "Series con 1´ de descanso entre cada una", 
        category: "Series" 
      },
      { dayIndex: 3, dayName: "Jueves", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 4, 
        dayName: "Viernes", 
        type: "long_run", 
        workout: "18km Z2", 
        observations: "Tirada larga 18km. Hidratación constante durante el recorrido.", 
        category: "Tirada Larga",
        distanceKm: 18
      },
      { dayIndex: 5, dayName: "Sábado", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { dayIndex: 6, dayName: "Domingo", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" }
    ]
  },
  {
    weekNumber: 8,
    title: "Semana 8 - Fartlek Progresivo In Crescendo",
    phase: "Eficiencia y Control del Ritmo",
    focus: "Series de 5' aumentando zona progresivamente y tirada alterna",
    days: [
      { 
        dayIndex: 0, 
        dayName: "Lunes", 
        type: "fartlek", 
        workout: "2km Z1 + 4 x (5´Z3 y cada serie de 5´ el ritmo más rápido) + 4x200 + 1km Z1", 
        observations: "Ritmo progresivo dentro de cada bloque de 5´", 
        category: "Fartlek" 
      },
      { 
        dayIndex: 1, 
        dayName: "Martes", 
        type: "strength", 
        workout: "FUERZA - Rutina 8", 
        observations: "Activación neuromuscular sin sobrecarga", 
        category: "Fuerza",
        videoUrl: "https://drive.google.com/file/d/1DsTT46vkixPrPJs86V1Yd1T9IZvcu0ml/view?usp=sharing"
      },
      { 
        dayIndex: 2, 
        dayName: "Miércoles", 
        type: "easy_run", 
        workout: "9km Z2", 
        observations: "Easy run regenerativo suave", 
        category: "Rodaje",
        distanceKm: 9
      },
      { dayIndex: 3, dayName: "Jueves", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 4, 
        dayName: "Viernes", 
        type: "long_run", 
        workout: "4Km Z1 + 3 x (3km Z3 + 1km Z2) + 2Km Z1", 
        observations: "Tirada larga 18km con bloques sostenidos Z3", 
        category: "Tirada Larga",
        distanceKm: 18
      },
      { dayIndex: 5, dayName: "Sábado", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { dayIndex: 6, dayName: "Domingo", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" }
    ]
  },
  {
    weekNumber: 9,
    title: "Semana 9 - Pico de Tirada Larga 20km",
    phase: "Pico Máximo de Volumen",
    focus: "Tirada reina de 20km y fartlek piramidal Z3 a Z5",
    days: [
      { 
        dayIndex: 0, 
        dayName: "Lunes", 
        type: "fartlek", 
        workout: "2km Z1 + 5x200 en cuesta + 5 x (3´Z3 + 2´Z2)(Cada serie de 3´ sube de zona: Z3, Z3-Z4, Z4, Z4-Z5, Z5) + 1km Z1", 
        observations: "Series y fartlek ascendente", 
        category: "Fartlek" 
      },
      { 
        dayIndex: 1, 
        dayName: "Martes", 
        type: "strength", 
        workout: "FUERZA - Rutina 9", 
        observations: "Estabilidad total para máxima carga", 
        category: "Fuerza",
        videoUrl: "https://drive.google.com/file/d/1u2uOrhM3yHngRPYqw_K8zO4S7W3g1ZVm/view?usp=sharing"
      },
      { dayIndex: 2, dayName: "Miércoles", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 3, 
        dayName: "Jueves", 
        type: "intervals", 
        workout: "2km Z1 + 12x400 + 4x200 + 1km Z1", 
        observations: "Series. Descanso 1´ entre series andando.", 
        category: "Series" 
      },
      { dayIndex: 4, dayName: "Viernes", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 5, 
        dayName: "Sábado", 
        type: "long_run", 
        workout: "20km Z2", 
        observations: "Tirada máxima previa a la competición. Probar geles y estrategia nutritiva.", 
        category: "Tirada Larga",
        distanceKm: 20
      },
      { dayIndex: 6, dayName: "Domingo", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" }
    ]
  },
  {
    weekNumber: 10,
    title: "Semana 10 - Fraccionado de 800s & Tirada 19km",
    phase: "Intensidad & Volumen Mixto",
    focus: "800s con recuperación activa a ritmo Z2",
    days: [
      { 
        dayIndex: 0, 
        dayName: "Lunes", 
        type: "fartlek", 
        workout: "2km Z1 + 8 x (800 Z4 + 400 Z2) + 4x200 + 1km Z1", 
        observations: "Fartlek + series. Recuperación activa en Z2.", 
        category: "Fartlek" 
      },
      { 
        dayIndex: 1, 
        dayName: "Martes", 
        type: "strength", 
        workout: "FUERZA - Rutina 1", 
        observations: "Mantenimiento funcional", 
        category: "Fuerza",
        videoUrl: "https://drive.google.com/file/d/1JTfupKP8tmrWv_08aNGSSySXzsUu71L9/view?usp=sharing"
      },
      { dayIndex: 2, dayName: "Miércoles", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 3, 
        dayName: "Jueves", 
        type: "easy_run", 
        workout: "10km Z3", 
        observations: "Easy run continuo a ritmo Z3", 
        category: "Rodaje",
        distanceKm: 10
      },
      { dayIndex: 4, dayName: "Viernes", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 5, 
        dayName: "Sábado", 
        type: "long_run", 
        workout: "3km Z1 + 3 x (4Km Z3 + 1km Z2) + 1km Z1", 
        observations: "Tirada larga 19km con cambios de ritmo", 
        category: "Tirada Larga",
        distanceKm: 19
      },
      { dayIndex: 6, dayName: "Domingo", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" }
    ]
  },
  {
    weekNumber: 11,
    title: "Semana 11 - Inicio del Tapering & 30' Z4",
    phase: "Pre-Competición / Tapering Inicial",
    focus: "Toque de ritmo sostenido Z4 y descenso del volumen total",
    days: [
      { 
        dayIndex: 0, 
        dayName: "Lunes", 
        type: "tempo", 
        workout: "2km Z1 + 5x200 Z4 en cuestas + 30´Z4 + 1km Z1", 
        observations: "Series en cuesta + 30 min ritmo de carrera", 
        category: "Series" 
      },
      { 
        dayIndex: 1, 
        dayName: "Martes", 
        type: "strength", 
        workout: "FUERZA - Rutina 2", 
        observations: "Sesión corta de prevención", 
        category: "Fuerza",
        videoUrl: "https://drive.google.com/file/d/1GOu6OOinjPaAyVi2w_ilAeWqP8Omy2Qq/view?usp=sharing"
      },
      { dayIndex: 2, dayName: "Miércoles", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 3, 
        dayName: "Jueves", 
        type: "intervals", 
        workout: "2Km Z1 + 6 x 800 Z4-Z5 + 4 x 200 Z5 + 1km Z1", 
        observations: "Series: descanso 1´30” en las de 800m y 1´ en las de 200m", 
        category: "Series" 
      },
      { dayIndex: 4, dayName: "Viernes", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" },
      { 
        dayIndex: 5, 
        dayName: "Sábado", 
        type: "long_run", 
        workout: "14km Z2", 
        observations: "Tirada larga reducida (tapering). Piernas frescas.", 
        category: "Tirada Larga",
        distanceKm: 14
      },
      { dayIndex: 6, dayName: "Domingo", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" }
    ]
  },
  {
    weekNumber: 12,
    title: "Semana 12 - SEMANA DE COMPETICIÓN",
    phase: "Afilamiento & Competición",
    focus: "Descanso, activación neuromuscular y el gran día de carrera",
    isRaceWeek: true,
    days: [
      { 
        dayIndex: 0, 
        dayName: "Lunes", 
        type: "progressive", 
        workout: "2KM Z1 + 2KM Z2 + 2KM Z3 + 2KM Z4 + 1KM Z1", 
        observations: "Progresivo controlado (9km). Sensaciones sueltas.", 
        category: "Rodaje",
        distanceKm: 9
      },
      { dayIndex: 1, dayName: "Martes", type: "rest", workout: "DESCANSO", observations: "Hidratación y descanso", category: "Descanso" },
      { 
        dayIndex: 2, 
        dayName: "Miércoles", 
        type: "intervals", 
        workout: "2KM Z1 + 4 x 1000 Z4 + 10´Z3 + 1KM Z1", 
        observations: "Series cortas para recordar ritmo de carrera. Descanso 1´ entre series de 1000.", 
        category: "Series" 
      },
      { dayIndex: 3, dayName: "Jueves", type: "rest", workout: "DESCANSO", observations: "Descanso absoluto", category: "Descanso" },
      { dayIndex: 4, dayName: "Viernes", type: "rest", workout: "DESCANSO", observations: "Carga suave de carbohidratos", category: "Descanso" },
      { 
        dayIndex: 5, 
        dayName: "Sábado", 
        type: "activation", 
        workout: "2km Z1 + 2km Z4 + 1km Z1", 
        observations: "Activación corta previa (5km). Buenas sensaciones.", 
        category: "Activación",
        distanceKm: 5
      },
      { 
        dayIndex: 6, 
        dayName: "Domingo", 
        type: "race", 
        workout: "DÍA DE LA COMPETICIÓN", 
        observations: "¡DISFRUTA! Aplica la estrategia de ritmo calculada y confía en todo el entrenamiento realizado.", 
        category: "Competición" 
      }
    ]
  },
  {
    weekNumber: 13,
    title: "Semana 13 - SEMANA POST-COMPETICIÓN",
    phase: "Recuperación Activa & Nuevo Test",
    focus: "Descanso post-carrera y re-calibración de zonas con nuevo test de 5 min",
    isPostRaceWeek: true,
    days: [
      { dayIndex: 0, dayName: "Lunes", type: "rest", workout: "DESCANSO", observations: "Recuperación post-carrera", category: "Descanso" },
      { dayIndex: 1, dayName: "Martes", type: "rest", workout: "DESCANSO", observations: "Paseo o descanso pasivo", category: "Descanso" },
      { 
        dayIndex: 2, 
        dayName: "Miércoles", 
        type: "easy_run", 
        workout: "8Km Z2", 
        observations: "Easy run muy suave para soltar piernas", 
        category: "Rodaje",
        distanceKm: 8
      },
      { 
        dayIndex: 3, 
        dayName: "Jueves", 
        type: "strength", 
        workout: "FUERZA - Rutina 4", 
        observations: "Trabajo suave de movilidad y fuerza sin impacto", 
        category: "Fuerza",
        videoUrl: "https://drive.google.com/file/d/1g65mMe9OeVKEgybM7mURfcjZw_ZkLjd/view?usp=sharing"
      },
      { 
        dayIndex: 4, 
        dayName: "Viernes", 
        type: "test", 
        workout: "2 km calentamiento a ritmo cómodo Z1 + 5’ a ritmo máximo pero constante + 2 km enfriamiento Z1", 
        observations: "Nuevo Test de 5 minutos VAM para comprobar la mejora y actualizar las zonas.", 
        category: "Test" 
      },
      { 
        dayIndex: 5, 
        dayName: "Sábado", 
        type: "long_run", 
        workout: "12Km Z2", 
        observations: "Tirada larga suave regenerativa", 
        category: "Tirada Larga",
        distanceKm: 12
      },
      { dayIndex: 6, dayName: "Domingo", type: "rest", workout: "DESCANSO", observations: "", category: "Descanso" }
    ]
  }
];

