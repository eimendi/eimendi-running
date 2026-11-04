/**
 * Eimendi Running - Pace & Zones Calculator
 * 
 * Reglas matemáticas extraídas de los entrenamientos y tablas locales:
 * 
 * Test de 5 minutos VAM:
 *  - Entrada: Ritmo base T en mm:ss/km (o deducido a partir de los metros recorridos en 5 min).
 *  - T = tiempo en segundos por kilómetro (ej. 4:10 = 250s, 4:40 = 280s).
 * 
 * Zonas:
 *  - Z5 (Máximo / VAM, 91-100% FCMax): T seg/km
 *  - Z4 (Umbral / Series intensas, 81-90% FCMax): T + 30 seg/km
 *  - Z3 (Ritmo Tempo / Tiradas intensas, 71-80% FCMax): T + 60 seg/km
 *  - Z2 (Rodaje aeróbico / Tirada larga, 61-70% FCMax): T + 90 seg/km
 *  - Z1 (Recuperación / Calentamiento, 50-60% FCMax): T + 110 seg/km
 * 
 * Series en pista / llano:
 *  - 1000m: Ritmo aprox. Z5 (T)
 *  - 800m: T - 20 seg/km
 *  - 400m: T - 30 seg/km
 *  - 200m: T - 40 seg/km
 */

/** Convierte "mm:ss" a segundos totales */
export function paceToSeconds(paceStr) {
  if (!paceStr) return 0;
  const parts = paceStr.trim().split(':');
  if (parts.length === 1) {
    return parseInt(parts[0], 10) * 60;
  }
  const min = parseInt(parts[0], 10) || 0;
  const sec = parseInt(parts[1], 10) || 0;
  return min * 60 + sec;
}

/** Convierte segundos a formato "mm:ss" */
export function secondsToPace(totalSeconds) {
  if (isNaN(totalSeconds) || totalSeconds <= 0) return '00:00';
  const rounded = Math.round(totalSeconds);
  const min = Math.floor(rounded / 60);
  const sec = rounded % 60;
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

/** Calcula el ritmo en seg/km dado los metros recorridos en el test de 5 min (300 segundos) */
export function distanceToTestPace(metersIn5Min) {
  if (!metersIn5Min || metersIn5Min <= 0) return 0;
  // Ritmo en seg/km = 300 s / (distancia en km) = (300 * 1000) / metersIn5Min
  return Math.round(300000 / metersIn5Min);
}

/** Deduce los metros recorridos en 5 min a partir del ritmo base T en seg/km */
export function paceToTestDistance(testPaceSeconds) {
  if (!testPaceSeconds || testPaceSeconds <= 0) return 0;
  return Math.round((300 / testPaceSeconds) * 1000);
}

/** Calcula la tabla completa de Zonas Z1-Z5 a partir de T (en segundos) */
export function calculateZones(testPaceSeconds) {
  const T = typeof testPaceSeconds === 'string' ? paceToSeconds(testPaceSeconds) : testPaceSeconds;
  if (!T || T <= 0) return null;

  return {
    Z5: {
      name: 'Zona 5',
      label: 'Ritmo Máximo / VAM',
      rangeFC: '91-100% FCMax',
      seconds: T,
      pace: secondsToPace(T),
      color: '#ef4444', // Red-500
      badgeClass: 'bg-red-500/15 text-red-400 border-red-500/30',
      description: 'Ritmo máximo al que hacemos las series cortas de alta intensidad y sprints.'
    },
    Z4: {
      name: 'Zona 4',
      label: 'Umbral Anaeróbico',
      rangeFC: '81-90% FCMax',
      seconds: T + 30,
      pace: secondsToPace(T + 30),
      color: '#f97316', // Orange-500
      badgeClass: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
      description: 'Series de velocidad y ritmo de competición sostenido.'
    },
    Z3: {
      name: 'Zona 3',
      label: 'Ritmo Tempo',
      rangeFC: '71-80% FCMax',
      seconds: T + 60,
      pace: secondsToPace(T + 60),
      color: '#eab308', // Yellow-500
      badgeClass: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
      description: 'Tiradas vivas y cambios de ritmo intermedios.'
    },
    Z2: {
      name: 'Zona 2',
      label: 'Rodaje Aeróbico',
      rangeFC: '61-70% FCMax',
      seconds: T + 90,
      pace: secondsToPace(T + 90),
      color: '#10b981', // Emerald-500
      badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      description: 'Rodajes largos y base aeróbica que somos capaces de mantener sin dificultades.'
    },
    Z1: {
      name: 'Zona 1',
      label: 'Recuperación / Calentamiento',
      rangeFC: '50-60% FCMax',
      seconds: T + 110,
      pace: secondsToPace(T + 110),
      color: '#06b6d4', // Cyan-500
      badgeClass: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      description: 'Calentamiento, enfriamiento y descansos activos entre series.'
    }
  };
}

/** Calcula la tabla de ritmos y tiempos objetivo para series de pista */
export function calculateSeriesTable(testPaceSeconds) {
  const T = typeof testPaceSeconds === 'string' ? paceToSeconds(testPaceSeconds) : testPaceSeconds;
  if (!T || T <= 0) return [];

  const seriesDef = [
    { distance: 1000, paceSeconds: T, label: '1000m', note: 'Ritmo aprox. Z5 (VAM)' },
    { distance: 800,  paceSeconds: Math.max(60, T - 20), label: '800m', note: 'T - 20s/km' },
    { distance: 400,  paceSeconds: Math.max(45, T - 30), label: '400m', note: 'T - 30s/km' },
    { distance: 200,  paceSeconds: Math.max(30, T - 40), label: '200m', note: 'T - 40s/km' },
  ];

  return seriesDef.map(item => {
    // Tiempo total objetivo en segundos = (ritmo en seg/km) * (distancia en km)
    const targetTimeSec = Math.round(item.paceSeconds * (item.distance / 1000));
    // Tiempo calculado al ritmo base del test T (como en la tabla de 4:10)
    const timeAtBaseTestSec = Math.round(T * (item.distance / 1000));

    return {
      distance: item.distance,
      label: item.label,
      ritmo: secondsToPace(item.paceSeconds),
      ritmoSeconds: item.paceSeconds,
      tiempoObjetivo: secondsToPace(targetTimeSec),
      tiempoBase: secondsToPace(timeAtBaseTestSec),
      note: item.note
    };
  });
}

/** Reemplaza menciones de Z1, Z2, Z3, Z4, Z5 y distancias en la descripción de un entreno por su ritmo calculado */
export function enrichWorkoutWithPaces(workoutText, zones, seriesTable) {
  if (!workoutText || !zones) return workoutText;

  let enriched = workoutText;

  // Reemplazos de Zonas individuales: Z1 -> Z1 [6:00/km]
  enriched = enriched.replace(/\bZ([1-5])\b/g, (match, zoneNum) => {
    const key = `Z${zoneNum}`;
    const z = zones[key];
    if (z) {
      return `${match} (${z.pace}/km)`;
    }
    return match;
  });

  return enriched;
}

