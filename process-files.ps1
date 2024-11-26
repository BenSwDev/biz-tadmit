# Set the folder path where the script is located
$folderPath = "C:\Users\Ben Swissa\Desktop\backup\Employee - Spa Plus\biz-online-tadmit\translations"

# Create or clear the output text file
$outputFile = Join-Path $folderPath "output.txt"
New-Item -ItemType File -Path $outputFile -Force | Out-Null

# Function to process files
function Process-Files {
    param (
        [string]$extension,
        [string]$description
    )
    Write-Host "Processing $description files..."
    $files = Get-ChildItem -Path $folderPath -Filter "*.$extension" -File

    foreach ($file in $files) {
        Write-Host "Processing file: $($file.Name)"

        # Read file content
        $content = Get-Content $file.FullName -Raw

        # Write file name to the output file (start)
        Add-Content -Path $outputFile -Value "Start of file: $($file.Name)"

        # Write file content to the output file
        Add-Content -Path $outputFile -Value $content

        # Write file name to the output file (end)
        Add-Content -Path $outputFile -Value "End of file: $($file.Name)"
    }
}

# Process files in the specified order
Process-Files -extension "html" -description "HTML"
Process-Files -extension "js" -description "JavaScript"
Process-Files -extension "json" -description "JSON"

Write-Host "Processing completed. Output saved to $outputFile"
