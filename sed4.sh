#!/bin/bash
# Remove the messed up showDiscreteButton lines
sed -i '126s/.*//g' src/app/App.tsx
# Insert the correct line
sed -i '126i\  const showDiscreteButton = loggedIn && discreteEnabled && screen !== "sos" && screen !== "discrete-settings" && screen !== "fake-call";' src/app/App.tsx
