/**
 * Eimendi Running - Exportación a Calendario (.ICS, Google Calendar y Dispositivos)
 */

import { enrichWorkoutWithPaces } from './paceCalculator.js';

/**
 * Formatea una fecha YYYY-MM-DD y una hora HH:MM a formato UTC o local para iCalendar: YYYYMMDDTHHMMSS
 */
function toICalDate(dateStr, timeStr = "08:00") {
  const cleanDate = dateStr.replace(/-/g, '');
  const cleanTime = timeStr.replace(/:/g, '') + "00";
  return `${cleanDate}T${cleanTime}`;
}

/**
 * Escapa texto según RFC 5545 para archivos .ics
 */
function escapeICalText(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Genera el contenido completo de un archivo .ics para una lista de semanas o entrenamientos
 */
export function generateICalendar(weeks, zones, seriesTable, athleteName = "Atleta Eimendi") {
  let events = [];
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  weeks.forEach(week => {
    week.days.forEach(day => {
      // Omitir días de descanso pasivo para no saturar el calendario personal a menos que el usuario lo prefiera
      if (day.type === 'rest') return;

      const uid = `eimendi-${day.id || Math.random().toString(36).substr(2, 9)}@eimendirunning.com`;
      const dtStart = toICalDate(day.date, "08:00");
      const dtEnd = toICalDate(day.date, "09:15");
      const enrichedWorkout = enrichWorkoutWithPaces(day.workout, zones, seriesTable);
      
      const summary = `[Eimendi] ${day.category || 'Entreno'}: ${day.workout.slice(0, 50)}${day.workout.length > 50 ? '...' : ''}`;
      
      let description = `🏃 EIMENDI RUNNING\n`;
      description += `Semana: ${week.title}\n`;
      description += `Día: ${day.dayName} (${day.date})\n`;
      description += `Tipo: ${day.category}\n\n`;
      description += `📋 ENTRENO DETALLADO:\n${enrichedWorkout}\n\n`;
      if (day.observations) {
        description += `💡 OBSERVACIONES & RITMOS:\n${day.observations}\n\n`;
      }
      if (day.videoUrl) {
        description += `🎥 VÍDEO DE FUERZA: ${day.videoUrl}\n\n`;
      }
      description += `Eider Mendiburu · Eimendi Running`;

      events.push([
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${now}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${escapeICalText(summary)}`,
        `DESCRIPTION:${escapeICalText(description)}`,
        `STATUS:CONFIRMED`,
        `CATEGORIES:Running,Fitness,Eimendi`,
        'END:VEVENT'
      ].join('\r\n'));
    });
  });

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Eimendi Running//Plan de Entrenamiento v1.0//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Eimendi Running - Plan de Entrenamiento',
    'X-WR-TIMEZONE:Europe/Madrid',
    ...events,
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}

/**
 * Descarga en el navegador un archivo .ics
 */
export function downloadICalendarFile(weeks, zones, seriesTable, filename = "eimendi-running-plan.ics") {
  const content = generateICalendar(weeks, zones, seriesTable);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Crea la URL para el botón directo "Añadir a Google Calendar" de una sesión individual
 */
export function createGoogleCalendarUrl(day, weekTitle, zones, seriesTable) {
  const enrichedWorkout = enrichWorkoutWithPaces(day.workout, zones, seriesTable);
  const title = encodeURIComponent(`[Eimendi] ${day.category}: ${day.workout.slice(0, 40)}`);
  
  let details = `🏃 EIMENDI RUNNING\n`;
  details += `Semana: ${weekTitle}\n`;
  details += `Entreno: ${enrichedWorkout}\n`;
  if (day.observations) details += `Observaciones: ${day.observations}\n`;
  if (day.videoUrl) details += `Vídeo: ${day.videoUrl}\n`;
  const detailsEncoded = encodeURIComponent(details);

  const cleanDate = (day.date || '').replace(/-/g, '');
  const dates = `${cleanDate}T080000Z/${cleanDate}T091500Z`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${detailsEncoded}&dates=${dates}`;
}

/**
 * Genera el esquema estructurado para relojes deportivos (Garmin Connect / Coros Training Hub)
 */
export function generateSportsWatchWorkout(day, zones, seriesTable) {
  const enriched = enrichWorkoutWithPaces(day.workout, zones, seriesTable);
  
  return {
    workoutName: `Eimendi - ${day.category} (${day.dayName})`,
    sport: "RUNNING",
    description: `${day.workout} | Obs: ${day.observations || 'Sin notas'}`,
    targetZones: zones,
    rawText: enriched,
    stepsGuide: [
      { step: 1, type: "Calentamiento", text: "1 a 2km Z1 suave para elevar pulsaciones y temperatura muscular" },
      { step: 2, type: "Bloque Principal", text: day.workout },
      { step: 3, type: "Enfriamiento", text: "1km Z1 trote muy suave regenerativo y movilidad articular" }
    ]
  };
}

