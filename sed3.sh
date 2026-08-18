#!/bin/bash
# Modify the icon render in SOSScreen to blink for RadioReceiver
sed -i 's/<r.icon size={17} style={{ color: "var(--g-sos)" }} \/>/<r.icon size={17} style={{ color: r.icon === RadioReceiver ? "var(--g-active)" : "var(--g-sos)" }} className={r.icon === RadioReceiver ? "animate-pulse" : ""} \/>/' src/app/components/guardiam/screens.tsx
