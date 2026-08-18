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
  Pressable,
  Platform,
  StatusBar
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
} from 'lucide-react-native';

// --- THEME TOKENS (Equivalent to your theme.css) ---
const getTheme = (isDark: boolean) => ({
  bg: isDark ? '#0A1220' : '#F4F7FC',
  surface: isDark ? '#101B2E' : '#FFFFFF',
  surface2: isDark ? '#16233B' : '#F8FAFC',
  surface3: isDark ? '#1E3050' : '#F1F5F9',
  border: isDark ? '#24344F' : '#E2E8F0',
  borderStrong: isDark ? '#33486B' : '#CBD5E1',
  text: isDark ? '#F5F8FF' : '#0F172A',
  text2: isDark ? '#A9B7CE' : '#475569',
  text3: isDark ? '#6B7C97' : '#94A3B8',
  brand: isDark ? '#2E8BFF' : '#0F172A',
  active: isDark ? '#2FD98A' : '#10B981',
  activeSoft: isDark ? 'rgba(47,217,138,0.14)' : 'rgba(16, 185, 129, 0.12)',
  warn: isDark ? '#FFC24B' : '#F59E0B',
  warnSoft: isDark ? 'rgba(255,194,75,0.14)' : 'rgba(245, 158, 11, 0.12)',
  sos: isDark ? '#FF5A5F' : '#EF4444',
  sos2: isDark ? '#E23B4E' : '#DC2626',
  sosSoft: isDark ? 'rgba(255,90,95,0.14)' : 'rgba(239, 68, 68, 0.12)',
  radiusMd: 16,
  radiusLg: 24,
  radiusXl: 32,
  radiusPill: 999,
});

type Screen = 'login' | 'signup' | 'home' | 'activate' | 'active' | 'sos_countdown' | 'alert_sent' | 'contacts' | 'alerts' | 'settings';
type DiscreteIconType = 'shield' | 'heart' | 'star' | 'circle' | 'minus';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  
  const theme = getTheme(themeMode === 'dark');

  const [discreteIcon, setDiscreteIcon] = useState<DiscreteIconType>('shield');
  const [discreteEnabled, setDiscreteEnabled] = useState(true);
  const [systemStatus, setSystemStatus] = useState<'online' | 'offline' | 'gps_off'>('online');

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
    setIsMenuOpen(false);
  };

  const triggerSOS = () => {
    navigate('sos_countdown');
    setTimeout(() => {
      navigate('alert_sent');
    }, 3000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.bg} />
      
      {systemStatus !== 'online' && currentScreen !== 'login' && currentScreen !== 'signup' && (
        <View style={{ backgroundColor: theme.warnSoft, padding: 12, flexDirection: 'row', alignItems: 'center' }}>
          <AlertCircle size={16} color={theme.warn} style={{ marginRight: 8 }} />
          <Text style={{ color: theme.warn, fontSize: 13, fontWeight: '500' }}>
            {systemStatus === 'offline' ? 'Sem conexão com a internet.' : 'Sinal de GPS fraco ou desligado.'}
          </Text>
        </View>
      )}

      {currentScreen === 'login' && <LoginScreen navigate={navigate} theme={theme} themeMode={themeMode} setThemeMode={setThemeMode} />}
      {currentScreen === 'signup' && <SignupScreen navigate={navigate} theme={theme} />}
      {currentScreen === 'home' && <HomeScreen navigate={navigate} theme={theme} onMenu={() => setIsMenuOpen(true)} />}
      {currentScreen === 'activate' && <ActivateScreen navigate={navigate} theme={theme} />}
      {currentScreen === 'active' && <ActiveScreen navigate={navigate} theme={theme} onMenu={() => setIsMenuOpen(true)} onSOS={triggerSOS} discreteEnabled={discreteEnabled} discreteIcon={discreteIcon} />}
      {currentScreen === 'sos_countdown' && <SOSCountdownScreen theme={theme} />}
      {currentScreen === 'alert_sent' && <AlertSentScreen navigate={navigate} theme={theme} />}
      {currentScreen === 'contacts' && <ContactsScreen navigate={navigate} theme={theme} />}
      {currentScreen === 'alerts' && <AlertsScreen navigate={navigate} theme={theme} />}
      {currentScreen === 'settings' && (
        <SettingsScreen 
          navigate={navigate} 
          theme={theme} 
          themeMode={themeMode} 
          setThemeMode={setThemeMode}
          discreteEnabled={discreteEnabled}
          setDiscreteEnabled={setDiscreteEnabled}
          discreteIcon={discreteIcon}
          setDiscreteIcon={setDiscreteIcon}
        />
      )}

      {/* Floating Discrete Button (Mocked simplified behavior for RN UI) */}
      {currentScreen === 'active' && discreteEnabled && (
        <View style={{ position: 'absolute', right: 24, top: 120, zIndex: 40 }}>
          <TouchableOpacity 
            onLongPress={triggerSOS}
            delayLongPress={3000}
            style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
          >
            {discreteIcon === 'shield' && <Shield size={20} color={theme.text2} />}
            {discreteIcon === 'heart' && <Heart size={20} color={theme.text2} />}
            {discreteIcon === 'star' && <Star size={20} color={theme.text2} />}
            {discreteIcon === 'circle' && <Circle size={20} color={theme.text2} />}
            {discreteIcon === 'minus' && <Minus size={20} color={theme.text2} />}
          </TouchableOpacity>
        </View>
      )}

      {/* Navigation Menu Modal Mock */}
      {isMenuOpen && (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 50, flexDirection: 'row' }}>
          <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }} onPress={() => setIsMenuOpen(false)} activeOpacity={1} />
          <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '80%', backgroundColor: theme.surface }}>
            
            <View style={{ padding: 24, borderBottomWidth: 1, borderBottomColor: theme.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.surface3, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <User size={20} color={theme.text} />
                </View>
                <View>
                  <Text style={{ fontWeight: '600', fontSize: 14, color: theme.text }}>Usuário</Text>
                  <Text style={{ fontSize: 12, color: theme.text2 }}>Conta Premium</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
                <X size={24} color={theme.text2} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1, paddingVertical: 16 }}>
              <MenuButton icon={Shield} label="Início" isActive={currentScreen === 'home' || currentScreen === 'active'} onPress={() => navigate(currentScreen === 'active' ? 'active' : 'home')} theme={theme} />
              <MenuButton icon={UserPlus} label="Contatos de segurança" isActive={currentScreen === 'contacts'} onPress={() => navigate('contacts')} theme={theme} />
              <MenuButton icon={Bell} label="Alertas" isActive={currentScreen === 'alerts'} onPress={() => navigate('alerts')} theme={theme} />
              <MenuButton icon={Settings} label="Configurações" isActive={currentScreen === 'settings'} onPress={() => navigate('settings')} theme={theme} />
            </ScrollView>

            <View style={{ padding: 24, borderTopWidth: 1, borderTopColor: theme.border }}>
              <TouchableOpacity onPress={() => { setSystemStatus(prev => prev === 'online' ? 'offline' : 'online'); setIsMenuOpen(false); }} style={{ flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 8, marginBottom: 8 }}>
                <Activity size={18} color={theme.text2} style={{ marginRight: 12 }} />
                <Text style={{ fontSize: 14, color: theme.text2 }}>Simular Erro (Offline)</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate('login')} style={{ flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 8 }}>
                <LogOut size={18} color={theme.sos2} style={{ marginRight: 12 }} />
                <Text style={{ fontSize: 14, fontWeight: '500', color: theme.sos2 }}>Sair da conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

// ---------------------------------------------------------
// REUSABLE COMPONENTS
// ---------------------------------------------------------

function Header({ title, onBack, onMenu, theme }: any) {
  return (
    <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, backgroundColor: theme.bg }}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={{ padding: 8 }}>
          <ChevronLeft size={24} color={theme.text} />
        </TouchableOpacity>
      ) : onMenu ? (
        <TouchableOpacity onPress={onMenu} style={{ padding: 8 }}>
          <Menu size={24} color={theme.text} />
        </TouchableOpacity>
      ) : <View style={{ width: 40 }} />}
      
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text }}>{title}</Text>
      
      <View style={{ width: 40 }} />
    </View>
  );
}

function MenuButton({ icon: Icon, label, isActive, onPress, theme }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 24, backgroundColor: isActive ? theme.surface3 : 'transparent', borderRightWidth: isActive ? 4 : 0, borderRightColor: theme.text }}>
      <Icon size={22} color={isActive ? theme.text : theme.text3} style={{ marginRight: 16 }} />
      <Text style={{ fontSize: 16, fontWeight: isActive ? '600' : '500', color: isActive ? theme.text : theme.text2 }}>{label}</Text>
    </TouchableOpacity>
  );
}

// ---------------------------------------------------------
// SCREENS
// ---------------------------------------------------------

function LoginScreen({ navigate, theme, themeMode, setThemeMode }: any) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: theme.surface, paddingHorizontal: 32, justifyContent: 'center' }}>
      <TouchableOpacity 
        style={{ position: 'absolute', top: 24, right: 24, width: 40, height: 40, borderRadius: 20, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.border }}
        onPress={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
      >
        {themeMode === 'light' ? <Moon size={20} color={theme.text2} /> : <Sun size={20} color={theme.text2} />}
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginBottom: 48 }}>
        <View style={{ width: 64, height: 64, backgroundColor: theme.text, borderRadius: theme.radiusMd, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <Shield size={32} color={theme.surface} />
        </View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text, marginBottom: 8 }}>GUARDIAM</Text>
        <Text style={{ color: theme.text2, fontSize: 15 }}>Sua segurança começa aqui.</Text>
      </View>

      <View style={{ gap: 16 }}>
        <View>
          <Text style={{ fontSize: 12, fontWeight: '600', color: theme.text2, textTransform: 'uppercase', marginBottom: 8 }}>E-mail</Text>
          <TextInput placeholder="seu@email.com" placeholderTextColor={theme.text3} style={{ backgroundColor: theme.bg, borderRadius: theme.radiusMd, paddingHorizontal: 16, paddingVertical: 14, color: theme.text, fontSize: 15 }} />
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: theme.text2, textTransform: 'uppercase', marginBottom: 8 }}>Senha</Text>
          <View style={{ position: 'relative' }}>
            <TextInput placeholder="••••••••" placeholderTextColor={theme.text3} secureTextEntry={!showPassword} style={{ backgroundColor: theme.bg, borderRadius: theme.radiusMd, paddingHorizontal: 16, paddingVertical: 14, color: theme.text, fontSize: 15, paddingRight: 48 }} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 16, top: 14 }}>
              {showPassword ? <EyeOff size={18} color={theme.text3} /> : <Eye size={18} color={theme.text3} />}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigate('home')} style={{ backgroundColor: theme.text, borderRadius: theme.radiusMd, height: 56, alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
          <Text style={{ color: theme.surface, fontWeight: '600', fontSize: 16 }}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 32, alignItems: 'center', gap: 16 }}>
        <TouchableOpacity><Text style={{ color: theme.text, fontWeight: '500' }}>Esqueci minha senha</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('signup')} style={{ marginTop: 12 }}><Text style={{ color: theme.text2, fontWeight: '500' }}>Criar conta</Text></TouchableOpacity>
      </View>
    </View>
  );
}

function SignupScreen({ navigate, theme }: any) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: theme.surface }}>
      <Header onBack={() => navigate('login')} theme={theme} />
      
      <ScrollView contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 48 }}>
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text, marginBottom: 8 }}>Criar conta</Text>
          <Text style={{ color: theme.text2, fontSize: 15 }}>Preencha os dados abaixo para começar a usar o GUARDIAM.</Text>
        </View>

        <View style={{ gap: 16 }}>
          <View>
            <Text style={{ fontSize: 12, fontWeight: '600', color: theme.text2, textTransform: 'uppercase', marginBottom: 8 }}>Nome Completo</Text>
            <TextInput placeholder="Ex: Ana Silva" placeholderTextColor={theme.text3} style={{ backgroundColor: theme.bg, borderRadius: theme.radiusMd, paddingHorizontal: 16, paddingVertical: 14, color: theme.text, fontSize: 15 }} />
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: theme.text2, textTransform: 'uppercase', marginBottom: 8 }}>E-mail</Text>
            <TextInput placeholder="seu@email.com" placeholderTextColor={theme.text3} style={{ backgroundColor: theme.bg, borderRadius: theme.radiusMd, paddingHorizontal: 16, paddingVertical: 14, color: theme.text, fontSize: 15 }} />
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: theme.text2, textTransform: 'uppercase', marginBottom: 8 }}>Senha</Text>
            <View style={{ position: 'relative' }}>
              <TextInput placeholder="••••••••" placeholderTextColor={theme.text3} secureTextEntry={!showPassword} style={{ backgroundColor: theme.bg, borderRadius: theme.radiusMd, paddingHorizontal: 16, paddingVertical: 14, color: theme.text, fontSize: 15, paddingRight: 48 }} />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 16, top: 14 }}>
                {showPassword ? <EyeOff size={18} color={theme.text3} /> : <Eye size={18} color={theme.text3} />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigate('home')} style={{ backgroundColor: theme.text, borderRadius: theme.radiusMd, height: 56, alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
            <Text style={{ color: theme.surface, fontWeight: '600', fontSize: 16 }}>Criar conta</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigate('login')} style={{ marginTop: 32, alignItems: 'center' }}>
          <Text style={{ color: theme.text2, fontWeight: '500' }}>Já tem uma conta? <Text style={{ color: theme.text }}>Entrar</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function HomeScreen({ navigate, theme, onMenu }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="GUARDIAM" onMenu={onMenu} theme={theme} />

      <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text }}>Olá, Usuário</Text>
        <Text style={{ color: theme.text2, marginTop: 4, fontSize: 15 }}>Sua proteção está pronta quando você precisar.</Text>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'center' }}>
        <View style={{ backgroundColor: theme.surface, borderRadius: theme.radiusXl, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: theme.border }}>
          <View style={{ width: 80, height: 80, backgroundColor: theme.surface3, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <Shield size={32} color={theme.text3} />
          </View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text, marginBottom: 8 }}>Proteção desativada</Text>
          <Text style={{ color: theme.text2, textAlign: 'center', marginBottom: 32, fontSize: 15, lineHeight: 22 }}>Você ainda não está protegido.{"\n"}Ative para compartilhar sua localização.</Text>
          
          <TouchableOpacity onPress={() => navigate('activate')} style={{ backgroundColor: theme.text, width: '100%', borderRadius: theme.radiusMd, paddingVertical: 16, alignItems: 'center' }}>
            <Text style={{ color: theme.surface, fontWeight: '600', fontSize: 16 }}>Ativar proteção</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function ActivateScreen({ navigate, theme }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.surface }}>
      <Header title="Preparar proteção" onBack={() => navigate('home')} theme={theme} />
      
      <View style={{ flex: 1, padding: 24 }}>
        <Text style={{ color: theme.text2, fontSize: 15, marginBottom: 32 }}>Ao ativar, as seguintes funções iniciarão imediatamente:</Text>
        
        <View style={{ gap: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <CheckCircle2 size={24} color={theme.active} style={{ marginRight: 16, marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: theme.text, fontSize: 16, marginBottom: 4 }}>Contatos de segurança</Text>
              <Text style={{ color: theme.text2, fontSize: 14 }}>Seus 3 contatos de confiança serão notificados em caso de SOS.</Text>
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <CheckCircle2 size={24} color={theme.active} style={{ marginRight: 16, marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: theme.text, fontSize: 16, marginBottom: 4 }}>Localização em tempo real</Text>
              <Text style={{ color: theme.text2, fontSize: 14 }}>Seu trajeto será registrado continuamente com alta precisão.</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <CheckCircle2 size={24} color={theme.active} style={{ marginRight: 16, marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: theme.text, fontSize: 16, marginBottom: 4 }}>Proteção contra falhas</Text>
              <Text style={{ color: theme.text2, fontSize: 14 }}>Se a conexão cair, os dados são salvos localmente e enviados depois.</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ padding: 24, borderTopWidth: 1, borderTopColor: theme.border, backgroundColor: theme.surface }}>
        <TouchableOpacity onPress={() => navigate('active')} style={{ backgroundColor: theme.active, borderRadius: theme.radiusMd, height: 56, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: theme.surface, fontWeight: '600', fontSize: 16 }}>Ativar proteção</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ActiveScreen({ navigate, theme, onMenu, onSOS }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="GUARDIAM" onMenu={onMenu} theme={theme} />
      
      <View style={{ flex: 1, padding: 24 }}>
        <View style={{ backgroundColor: theme.surface, borderRadius: theme.radiusLg, padding: 24, borderWidth: 1, borderColor: theme.border, marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: theme.active, marginRight: 12 }} />
            <Text style={{ fontWeight: 'bold', color: theme.text, fontSize: 14, letterSpacing: 1 }}>PROTEÇÃO ATIVA</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: theme.text3, textTransform: 'uppercase', marginBottom: 4 }}>Localização</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MapPin size={16} color={theme.text} style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 15, fontWeight: '500', color: theme.text }}>Ativa</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: theme.text3, textTransform: 'uppercase', marginBottom: 4 }}>Última att.</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Clock size={16} color={theme.text} style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 15, fontWeight: '500', color: theme.text }}>Agora</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity 
            onLongPress={onSOS}
            delayLongPress={3000}
            activeOpacity={0.8}
            style={{ width: 192, height: 192, borderRadius: 96, backgroundColor: theme.sos, alignItems: 'center', justifyContent: 'center', shadowColor: theme.sos, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.3, shadowRadius: 24, elevation: 10 }}
          >
            <ShieldAlert size={48} color={theme.surface} style={{ marginBottom: 8 }} />
            <Text style={{ color: theme.surface, fontWeight: 'bold', fontSize: 24 }}>SOS</Text>
          </TouchableOpacity>
          <Text style={{ color: theme.text2, fontSize: 14, fontWeight: '500', marginTop: 32 }}>Segure para pedir ajuda</Text>
        </View>

        <TouchableOpacity onPress={() => navigate('home')} style={{ backgroundColor: theme.surface, borderRadius: theme.radiusMd, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: theme.border, marginTop: 'auto' }}>
          <Text style={{ color: theme.text, fontWeight: '600', fontSize: 16 }}>Desativar proteção</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SOSCountdownScreen({ theme }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.surface, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: theme.sos, opacity: 0.05 }} />
      <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: theme.sosSoft, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <Navigation size={40} color={theme.sos} />
      </View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text, marginBottom: 8 }}>Acionando SOS</Text>
      <Text style={{ color: theme.text2, fontSize: 15 }}>Enviando alerta para seus contatos...</Text>
    </View>
  );
}

function AlertSentScreen({ navigate, theme }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.sos }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
        <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
          <CheckCircle2 size={48} color={theme.surface} />
        </View>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: theme.surface, marginBottom: 16 }}>Alerta enviado</Text>
        <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, fontWeight: '500', textAlign: 'center', marginBottom: 48 }}>Seus contatos de segurança foram avisados.</Text>

        <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: theme.radiusLg, padding: 24, width: '100%', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 }}>Horário</Text>
            <Text style={{ color: theme.surface, fontWeight: '500', fontSize: 15 }}>14:32 (Agora)</Text>
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 }}>Localização</Text>
            <Text style={{ color: theme.surface, fontWeight: '500', fontSize: 15 }}>Av. Paulista, 1578 - SP</Text>
          </View>
          <View>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 }}>Status</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: theme.surface, marginRight: 8 }} />
              <Text style={{ color: theme.surface, fontWeight: '500', fontSize: 15 }}>Transmitindo áudio e local</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={{ padding: 24 }}>
        <TouchableOpacity onPress={() => navigate('home')} style={{ backgroundColor: theme.surface, borderRadius: theme.radiusMd, paddingVertical: 16, alignItems: 'center' }}>
          <Text style={{ color: theme.sos, fontWeight: 'bold', fontSize: 16 }}>Estou seguro (Encerrar)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ContactsScreen({ navigate, theme }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Contatos" onBack={() => navigate('home')} theme={theme} />
      
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View style={{ gap: 12 }}>
          <ContactCard name="Mãe" relation="Familiar" status="Pronto" theme={theme} />
          <ContactCard name="João Silva" relation="Irmão" status="Pronto" theme={theme} />
          <ContactCard name="Mariana" relation="Amiga" status="Pendente" theme={theme} />
        </View>
        
        <TouchableOpacity style={{ marginTop: 24, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.borderStrong, borderStyle: 'dashed', borderRadius: theme.radiusMd, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <UserPlus size={18} color={theme.text} style={{ marginRight: 8 }} />
          <Text style={{ color: theme.text, fontWeight: '500', fontSize: 15 }}>Adicionar contato</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function ContactCard({ name, relation, status, theme }: any) {
  const isReady = status === 'Pronto';
  return (
    <View style={{ backgroundColor: theme.surface, padding: 16, borderRadius: theme.radiusMd, borderWidth: 1, borderColor: theme.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 48, height: 48, backgroundColor: theme.bg, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
          <User size={20} color={theme.text2} />
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', color: theme.text, fontSize: 15 }}>{name}</Text>
          <Text style={{ fontSize: 13, color: theme.text2 }}>{relation}</Text>
        </View>
      </View>
      <View style={{ backgroundColor: isReady ? 'rgba(16,185,129,0.1)' : theme.warnSoft, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
        <Text style={{ fontSize: 11, fontWeight: '600', color: isReady ? theme.active : theme.warn }}>{status}</Text>
      </View>
    </View>
  );
}

function AlertsScreen({ navigate, theme }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Alertas" onBack={() => navigate('home')} theme={theme} />
      
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View style={{ paddingLeft: 16, borderLeftWidth: 2, borderLeftColor: theme.border, gap: 32 }}>
          <TimelineItem date="Hoje, 14:32" title="SOS Acionado" desc="Av. Paulista, 1578 - São Paulo" type="sos" theme={theme} />
          <TimelineItem date="12/10/2023, 21:15" title="Proteção ativada" desc="Trajeto: Metrô Clínicas -> Casa" type="info" theme={theme} />
          <TimelineItem date="05/09/2023, 03:22" title="Alerta Automático (Queda)" desc="Rua Augusta, 900. Contatos não avisados (cancelado)." type="warn" theme={theme} />
        </View>
      </ScrollView>
    </View>
  );
}

function TimelineItem({ date, title, desc, type, theme }: any) {
  const colors = { sos: theme.sos, info: theme.active, warn: theme.warn };
  return (
    <View style={{ position: 'relative', paddingLeft: 16 }}>
      <View style={{ position: 'absolute', left: -24, top: 4, width: 12, height: 12, borderRadius: 6, backgroundColor: colors[type as keyof typeof colors], borderWidth: 4, borderColor: theme.bg }} />
      <Text style={{ fontSize: 11, fontWeight: '600', color: theme.text3, textTransform: 'uppercase', marginBottom: 4 }}>{date}</Text>
      <Text style={{ fontSize: 15, fontWeight: 'bold', color: theme.text, marginBottom: 4 }}>{title}</Text>
      <Text style={{ fontSize: 14, color: theme.text2 }}>{desc}</Text>
    </View>
  );
}

function SettingsScreen({ navigate, theme, themeMode, setThemeMode, discreteEnabled, setDiscreteEnabled, discreteIcon, setDiscreteIcon }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Configurações" onBack={() => navigate('home')} theme={theme} />
      
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={{ fontSize: 11, fontWeight: '600', color: theme.text3, textTransform: 'uppercase', marginBottom: 12 }}>Aparência</Text>
        <View style={{ backgroundColor: theme.surface, borderRadius: theme.radiusMd, borderWidth: 1, borderColor: theme.border, marginBottom: 24, overflow: 'hidden' }}>
          <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {themeMode === 'dark' ? <Moon size={18} color={theme.text2} style={{ marginRight: 12 }} /> : <Sun size={18} color={theme.text2} style={{ marginRight: 12 }} />}
              <View>
                <Text style={{ fontWeight: '500', color: theme.text, fontSize: 15 }}>Modo Escuro</Text>
                <Text style={{ fontSize: 12, color: theme.text2, marginTop: 2 }}>Altera o tema de todo o aplicativo.</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} style={{ width: 48, height: 24, borderRadius: 12, backgroundColor: themeMode === 'dark' ? theme.active : theme.borderStrong, justifyContent: 'center', paddingHorizontal: 4 }}>
              <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: theme.surface, transform: [{ translateX: themeMode === 'dark' ? 24 : 0 }] }} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{ fontSize: 11, fontWeight: '600', color: theme.text3, textTransform: 'uppercase', marginBottom: 12 }}>Botão de Proteção Discreto</Text>
        <View style={{ backgroundColor: theme.surface, borderRadius: theme.radiusMd, borderWidth: 1, borderColor: theme.border, marginBottom: 24, overflow: 'hidden' }}>
          <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: theme.border }}>
            <View>
              <Text style={{ fontWeight: '500', color: theme.text, fontSize: 15 }}>Ativar botão flutuante</Text>
              <Text style={{ fontSize: 12, color: theme.text2, marginTop: 2 }}>Visível apenas com proteção ativa.</Text>
            </View>
            <TouchableOpacity onPress={() => setDiscreteEnabled(!discreteEnabled)} style={{ width: 48, height: 24, borderRadius: 12, backgroundColor: discreteEnabled ? theme.active : theme.borderStrong, justifyContent: 'center', paddingHorizontal: 4 }}>
              <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: theme.surface, transform: [{ translateX: discreteEnabled ? 24 : 0 }] }} />
            </TouchableOpacity>
          </View>
          
          {discreteEnabled && (
            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: theme.text, marginBottom: 12 }}>Aparência do botão</Text>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                {(['shield', 'heart', 'star', 'circle', 'minus'] as DiscreteIconType[]).map((icon) => (
                  <TouchableOpacity key={icon} onPress={() => setDiscreteIcon(icon)} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: discreteIcon === icon ? theme.text : theme.bg, borderWidth: 1, borderColor: theme.border, alignItems: 'center', justifyContent: 'center' }}>
                    {icon === 'shield' && <Shield size={18} color={discreteIcon === icon ? theme.surface : theme.text2} />}
                    {icon === 'heart' && <Heart size={18} color={discreteIcon === icon ? theme.surface : theme.text2} />}
                    {icon === 'star' && <Star size={18} color={discreteIcon === icon ? theme.surface : theme.text2} />}
                    {icon === 'circle' && <Circle size={18} color={discreteIcon === icon ? theme.surface : theme.text2} />}
                    {icon === 'minus' && <Minus size={18} color={discreteIcon === icon ? theme.surface : theme.text2} />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        <Text style={{ fontSize: 11, fontWeight: '600', color: theme.text3, textTransform: 'uppercase', marginBottom: 12 }}>Geral</Text>
        <View style={{ backgroundColor: theme.surface, borderRadius: theme.radiusMd, borderWidth: 1, borderColor: theme.border, marginBottom: 32, overflow: 'hidden' }}>
          <SettingsItem icon={User} label="Perfil" theme={theme} />
          <SettingsItem icon={Lock} label="Permissões" theme={theme} />
          <SettingsItem icon={Bell} label="Notificações" theme={theme} />
          <SettingsItem icon={ShieldCheck} label="Privacidade" theme={theme} isLast />
        </View>

        <TouchableOpacity onPress={() => navigate('login')} style={{ backgroundColor: theme.bg, padding: 16, borderRadius: theme.radiusMd, alignItems: 'center' }}>
          <Text style={{ color: theme.sos2, fontWeight: '600', fontSize: 16 }}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function SettingsItem({ icon: Icon, label, theme, isLast }: any) {
  return (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: isLast ? 0 : 1, borderBottomColor: theme.border }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon size={18} color={theme.text2} style={{ marginRight: 12 }} />
        <Text style={{ fontSize: 15, fontWeight: '500', color: theme.text }}>{label}</Text>
      </View>
      <ChevronRight size={18} color={theme.text3} />
    </TouchableOpacity>
  );
}
