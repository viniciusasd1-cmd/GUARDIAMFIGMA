import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { ShieldMark, PrimaryButton } from "./ui";

function Field({
  icon: Icon,
  ...props
}: { icon: typeof Mail } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className="flex items-center gap-3 rounded-[16px] px-4"
      style={{ height: 56, background: "var(--g-surface-2)", border: "1px solid var(--g-border)" }}
    >
      <Icon size={19} style={{ color: "var(--g-text-3)" }} />
      <input
        {...props}
        className="flex-1 bg-transparent outline-none"
        style={{ color: "var(--g-text)", fontSize: 15 }}
      />
    </div>
  );
}

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [show, setShow] = useState(false);
  const [pwd, setPwd] = useState("");

  return (
    <div className="flex flex-col h-full px-6" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 40px)" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mt-8"
      >
        <ShieldMark size={72} />
        <h1
          className="g-font-display tracking-[0.16em] mt-5"
          style={{ color: "var(--g-text)", fontWeight: 800, fontSize: 26 }}
        >
          GUARDIAM
        </h1>
        <p style={{ color: "var(--g-text-2)", fontSize: 15, marginTop: 8 }}>
          Sua central pessoal de proteção.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-col gap-3 mt-12"
      >
        <Field icon={Mail} type="email" placeholder="E-mail" defaultValue="voce@guardiam.app" />
        <div
          className="flex items-center gap-3 rounded-[16px] px-4"
          style={{ height: 56, background: "var(--g-surface-2)", border: "1px solid var(--g-border)" }}
        >
          <Lock size={19} style={{ color: "var(--g-text-3)" }} />
          <input
            type={show ? "text" : "password"}
            placeholder="Senha"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            style={{ color: "var(--g-text)", fontSize: 15 }}
          />
          <button onClick={() => setShow((s) => !s)} style={{ color: "var(--g-text-3)" }}>
            {show ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </div>

        <button className="self-end mt-1" style={{ color: "var(--g-brand)", fontSize: 13, fontWeight: 500 }}>
          Esqueci minha senha
        </button>

        <div className="mt-4">
          <PrimaryButton onClick={onLogin}>Entrar</PrimaryButton>
        </div>

        <button
          className="mt-2 rounded-[16px] active:scale-[0.98] transition-transform"
          style={{
            height: 54,
            background: "transparent",
            border: "1px solid var(--g-border-strong)",
            color: "var(--g-text)",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Criar cadastro
        </button>
      </motion.div>

      <div className="mt-auto text-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)" }}>
        <p style={{ color: "var(--g-text-3)", fontSize: 12 }}>
          Protegido de ponta a ponta · Discreto e confiável
        </p>
      </div>
    </div>
  );
}
