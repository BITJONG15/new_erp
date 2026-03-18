exports.calculateMoyenne = (notes) => {
  if (!notes || notes.length === 0) return 0;
  
  let totalPoints = 0;
  let totalCoefficients = 0;
  
  notes.forEach(note => {
    if (note.note_finale !== null && note.matiere && note.matiere.coefficient) {
      totalPoints += note.note_finale * note.matiere.coefficient;
      totalCoefficients += note.matiere.coefficient;
    }
  });
  
  if (totalCoefficients === 0) return 0;
  return (totalPoints / totalCoefficients).toFixed(2);
};
