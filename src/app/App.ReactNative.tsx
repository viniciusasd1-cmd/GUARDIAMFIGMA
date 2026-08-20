import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Animated,
  StatusBar,
  Modal,
  ActivityIndicator
} from 'react-native';
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
  Sun,
  AlertTriangle,
  PhoneCall,
  Check
} from 'lucide-react-native';

// --- DESIGN SYSTEM: TOKENS ---
const COLORS = {
  light: {
    bg: '#F4F7FC',
    surface: '#FFFFFF',
    surface2: '#F8FAFC',
    surface3: '#F1F5F9',
    border: '#E2E8F0',
    borderStrong: '#CBD5E1',
    text: '#0F172A',
    text2: '#475569',
    text3: '#94A3B8',
    brand: '#0F172A',
    active: '#10B981',
    warn: '#F59E0B',
    warnSoft: 'rgba(245, 158, 11, 0.12)',
    sos: '#EF4444',
    sosSoft: 'rgba(239, 68, 68, 0.12)',
  },
  dark: {
    bg: '#111318',
    surface: '#181B21',
    surface2: '#20242C',
    surface3: '#252A33',
    border: '#2B313B',
    borderStrong: '#2B313B',
    text: '#F5F7FA',
    text2: '#A8B0BC',
    text3: '#727C8B',
    brand: '#2E8BFF',
    active: '#2FD98A',
    warn: '#FFC24B',
    warnSoft: 'rgba(255,194,75,0.14)',
    sos: '#FF5A5F',
    sosSoft: 'rgba(255,90,95,0.14)',
  },
  darkNavy: { // Default contextual for Active Protection
    bg: '#0A1220',
    surface: '#101B2E',
    surface2: '#16233B',
    surface3: '#1E3050',
    border: '#24344F',
    borderStrong: '#33486B',
    text: '#F5F8FF',
    text2: '#A9B7CE',
    text3: '#6B7C97',
    brand: '#2E8BFF',
    active: '#2FD98A',
    warn: '#FFC24B',
    warnSoft: 'rgba(255,194,75,0.14)',
    sos: '#FF5A5F',
    sosSoft: 'rgba(255,90,95,0.14)',
  },
  critical: {
    bg: '#EF4444',
    surface: '#DC2626',
    surface2: '#B91C1C',
    surface3: '#991B1B',
    border: '#F87171',
    borderStrong: '#FCA5A5',
    text: '#FFFFFF',
    text2: '#FEE2E2',
    text3: '#FECACA',
    brand: '#FFFFFF',
    active: '#10B981',
    warn: '#F59E0B',
    warnSoft: 'rgba(255,255,255,0.2)',
    sos: '#FFFFFF',
    sosSoft: 'rgba(255,255,255,0.2)',
  }
};

const RADIUS = { sm: 8, md: 16, lg: 24, xl: 32, pill: 999 };
const SPACING = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };

// --- SHARED COMPONENTS ---

const GText = ({ style, variant = 'body', theme, children, ...props }: any) => {
  const isDisplay = variant === 'display';
  const baseStyle = {
    fontFamily: isDisplay ? 'Manrope' : 'Inter',
    color: theme.text,
    fontSize: isDisplay ? 24 : 15,
    fontWeight: isDisplay ? '700' : '400',
  };
  return <Text style={[baseStyle, style]} {...props}>{children}</Text>;
};

const GButton = ({ title, onPress, variant = 'primary', theme, style, disabled, loading }: any) => {
  let bgColor = theme.brand;
  let textColor = theme.bg;
  let borderColor = 'transparent';
  let borderWidth = 0;

  if (variant === 'secondary') {
    bgColor = 'transparent';
    textColor = theme.text;
    borderColor = theme.borderStrong;
    borderWidth = 1;
  } else if (variant === 'danger') {
    bgColor = theme.sos;
    textColor = '#FFFFFF';
  } else if (variant === 'ghost') {
    bgColor = 'transparent';
    textColor = theme.text2;
  }

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[{
        backgroundColor: bgColor,
        borderColor,
        borderWidth,
        borderRadius: RADIUS.md,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.6 : 1,
        flexDirection: 'row',
      }, style]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <GText style={{ color: textColor, fontWeight: '600', fontSize: 16 }}>{title}</GText>
      )}
    </TouchableOpacity>
  );
};

const GCard = ({ theme, children, style }: any) => (
  <View style={[{
    backgroundColor: theme.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: theme.border,
    padding: SPACING.lg,
  }, style]}>
    {children}
  </View>
);

const GHeader = ({ title, onBack, rightIcon: RightIcon, onRightPress, theme }: any) => (
  <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, backgroundColor: theme.bg }}>
    {onBack ? (
      <TouchableOpacity onPress={onBack} style={{ padding: SPACING.sm }}>
        <ChevronLeft size={24} color={theme.text} />
      </TouchableOpacity>
    ) : <View style={{ width: 40 }} />}
    <GText variant="display" style={{ fontSize: 18 }}>{title}</GText>
    {RightIcon ? (
      <TouchableOpacity onPress={onRightPress} style={{ padding: SPACING.sm }}>
        <RightIcon size={24} color={theme.text} />
      </TouchableOpacity>
    ) : <View style={{ width: 40 }} />}
  </View>
);

const GlobalBanner = ({ status, theme }: any) => {
  if (status === 'online') return null;
  
  const isOffline = status === 'offline';
  const bgColor = isOffline ? theme.warnSoft : theme.sosSoft;
  const textColor = isOffline ? theme.warn : theme.sos;
  const icon = isOffline ? <Activity size={16} color={textColor} /> : <AlertTriangle size={16} color={textColor} />;
  const message = isOffline ? 'Você está offline. SOS armazenado localmente.' : 'Sinal de GPS ausente. Proteção degradada.';

  return (
    <View style={{ backgroundColor: bgColor, padding: SPACING.sm, flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md }}>
      {icon}
      <GText style={{ color: textColor, fontSize: 13, fontWeight: '600', marginLeft: SPACING.sm }}>{message}</GText>
    </View>
  );
};

// --- APP ARCHITECTURE ---

type ScreenType = 'login' | 'signup' | 'home' | 'active_protection' | 'contacts' | 'alerts' | 'settings' | 'alert_sent';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [isProtectionActive, setIsProtectionActive] = useState(false);
  const [themePreference, setThemePreference] = useState<'light' | 'dark'>('light');
  
  // UI Mock States
  const [systemStatus, setSystemStatus] = useState<'online' | 'offline' | 'no_gps'>('online');
  const [sosOverlayVisible, setSosOverlayVisible] = useState(false);
  const [activationSheetVisible, setActivationSheetVisible] = useState(false);

  // Contextual Theme Logic
  let currentTheme = COLORS[themePreference];
  if (isProtectionActive && currentScreen === 'active_protection') {
    currentTheme = COLORS.darkNavy;
  }
  if (currentScreen === 'alert_sent' || sosOverlayVisible) {
    currentTheme = COLORS.critical;
  }

  const navigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  const handleActivate = () => {
    setActivationSheetVisible(false);
    setIsProtectionActive(true);
    navigate('active_protection');
  };

  const triggerSOS = () => {
    setSosOverlayVisible(true);
    // Simulates the flow: Action -> Sending -> Sent
    setTimeout(() => {
      setSosOverlayVisible(false);
      navigate('alert_sent');
    }, 3000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.bg }}>
      <StatusBar 
        barStyle={currentTheme === COLORS.light ? 'dark-content' : 'light-content'} 
        backgroundColor={currentTheme.bg} 
      />
      
      <GlobalBanner status={systemStatus} theme={currentTheme} />

      {currentScreen === 'login' && <LoginScreen navigate={navigate} theme={currentTheme} />}
      {currentScreen === 'signup' && <SignupScreen navigate={navigate} theme={currentTheme} />}
      
      {currentScreen === 'home' && (
        <HomeScreen 
          navigate={navigate} 
          theme={currentTheme} 
          onActivateRequest={() => setActivationSheetVisible(true)} 
          isProtectionActive={isProtectionActive}
        />
      )}
      
      {currentScreen === 'active_protection' && (
        <ActiveProtectionScreen 
          navigate={navigate} 
          theme={currentTheme} 
          onDeactivate={() => { setIsProtectionActive(false); navigate('home'); }} 
          onSOS={triggerSOS}
        />
      )}

      {currentScreen === 'contacts' && <ContactsScreen navigate={navigate} theme={currentTheme} />}
      {currentScreen === 'alerts' && <AlertsScreen navigate={navigate} theme={currentTheme} />}
      
      {currentScreen === 'settings' && (
        <SettingsScreen 
          navigate={navigate} 
          theme={currentTheme} 
          themePref={themePreference} 
          setThemePref={setThemePreference} 
          sysStatus={systemStatus}
          setSysStatus={setSystemStatus}
        />
      )}

      {currentScreen === 'alert_sent' && (
        <AlertSentScreen 
          navigate={navigate} 
          theme={currentTheme} 
          onEnd={() => { setIsProtectionActive(false); navigate('home'); }} 
          status={systemStatus}
        />
      )}

      {/* Overlays / Bottom Sheets */}
      <ActivationSheet 
        visible={activationSheetVisible} 
        onClose={() => setActivationSheetVisible(false)} 
        onConfirm={handleActivate} 
        theme={currentTheme} 
        status={systemStatus}
      />
      
      <SOSActionOverlay 
        visible={sosOverlayVisible} 
        theme={currentTheme} 
      />

    </SafeAreaView>
  );
}

// --- SCREENS ---

function LoginScreen({ navigate, theme }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('home'); }, 1000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.surface, paddingHorizontal: SPACING.xl, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginBottom: SPACING.xxl }}>
        <View style={{ width: 64, height: 64, backgroundColor: theme.text, borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.lg }}>
          <Shield size={32} color={theme.surface} />
        </View>
        <GText variant="display">GUARDIAM</GText>
        <GText style={{ color: theme.text2, marginTop: SPACING.sm }}>Proteção pessoal premium.</GText>
      </View>

      <View style={{ gap: SPACING.md }}>
        <View>
          <GText style={{ fontSize: 12, fontWeight: '600', color: theme.text2, textTransform: 'uppercase', marginBottom: SPACING.sm }}>E-mail</Text>
          <TextInput 
            placeholder="seu@email.com" 
            placeholderTextColor={theme.text3} 
            style={{ backgroundColor: theme.bg, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: 14, color: theme.text, fontFamily: 'Inter', fontSize: 15 }} 
          />
        </View>
        <View>
          <GText style={{ fontSize: 12, fontWeight: '600', color: theme.text2, textTransform: 'uppercase', marginBottom: SPACING.sm }}>Senha</Text>
          <View style={{ position: 'relative' }}>
            <TextInput 
              placeholder="••••••••" 
              placeholderTextColor={theme.text3} 
              secureTextEntry={!showPassword} 
              style={{ backgroundColor: theme.bg, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: 14, color: theme.text, fontFamily: 'Inter', fontSize: 15, paddingRight: 48 }} 
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: SPACING.md, top: 14 }}>
              {showPassword ? <EyeOff size={18} color={theme.text3} /> : <Eye size={18} color={theme.text3} />}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={{ alignSelf: 'flex-end', paddingVertical: SPACING.xs }}>
          <GText style={{ color: theme.text2, fontSize: 13, fontWeight: '500' }}>Esqueci minha senha</GText>
        </TouchableOpacity>

        <GButton title="Entrar" onPress={handleLogin} theme={theme} loading={loading} style={{ marginTop: SPACING.sm }} />
        <GButton title="Criar conta" variant="ghost" onPress={() => navigate('signup')} theme={theme} />
      </View>
    </View>
  );
}

function SignupScreen({ navigate, theme }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <GHeader onBack={() => navigate('login')} theme={theme} />
      <ScrollView contentContainerStyle={{ padding: SPACING.xl }}>
        <GText variant="display" style={{ marginBottom: SPACING.sm }}>Criar conta</GText>
        <GText style={{ color: theme.text2, marginBottom: SPACING.xxl }}>Preencha os dados abaixo para iniciar sua proteção.</GText>
        
        <View style={{ gap: SPACING.md }}>
          <View>
            <GText style={{ fontSize: 12, fontWeight: '600', color: theme.text2, textTransform: 'uppercase', marginBottom: SPACING.sm }}>Nome Completo</GText>
            <TextInput placeholder="Ex: Ana Silva" placeholderTextColor={theme.text3} style={{ backgroundColor: theme.surface, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: 14, color: theme.text, borderWidth: 1, borderColor: theme.border }} />
          </View>
          <View>
            <GText style={{ fontSize: 12, fontWeight: '600', color: theme.text2, textTransform: 'uppercase', marginBottom: SPACING.sm }}>E-mail</GText>
            <TextInput placeholder="seu@email.com" placeholderTextColor={theme.text3} style={{ backgroundColor: theme.surface, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: 14, color: theme.text, borderWidth: 1, borderColor: theme.border }} />
          </View>
          <View>
            <GText style={{ fontSize: 12, fontWeight: '600', color: theme.text2, textTransform: 'uppercase', marginBottom: SPACING.sm }}>Senha</GText>
            <TextInput placeholder="••••••••" placeholderTextColor={theme.text3} secureTextEntry style={{ backgroundColor: theme.surface, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: 14, color: theme.text, borderWidth: 1, borderColor: theme.border }} />
          </View>
          
          <GButton title="Criar conta" onPress={() => navigate('home')} theme={theme} style={{ marginTop: SPACING.md }} />
        </View>
      </ScrollView>
    </View>
  );
}

function HomeScreen({ navigate, theme, onActivateRequest, isProtectionActive }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg }}>
        <GText variant="display" style={{ fontSize: 20 }}>GUARDIAM</GText>
        <TouchableOpacity onPress={() => navigate('settings')} style={{ padding: SPACING.sm }}>
          <Settings size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: SPACING.lg, paddingBottom: 100 }}>
        <GText variant="display" style={{ marginBottom: SPACING.xs }}>Olá, Usuário</GText>
        <GText style={{ color: theme.text2, marginBottom: SPACING.xl }}>O sistema está pronto para você.</GText>

        <GCard theme={theme} style={{ alignItems: 'center', paddingVertical: SPACING.xxl }}>
          <View style={{ width: 80, height: 80, backgroundColor: theme.surface3, borderRadius: RADIUS.pill, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.lg }}>
            <Shield size={32} color={theme.text3} />
          </View>
          <GText variant="display" style={{ fontSize: 20, marginBottom: SPACING.sm }}>Proteção Inativa</GText>
          <GText style={{ color: theme.text2, textAlign: 'center', marginBottom: SPACING.xl, lineHeight: 22 }}>
            Sua localização não está sendo rastreada. Inicie a proteção para maior segurança.
          </GText>
          <GButton title="Iniciar Proteção" onPress={onActivateRequest} theme={theme} style={{ width: '100%' }} />
        </GCard>

        <View style={{ marginTop: SPACING.xl, gap: SPACING.sm }}>
          <GText style={{ fontSize: 13, fontWeight: '600', color: theme.text3, textTransform: 'uppercase', marginBottom: SPACING.xs }}>Acesso Rápido</GText>
          
          <TouchableOpacity onPress={() => navigate('contacts')} style={{ backgroundColor: theme.surface, padding: SPACING.lg, borderRadius: RADIUS.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <UserPlus size={20} color={theme.text2} style={{ marginRight: SPACING.md }} />
              <GText style={{ fontWeight: '500' }}>Contatos Confiáveis</GText>
            </View>
            <ChevronRight size={20} color={theme.borderStrong} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigate('alerts')} style={{ backgroundColor: theme.surface, padding: SPACING.lg, borderRadius: RADIUS.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Bell size={20} color={theme.text2} style={{ marginRight: SPACING.md }} />
              <GText style={{ fontWeight: '500' }}>Histórico de Alertas</GText>
            </View>
            <ChevronRight size={20} color={theme.borderStrong} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function ActiveProtectionScreen({ navigate, theme, onDeactivate, onSOS }: any) {
  // Simulating animation state for the pulse
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <GHeader title="Proteção Ativa" onRightPress={() => navigate('settings')} rightIcon={Settings} theme={theme} />
      
      <View style={{ flex: 1, padding: SPACING.lg }}>
        <GCard theme={theme} style={{ marginBottom: SPACING.xl }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.lg }}>
            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: theme.active, marginRight: SPACING.sm }} />
            <GText style={{ fontWeight: '700', fontSize: 13, letterSpacing: 1, color: theme.text }}>SISTEMA OPERANTE</GText>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <GText style={{ fontSize: 11, fontWeight: '600', color: theme.text3, textTransform: 'uppercase', marginBottom: 4 }}>Localização</Text>
              <GText style={{ fontWeight: '500' }}>Rastreando</GText>
            </View>
            <View style={{ flex: 1 }}>
              <GText style={{ fontSize: 11, fontWeight: '600', color: theme.text3, textTransform: 'uppercase', marginBottom: 4 }}>Contatos</Text>
              <GText style={{ fontWeight: '500' }}>3 Prontidão</GText>
            </View>
          </View>
        </GCard>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity 
            onLongPress={onSOS}
            delayLongPress={2000} // UX: 2s for native to feel right
            activeOpacity={0.9}
            style={{ 
              width: 200, height: 200, borderRadius: 100, 
              backgroundColor: theme.sos, alignItems: 'center', justifyContent: 'center', 
              shadowColor: theme.sos, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 12 
            }}
          >
            <ShieldAlert size={48} color="#FFFFFF" style={{ marginBottom: SPACING.sm }} />
            <GText variant="display" style={{ color: '#FFFFFF', fontSize: 28 }}>SOS</GText>
          </TouchableOpacity>
          <GText style={{ color: theme.text2, marginTop: SPACING.xl, fontWeight: '500' }}>Segure para acionar emergência</GText>
        </View>

        <GButton title="Encerrar Proteção" variant="secondary" onPress={onDeactivate} theme={theme} style={{ marginTop: 'auto' }} />
      </View>
    </View>
  );
}

function SOSActionOverlay({ visible, theme }: any) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{ flex: 1, backgroundColor: theme.bg, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl }}>
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: theme.sos, opacity: 0.1 }} />
        <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: theme.sosSoft, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.xl }}>
          <Navigation size={48} color={theme.sos} />
        </View>
        <GText variant="display" style={{ fontSize: 28, marginBottom: SPACING.sm }}>Acionando SOS</GText>
        <GText style={{ color: theme.text2, fontSize: 16, textAlign: 'center' }}>Não solte o botão.{'\n'}Enviando alerta para contatos e autoridades.</GText>
      </View>
    </Modal>
  );
}

function AlertSentScreen({ navigate, theme, onEnd, status }: any) {
  const isOffline = status === 'offline';
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl }}>
        <View style={{ width: 96, height: 96, borderRadius: RADIUS.pill, backgroundColor: theme.warnSoft, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.xl }}>
          {isOffline ? <AlertTriangle size={48} color={theme.text} /> : <CheckCircle2 size={48} color={theme.text} />}
        </View>
        
        <GText variant="display" style={{ fontSize: 32, marginBottom: SPACING.md }}>
          {isOffline ? 'SOS Registrado' : 'SOS Enviado'}
        </GText>
        
        <GText style={{ color: theme.text2, fontSize: 16, textAlign: 'center', marginBottom: SPACING.xxl }}>
          {isOffline 
            ? 'Você está offline. O alerta foi armazenado e será despachado assim que houver conexão. Tente ligar.' 
            : 'Seus contatos de segurança foram notificados e estão acompanhando sua localização em tempo real.'}
        </GText>

        <View style={{ backgroundColor: theme.warnSoft, borderRadius: RADIUS.lg, padding: SPACING.lg, width: '100%', marginBottom: SPACING.xxl }}>
          <View style={{ marginBottom: SPACING.md }}>
            <GText style={{ color: theme.text2, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 }}>Status do Alerta</GText>
            <GText style={{ fontWeight: '600' }}>{isOffline ? 'Aguardando Rede' : 'Confirmação de Leitura Pendente'}</GText>
          </View>
          <View>
            <GText style={{ color: theme.text2, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 }}>Ação Recomendada</GText>
            <GText style={{ fontWeight: '600' }}>Procure um local seguro.</GText>
          </View>
        </View>
      </View>
      
      <View style={{ padding: SPACING.xl, gap: SPACING.md }}>
        <GButton title="Ligar para emergência" variant="primary" theme={theme} style={{ backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1 }} onPress={() => {}} />
        <GButton title="Encerrar Alerta" variant="ghost" theme={theme} onPress={onEnd} />
      </View>
    </View>
  );
}

function ActivationSheet({ visible, onClose, onConfirm, theme, status }: any) {
  const degraded = status === 'no_gps';
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} activeOpacity={1} />
        <View style={{ backgroundColor: theme.bg, borderTopLeftRadius: RADIUS.xl, borderTopRightRadius: RADIUS.xl, padding: SPACING.xl, paddingBottom: 48 }}>
          <GText variant="display" style={{ fontSize: 24, marginBottom: SPACING.lg }}>Confirmar Proteção</GText>
          
          {degraded && (
            <View style={{ backgroundColor: theme.warnSoft, padding: SPACING.md, borderRadius: RADIUS.md, marginBottom: SPACING.lg }}>
              <GText style={{ color: theme.warn, fontWeight: '600' }}>Atenção: Localização desativada.</GText>
              <GText style={{ color: theme.warn, fontSize: 13, marginTop: 4 }}>A proteção funcionará em modo degradado. Em caso de SOS, seus contatos não receberão suas coordenadas atuais.</GText>
            </View>
          )}

          <View style={{ gap: SPACING.lg, marginBottom: SPACING.xxl }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.surface2, alignItems: 'center', justifyContent: 'center', marginRight: SPACING.md }}>
                <Check size={20} color={theme.active} />
              </View>
              <View style={{ flex: 1 }}>
                <GText style={{ fontWeight: '600' }}>Contatos Prontos</GText>
                <GText style={{ color: theme.text2, fontSize: 13 }}>3 pessoas serão avisadas instantaneamente.</GText>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.surface2, alignItems: 'center', justifyContent: 'center', marginRight: SPACING.md }}>
                {degraded ? <AlertTriangle size={20} color={theme.warn} /> : <Check size={20} color={theme.active} />}
              </View>
              <View style={{ flex: 1 }}>
                <GText style={{ fontWeight: '600' }}>Rastreamento Contínuo</GText>
                <GText style={{ color: theme.text2, fontSize: 13 }}>{degraded ? 'Indisponível no momento.' : 'Ativo em background.'}</GText>
              </View>
            </View>
          </View>

          <GButton title="Iniciar" onPress={onConfirm} theme={theme} />
        </View>
      </View>
    </Modal>
  );
}

// --- SECONDARY SCREENS ---

function ContactsScreen({ navigate, theme }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <GHeader title="Contatos" onBack={() => navigate('home')} theme={theme} />
      <ScrollView contentContainerStyle={{ padding: SPACING.lg }}>
        <View style={{ gap: SPACING.sm }}>
          <ContactCard name="Mãe" relation="Familiar" status="Pronto" theme={theme} />
          <ContactCard name="João Silva" relation="Irmão" status="Pronto" theme={theme} />
        </View>
        <GButton title="Adicionar contato" variant="secondary" theme={theme} style={{ marginTop: SPACING.xl, borderStyle: 'dashed' }} />
      </ScrollView>
    </View>
  );
}

function ContactCard({ name, relation, status, theme }: any) {
  const isReady = status === 'Pronto';
  return (
    <GCard theme={theme} style={{ padding: SPACING.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 48, height: 48, backgroundColor: theme.surface3, borderRadius: RADIUS.pill, alignItems: 'center', justifyContent: 'center', marginRight: SPACING.md }}>
          <User size={20} color={theme.text2} />
        </View>
        <View>
          <GText style={{ fontWeight: '600' }}>{name}</GText>
          <GText style={{ fontSize: 13, color: theme.text2 }}>{relation}</GText>
        </View>
      </View>
      <View style={{ backgroundColor: isReady ? theme.activeSoft : theme.warnSoft, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
        <GText style={{ fontSize: 11, fontWeight: '600', color: isReady ? theme.active : theme.warn }}>{status}</GText>
      </View>
    </GCard>
  );
}

function AlertsScreen({ navigate, theme }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <GHeader title="Histórico" onBack={() => navigate('home')} theme={theme} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl }}>
        <AlertCircle size={48} color={theme.borderStrong} style={{ marginBottom: SPACING.md }} />
        <GText style={{ color: theme.text2, textAlign: 'center' }}>Nenhum alerta crítico registrado.</GText>
      </View>
    </View>
  );
}

function SettingsScreen({ navigate, theme, themePref, setThemePref, sysStatus, setSysStatus }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <GHeader title="Configurações" onBack={() => navigate('home')} theme={theme} />
      <ScrollView contentContainerStyle={{ padding: SPACING.lg }}>
        
        <GText style={{ fontSize: 12, fontWeight: '600', color: theme.text3, textTransform: 'uppercase', marginBottom: SPACING.sm }}>Aparência</GText>
        <GCard theme={theme} style={{ padding: 0, overflow: 'hidden', marginBottom: SPACING.xl }}>
          <TouchableOpacity onPress={() => setThemePref(themePref === 'light' ? 'dark' : 'light')} style={{ padding: SPACING.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {themePref === 'dark' ? <Moon size={20} color={theme.text} /> : <Sun size={20} color={theme.text} />}
              <GText style={{ marginLeft: SPACING.md, fontWeight: '500' }}>Tema do Aplicativo</GText>
            </View>
            <GText style={{ color: theme.text2 }}>{themePref === 'dark' ? 'Escuro' : 'Claro'}</GText>
          </TouchableOpacity>
        </GCard>

        <GText style={{ fontSize: 12, fontWeight: '600', color: theme.text3, textTransform: 'uppercase', marginBottom: SPACING.sm }}>Simulador (Dev)</GText>
        <GCard theme={theme} style={{ padding: 0, overflow: 'hidden', marginBottom: SPACING.xl }}>
          <TouchableOpacity onPress={() => setSysStatus(sysStatus === 'online' ? 'offline' : 'online')} style={{ padding: SPACING.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: theme.border }}>
            <GText style={{ fontWeight: '500' }}>Forçar Offline</GText>
            <GText style={{ color: sysStatus === 'offline' ? theme.sos : theme.text2 }}>{sysStatus === 'offline' ? 'Ativo' : 'Inativo'}</GText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSysStatus(sysStatus === 'no_gps' ? 'online' : 'no_gps')} style={{ padding: SPACING.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <GText style={{ fontWeight: '500' }}>Desligar GPS</GText>
            <GText style={{ color: sysStatus === 'no_gps' ? theme.warn : theme.text2 }}>{sysStatus === 'no_gps' ? 'Ativo' : 'Inativo'}</GText>
          </TouchableOpacity>
        </GCard>

        <GButton title="Sair da conta" variant="ghost" onPress={() => navigate('login')} theme={theme} />
      </ScrollView>
    </View>
  );
}
