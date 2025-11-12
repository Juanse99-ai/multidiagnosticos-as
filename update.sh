#!/bin/bash
# Script para automatizar la actualización del repositorio de Multidiagnósticos AS

echo "🔄 Guardando cambios locales y actualizando GitHub..."

# Agrega todos los archivos modificados
git add .

# Crea un commit con la fecha y hora actual
git commit -m "auto-update: $(date '+%Y-%m-%d %H:%M:%S')"

# Sube los cambios al repositorio remoto
git push origin main

echo "✅ Actualización completada con éxito en GitHub."