const fs = require('fs');
const path = require('path');

const cursosDir = path.join(__dirname, '../cursos');
const outputFile = path.join(__dirname, 'courses-content.js');

try {
    const files = fs.readdirSync(cursosDir).filter(f => f.endsWith('.md')).sort();
    const contentMap = {};

    files.forEach((file) => {
        // Extraer número de módulo del nombre de archivo (ej. modulo_01 -> 1)
        const match = file.match(/modulo_(\d+)/);
        if (match) {
            const id = parseInt(match[1], 10);
            const fullPath = path.join(cursosDir, file);
            const content = fs.readFileSync(fullPath, 'utf8');
            contentMap[id] = content;
        }
    });

    const jsOutput = `/**\n * courses-content.js - Bundle offline precargado con los 10 Módulos de la Trilogía del Despertar • Parte 1\n * Generado automáticamente para lectura inmersiva sin necesidad de servidor local\n */\nwindow.MODULES_CONTENT = ${JSON.stringify(contentMap, null, 2)};\n`;
    fs.writeFileSync(outputFile, jsOutput, 'utf8');
    console.log('✔ courses-content.js generado con éxito. Total de módulos agrupados:', Object.keys(contentMap).length);
} catch (err) {
    console.error('Error al generar courses-content.js:', err);
}
