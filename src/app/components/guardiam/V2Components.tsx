import { motion } from "motion/react";
import { PhoneCall, MapPin, Footprints, Mic, Video, PhoneOff } from "lucide-react";
import { Card, PrimaryButton } from "./ui";

export function LiveRadar() {
  return (
    <div className="relative w-full h-[220px] rounded-[22px] overflow-hidden bg-[var(--g-surface-2)] mb-4 flex items-center justify-center border border-[var(--g-border)]">
      {/* Grid background */}
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(var(--g-border) 1px, transparent 1px)", backgroundSize: "20px 20px", opacity: 0.5 }} />
      
      {/* Radar sweeping cone */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: "conic-gradient(from 0deg, transparent 0deg, var(--g-active-soft) 60deg, var(--g-active) 120deg, transparent 120deg)",
          opacity: 0.15
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Radar rings */}
      {[1, 2, 3].map((ring) => (
        <div key={ring} className="absolute rounded-full border border-[var(--g-active)] opacity-20" style={{ width: ring * 80, height: ring * 80 }} />
      ))}

      {/* User dot */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute rounded-full bg-[var(--g-active)] opacity-30"
          style={{ width: 40, height: 40 }}
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="w-4 h-4 rounded-full bg-[var(--g-active)] shadow-[0_0_10px_var(--g-active)] z-10" />
      </div>

      {/* Location label float */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-[var(--g-surface)]/80 backdrop-blur-md p-2 rounded-[12px] border border-[var(--g-border)]">
        <MapPin size={14} className="text-[var(--g-active)]" />
        <span className="text-[12px] text-[var(--g-text)] truncate">Rua Augusta, 1029</span>
      </div>
    </div>
  );
}

export function FakeCallScreen({ onEnd }: { onEnd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="absolute inset-0 z-[100] flex flex-col items-center justify-between"
      style={{
        background: "linear-gradient(180deg, #1A2235 0%, #0A1220 100%)",
        paddingTop: "max(env(safe-area-inset-top, 40px), 60px)",
        paddingBottom: "max(env(safe-area-inset-bottom, 40px), 60px)"
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="text-[var(--g-text-2)] text-[18px]">Mãe</div>
        <div className="text-[var(--g-text)] text-[32px] font-bold">Celular...</div>
      </div>

      <div className="w-[120px] h-[120px] rounded-full bg-[var(--g-surface-3)] flex items-center justify-center border-4 border-[var(--g-border)] mt-10">
         <span className="text-4xl">👩‍👧</span>
      </div>

      <div className="flex-1" />

      <div className="flex w-full px-10 justify-between items-center">
        <div className="flex flex-col items-center gap-2">
          <button onClick={onEnd} className="w-[70px] h-[70px] rounded-full bg-[var(--g-sos)] flex items-center justify-center active:scale-95 transition-transform shadow-[0_4px_20px_rgba(255,90,95,0.4)]">
            <PhoneOff size={32} color="#fff" />
          </button>
          <span className="text-[var(--g-text-2)] text-sm">Recusar</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button onClick={onEnd} className="w-[70px] h-[70px] rounded-full bg-[var(--g-active)] flex items-center justify-center active:scale-95 transition-transform shadow-[0_4px_20px_rgba(47,217,138,0.4)]">
            <PhoneCall size={32} color="#fff" />
          </button>
          <span className="text-[var(--g-text-2)] text-sm">Aceitar</span>
        </div>
      </div>
    </motion.div>
  );
}
