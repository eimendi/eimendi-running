/**
 * Eimendi Running - Exportación a PDF de Alta Calidad
 * Utiliza jsPDF y autotable para generar documentos limpios, elegantes y listos para imprimir.
 */

import { enrichWorkoutWithPaces } from './paceCalculator.js';

export function exportPlanToPdf({ weeks, zones, seriesTable, userProfile, targetWeekNumber = null }) {
  // Verificar si jsPDF está disponible globalmente
  const jsPDF = window.jspdf ? window.jspdf.jsPDF : null;

  if (!jsPDF) {
    // Si no está cargado jsPDF, abrimos la vista de impresión del navegador
    alert("Preparando vista de impresión optimizada para PDF...");
    window.print();
    return;
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [15, 23, 42]; // Slate-900
  const accentColor = [16, 185, 129]; // Emerald-500
  const grayColor = [100, 116, 139]; // Slate-500

  // 1. Encabezado de Marca
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 32, 'F');

  // Título de la app
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('EIMENDI RUNNING', 14, 16);

  // Subtítulo
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text('Eider Mendiburu  |  Planificación & Rendimiento Deportivo', 14, 23);

  // Fecha y atleta en la esquina superior derecha
  const athleteName = userProfile?.name || 'Atleta';
  const goalName = userProfile?.goalLabel || 'Plan de Entrenamiento';
  doc.setFontSize(9);
  doc.text(`Atleta: ${athleteName}`, 196, 14, { align: 'right' });
  doc.text(`Objetivo: ${goalName}`, 196, 20, { align: 'right' });
  doc.text(`Generado: ${new Date().toLocaleDateString('es-ES')}`, 196, 26, { align: 'right' });

  let currentY = 40;

  // 2. Resumen de Zonas de Ritmo (Test 5 Minutos VAM)
  if (zones) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...primaryColor);
    doc.text('TABLA DE ZONAS DE RITMO (TEST 5 MIN VAM)', 14, currentY);
    currentY += 4;

    const zonesData = [
      ['Z1', zones.Z1?.pace + ' /km', '50-60%', 'Calentamiento, enfriamiento y recuperación'],
      ['Z2', zones.Z2?.pace + ' /km', '61-70%', 'Rodajes largos aeróbicos y fondo'],
      ['Z3', zones.Z3?.pace + ' /km', '71-80%', 'Ritmo Tempo y tiradas vivas'],
      ['Z4', zones.Z4?.pace + ' /km', '81-90%', 'Umbral anaeróbico y series de velocidad'],
      ['Z5', zones.Z5?.pace + ' /km', '91-100%', 'Ritmo Máximo / Test VAM']
    ];

    if (seriesTable && seriesTable.length > 0) {
      seriesTable.forEach(s => {
        zonesData.push([`Series ${s.label}`, `${s.ritmo} /km`, `Obj: ${s.tiempoObjetivo}`, s.note]);
      });
    }

    doc.autoTable({
      startY: currentY,
      head: [['Zona / Distancia', 'Ritmo Min/Km', '% FCMax / Tiempo', 'Descripción / Uso']],
      body: zonesData,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      margin: { left: 14, right: 14 }
    });

    currentY = doc.lastAutoTable.finalY + 8;
  }

  // 3. Tablas de las Semanas
  const weeksToExport = targetWeekNumber 
    ? weeks.filter(w => w.weekNumber === targetWeekNumber) 
    : weeks.slice(0, 4); // Si no se especifica, exportamos el bloque de 4 semanas

  weeksToExport.forEach((week, wIndex) => {
    // Si queda poco espacio, añadir página
    if (currentY > 230) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.text(week.title.toUpperCase(), 14, currentY);
    
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(...grayColor);
    doc.text(`Enfoque: ${week.focus || 'Fase de entrenamiento'}`, 14, currentY + 4);
    currentY += 7;

    const tableRows = week.days.map(day => {
      const enriched = enrichWorkoutWithPaces(day.workout, zones, seriesTable);
      return [
        `${day.dayName}\n${day.date ? day.date.slice(5) : ''}`,
        day.category || 'Entreno',
        enriched,
        day.observations || (day.type === 'rest' ? 'Descanso' : '-')
      ];
    });

    doc.autoTable({
      startY: currentY,
      head: [['Día', 'Categoría', 'Entrenamiento & Ritmos Calculados', 'Observaciones / Recuperación']],
      body: tableRows,
      theme: 'striped',
      styles: { fontSize: 8, cellPadding: 2.5, valign: 'middle' },
      headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255] },
      columnStyles: {
        0: { cellWidth: 24, fontStyle: 'bold' },
        1: { cellWidth: 26 },
        2: { cellWidth: 80 },
        3: { cellWidth: 50 }
      },
      margin: { left: 14, right: 14 }
    });

    currentY = doc.lastAutoTable.finalY + 8;
  });

  // Pie de página
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Eimendi Running - Entrenamientos diseñados por Eider Mendiburu | Página ${i} de ${pageCount}`,
      105,
      290,
      { align: 'center' }
    );
  }

  // Descarga del PDF
  const filename = targetWeekNumber 
    ? `Eimendi_Running_Semana_${targetWeekNumber}.pdf` 
    : `Eimendi_Running_Plan_${athleteName.replace(/\s+/g, '_')}.pdf`;
  
  doc.save(filename);
}

