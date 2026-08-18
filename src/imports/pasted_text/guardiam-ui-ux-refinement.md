GUARDIAM — FASE 2: REFINAMENTO FUNCIONAL DA NOVA UI/UX

Mantenha a linguagem visual criada na primeira proposta. NÃO faça um novo redesign completo. Agora transforme o conceito visual em uma especificação de produto real, preparada para implementação em React Native + Expo + TypeScript.

OBJETIVO

Completar os fluxos críticos do GUARDIAM, principalmente proteção, SOS, localização, falhas e recuperação.

O fluxo principal deve ser:

LOGIN
→ HOME
→ ATIVAR PROTEÇÃO
→ PROTEÇÃO ATIVA
→ SOS
→ ALERTA ACIONADO

PRIORIDADE ABSOLUTA: o usuário deve sempre saber se está protegido, se o SOS foi acionado e se o sistema está funcionando.

1. PROTEÇÃO

Criar estados visuais completos:

- proteção desativada;
- preparando proteção;
- ativando;
- proteção ativa;
- proteção sendo encerrada;
- proteção encerrada;
- erro ao ativar;
- erro ao encerrar.

Cada estado deve mostrar claramente:
status, mensagem curta e ação disponível.

Evitar telas intermediárias desnecessárias.

2. LOCALIZAÇÃO

Criar estados:

- localização ativa;
- localização atualizando;
- localização indisponível;
- permissão negada;
- GPS desligado;
- última localização conhecida;
- erro de atualização.

O usuário deve entender rapidamente se sua localização está sendo acompanhada.

3. SOS

Criar fluxo completo:

SOS pronto
→ pressão longa
→ confirmação discreta
→ acionando SOS
→ SOS enviado
→ contatos avisados
→ SOS encerrado

Criar também:

- falha no envio;
- tentativa novamente;
- conexão indisponível;
- localização indisponível.

Nunca mostrar “SOS enviado” sem representar visualmente que o envio foi concluído.

4. BOTÃO DE PROTEÇÃO DISCRETO

Manter o conceito de botão flutuante discreto, mas NÃO depender de emoji nativo do sistema Android.

Criar uma solução visual controlada pelo GUARDIAM.

O usuário poderá escolher entre pequenos símbolos/ícones discretos fornecidos pelo próprio aplicativo.

Exemplos conceituais:
coração, estrela, escudo minimalista, círculo, símbolo neutro.

O elemento deve parecer comum e não revelar imediatamente sua função.

INTERAÇÃO:

botão discreto
→ pressão longa de aproximadamente 3 segundos
→ progresso visual discreto
→ confirmação/vibração
→ SOS

Não usar toque simples para disparar SOS.

Criar tela de configuração:

“Botão de proteção discreto”

Permitir:
- escolher aparência;
- ativar/desativar;
- testar;
- visualizar posição.

Não criar funcionalidades de posicionamento complexo ou drag-and-drop neste momento.

5. HOME

Manter o design atual, mas garantir que o card principal responda imediatamente:

“Estou protegido?”

Estados:

PROTEÇÃO DESATIVADA
→ Ativar proteção

PROTEÇÃO ATIVA
→ Localização
→ Tracking
→ Ver proteção

Criar acesso claro ao SOS sem transformar a Home em uma tela de emergência.

6. OFFLINE / CONECTIVIDADE

Criar estados visuais para:

- internet indisponível;
- API indisponível;
- sincronização pendente;
- reconexão;
- operação recuperada.

Não inventar comportamento técnico. Apenas representar claramente os estados que o aplicativo deverá comunicar.

7. PERMISSÕES

Criar estados para:

- localização permitida;
- localização negada;
- localização limitada;
- GPS desligado;
- notificações desativadas.

A interface deve explicar o problema de forma curta e apresentar uma ação apropriada, como “Permitir localização” ou “Abrir configurações”.

8. PRIMEIRO USO

Criar uma experiência simples para usuário ainda não configurado.

Mostrar somente o necessário para deixar o GUARDIAM pronto:

- contatos de segurança;
- localização;
- permissões essenciais.

Evitar onboarding longo.

9. MENU

Manter:

- Início;
- Proteção;
- Contatos;
- Alertas;
- Configurações.

Criar estados aberto/fechado e indicar claramente a tela atual.

10. ACESSIBILIDADE

Garantir:
- contraste;
- áreas de toque adequadas;
- textos legíveis;
- estados que não dependam somente de cor;
- feedback visual claro;
- feedback de pressão longa.

11. PROTÓTIPO

Atualizar o protótipo para demonstrar:

Login
→ Home
→ Ativar proteção
→ Proteção ativa
→ botão discreto
→ pressão longa
→ SOS
→ alerta acionado

Criar também exemplos de:
erro de localização;
erro de conexão;
permissão negada;
falha no SOS;
retry.

12. IMPLEMENTAÇÃO FUTURA

Tudo deve continuar compatível com:

React Native
TypeScript
Expo SDK 56
Expo Router
Android

Não utilizar recursos visuais que dependam exclusivamente do Figma.

Não implementar código.

ENTREGA

Atualizar o Design System somente quando necessário.

Manter a identidade visual já criada.

Criar os novos estados e fluxos críticos.

Não adicionar funcionalidades não especificadas.

PRIORIDADE:

1. Proteção
2. SOS
3. Localização
4. Falhas
5. Botão discreto
6. Primeiro uso
7. Navegação

Não finalizar apenas com telas bonitas. O protótipo deve demonstrar como o produto se comporta quando tudo funciona E quando algo dá errado.

Ao terminar, apresentar a proposta visual atualizada e parar para avaliação.