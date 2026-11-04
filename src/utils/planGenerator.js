/**
 * Eimendi Running - Generador Inteligente de Planes de Entrenamiento
 * 
 * Adapta dinámicamente los entrenamientos según:
 * 1. Objetivo específico: 5K, 10K, Media Maratón (21K / Behobia), Maratón (42K), Iniciación (CACOs), o Personalizado.
 * 2. Fecha real del evento: Sincroniza desde el lunes de la semana actual hasta el día de la carrera.
 *    Si la carrera es este fin de semana (ej. Behobia), genera la Semana de Competición directa (+ post-carrera).
 * 3. Disponibilidad semanal de carrera (2 a 5 días seleccionables).
 * 4. Deportes cruzados (Crossfit, Gimnasio, Pádel, Ciclismo, etc.):
 *    - Si hace Crossfit 2-3 días, reduce el kilometraje de impacto y adapta las sesiones a calidad pura.
 */

const DAY_NAMES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

/**
 * Obtiene el lunes de la semana de una fecha dada
 */
export function getMondayOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Calcula las semanas exactas entre la semana actual y la fecha de la carrera
 */
export function calculateWeeksToRace(currentDate, raceDateStr) {
  if (!raceDateStr) return 8;
  const currentMonday = getMondayOfWeek(currentDate);
  const raceDate = new Date(raceDateStr);
  raceDate.setHours(0, 0, 0, 0);

  const diffMs = raceDate.getTime() - currentMonday.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Si la carrera es esta misma semana (ej. dentro de los 6 días desde el lunes actual)
  if (diffDays <= 6) {
    return 1;
  }
  return Math.max(1, Math.min(24, Math.ceil(diffDays / 7)));
}

/**
 * Genera el plan completo totalmente adaptado
 */
export function generateAdaptivePlan(profile, currentDate = new Date()) {
  const {
    name = "Eider",
    goal = "half_marathon",
    customGoalName = "",
    raceDate = "",
    runningDays = [0, 3, 5], // Lun, Jue, Sáb por defecto
    hasCrossfit = false,
    crossfitDays = [],
    hasGym = false,
    gymDays = [],
    otherSports = [] // [{ sport: 'Pádel', days: [2] }]
  } = profile;

  const currentMonday = getMondayOfWeek(currentDate);
  let totalWeeks = 12;

  if (raceDate) {
    totalWeeks = calculateWeeksToRace(currentDate, raceDate);
  } else if (goal === '5k') {
    totalWeeks = 6;
  } else if (goal === '10k') {
    totalWeeks = 8;
  } else if (goal === 'marathon') {
    totalWeeks = 16;
  } else if (goal === 'beginner') {
    totalWeeks = 8;
  }

  const isCrossfitAthlete = hasCrossfit && crossfitDays.length > 0;
  const crossfitIntensityNotice = isCrossfitAthlete
    ? "Sesión de running adaptada por fatiga de Crossfit: mantén cadencia ligera (175-180 ppm) y técnica fluida sin impacto forzado."
    : "";

  const weeks = [];

  for (let w = 0; w < totalWeeks; w++) {
    const weekNum = w + 1;
    const isRaceWeek = (w === totalWeeks - 1 && goal !== 'beginner');
    const isTaperWeek = (w === totalWeeks - 2 && goal !== 'beginner' && totalWeeks >= 3);

    // Obtener las sesiones de carrera adaptadas según el objetivo y el volumen
    const runningSessions = getRunningWorkoutsForGoal({
      goal,
      weekIndex: w,
      totalWeeks,
      isRaceWeek,
      isTaperWeek,
      isCrossfitAthlete
    });

    let runIdx = 0;
    const days = [];

    for (let d = 0; d < 7; d++) {
      const dayDate = new Date(currentMonday);
      dayDate.setDate(dayDate.getDate() + (w * 7) + d);
      const dateStr = dayDate.toISOString().split('T')[0];

      const isRunDay = runningDays.includes(d);
      const isCfDay = hasCrossfit && crossfitDays.includes(d);
      const isGymDay = hasGym && gymDays.includes(d);

      let session = {
        id: `w${weekNum}-d${d}`,
        dayIndex: d,
        dayName: DAY_NAMES[d],
        date: dateStr,
        completed: false,
        userNotes: '',
        rating: 5
      };

      if (isRaceWeek && d === 6) {
        // Domingo de carrera
        const goalTitle = customGoalName || getGoalDisplayName(goal);
        session.type = "race";
        session.cat = "Competición";
        session.workout = `¡DÍA DE LA COMPETICIÓN! - ${goalTitle}`;
        session.obs = "¡DISFRUTA! Has llegado en el momento óptimo. Corre con cabeza, confía en tu ritmo y vuela hacia la meta.";
      } else if (isRaceWeek && d === 5) {
        // Sábado activación previa
        session.type = "activation";
        session.cat = "Activación";
        session.workout = "2km Z1 + 2km Z4 + 1km Z1";
        session.obs = "Activación suave previa (5km). Sensaciones sueltas y piernas reactivas para mañana.";
        session.km = 5;
      } else if (isRunDay && runIdx < runningSessions.length) {
        const r = runningSessions[runIdx];
        session.type = r.type;
        session.cat = r.cat;
        session.workout = r.workout;
        session.obs = r.obs + (isCrossfitAthlete ? ` | ${crossfitIntensityNotice}` : '');
        session.km = r.km || null;
        runIdx++;
      } else if (isCfDay) {
        session.type = "crossfit";
        session.cat = "Crossfit / WOD";
        session.workout = "SESIÓN DE CROSSFIT / WOD";
        session.obs = "Prioriza técnica en levantamientos. Evita sobrecargar excesivamente gemelos e isquiotibiales antes de días de carrera.";
      } else if (isGymDay) {
        session.type = "strength";
        session.cat = "Fuerza";
        session.workout = "FUERZA FUNCIONAL & CORE (Rutina Eimendi)";
        session.obs = "Trabajo preventivo de glúteo medio, cuádriceps y estabilidad lumbo-pélvica (40 min).";
      } else {
        session.type = "rest";
        session.cat = "Descanso";
        session.workout = "DESCANSO";
        session.obs = "Descanso total y recuperación muscular.";
      }

      days.push(session);
    }

    let weekTitle = `Semana ${weekNum}`;
    let weekFocus = "";

    if (isRaceWeek) {
      weekTitle = `Semana ${weekNum} - SEMANA DE COMPETICIÓN`;
      weekFocus = "Afilamiento, frescura neuromuscular y el gran día de carrera.";
    } else if (isTaperWeek) {
      weekTitle = `Semana ${weekNum} - Tapering & Descenso`;
      weekFocus = "Reducción estratégica de volumen al 60% para maximizar frescura.";
    } else {
      weekTitle = `Semana ${weekNum} - ${getWeekPhaseName(w, totalWeeks, goal)}`;
      weekFocus = getWeekFocusDescription(w, totalWeeks, goal, isCrossfitAthlete);
    }

    weeks.push({
      weekNum,
      title: weekTitle,
      focus: weekFocus,
      isRaceWeek,
      days
    });
  }

  // Añadir la semana post-competición
  if (goal !== 'beginner') {
    const postW = totalWeeks + 1;
    const postDays = [
      { dayIndex: 0, dayName: "Lunes", type: "rest", cat: "Descanso", workout: "DESCANSO", obs: "Recuperación post-competición" },
      { dayIndex: 1, dayName: "Martes", type: "rest", cat: "Descanso", workout: "DESCANSO", obs: "Descanso pasivo o paseo suave" },
      { dayIndex: 2, dayName: "Miércoles", type: "easy_run", cat: "Rodaje", workout: "8Km Z2", obs: "Easy run muy suave para soltar piernas", km: 8 },
      { dayIndex: 3, dayName: "Jueves", type: "strength", cat: "Fuerza", workout: "FUERZA - Movilidad y Core", obs: "Movilidad articular y trabajo sin impacto" },
      { dayIndex: 4, dayName: "Viernes", type: "test", cat: "Test", workout: "2 km calentamiento a ritmo cómodo Z1 + 5’ a ritmo máximo pero constante + 2 km enfriamiento Z1", obs: "Nuevo Test de 5 min VAM para evaluar tu progresión y recalibrar zonas.", km: 5 },
      { dayIndex: 5, dayName: "Sábado", type: "long_run", cat: "Tirada Larga", workout: "10Km Z2", obs: "Tirada regenerativa suave", km: 10 },
      { dayIndex: 6, dayName: "Domingo", type: "rest", cat: "Descanso", workout: "DESCANSO", obs: "" }
    ].map(d => {
      const dDate = new Date(currentMonday);
      dDate.setDate(dDate.getDate() + (totalWeeks * 7) + d.dayIndex);
      return {
        ...d,
        id: `w${postW}-d${d.dayIndex}`,
        date: dDate.toISOString().split('T')[0],
        completed: false,
        userNotes: '',
        rating: 5
      };
    });

    weeks.push({
      weekNum: postW,
      title: `Semana ${postW} - SEMANA POST-COMPETICIÓN`,
      focus: "Recuperación activa, test de evaluación VAM y consolidación",
      isPostRaceWeek: true,
      days: postDays
    });
  }

  return weeks;
}

/**
 * Devuelve las sesiones de carrera según la distancia objetivo
 */
function getRunningWorkoutsForGoal({ goal, weekIndex, totalWeeks, isRaceWeek, isTaperWeek, isCrossfitAthlete }) {
  // 1. SEMANA DE COMPETICIÓN
  if (isRaceWeek) {
    if (goal === '5k') {
      return [
        { type: "progressive", cat: "Rodaje", workout: "2km Z1 + 2km Z2 + 1km Z3 + 1km Z1", obs: "Rodaje suave de 6km para mantener tono", km: 6 },
        { type: "intervals", cat: "Series", workout: "2km Z1 + 4 x 400 Z4-Z5 + 1km Z1", obs: "Chispazo de velocidad pre-carrera. Descanso 1'30'' entre series.", km: 5 }
      ];
    } else if (goal === '10k') {
      return [
        { type: "progressive", cat: "Rodaje", workout: "2KM Z1 + 2KM Z2 + 2KM Z3 + 1KM Z1", obs: "Progresivo controlado (7km). Sensaciones ágiles.", km: 7 },
        { type: "intervals", cat: "Series", workout: "2KM Z1 + 3 x 1000 Z4 + 5´Z3 + 1KM Z1", obs: "Toque de ritmo 10K. Descanso 1' entre series de 1000m.", km: 7 }
      ];
    } else {
      // Media Maratón / Behobia 20K / Maratón
      return [
        { type: "progressive", cat: "Rodaje", workout: "2KM Z1 + 2KM Z2 + 2KM Z3 + 2KM Z4 + 1KM Z1", obs: "Progresivo controlado (9km). Sensaciones sueltas y fluidas.", km: 9 },
        { type: "intervals", cat: "Series", workout: "2KM Z1 + 4 x 1000 Z4 + 10´Z3 + 1KM Z1", obs: "Toque de ritmo competitivo. Descanso 1´ entre series de 1000m.", km: 8 }
      ];
    }
  }

  // 2. OBJETIVO 10K
  if (goal === '10k') {
    const longKm = isCrossfitAthlete ? Math.min(11, 8 + weekIndex) : Math.min(14, 9 + weekIndex);
    return [
      { type: "intervals", cat: "Series", workout: `2km Z1 + ${4 + Math.min(4, weekIndex)} x 800 Z4 + 1km Z1`, obs: "Series de ritmo 10K. Descanso 1'30'' entre series.", km: 8 },
      { type: "tempo", cat: "Rodaje", workout: "2km Z1 + 5km Z3 + 1km Z1", obs: "Rodaje en zona tempo ritmo constante.", km: 8 },
      { type: "long_run", cat: "Tirada Larga", workout: `${longKm}Km Z2`, obs: `Tirada larga aeróbica para consolidar fondo de 10K.`, km: longKm }
    ];
  }

  // 3. OBJETIVO 5K
  if (goal === '5k') {
    const longKm = isCrossfitAthlete ? 7 : Math.min(10, 6 + weekIndex);
    return [
      { type: "intervals", cat: "Series", workout: `2km Z1 + 8 x 400 Z4-Z5 + 4 x 200 Z5 + 1km Z1`, obs: "Series de velocidad pura y VAM. 1' descanso.", km: 7 },
      { type: "fartlek", cat: "Fartlek", workout: "2km Z1 + 6 x (1' Z5 + 1' Z2) + 1km Z1", obs: "Cambios de ritmo rápidos.", km: 6 },
      { type: "long_run", cat: "Tirada Larga", workout: `${longKm}Km Z2`, obs: "Rodaje de fondo suave.", km: longKm }
    ];
  }

  // 4. OBJETIVO MARATÓN (42K)
  if (goal === 'marathon') {
    const longKm = Math.min(32, 18 + (weekIndex * 1.5));
    return [
      { type: "tempo", cat: "Series", workout: "2km Z1 + 2 x 5000 Z3-Z4 + 1km Z1", obs: "Bloques a ritmo maratón. Recup 3' al trote.", km: 14 },
      { type: "intervals", cat: "Series", workout: "2km Z1 + 6 x 1000 Z4 + 1km Z1", obs: "Series umbral. 1'30'' recup.", km: 9 },
      { type: "long_run", cat: "Tirada Larga", workout: `${Math.round(longKm)}Km Z2 con últimos 4km en Z3`, obs: "Tirada larga de maratón. Probar geles cada 45 min.", km: Math.round(longKm) }
    ];
  }

  // 5. OBJETIVO INICIACIÓN (CACOs)
  if (goal === 'beginner') {
    const cacoLevel = Math.min(10, weekIndex + 1);
    const cacoInterval = [
      "5 x (2' Correr suave Z1-Z2 + 2' Caminar)",
      "5 x (3' Correr suave Z1-Z2 + 2' Caminar)",
      "4 x (4' Correr suave Z2 + 2' Caminar)",
      "4 x (5' Correr suave Z2 + 1'30'' Caminar)",
      "3 x (7' Correr suave Z2 + 2' Caminar)",
      "3 x (10' Correr suave Z2 + 2' Caminar)",
      "2 x (15' Correr Z2 + 2' Caminar)",
      "25' Carrera continua Z2 ininterrumpida"
    ][cacoLevel - 1] || "30' Carrera continua Z2";

    return [
      { type: "fartlek", cat: "CACOs", workout: `10' Caminata + ${cacoInterval} + 5' Caminata`, obs: "Caminar y correr. Mantén respiración relajada.", km: 5 },
      { type: "easy_run", cat: "Rodaje Suave", workout: "10' Caminata + 15' Correr Z2 + 5' Caminata", obs: "Ritmo de conversación.", km: 4 },
      { type: "long_run", cat: "Tirada Iniciación", workout: `Calentamiento + ${cacoInterval} + Estiramientos`, obs: "Fin de semana activo.", km: 5 }
    ];
  }

  // 6. DEFAULT: MEDIA MARATÓN (21K) / BEHOBIA 20K (Basado fielmente en la metodología Eimendi)
  const longRunsKm = [10, 12, 14, 12, 16, 16, 18, 18, 20, 19, 14];
  let baseKm = longRunsKm[weekIndex % longRunsKm.length] || 14;
  if (isCrossfitAthlete) {
    baseKm = Math.max(10, Math.round(baseKm * 0.85)); // 15% menos kilometraje para no saturar articulaciones
  }

  return [
    { type: "fartlek", cat: "Fartlek", workout: "2km Z1 + 6 x (1´Z4 + 2´Z2) + 4 x 200m + 1Km Z1", obs: "Fartlek estructurado. 1' descanso en series de 200m.", km: 8 },
    { type: "hills", cat: "Series", workout: "2km Z1 + 10 x 200 (en cuestas) + 1km Z3 + 1km Z1", obs: "Series en cuesta, recuperamos en la bajada trotando suave.", km: 7 },
    { type: "long_run", cat: "Tirada Larga", workout: `${baseKm}Km Z2`, obs: `Tirada larga de preparación para Media Maratón / 20K.`, km: baseKm }
  ];
}

function getWeekPhaseName(weekIndex, totalWeeks, goal) {
  if (weekIndex === 0) return "Adaptación & Calibración VAM";
  if (weekIndex < totalWeeks * 0.5) return "Desarrollo Aeróbico & Fuerza";
  if (weekIndex < totalWeeks * 0.8) return "Carga Específica & Umbral";
  return "Pico de Volumen";
}

function getWeekFocusDescription(weekIndex, totalWeeks, goal, isCrossfitAthlete) {
  if (isCrossfitAthlete) {
    return "Optimización de ritmo y umbral anaeróbico combinando con tus sesiones de Crossfit.";
  }
  return "Consolidación de zonas aeróbicas y resistencia a ritmo sostenido.";
}

export function getGoalDisplayName(goal) {
  switch (goal) {
    case '5k': return 'Preparación 5K';
    case '10k': return 'Preparación 10K';
    case 'half_marathon': return 'Media Maratón (21K / Behobia)';
    case 'marathon': return 'Maratón (42K)';
    case 'beginner': return 'Empezar a Correr (Iniciación)';
    case 'custom': return 'Reto Personalizado';
    default: return 'Objetivo Running';
  }
}
