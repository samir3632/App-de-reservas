import { useState } from "react";

const TIMES = ["13:00","13:30","14:00","14:30","20:00","20:30","21:00","21:30","22:00"];
const GUESTS = [1,2,3,4,5,6];

function getDays() {
  const days = [];
  const now = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push(d);
  }
  return days;
}

const DAY_NAMES = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
const MONTH_NAMES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

export default function App() {
  const [step, setStep] = useState(0); // 0=date, 1=time+guests, 2=details, 3=confirm
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const days = getDays();

  const canNext0 = selectedDay !== null;
  const canNext1 = selectedTime !== null;
  const canNext2 = name.trim().length > 1 && phone.trim().length > 6;

  const reset = () => { setStep(0); setSelectedDay(null); setSelectedTime(null); setGuests(2); setName(""); setPhone(""); setNotes(""); };

  const styles = {
    app: {
      minHeight: "100vh",
      background: "#0e0b09",
      color: "#f0e6d3",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      display: "flex",
      flexDirection: "column",
      maxWidth: 430,
      margin: "0 auto",
      position: "relative",
      overflow: "hidden",
    },
    header: {
      padding: "48px 28px 24px",
      borderBottom: "1px solid #2a1f14",
    },
    logo: {
      fontSize: 11,
      letterSpacing: 6,
      color: "#c9a96e",
      textTransform: "uppercase",
      marginBottom: 6,
      fontFamily: "'Georgia', serif",
    },
    title: {
      fontSize: 28,
      fontWeight: "normal",
      margin: 0,
      color: "#f0e6d3",
      lineHeight: 1.2,
    },
    subtitle: {
      fontSize: 13,
      color: "#7a6a58",
      marginTop: 8,
      fontFamily: "sans-serif",
      fontWeight: 300,
    },
    body: {
      flex: 1,
      padding: "28px 28px 100px",
      overflowY: "auto",
    },
    sectionLabel: {
      fontSize: 10,
      letterSpacing: 5,
      color: "#c9a96e",
      textTransform: "uppercase",
      marginBottom: 18,
      display: "block",
      fontFamily: "sans-serif",
    },
    daysRow: {
      display: "flex",
      gap: 10,
      overflowX: "auto",
      paddingBottom: 8,
      scrollbarWidth: "none",
    },
    dayCard: (selected) => ({
      minWidth: 58,
      height: 74,
      borderRadius: 14,
      border: selected ? "1.5px solid #c9a96e" : "1px solid #2a1f14",
      background: selected ? "#c9a96e18" : "transparent",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.18s",
      flexShrink: 0,
    }),
    dayName: (selected) => ({
      fontSize: 10,
      letterSpacing: 2,
      color: selected ? "#c9a96e" : "#5a4a3a",
      textTransform: "uppercase",
      fontFamily: "sans-serif",
      marginBottom: 4,
    }),
    dayNum: (selected) => ({
      fontSize: 22,
      color: selected ? "#f0e6d3" : "#7a6a58",
      fontWeight: "normal",
    }),
    dayMonth: (selected) => ({
      fontSize: 10,
      color: selected ? "#c9a96e" : "#5a4a3a",
      fontFamily: "sans-serif",
      letterSpacing: 1,
    }),
    divider: {
      height: 1,
      background: "#2a1f14",
      margin: "28px 0",
    },
    timesGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 10,
    },
    timeBtn: (selected) => ({
      padding: "14px 0",
      borderRadius: 12,
      border: selected ? "1.5px solid #c9a96e" : "1px solid #2a1f14",
      background: selected ? "#c9a96e18" : "transparent",
      color: selected ? "#f0e6d3" : "#7a6a58",
      fontSize: 15,
      cursor: "pointer",
      fontFamily: "'Georgia', serif",
      transition: "all 0.15s",
      letterSpacing: 1,
    }),
    guestsRow: {
      display: "flex",
      gap: 10,
    },
    guestBtn: (selected) => ({
      width: 46,
      height: 46,
      borderRadius: 23,
      border: selected ? "1.5px solid #c9a96e" : "1px solid #2a1f14",
      background: selected ? "#c9a96e" : "transparent",
      color: selected ? "#0e0b09" : "#7a6a58",
      fontSize: 16,
      cursor: "pointer",
      fontFamily: "'Georgia', serif",
      transition: "all 0.15s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    inputWrap: {
      marginBottom: 16,
    },
    inputLabel: {
      display: "block",
      fontSize: 10,
      letterSpacing: 4,
      color: "#7a6a58",
      textTransform: "uppercase",
      fontFamily: "sans-serif",
      marginBottom: 8,
    },
    input: {
      width: "100%",
      background: "transparent",
      border: "none",
      borderBottom: "1px solid #2a1f14",
      color: "#f0e6d3",
      fontSize: 16,
      padding: "10px 0",
      fontFamily: "'Georgia', serif",
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.2s",
    },
    footer: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 430,
      padding: "16px 28px 32px",
      background: "linear-gradient(transparent, #0e0b09 40%)",
    },
    btn: (disabled) => ({
      width: "100%",
      padding: "18px 0",
      borderRadius: 16,
      background: disabled ? "#2a1f14" : "#c9a96e",
      color: disabled ? "#5a4a3a" : "#0e0b09",
      border: "none",
      fontSize: 13,
      letterSpacing: 4,
      textTransform: "uppercase",
      fontFamily: "sans-serif",
      fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.2s",
    }),
    confirmCard: {
      background: "#160f09",
      border: "1px solid #2a1f14",
      borderRadius: 20,
      padding: "28px 24px",
      marginBottom: 24,
    },
    confirmRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 16,
    },
    confirmKey: {
      fontSize: 10,
      letterSpacing: 3,
      color: "#7a6a58",
      textTransform: "uppercase",
      fontFamily: "sans-serif",
    },
    confirmVal: {
      fontSize: 15,
      color: "#f0e6d3",
    },
    successIcon: {
      width: 64,
      height: 64,
      borderRadius: 32,
      border: "1.5px solid #c9a96e",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 24px",
      fontSize: 26,
    },
    successTitle: {
      textAlign: "center",
      fontSize: 24,
      fontWeight: "normal",
      marginBottom: 8,
    },
    successSub: {
      textAlign: "center",
      fontSize: 13,
      color: "#7a6a58",
      fontFamily: "sans-serif",
      lineHeight: 1.6,
    },
    stepDots: {
      display: "flex",
      gap: 6,
      marginTop: 12,
    },
    dot: (active) => ({
      width: active ? 20 : 6,
      height: 6,
      borderRadius: 3,
      background: active ? "#c9a96e" : "#2a1f14",
      transition: "all 0.3s",
    }),
  };

  const fmtDay = (d) => d ? `${DAY_NAMES[d.getDay()]} ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}` : "";

  return (
    <div style={styles.app}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>Restaurante</div>
        <h1 style={styles.title}>
          {step === 3 ? "Reserva\nconfirmada" : "Haz tu\nreserva"}
        </h1>
        <p style={styles.subtitle}>
          {step === 0 && "Elige una fecha disponible"}
          {step === 1 && "Selecciona hora y número de comensales"}
          {step === 2 && "Completa tus datos"}
          {step === 3 && "¡Te esperamos!"}
        </p>
        {step < 3 && (
          <div style={styles.stepDots}>
            {[0,1,2].map(i => <div key={i} style={styles.dot(i === step)} />)}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={styles.body}>

        {/* STEP 0 — Fecha */}
        {step === 0 && (
          <>
            <span style={styles.sectionLabel}>Fecha</span>
            <div style={styles.daysRow}>
              {days.map((d, i) => (
                <div key={i} style={styles.dayCard(selectedDay === i)} onClick={() => setSelectedDay(i)}>
                  <div style={styles.dayName(selectedDay === i)}>{DAY_NAMES[d.getDay()]}</div>
                  <div style={styles.dayNum(selectedDay === i)}>{d.getDate()}</div>
                  <div style={styles.dayMonth(selectedDay === i)}>{MONTH_NAMES[d.getMonth()]}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* STEP 1 — Hora + comensales */}
        {step === 1 && (
          <>
            <span style={styles.sectionLabel}>Hora</span>
            <div style={styles.timesGrid}>
              {TIMES.map(t => (
                <button key={t} style={styles.timeBtn(selectedTime === t)} onClick={() => setSelectedTime(t)}>{t}</button>
              ))}
            </div>
            <div style={styles.divider} />
            <span style={styles.sectionLabel}>Comensales</span>
            <div style={styles.guestsRow}>
              {GUESTS.map(g => (
                <button key={g} style={styles.guestBtn(guests === g)} onClick={() => setGuests(g)}>{g}</button>
              ))}
            </div>
          </>
        )}

        {/* STEP 2 — Datos */}
        {step === 2 && (
          <>
            <span style={styles.sectionLabel}>Tus datos</span>
            <div style={styles.inputWrap}>
              <label style={styles.inputLabel}>Nombre completo</label>
              <input style={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="Ej. María García" />
            </div>
            <div style={styles.inputWrap}>
              <label style={styles.inputLabel}>Teléfono</label>
              <input style={styles.input} type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+34 600 000 000" />
            </div>
            <div style={styles.inputWrap}>
              <label style={styles.inputLabel}>Notas (opcional)</label>
              <input style={styles.input} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Alergias, ocasión especial…" />
            </div>
          </>
        )}

        {/* STEP 3 — Confirmación */}
        {step === 3 && (
          <>
            <div style={styles.successIcon}>✦</div>
            <h2 style={styles.successTitle}>¡Todo listo!</h2>
            <p style={styles.successSub}>
              Tu mesa está reservada. Recibirás una confirmación por SMS.
            </p>
            <div style={styles.divider} />
            <div style={styles.confirmCard}>
              <div style={styles.confirmRow}>
                <span style={styles.confirmKey}>Fecha</span>
                <span style={styles.confirmVal}>{fmtDay(days[selectedDay])}</span>
              </div>
              <div style={styles.confirmRow}>
                <span style={styles.confirmKey}>Hora</span>
                <span style={styles.confirmVal}>{selectedTime}</span>
              </div>
              <div style={styles.confirmRow}>
                <span style={styles.confirmKey}>Comensales</span>
                <span style={styles.confirmVal}>{guests} personas</span>
              </div>
              <div style={styles.confirmRow}>
                <span style={styles.confirmKey}>Nombre</span>
                <span style={styles.confirmVal}>{name}</span>
              </div>
              {notes ? (
                <div style={styles.confirmRow}>
                  <span style={styles.confirmKey}>Notas</span>
                  <span style={styles.confirmVal}>{notes}</span>
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>

      {/* Footer CTA */}
      <div style={styles.footer}>
        {step < 3 ? (
          <button
            style={styles.btn(step === 0 ? !canNext0 : step === 1 ? !canNext1 : !canNext2)}
            disabled={step === 0 ? !canNext0 : step === 1 ? !canNext1 : !canNext2}
            onClick={() => setStep(s => s + 1)}
          >
            {step === 2 ? "Confirmar reserva" : "Continuar"}
          </button>
        ) : (
          <button style={styles.btn(false)} onClick={reset}>
            Nueva reserva
          </button>
        )}
      </div>
    </div>
  );
}