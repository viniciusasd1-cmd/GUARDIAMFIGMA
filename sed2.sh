#!/bin/bash
# Modify the SOSScreen to include media recording text
sed -i 's/{ icon: Radio, label: "Status", value: "Enviado aos contatos" },/{ icon: Radio, label: "Status", value: "Enviado aos contatos" },\n                { icon: RadioReceiver, label: "Mídia", value: "Gravando áudio e vídeo..." },/' src/app/components/guardiam/screens.tsx
