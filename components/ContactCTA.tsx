import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const TEXTURE_URL = "https://raw.githubusercontent.com/ventas13urban-lgtm/impacto-landing-assets/main/fondo%20gris.jpg";

export const ContactCTA: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    project: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Generar calendario de los próximos 8 días hábiles
  const calendarDays = useMemo(() => {
    const days = [];
    let d = new Date();
    d.setDate(d.getDate() + 1); // Empezar mañana
    
    while (days.length < 8) {
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        days.push({
          dayNum: d.getDate(),
          monthNum: d.getMonth() + 1,
          year: d.getFullYear(),
          dayName: d.toLocaleDateString('es-ES', { weekday: 'short' }).slice(0, 3),
          displayDate: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
        });
      }
      d.setDate(d.getDate() + 1);
    }
    return days;
  }, []);

  const baseTimeSlots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

  const currentSlots = useMemo(() => {
    if (selectedDate === null) return [];
    const dayData = calendarDays[selectedDate];
    return baseTimeSlots.map((time) => {
      // Simulación de disponibilidad sencilla
      const hash = dayData.dayNum + parseInt(time.replace(':', ''));
      return { time, available: hash % 3 !== 0 };
    });
  }, [selectedDate, calendarDays]);

  const handleSubmit = async () => {
    if (selectedDate === null || !selectedTime || !formData.email || !formData.project) return;
    
    setStatus('loading');
    
    const dayData = calendarDays[selectedDate];
    
    // CONSTRUCCIÓN MANUAL DE STRINGS PARA EVITAR SALTOS DE ZONA HORARIA
    // No usamos .toISOString() porque eso convierte a UTC y resta horas (las 10am se vuelven las 4am)
    const fechaLimpia = `${dayData.year}-${String(dayData.monthNum).padStart(2, '0')}-${String(dayData.dayNum).padStart(2, '0')}`;
    const horaLimpia = selectedTime; // "09:00", "10:30", etc.
    
    // Este string es el que n8n debe mapear como fecha/hora principal
    const citaIsoLocal = `${fechaLimpia}T${horaLimpia}:00`; 
    const resumenHumano = `Cita el ${dayData.displayDate} a las ${horaLimpia} (Hora CDMX)`;

    const details: Record<string, string> = {
      lead_email: formData.email,
      lead_proyecto: formData.project,
      cita_fecha_iso: citaIsoLocal,       // Formato: 2024-05-20T10:30:00
      cita_hora_exacta: horaLimpia,       // Formato: 10:30
      cita_fecha_formateada: dayData.displayDate,
      cita_resumen_completo: resumenHumano,
      lead_zona_horaria: "America/Mexico_City",
      lead_source: "Portafolio Impacto Web",
      timestamp_registro: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
    };

    console.log("Payload exacto enviado:", details);

    const formBody = Object.keys(details)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key]))
      .join('&');

    try {
      // Envío optimista (no-cors) para procesar el webhook aunque n8n no responda con headers de CORS
      fetch('https://n8n.impacto.uno/webhook/leadimpacto', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody,
      });

      // Simular éxito inmediato tras el disparo de la petición
      setTimeout(() => {
        setStatus('success');
      }, 1000);

    } catch (error) {
      console.error('Error en el envío:', error);
      setStatus('error');
    }
  };

  const isFormValid = selectedDate !== null && selectedTime !== null && formData.email.length > 5 && formData.project.length > 2;

  return (
    <div id="contact" className="w-full h-full bg-black text-white relative z-10 overflow-hidden flex items-center justify-center m-0 p-0 border-none">
      <div className="absolute inset-0 z-0">
        <img src={TEXTURE_URL} alt="Bg" className="w-full h-full object-cover grayscale brightness-[0.3]" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="w-full h-full px-8 flex flex-col items-center justify-center relative z-10">
        <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tighter mb-8 text-center leading-none uppercase">Asesoría 1 a 1</h2>

        <div className="w-full max-w-sm">
            {status === 'success' ? (
              <div className="bg-black/60 border border-white/10 p-8 rounded-sm backdrop-blur-md flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="w-12 h-12 text-white mb-4" />
                <h3 className="text-2xl font-black mb-1 uppercase">Confirmado.</h3>
                <p className="font-mono text-[10px] text-gray-300 uppercase tracking-widest mt-2">
                  Cita agendada:<br/>{selectedTime} hrs (CDMX)
                </p>
              </div>
            ) : (
              <div className="bg-black/60 border border-white/10 p-5 rounded-sm backdrop-blur-md">
                {status === 'error' && (
                  <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-sm flex items-center gap-3 text-[10px] font-mono uppercase text-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Error de conexión.</span>
                  </div>
                )}
                
                <div className="mb-5">
                  <span className="block font-mono text-[9px] uppercase tracking-widest mb-3 text-gray-400">1. Selecciona Día</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {calendarDays.map((day, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => { setSelectedDate(idx); setStatus('idle'); setSelectedTime(null); }} 
                        className={`p-2 flex flex-col items-center rounded-sm transition-all border ${selectedDate === idx ? 'bg-white border-white text-black' : 'bg-white/5 border-transparent text-gray-400'}`}
                      >
                        <span className="text-[8px] uppercase">{day.dayName}</span>
                        <span className="text-sm font-bold">{day.dayNum}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`mb-5 transition-opacity ${selectedDate !== null ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
                  <span className="block font-mono text-[9px] uppercase tracking-widest mb-3 text-gray-400">2. Selecciona Hora (CDMX)</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {currentSlots.map((slot, idx) => (
                      <button 
                        key={idx} 
                        disabled={!slot.available} 
                        onClick={() => { setSelectedTime(slot.time); setStatus('idle'); }} 
                        className={`p-1.5 text-[10px] font-mono border rounded-sm transition-all ${!slot.available ? 'border-transparent text-gray-800' : selectedTime === slot.time ? 'bg-white border-white text-black' : 'border-white/10 text-gray-400'}`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`space-y-3 transition-opacity ${selectedTime ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
                  <input 
                    type="email" 
                    placeholder="Tu Email" 
                    className="w-full bg-transparent border-b border-white/20 py-2 text-xs focus:outline-none focus:border-white" 
                    onChange={e => { setFormData({...formData, email: e.target.value}); setStatus('idle'); }} 
                  />
                  <input 
                    type="text" 
                    placeholder="Tu Proyecto" 
                    className="w-full bg-transparent border-b border-white/20 py-2 text-xs focus:outline-none focus:border-white" 
                    onChange={e => { setFormData({...formData, project: e.target.value}); setStatus('idle'); }} 
                  />
                  <button 
                    onClick={handleSubmit} 
                    disabled={!isFormValid || status === 'loading'} 
                    className={`w-full py-4 mt-2 font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${isFormValid ? 'bg-white text-black active:scale-95' : 'bg-gray-900 text-gray-700'}`}
                  >
                    {status === 'loading' ? 'Agendando...' : 'Confirmar Cita'}
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};