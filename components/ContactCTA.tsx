import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, Calendar, Clock, Mail, Briefcase } from 'lucide-react';

const TEXTURE_URL = "https://raw.githubusercontent.com/ventas13urban-lgtm/impacto-landing-assets/main/fondo%20gris.jpg";

export const ContactCTA: React.FC = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Input refs for auto-focus
  const emailInputRef = useRef<HTMLInputElement>(null);
  const projectInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus logic
  useEffect(() => {
    if (step === 3 && emailInputRef.current) setTimeout(() => emailInputRef.current?.focus(), 300);
    if (step === 4 && projectInputRef.current) setTimeout(() => projectInputRef.current?.focus(), 300);
  }, [step]);

  // --- CALENDAR LOGIC ---
  const calendarDays = useMemo(() => {
    const days = [];
    let d = new Date();
    d.setDate(d.getDate() + 1); 
    while (days.length < 6) { // Show 6 days for cleaner grid
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        days.push({
          dayNum: d.getDate(),
          monthNum: d.getMonth() + 1,
          year: d.getFullYear(),
          dayName: d.toLocaleDateString('es-ES', { weekday: 'long' }),
          shortDay: d.toLocaleDateString('es-ES', { weekday: 'short' }),
          displayDate: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
        });
      }
      d.setDate(d.getDate() + 1);
    }
    return days;
  }, []);

  const baseTimeSlots = ["09:00", "11:00", "13:00", "15:00", "16:30", "18:00"];
  const currentSlots = useMemo(() => {
    if (selectedDate === null) return [];
    const dayData = calendarDays[selectedDate];
    return baseTimeSlots.map((time) => {
      const hash = dayData.dayNum + parseInt(time.replace(':', ''));
      return { time, available: hash % 3 !== 0 };
    });
  }, [selectedDate, calendarDays]);

  // --- NAVIGATION HANDLERS ---
  const nextStep = () => {
    setDirection('forward');
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setDirection('back');
    setStep(prev => prev - 1);
  };

  const handleDateSelect = (idx: number) => {
    setSelectedDate(idx);
    setTimeout(nextStep, 200); // Auto advance
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setTimeout(nextStep, 200); // Auto advance
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email.includes('@') && email.includes('.')) nextStep();
  };

  const handleProjectKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && project.length > 2) handleSubmit();
  };

  // --- SUBMISSION LOGIC ---
  const handleSubmit = async () => {
    if (selectedDate === null || !selectedTime || !email || !project) return;
    
    setStatus('loading');
    
    const dayData = calendarDays[selectedDate];
    const [hrs, mins] = selectedTime.split(':');
    const fechaBase = `${dayData.year}-${String(dayData.monthNum).padStart(2, '0')}-${String(dayData.dayNum).padStart(2, '0')}`;
    
    // Calculate end time
    let endHrs = parseInt(hrs);
    let endMins = parseInt(mins) + 30;
    if (endMins >= 60) { endHrs += 1; endMins -= 60; }
    const endStr = `${String(endHrs).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;

    const details: Record<string, string> = {
      email,
      proyecto: project,
      start_time: `${fechaBase}T${selectedTime}:00-06:00`, 
      end_time: `${fechaBase}T${endStr}:00-06:00`,
      subject: `Asesoría Impacto: ${project}`,
      body_text: `Cita agendada. Proyecto: ${project}. Email: ${email}`,
      fecha_humana: dayData.displayDate,
      hora_humana: `${selectedTime} CDMX`,
      timestamp_envio: new Date().toISOString()
    };

    const formBody = Object.keys(details)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key]))
      .join('&');

    try {
      await fetch('https://n8n.impacto.uno/webhook/leadimpacto', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody,
      });
      // Fake delay for UX
      setTimeout(() => {
        setStatus('success');
      }, 1500);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  // --- RENDER HELPERS ---
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-12 w-full max-w-xl mx-auto">
             <div className="space-y-4">
                <span className="flex items-center gap-3 text-gray-500 font-mono font-light text-xs uppercase tracking-widest">
                  <Calendar className="w-4 h-4"/> Paso 1/4
                </span>
                
                <p className="text-lg md:text-xl text-gray-400 font-mono font-light leading-relaxed tracking-tight">
                  La única manera de empezar es agendando una llamada.
                </p>

                <h3 className="text-3xl md:text-5xl font-mono font-light text-white leading-tight pt-2">
                  Selecciona un día.
                </h3>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {calendarDays.map((day, idx) => (
                   <button 
                     key={idx}
                     onClick={() => handleDateSelect(idx)}
                     className={`
                       group relative p-6 flex flex-col items-start justify-between h-32 border rounded-sm transition-all duration-300
                       ${selectedDate === idx 
                         ? 'bg-white border-white text-black scale-[1.02]' 
                         : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30 hover:text-white'
                       }
                     `}
                   >
                     <span className="text-xs font-mono font-light uppercase tracking-wider">{day.dayName}</span>
                     <span className="text-4xl md:text-5xl font-mono font-light">{day.dayNum}</span>
                   </button>
                ))}
             </div>
          </div>
        );
      case 2:
        return (
           <div className="space-y-12 w-full max-w-xl mx-auto">
             <div className="space-y-4">
                <span className="flex items-center gap-3 text-gray-500 font-mono font-light text-xs uppercase tracking-widest">
                  <Clock className="w-4 h-4"/> Paso 2/4
                </span>
                <h3 className="text-3xl md:text-5xl font-mono font-light text-white leading-tight">
                  ¿A qué hora? <span className="text-gray-500 text-lg block mt-2 tracking-tight">(Zona Horaria CDMX)</span>
                </h3>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentSlots.map((slot, idx) => (
                   <button 
                     key={idx}
                     disabled={!slot.available}
                     onClick={() => handleTimeSelect(slot.time)}
                     className={`
                       py-6 text-center text-xl md:text-2xl font-mono font-light border rounded-sm transition-all duration-300
                       ${!slot.available 
                         ? 'opacity-30 border-transparent cursor-not-allowed decoration-slice line-through' 
                         : selectedTime === slot.time 
                           ? 'bg-white border-white text-black scale-[1.02]' 
                           : 'bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white'
                       }
                     `}
                   >
                     {slot.time}
                   </button>
                ))}
             </div>
          </div>
        );
      case 3: 
        return (
          <div className="space-y-12 w-full max-w-xl mx-auto">
             <div className="space-y-4">
                <span className="flex items-center gap-3 text-gray-500 font-mono font-light text-xs uppercase tracking-widest">
                  <Mail className="w-4 h-4"/> Paso 3/4
                </span>
                <h3 className="text-3xl md:text-5xl font-mono font-light text-white leading-tight">
                  Tu correo corporativo.
                </h3>
             </div>
             <div className="relative">
               <input 
                 ref={emailInputRef}
                 type="email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 onKeyDown={handleEmailKeyDown}
                 placeholder="nombre@empresa.com"
                 className="w-full bg-transparent border-b border-white/20 py-6 text-xl md:text-3xl font-mono font-light text-white placeholder-gray-700 focus:outline-none focus:border-gray-400 transition-colors"
               />
               <button 
                 onClick={nextStep}
                 disabled={!email.includes('@')}
                 className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white disabled:opacity-0 transition-all"
               >
                 <ArrowRight className="w-8 h-8" />
               </button>
             </div>
             <p className="text-xs text-gray-600 font-mono font-light">Presiona Enter ↵</p>
          </div>
        );
      case 4:
         return (
          <div className="space-y-12 w-full max-w-xl mx-auto">
             <div className="space-y-4">
                <span className="flex items-center gap-3 text-gray-500 font-mono font-light text-xs uppercase tracking-widest">
                  <Briefcase className="w-4 h-4"/> Último Paso
                </span>
                <h3 className="text-3xl md:text-5xl font-mono font-light text-white leading-tight">
                  Nombre de la empresa/proyecto.
                </h3>
             </div>
             <div className="relative">
               <input 
                 ref={projectInputRef}
                 type="text" 
                 value={project}
                 onChange={(e) => setProject(e.target.value)}
                 onKeyDown={handleProjectKeyDown}
                 placeholder="Coca Cola."
                 className="w-full bg-transparent border-b border-white/20 py-6 text-xl md:text-3xl font-mono font-light text-white placeholder-gray-700 focus:outline-none focus:border-gray-400 transition-colors"
               />
             </div>
             
             <button 
                onClick={handleSubmit}
                disabled={project.length < 3 || status === 'loading'}
                className="w-full bg-white text-black font-mono font-light uppercase tracking-widest text-sm py-6 mt-8 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 rounded-sm"
             >
                {status === 'loading' ? <Loader2 className="animate-spin w-5 h-5"/> : 'Confirmar Cita'}
             </button>
          </div>
        );
      default: return null;
    }
  };

  // --- SUCCESS VIEW ---
  if (status === 'success') {
    return (
      <div id="contact" className="w-full h-full bg-[#050505] relative z-10 flex items-center justify-center border-l border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black opacity-50"></div>
        <div className="text-center px-8 relative z-10 animate-in zoom-in-95 duration-700">
           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-8 border border-white/10">
              <CheckCircle2 className="w-10 h-10 text-gray-300" />
           </div>
           <h2 className="text-4xl md:text-6xl font-mono font-light text-white uppercase tracking-tighter mb-6">
             ¡Gracias!
           </h2>
           <p className="text-gray-400 font-mono font-light text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
             Hemos recibido tu solicitud. Revisa tu correo <span className="text-white">{email}</span> para confirmar los detalles.
           </p>
           <div className="mt-16 pt-8 border-t border-white/10 flex flex-col items-center gap-3">
              <span className="font-mono font-light text-[10px] uppercase tracking-[0.2em] text-gray-600">Tu Cita</span>
              <p className="text-white font-mono font-light text-xl">
                {calendarDays[selectedDate!]?.displayDate} &mdash; {selectedTime}
              </p>
           </div>
        </div>
      </div>
    );
  }

  // --- WIZARD VIEW ---
  return (
    <div id="contact" className="w-full h-full bg-black text-white relative z-10 overflow-hidden flex flex-col m-0 p-0 border-none">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={TEXTURE_URL} alt="Bg" className="w-full h-full object-cover grayscale brightness-[0.15]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90"></div>
      </div>

      {/* Progress Bar - Subtle Gray */}
      <div className="absolute top-0 left-0 h-0.5 bg-gray-600 transition-all duration-500 ease-out z-20" style={{ width: `${(step / 4) * 100}%` }}></div>

      {/* Content Container */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
         
         {/* Navigation: Back Button */}
         {step > 1 && (
           <button 
             onClick={prevStep}
             className="absolute top-8 left-8 md:left-16 flex items-center gap-2 text-gray-600 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-mono font-light"
           >
             <ArrowLeft className="w-4 h-4" /> Atrás
           </button>
         )}

         {/* Form Step Render with Animation */}
         <div key={step} className={`animate-in fade-in slide-in-from-${direction === 'forward' ? 'right' : 'left'}-8 duration-500 fill-mode-forwards`}>
            {renderStep()}
         </div>

      </div>
    </div>
  );
};