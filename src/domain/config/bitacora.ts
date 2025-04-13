export function obtenerHoraActual() {
    const now = new Date();

    // Obtener hora en Bolivia
    const boliviaTime = new Intl.DateTimeFormat('es-BO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/La_Paz'
    }).formatToParts(now);
  
    const horas = boliviaTime.find(p => p.type === 'hour')?.value ?? '00';
    const minutos = boliviaTime.find(p => p.type === 'minute')?.value ?? '00';
    const segundos = boliviaTime.find(p => p.type === 'second')?.value ?? '00';
  
    // Crear objeto Date válido solo con la hora
    return new Date(`1970-01-01T${horas}:${minutos}:${segundos}`);
  }

  export function obtenerFechaactual() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }