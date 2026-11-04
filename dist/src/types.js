/**
 * Eimendi Running - Tipos y Modelos de Datos (JSDoc / TypeScript Reference)
 */

/**
 * @typedef {Object} ZoneInfo
 * @property {string} name - Nombre de la zona (ej. "Zona 1")
 * @property {string} label - Descripción resumida (ej. "Rodaje Aeróbico")
 * @property {string} rangeFC - Porcentaje FCMax (ej. "61-70% FCMax")
 * @property {number} seconds - Ritmo en segundos por kilómetro
 * @property {string} pace - Ritmo formateado en "mm:ss" por km
 * @property {string} color - Código de color HEX para interfaz y PDF
 * @property {string} badgeClass - Clases Tailwind para insignias
 * @property {string} description - Instrucciones de uso para el corredor
 */

/**
 * @typedef {Object} SeriesPace
 * @property {number} distance - Distancia en metros (ej. 1000, 800, 400, 200)
 * @property {string} label - Etiqueta descriptiva (ej. "800m")
 * @property {string} ritmo - Ritmo en formato "mm:ss"/km
 * @property {number} ritmoSeconds - Ritmo en seg/km
 * @property {string} tiempoObjetivo - Tiempo estimado total de la serie "mm:ss"
 * @property {string} tiempoBase - Tiempo calculado al ritmo base del test
 * @property {string} note - Nota técnica (ej. "T - 20s/km")
 */

/**
 * @typedef {Object} WorkoutSession
 * @property {string} id - Identificador único de sesión (ej. "w1-d0")
 * @property {number} dayIndex - Día de la semana (0 = Lunes, 6 = Domingo)
 * @property {string} dayName - Nombre del día (ej. "Lunes")
 * @property {string} date - Fecha ISO "YYYY-MM-DD"
 * @property {string} type - Tipo de entreno ("fartlek"|"hills"|"intervals"|"tempo"|"easy_run"|"long_run"|"progressive"|"strength"|"test"|"race"|"rest"|"cross")
 * @property {string} category - Categoría legible ("Fartlek"|"Series"|"Rodaje"|"Tirada Larga"|"Fuerza"|"Test"|"Competición"|"Descanso")
 * @property {string} workout - Detalle del entreno con sintaxis oficial
 * @property {string} observations - Pautas y recomendaciones de recuperación
 * @property {number} [distanceKm] - Kilometraje estimado de la sesión
 * @property {string} [videoUrl] - Enlace a vídeo de Google Drive si es fuerza
 * @property {boolean} completed - Estado de completado
 * @property {string} userNotes - Notas personales o sensaciones del atleta
 * @property {number} [rating] - Calificación de sensaciones (1 a 5 estrellas)
 */

/**
 * @typedef {Object} TrainingWeek
 * @property {number} weekNumber - Número correlativo de semana (1, 2, ..., 12)
 * @property {string} title - Título de la semana
 * @property {string} phase - Fase del macrociclo / mesociclo
 * @property {string} focus - Objetivo y foco fisiológico de la semana
 * @property {boolean} [isRaceWeek] - Flag indicando semana de competición
 * @property {boolean} [isPostRaceWeek] - Flag indicando semana post-carrera
 * @property {WorkoutSession[]} days - Las 7 sesiones de la semana
 */

/**
 * @typedef {Object} UserProfile
 * @property {string} name - Nombre del atleta
 * @property {string} goal - Clave del objetivo ("beginner"|"5k"|"10k"|"half_marathon"|"marathon"|"custom")
 * @property {string} goalLabel - Etiqueta del objetivo
 * @property {string} [customGoalName] - Nombre personalizado del reto (ej. "20K Behobia")
 * @property {string} targetRaceDate - Fecha del objetivo "YYYY-MM-DD"
 * @property {number} totalWeeks - Semanas totales de preparación
 * @property {number[]} runningDays - Días asignados para correr ([0, 3, 5])
 * @property {number[]} strengthDays - Días asignados para fuerza ([1])
 * @property {Array<{sport: string, days: number[]}>} crossTraining - Deportes cruzados
 * @property {string} testPace - Ritmo del test de 5 min VAM en "mm:ss"
 * @property {number} testDistanceMeters - Metros recorridos en los 5 min
 */

