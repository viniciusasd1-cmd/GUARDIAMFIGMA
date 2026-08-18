import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Settings, 
  Bell, 
  MapPin, 
  Activity, 
  Phone, 
  AlertCircle, 
  CheckCircle2,
  Heart,
  Star,
  Circle,
  Minus,
  Navigation,
  Clock,
  LogOut,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Moon,
  Sun
} from 'lucide-react';

type Screen = 'login' | 'signup' | 'home' | 'activate' | 'active' | 'sos_countdown' | 'alert_sent' | 'contacts' | 'alerts' | 'settings';
type DiscreteIconType = 'shield' | 'heart' | 'star' | 'circle' | 'minus';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Discrete Button State
  const [discreteIcon, setDiscreteIcon] = useState<DiscreteIconType>('shield');
  const [discreteEnabled, setDiscreteEnabled] = useState(true);
  const [isPressing, setIsPressing] = useState(false);
  const [pressProgress, setPressProgress] = useState(0);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const pressInterval = useRef<NodeJS.Timeout | null>(null);

  // Fake system state
  const [systemStatus, setSystemStatus] = useState<'online' | 'offline' | 'gps_off'>('online');
  
  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // 3-second long press logic
  const handlePressStart = () => {
    if (systemStatus === 'offline') return;
    setIsPressing(true);
    setPressProgress(0);
    
    pressInterval.current = setInterval(() => {
      setPressProgress(prev => {
        if (prev >= 100) return 100;
        return prev + (100 / 30); // 3 seconds = 30 ticks of 100ms
      });
    }, 100);

    pressTimer.current = setTimeout(() => {
      if (pressInterval.current) clearInterval(pressInterval.current);
      triggerSOS();
    }, 3000);
  };

  const handlePressEnd = () => {
    setIsPressing(false);
    setPressProgress(0);
    if (pressTimer.current) clearTimeout(pressTimer.current);
    if (pressInterval.current) clearInterval(pressInterval.current);
  };

  const triggerSOS = () => {
    handlePressEnd();
    navigate('sos_countdown');
    // Simulate sending SOS
    setTimeout(() => {
      navigate('alert_sent');
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (pressTimer.current) clearTimeout(pressTimer.current);
      if (pressInterval.current) clearInterval(pressInterval.current);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-[var(--g-bg)] text-[var(--g-text)] flex justify-center selection:bg-[var(--g-brand)]/20 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Mobile Wrapper for Desktop Preview */}
      <div className="w-full max-w-[414px] bg-[var(--g-bg)] min-h-screen shadow-2xl relative overflow-hidden flex flex-col sm:border-x sm:border-[var(--g-border)]">
        
        {/* Top Status Bar (Fake) */}
        <div className="h-12 w-full flex items-center justify-between px-6 text-[13px] font-medium text-[var(--g-text-2)] z-50 bg-[var(--g-bg)]/80 backdrop-blur-md">
          <span>9:41</span>
          <div className="flex items-center gap-2">
            <Activity size={14} />
            <Navigation size={14} className={systemStatus === 'gps_off' ? 'text-[var(--g-sos)]' : ''} />
            <div className="w-6 h-3 border border-[var(--g-text-2)] rounded-[4px] relative">
              <div className="absolute top-[1px] bottom-[1px] left-[1px] right-[1px] bg-[var(--g-text-2)] rounded-[2px]" />
            </div>
          </div>
        </div>

        {/* Global Connection Warning */}
        <AnimatePresence>
          {systemStatus !== 'online' && currentScreen !== 'login' && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-[var(--g-warn-soft)] text-[var(--g-warn)] px-4 py-2 text-xs font-medium flex items-center gap-2"
            >
              <AlertCircle size={14} />
              {systemStatus === 'offline' ? 'Sem conexão com a internet.' : 'Sinal de GPS fraco ou desligado.'}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 relative flex flex-col">
          <AnimatePresence mode="wait">
            {currentScreen === 'login' && <LoginScreen key="login" onLogin={() => navigate('home')} onSignup={() => navigate('signup')} theme={theme} setTheme={setTheme} />}
            {currentScreen === 'signup' && <SignupScreen key="signup" onBack={() => navigate('login')} onSignup={() => navigate('home')} />}
            {currentScreen === 'home' && <HomeScreen key="home" onActivate={() => navigate('activate')} onMenu={() => setIsMenuOpen(true)} />}
            {currentScreen === 'activate' && <ActivateScreen key="activate" onBack={() => navigate('home')} onConfirm={() => navigate('active')} />}
            {currentScreen === 'active' && <ActiveScreen key="active" onDeactivate={() => navigate('home')} onMenu={() => setIsMenuOpen(true)} onSOS={triggerSOS} />}
            {currentScreen === 'sos_countdown' && <SOSCountdownScreen key="sos" />}
            {currentScreen === 'alert_sent' && <AlertSentScreen key="alert_sent" onFinish={() => navigate('home')} />}
            {currentScreen === 'contacts' && <ContactsScreen key="contacts" onBack={() => navigate('home')} />}
            {currentScreen === 'alerts' && <AlertsScreen key="alerts" onBack={() => navigate('home')} />}
            {currentScreen === 'settings' && (
              <SettingsScreen 
                key="settings" 
                onBack={() => navigate('home')} 
                discreteEnabled={discreteEnabled}
                setDiscreteEnabled={setDiscreteEnabled}
                discreteIcon={discreteIcon}
                setDiscreteIcon={setDiscreteIcon}
                theme={theme}
                setTheme={setTheme}
                onLogout={() => navigate('login')}
              />
            )}
          </AnimatePresence>
        </main>

        {/* Floating Discrete Button */}
        <AnimatePresence>
          {currentScreen === 'active' && discreteEnabled && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute right-6 top-32 z-40"
            >
              <button
                onPointerDown={handlePressStart}
                onPointerUp={handlePressEnd}
                onPointerLeave={handlePressEnd}
                onContextMenu={(e) => e.preventDefault()}
                className="w-12 h-12 bg-[var(--g-surface)] rounded-[var(--g-r-pill)] shadow-[var(--g-shadow-md)] border border-[var(--g-border)] flex items-center justify-center text-[var(--g-text-2)] active:scale-95 transition-transform relative overflow-hidden"
                style={{ touchAction: 'none' }}
              >
                {/* Progress fill */}
                {isPressing && (
                  <div 
                    className="absolute inset-0 bg-[var(--g-sos)]/10 origin-bottom"
                    style={{ height: `${pressProgress}%`, bottom: 0, top: 'auto' }}
                  />
                )}
                {discreteIcon === 'shield' && <Shield size={20} />}
                {discreteIcon === 'heart' && <Heart size={20} />}
                {discreteIcon === 'star' && <Star size={20} />}
                {discreteIcon === 'circle' && <Circle size={20} />}
                {discreteIcon === 'minus' && <Minus size={20} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Menu (Bottom Sheet/Drawer) */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[var(--g-text)]/40 z-50 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute top-0 bottom-0 left-0 w-[80%] bg-[var(--g-surface)] z-50 shadow-2xl flex flex-col"
              >
                <div className="p-6 border-b border-[var(--g-border)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--g-surface-3)] rounded-[var(--g-r-pill)] flex items-center justify-center text-[var(--g-text)]">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Usuário</p>
                      <p className="text-xs text-[var(--g-text-2)]">Conta Premium</p>
                    </div>
                  </div>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2 text-[var(--g-text-2)] hover:bg-[var(--g-surface-3)] rounded-[var(--g-r-pill)] transition-colors">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto py-4">
                  <MenuButton icon={Shield} label="Início" active={currentScreen === 'home' || currentScreen === 'active'} onClick={() => navigate(currentScreen === 'active' ? 'active' : 'home')} />
                  <MenuButton icon={UserPlus} label="Contatos de segurança" active={currentScreen === 'contacts'} onClick={() => navigate('contacts')} />
                  <MenuButton icon={Bell} label="Alertas" active={currentScreen === 'alerts'} onClick={() => navigate('alerts')} />
                  <MenuButton icon={Settings} label="Configurações" active={currentScreen === 'settings'} onClick={() => navigate('settings')} />
                </div>
                
                <div className="p-6 border-t border-[var(--g-border)]">
                  <button 
                    onClick={() => { setSystemStatus(prev => prev === 'online' ? 'offline' : 'online'); setIsMenuOpen(false); }}
                    className="flex items-center gap-3 text-sm text-[var(--g-text-2)] w-full p-3 rounded-lg hover:bg-[var(--g-surface-3)] transition-colors mb-2"
                  >
                    <Activity size={18} />
                    Simular Erro (Offline)
                  </button>
                  <button 
                    onClick={() => navigate('login')}
                    className="flex items-center gap-3 text-sm text-[var(--g-sos-2)] font-medium w-full p-3 rounded-lg hover:bg-[var(--g-sos-soft)] transition-colors"
                  >
                    <LogOut size={18} />
                    Sair da conta
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// ---------------------------------------------------------
// SCREENS
// ---------------------------------------------------------

function LoginScreen({ onLogin, onSignup, theme, setTheme }: { onLogin: () => void, onSignup: () => void, theme: 'light' | 'dark', setTheme: (t: 'light' | 'dark') => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="flex flex-col h-full px-8 justify-center bg-[var(--g-surface)] relative"
    >
      <button 
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="absolute top-6 right-6 w-10 h-10 rounded-[var(--g-r-pill)] flex items-center justify-center bg-[var(--g-bg)] text-[var(--g-text-2)] hover:text-[var(--g-text)] transition-colors border border-[var(--g-border)] shadow-sm"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <div className="mb-12 flex flex-col items-center">
        <div className="w-16 h-16 bg-[var(--g-text)] rounded-[var(--g-r-md)] flex items-center justify-center mb-6 shadow-[var(--g-shadow-lg)]">
          <Shield size={32} className="text-[var(--g-surface)]" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold text-[var(--g-text)] g-font-display tracking-tight mb-2">GUARDIAM</h1>
        <p className="text-[var(--g-text-2)] text-[15px]">Sua segurança começa aqui.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--g-text-2)] uppercase tracking-wider mb-2 ml-1">E-mail</label>
          <div className="relative">
            <input 
              type="email" 
              placeholder="seu@email.com" 
              className="w-full bg-[var(--g-bg)] border border-transparent focus:border-[var(--g-border-strong)] rounded-[var(--g-r-md)] px-4 py-3.5 text-[15px] outline-none transition-colors"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--g-text-2)] uppercase tracking-wider mb-2 ml-1">Senha</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              className="w-full bg-[var(--g-bg)] border border-transparent focus:border-[var(--g-border-strong)] rounded-[var(--g-r-md)] px-4 py-3.5 pr-12 text-[15px] outline-none transition-colors"
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--g-text-3)]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[var(--g-text)] text-[var(--g-surface)] font-medium rounded-[var(--g-r-md)] py-4 shadow-[var(--g-shadow-md)] active:scale-[0.98] transition-all disabled:opacity-70 flex justify-center items-center h-[56px]"
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-[var(--g-surface)]/30 border-t-white rounded-[var(--g-r-pill)] animate-spin" /> : "Entrar"}
          </button>
        </div>
      </form>

      <div className="mt-8 flex flex-col items-center gap-4 text-sm font-medium">
        <button className="text-[var(--g-text)]">Esqueci minha senha</button>
        <button type="button" onClick={onSignup} className="text-[var(--g-text-2)]">Criar conta</button>
      </div>
    </motion.div>
  );
}

function SignupScreen({ onBack, onSignup }: { onBack: () => void, onSignup: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onSignup();
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="flex flex-col h-full bg-[var(--g-surface)] relative"
    >
      <div className="flex-none pt-4 pb-2 px-4">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-[var(--g-text)] active:bg-black/5 rounded-[var(--g-r-pill)] transition-colors">
          <ChevronLeft size={24} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-8 py-2">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--g-text)] g-font-display tracking-tight mb-2">Criar conta</h2>
          <p className="text-[var(--g-text-2)] text-[15px]">Preencha os dados abaixo para começar a usar o GUARDIAM.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--g-text-2)] uppercase tracking-wider mb-2 ml-1">Nome Completo</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ex: Ana Silva" 
                className="w-full bg-[var(--g-bg)] border border-transparent focus:border-[var(--g-border-strong)] rounded-[var(--g-r-md)] px-4 py-3.5 text-[15px] outline-none transition-colors"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--g-text-2)] uppercase tracking-wider mb-2 ml-1">E-mail</label>
            <div className="relative">
              <input 
                type="email" 
                placeholder="seu@email.com" 
                className="w-full bg-[var(--g-bg)] border border-transparent focus:border-[var(--g-border-strong)] rounded-[var(--g-r-md)] px-4 py-3.5 text-[15px] outline-none transition-colors"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--g-text-2)] uppercase tracking-wider mb-2 ml-1">Senha</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className="w-full bg-[var(--g-bg)] border border-transparent focus:border-[var(--g-border-strong)] rounded-[var(--g-r-md)] px-4 py-3.5 pr-12 text-[15px] outline-none transition-colors"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--g-text-3)]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[var(--g-text)] text-[var(--g-surface)] font-medium rounded-[var(--g-r-md)] py-4 shadow-[var(--g-shadow-md)] active:scale-[0.98] transition-all disabled:opacity-70 flex justify-center items-center h-[56px]"
            >
              {isLoading ? <div className="w-5 h-5 border-2 border-[var(--g-surface)]/30 border-t-white rounded-[var(--g-r-pill)] animate-spin" /> : "Criar conta"}
            </button>
          </div>
        </form>

        <div className="mt-8 flex justify-center pb-8 text-sm font-medium">
          <button type="button" onClick={onBack} className="text-[var(--g-text-2)]">Já tem uma conta? <span className="text-[var(--g-text)]">Entrar</span></button>
        </div>
      </div>
    </motion.div>
  );
}

function HomeScreen({ onActivate, onMenu }: { onActivate: () => void, onMenu: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full bg-[var(--g-bg)]">
      <Header title="GUARDIAM" onMenu={onMenu} showNotification />
      
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-2xl font-bold g-font-display text-[var(--g-text)]">Olá, Usuário</h2>
        <p className="text-[var(--g-text-2)] mt-1 text-[15px]">Sua proteção está pronta quando você precisar.</p>
      </div>

      <div className="px-6 py-6 flex-1 flex flex-col justify-center">
        <div className="bg-[var(--g-surface)] rounded-[var(--g-r-xl)] p-8 shadow-[var(--g-shadow-lg)] border border-[var(--g-border)] flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[var(--g-surface-3)] rounded-[var(--g-r-pill)] flex items-center justify-center mb-6 text-[var(--g-text-3)]">
            <Shield size={32} />
          </div>
          <h3 className="text-lg font-bold text-[var(--g-text)] mb-2">Proteção desativada</h3>
          <p className="text-[var(--g-text-2)] text-[15px] mb-8 leading-relaxed">Você ainda não está protegido.<br/>Ative para compartilhar sua localização com contatos de confiança.</p>
          
          <button 
            onClick={onActivate}
            className="w-full bg-[var(--g-text)] text-[var(--g-surface)] font-medium rounded-[var(--g-r-md)] py-4 shadow-[var(--g-shadow-md)] active:scale-[0.98] transition-transform"
          >
            Ativar proteção
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ActivateScreen({ onBack, onConfirm }: { onBack: () => void, onConfirm: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleActivate = () => {
    setLoading(true);
    setTimeout(() => {
      onConfirm();
    }, 1200);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full bg-[var(--g-surface)]">
      <Header title="Preparar proteção" onBack={onBack} />
      
      <div className="px-6 py-8 flex-1">
        <p className="text-[var(--g-text-2)] text-[15px] mb-8">Ao ativar, as seguintes funções iniciarão imediatamente:</p>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-[var(--g-active)]"><CheckCircle2 size={24} /></div>
            <div>
              <h4 className="font-semibold text-[var(--g-text)] mb-1">Contatos de segurança</h4>
              <p className="text-sm text-[var(--g-text-2)]">Seus 3 contatos de confiança serão notificados em caso de SOS.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-[var(--g-active)]"><CheckCircle2 size={24} /></div>
            <div>
              <h4 className="font-semibold text-[var(--g-text)] mb-1">Localização em tempo real</h4>
              <p className="text-sm text-[var(--g-text-2)]">Seu trajeto será registrado continuamente com alta precisão.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-[var(--g-active)]"><CheckCircle2 size={24} /></div>
            <div>
              <h4 className="font-semibold text-[var(--g-text)] mb-1">Proteção contra falhas</h4>
              <p className="text-sm text-[var(--g-text-2)]">Se a conexão cair, os dados são salvos localmente e enviados depois.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-[var(--g-border)] bg-[var(--g-surface)]">
        <button 
          onClick={handleActivate}
          disabled={loading}
          className="w-full bg-[var(--g-active)] text-[var(--g-surface)] font-medium rounded-[var(--g-r-md)] py-4 shadow-[var(--g-shadow-md)] active:scale-[0.98] transition-transform h-[56px] flex items-center justify-center"
        >
          {loading ? <div className="w-5 h-5 border-2 border-[var(--g-surface)]/30 border-t-white rounded-[var(--g-r-pill)] animate-spin" /> : "Ativar proteção"}
        </button>
      </div>
    </motion.div>
  );
}

function ActiveScreen({ onDeactivate, onMenu, onSOS }: { onDeactivate: () => void, onMenu: () => void, onSOS: () => void }) {
  const [pressProgress, setPressProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const pressInterval = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = () => {
    setIsPressing(true);
    setPressProgress(0);
    
    pressInterval.current = setInterval(() => {
      setPressProgress(prev => {
        if (prev >= 100) return 100;
        return prev + (100 / 30);
      });
    }, 100);

    pressTimer.current = setTimeout(() => {
      if (pressInterval.current) clearInterval(pressInterval.current);
      onSOS();
    }, 3000);
  };

  const handlePressEnd = () => {
    setIsPressing(false);
    setPressProgress(0);
    if (pressTimer.current) clearTimeout(pressTimer.current);
    if (pressInterval.current) clearInterval(pressInterval.current);
  };

  useEffect(() => {
    return () => {
      if (pressTimer.current) clearTimeout(pressTimer.current);
      if (pressInterval.current) clearInterval(pressInterval.current);
    };
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full bg-[var(--g-bg)]">
      <Header title="GUARDIAM" onMenu={onMenu} showNotification />
      
      <div className="px-6 py-6 flex-1 flex flex-col">
        {/* Status Card */}
        <div className="bg-[var(--g-surface)] rounded-[var(--g-r-lg)] p-6 shadow-[var(--g-shadow-md)] border border-[var(--g-border)] mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-[var(--g-active)] rounded-[var(--g-r-pill)] shadow-[var(--g-shadow-glow-active)] animate-pulse" />
            <span className="font-bold text-[var(--g-text)] tracking-wide text-sm">PROTEÇÃO ATIVA</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold text-[var(--g-text-3)] uppercase tracking-wider mb-1">Localização</p>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[var(--g-text)]" />
                <span className="text-[15px] font-medium text-[var(--g-text)]">Ativa</span>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[var(--g-text-3)] uppercase tracking-wider mb-1">Última att.</p>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[var(--g-text)]" />
                <span className="text-[15px] font-medium text-[var(--g-text)]">Agora</span>
              </div>
            </div>
          </div>
        </div>

        {/* SOS Button Area */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <button
            onPointerDown={handlePressStart}
            onPointerUp={handlePressEnd}
            onPointerLeave={handlePressEnd}
            onContextMenu={(e) => e.preventDefault()}
            className="relative w-48 h-48 rounded-[var(--g-r-pill)] flex flex-col items-center justify-center active:scale-95 transition-transform"
            style={{ touchAction: 'none' }}
          >
            {/* Background layers */}
            <div className="absolute inset-0 bg-[var(--g-sos)] rounded-[var(--g-r-pill)] shadow-[var(--g-shadow-glow-sos)]" />
            
            {/* Progress ring visualization */}
            {isPressing && (
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                <circle 
                  cx="50" cy="50" r="48" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeDasharray={`${pressProgress * 3.01} 301`} 
                  strokeLinecap="round"
                />
              </svg>
            )}

            <ShieldAlert size={48} className="text-[var(--g-surface)] mb-2" strokeWidth={1.5} />
            <span className="text-[var(--g-surface)] font-bold text-xl g-font-display">SOS</span>
          </button>
          
          <p className="text-[var(--g-text-2)] text-sm mt-8 font-medium">Segure para pedir ajuda</p>
        </div>

        <button 
          onClick={onDeactivate}
          className="mt-auto bg-[var(--g-surface)] text-[var(--g-text)] font-medium rounded-[var(--g-r-md)] py-4 border border-[var(--g-border)] shadow-sm active:scale-[0.98] transition-transform"
        >
          Desativar proteção
        </button>
      </div>
    </motion.div>
  );
}

function SOSCountdownScreen() {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const int = setInterval(() => {
      setDots(p => p.length >= 3 ? '' : p + '.');
    }, 500);
    return () => clearInterval(int);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full bg-[var(--g-surface)] justify-center items-center px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--g-sos)]/5" />
      <div className="w-24 h-24 bg-[var(--g-sos-soft)] rounded-[var(--g-r-pill)] flex items-center justify-center text-[var(--g-sos)] mb-6 relative z-10">
        <div className="absolute inset-0 bg-[var(--g-sos-soft)] rounded-[var(--g-r-pill)] animate-ping opacity-50" />
        <Navigation size={40} className="animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold text-[var(--g-text)] mb-2 z-10">Acionando SOS</h2>
      <p className="text-[var(--g-text-2)] z-10">Enviando alerta para seus contatos{dots}</p>
    </motion.div>
  );
}

function AlertSentScreen({ onFinish }: { onFinish: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full bg-[var(--g-sos)] text-[var(--g-surface)]">
      <div className="flex-1 flex flex-col justify-center items-center px-8 text-center">
        <div className="w-24 h-24 bg-[var(--g-surface)]/20 backdrop-blur-sm rounded-[var(--g-r-pill)] flex items-center justify-center mb-8">
          <CheckCircle2 size={48} className="text-[var(--g-surface)]" />
        </div>
        <h2 className="text-3xl font-bold g-font-display tracking-tight mb-4">Alerta enviado</h2>
        <p className="text-[var(--g-surface)]/90 text-lg leading-relaxed font-medium mb-12">
          Seus contatos de segurança foram avisados.
        </p>

        <div className="bg-[var(--g-surface)]/10 backdrop-blur-md rounded-[var(--g-r-lg)] p-6 w-full text-left space-y-4 border border-[var(--g-surface)]/20">
          <div>
            <p className="text-[var(--g-surface)]/60 text-xs uppercase tracking-wider font-bold mb-1">Horário</p>
            <p className="font-medium">14:32 (Agora)</p>
          </div>
          <div>
            <p className="text-[var(--g-surface)]/60 text-xs uppercase tracking-wider font-bold mb-1">Localização</p>
            <p className="font-medium">Av. Paulista, 1578 - SP</p>
          </div>
          <div>
            <p className="text-[var(--g-surface)]/60 text-xs uppercase tracking-wider font-bold mb-1">Status</p>
            <p className="font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-[var(--g-r-pill)] bg-[var(--g-surface)]" />
              Transmitindo áudio e local
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <button 
          onClick={onFinish}
          className="w-full bg-[var(--g-surface)] text-[var(--g-sos)] font-bold rounded-[var(--g-r-md)] py-4 shadow-lg active:scale-[0.98] transition-transform"
        >
          Estou seguro (Encerrar)
        </button>
      </div>
    </motion.div>
  );
}

function ContactsScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full bg-[var(--g-bg)]">
      <Header title="Contatos de segurança" onBack={onBack} />
      
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="space-y-3">
          <ContactCard name="Mãe" relation="Familiar" status="Pronto" />
          <ContactCard name="João Silva" relation="Irmão" status="Pronto" />
          <ContactCard name="Mariana" relation="Amiga" status="Pendente" />
        </div>
        
        <button className="w-full mt-6 bg-[var(--g-surface)] border border-dashed border-[var(--g-border-strong)] text-[var(--g-text)] font-medium rounded-[var(--g-r-md)] py-4 flex items-center justify-center gap-2 active:bg-[var(--g-surface-3)] transition-colors">
          <UserPlus size={18} />
          Adicionar contato
        </button>
      </div>
    </motion.div>
  );
}

function ContactCard({ name, relation, status }: { name: string, relation: string, status: string }) {
  return (
    <div className="bg-[var(--g-surface)] p-4 rounded-[var(--g-r-md)] border border-[var(--g-border)] shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[var(--g-bg)] rounded-[var(--g-r-pill)] flex items-center justify-center text-[var(--g-text-2)]">
          <User size={20} />
        </div>
        <div>
          <h4 className="font-bold text-[var(--g-text)]">{name}</h4>
          <p className="text-sm text-[var(--g-text-2)]">{relation}</p>
        </div>
      </div>
      <div className="text-right">
        <span className={`text-xs font-semibold px-2 py-1 rounded-md ${status === 'Pronto' ? 'bg-[var(--g-active)]/10 text-[var(--g-active)]' : 'bg-[var(--g-warn-soft)] text-[var(--g-warn)]'}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

function AlertsScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full bg-[var(--g-bg)]">
      <Header title="Histórico de Alertas" onBack={onBack} />
      
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="relative border-l-2 border-[var(--g-border)] ml-3 pl-6 space-y-8">
          <TimelineItem 
            date="Hoje, 14:32" 
            title="SOS Acionado" 
            desc="Av. Paulista, 1578 - São Paulo"
            type="sos"
          />
          <TimelineItem 
            date="12/10/2023, 21:15" 
            title="Proteção ativada" 
            desc="Trajeto: Metrô Clínicas -> Casa"
            type="info"
          />
          <TimelineItem 
            date="05/09/2023, 03:22" 
            title="Alerta Automático (Queda)" 
            desc="Rua Augusta, 900. Contatos não avisados (cancelado)."
            type="warn"
          />
        </div>
      </div>
    </motion.div>
  );
}

function TimelineItem({ date, title, desc, type }: { date: string, title: string, desc: string, type: 'sos' | 'info' | 'warn' }) {
  const colors = {
    sos: 'bg-[var(--g-sos)]',
    info: 'bg-[var(--g-active)]',
    warn: 'bg-[var(--g-warn)]'
  };
  
  return (
    <div className="relative">
      <div className={`absolute -left-[31px] top-1 w-3 h-3 rounded-[var(--g-r-pill)] ${colors[type]} ring-4 ring-[var(--g-bg)]`} />
      <p className="text-xs font-semibold text-[var(--g-text-3)] uppercase tracking-wider mb-1">{date}</p>
      <h4 className="font-bold text-[var(--g-text)] mb-1">{title}</h4>
      <p className="text-sm text-[var(--g-text-2)]">{desc}</p>
    </div>
  );
}

function SettingsScreen({ 
  onBack, 
  discreteEnabled, 
  setDiscreteEnabled,
  discreteIcon,
  setDiscreteIcon,
  theme,
  setTheme,
  onLogout
}: { 
  onBack: () => void, 
  discreteEnabled: boolean,
  setDiscreteEnabled: (v: boolean) => void,
  discreteIcon: DiscreteIconType,
  setDiscreteIcon: (v: DiscreteIconType) => void,
  theme: 'light' | 'dark',
  setTheme: (t: 'light' | 'dark') => void,
  onLogout: () => void
}) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full bg-[var(--g-bg)]">
      <Header title="Configurações" onBack={onBack} />
      
      <div className="p-6 flex-1 overflow-y-auto space-y-8">
        
        <section>
          <h3 className="text-xs font-semibold text-[var(--g-text-3)] uppercase tracking-wider mb-3">Aparência</h3>
          <div className="bg-[var(--g-surface)] rounded-[var(--g-r-md)] border border-[var(--g-border)] overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-[var(--g-border)]">
              <div className="flex items-center gap-3 text-[var(--g-text)]">
                {theme === 'dark' ? <Moon size={18} className="text-[var(--g-text-2)]" /> : <Sun size={18} className="text-[var(--g-text-2)]" />}
                <div>
                  <p className="font-medium text-[var(--g-text)]">Modo Escuro</p>
                  <p className="text-xs text-[var(--g-text-2)] mt-0.5">Altera o tema de todo o aplicativo.</p>
                </div>
              </div>
              <button 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className={`w-12 h-6 rounded-[var(--g-r-pill)] relative transition-colors ${theme === 'dark' ? 'bg-[var(--g-active)]' : 'bg-[var(--g-border-strong)]'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-[var(--g-r-pill)] transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-[var(--g-text-3)] uppercase tracking-wider mb-3">Botão de Proteção Discreto</h3>
          <div className="bg-[var(--g-surface)] rounded-[var(--g-r-md)] border border-[var(--g-border)] overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-[var(--g-border)]">
              <div>
                <p className="font-medium text-[var(--g-text)]">Ativar botão flutuante</p>
                <p className="text-xs text-[var(--g-text-2)] mt-0.5">Visível apenas com proteção ativa.</p>
              </div>
              <button 
                onClick={() => setDiscreteEnabled(!discreteEnabled)}
                className={`w-12 h-6 rounded-[var(--g-r-pill)] relative transition-colors ${discreteEnabled ? 'bg-[var(--g-active)]' : 'bg-[var(--g-border-strong)]'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-[var(--g-surface)] rounded-[var(--g-r-pill)] transition-transform ${discreteEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
            
            {discreteEnabled && (
              <div className="p-4">
                <p className="text-sm font-medium text-[var(--g-text)] mb-3">Aparência do botão</p>
                <div className="flex gap-3">
                  {(['shield', 'heart', 'star', 'circle', 'minus'] as DiscreteIconType[]).map(icon => (
                    <button
                      key={icon}
                      onClick={() => setDiscreteIcon(icon)}
                      className={`w-10 h-10 rounded-[var(--g-r-pill)] flex items-center justify-center transition-all ${discreteIcon === icon ? 'bg-[var(--g-text)] text-[var(--g-surface)]' : 'bg-[var(--g-bg)] text-[var(--g-text-2)] border border-[var(--g-border)]'}`}
                    >
                      {icon === 'shield' && <Shield size={18} />}
                      {icon === 'heart' && <Heart size={18} />}
                      {icon === 'star' && <Star size={18} />}
                      {icon === 'circle' && <Circle size={18} />}
                      {icon === 'minus' && <Minus size={18} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-[var(--g-text-3)] uppercase tracking-wider mb-3">Geral</h3>
          <div className="bg-[var(--g-surface)] rounded-[var(--g-r-md)] border border-[var(--g-border)] overflow-hidden">
            <SettingsItem icon={User} label="Perfil" />
            <SettingsItem icon={Lock} label="Permissões" />
            <SettingsItem icon={Bell} label="Notificações" />
            <SettingsItem icon={ShieldCheck} label="Privacidade" />
          </div>
        </section>

        <button onClick={onLogout} className="w-full text-[var(--g-sos-2)] font-medium py-4 text-center rounded-[var(--g-r-md)] hover:bg-[var(--g-sos-soft)] transition-colors">
          Sair da conta
        </button>
      </div>
    </motion.div>
  );
}

function SettingsItem({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <button className="w-full p-4 flex items-center justify-between border-b border-[var(--g-border)] last:border-0 hover:bg-[var(--g-surface-2)] transition-colors text-left">
      <div className="flex items-center gap-3 text-[var(--g-text)]">
        <Icon size={18} className="text-[var(--g-text-2)]" />
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight size={18} className="text-[var(--g-text-3)]" />
    </button>
  );
}

// ---------------------------------------------------------
// SHARED COMPONENTS
// ---------------------------------------------------------

function Header({ title, onBack, onMenu, showNotification }: { title: string, onBack?: () => void, onMenu?: () => void, showNotification?: boolean }) {
  return (
    <div className="h-16 flex items-center justify-between px-4 sticky top-0 z-30 bg-[var(--g-bg)]/80 backdrop-blur-md">
      {onBack ? (
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-[var(--g-text)] active:bg-black/5 rounded-[var(--g-r-pill)] transition-colors">
          <ChevronLeft size={24} />
        </button>
      ) : onMenu ? (
        <button onClick={onMenu} className="w-10 h-10 flex items-center justify-center text-[var(--g-text)] active:bg-black/5 rounded-[var(--g-r-pill)] transition-colors">
          <Menu size={24} />
        </button>
      ) : <div className="w-10" />}
      
      <h1 className="font-bold text-[var(--g-text)] g-font-display text-lg tracking-tight">{title}</h1>
      
      {showNotification ? (
        <button className="w-10 h-10 flex items-center justify-center text-[var(--g-text)] active:bg-black/5 rounded-[var(--g-r-pill)] transition-colors relative">
          <Bell size={22} />
          <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[var(--g-sos)] rounded-[var(--g-r-pill)] border-2 border-[var(--g-bg)]" />
        </button>
      ) : <div className="w-10" />}
    </div>
  );
}

function MenuButton({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors ${active ? 'bg-[var(--g-surface-3)] text-[var(--g-text)] font-bold border-r-4 border-[var(--g-text)]' : 'text-[var(--g-text-2)] font-medium hover:bg-[var(--g-surface-2)]'}`}
    >
      <Icon size={22} className={active ? 'text-[var(--g-text)]' : 'text-[var(--g-text-3)]'} />
      {label}
    </button>
  );
}
