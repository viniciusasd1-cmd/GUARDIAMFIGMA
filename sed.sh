#!/bin/bash
# Remove the old Card implementation for "Modo Proteção" ActiveScreen and replace it with LiveRadar
sed -i '/<Card raised className="p-4" style={{ border: "1px solid rgba(47,217,138,0.4)" }}>/,/<\/Card>/c\        <div className="flex items-center justify-between mb-4">\n          <StatusBadge tone="active" pulse>PROTEÇÃO ATIVA</StatusBadge>\n          <span style={{ color: "var(--g-text-3)", fontSize: 12 }}>Atualizado agora</span>\n        </div>\n        \n        <LiveRadar />' src/app/components/guardiam/screens.tsx
