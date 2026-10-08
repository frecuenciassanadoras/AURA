$ErrorActionPreference = "Stop"
$cursosDir = Join-Path $PSScriptRoot "..\cursos"
$outputFile = Join-Path $PSScriptRoot "courses-content.js"

$files = Get-ChildItem -Path $cursosDir -Filter "modulo_*.md" | Sort-Object Name
$map = [ordered]@{}

foreach ($f in $files) {
    if ($f.Name -match "modulo_(\d+)") {
        $id = [int]$Matches[1]
        $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
        $map[$id.ToString()] = $content
    }
}

$json = $map | ConvertTo-Json -Depth 5
$jsOutput = "/**`r`n * courses-content.js - Bundle offline precargado con los 10 Modulos de la Trilogia del Despertar • Parte 1`r`n * Generado por build-content.ps1 para lectura inmersiva sin necesidad de servidor local`r`n */`r`nwindow.MODULES_CONTENT = " + $json + ";`r`n"

[System.IO.File]::WriteAllText($outputFile, $jsOutput, [System.Text.Encoding]::UTF8)
Write-Host "courses-content.js generado con exito. Total modulos: $($map.Count)"
