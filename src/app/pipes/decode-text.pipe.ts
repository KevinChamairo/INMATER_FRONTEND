import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeText',
  standalone: true
})
export class DecodeTextPipe implements PipeTransform {
  private dictionary: { [key: string]: string } = {
    'analisis': 'análisis',
    'aplicacion': 'aplicación',
    'dificil': 'difícil',
    'medicacion': 'medicación',
    'evaluacion': 'evaluación',
    'examenes': 'exámenes',
    'planificacion': 'planificación',
    'revision': 'revisión',
    'seguimiento': 'seguimiento',
    'ecografico': 'ecográfico',
    'embarazo': 'embarazo',
    'tratamiento': 'tratamiento',
    'estimulacion': 'estimulación',
    'ovarica': 'ovárica'
  };

  transform(value: string): string {
    if (!value) return '';

    return value.replace(/\b[a-zA-ZáéíóúñÁÉÍÓÚÑ]+\b/g, match => {
      return this.dictionary[match.toLowerCase()] || match;
    });
  }
}
