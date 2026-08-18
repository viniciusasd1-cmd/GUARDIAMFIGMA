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

  // Discrete Button State
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
      
      {/* Global Connection Warning */}
      {systemStatus !== 'online' && currentScreen !== 'login' && (
        <View style={{ backgroundColor: theme.warnSoft, padding: 12, flexDirection: 'row', alignItems: 'center' }}>
          <AlertCircle size={16} color={theme.warn} style={{ marginRight: 8 }} />
          <Text style={{ color: theme.warn, fontSize: 13, fontWeight: '500' }}>
            {systemStatus === 'offline' ? 'Sem conexão com a internet.' : 'Sinal de GPS fraco ou desligado.'}
          </Text>
        </View>
      )}

      {currentScreen === 'login' && <LoginScreen navigate={navigate} theme={theme} themeMode={themeMode} setThemeMode={setThemeMode} />}
      {currentScreen === 'home' && <HomeScreen navigate={navigate} theme={theme} onMenu={() => setIsMenuOpen(true)} />}
      
      {/* ... Add other screens following the same pattern ... */}
      {/* This is a structural preview of the RN conversion */}
      
    </SafeAreaView>
  );
}

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

      {/* Input Form */}
      <View style={{ gap: 16 }}>
        <View>
          <Text style={{ fontSize: 12, fontWeight: '600', color: theme.text2, textTransform: 'uppercase', marginBottom: 8 }}>E-mail</Text>
          <TextInput 
            placeholder="seu@email.com"
            placeholderTextColor={theme.text3}
            style={{ backgroundColor: theme.bg, borderRadius: theme.radiusMd, paddingHorizontal: 16, paddingVertical: 14, color: theme.text, fontSize: 15 }}
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: theme.text2, textTransform: 'uppercase', marginBottom: 8 }}>Senha</Text>
          <View style={{ position: 'relative' }}>
            <TextInput 
              placeholder="••••••••"
              placeholderTextColor={theme.text3}
              secureTextEntry={!showPassword}
              style={{ backgroundColor: theme.bg, borderRadius: theme.radiusMd, paddingHorizontal: 16, paddingVertical: 14, color: theme.text, fontSize: 15, paddingRight: 48 }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 16, top: 14 }}>
              {showPassword ? <EyeOff size={18} color={theme.text3} /> : <Eye size={18} color={theme.text3} />}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          onPress={() => navigate('home')}
          style={{ backgroundColor: theme.text, borderRadius: theme.radiusMd, height: 56, alignItems: 'center', justifyContent: 'center', marginTop: 8 }}
        >
          <Text style={{ color: theme.surface, fontWeight: '600', fontSize: 16 }}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HomeScreen({ navigate, theme, onMenu }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Header */}
      <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={onMenu} style={{ padding: 8 }}>
          <Menu size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text }}>GUARDIAM</Text>
        <TouchableOpacity style={{ padding: 8 }}>
          <Bell size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text }}>Olá, Usuário</Text>
        <Text style={{ color: theme.text2, marginTop: 4 }}>Sua proteção está pronta quando você precisar.</Text>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'center' }}>
        <View style={{ backgroundColor: theme.surface, borderRadius: theme.radiusXl, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: theme.border }}>
          <View style={{ width: 80, height: 80, backgroundColor: theme.surface3, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <Shield size={32} color={theme.text3} />
          </View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text, marginBottom: 8 }}>Proteção desativada</Text>
          <Text style={{ color: theme.text2, textAlign: 'center', marginBottom: 32 }}>Você ainda não está protegido.{"\n"}Ative para compartilhar sua localização.</Text>
          
          <TouchableOpacity 
            onPress={() => navigate('activate')}
            style={{ backgroundColor: theme.text, width: '100%', borderRadius: theme.radiusMd, paddingVertical: 16, alignItems: 'center' }}
          >
            <Text style={{ color: theme.surface, fontWeight: '600' }}>Ativar proteção</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
