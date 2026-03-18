module.exports = (note_cc, note_examen, coefficient_cc = 1, coefficient_examen = 2) => {
  if (note_cc === null || note_cc === undefined) note_cc = 0;
  if (note_examen === null || note_examen === undefined) note_examen = 0;
  
  const cc = parseFloat(note_cc);
  const examen = parseFloat(note_examen);
  
  const finale = ((cc * coefficient_cc) + (examen * coefficient_examen)) / (coefficient_cc + coefficient_examen);
  return parseFloat(finale.toFixed(2));
};
