Add-Type -AssemblyName System.Drawing

$sourceLogo = "C:\Users\hp\OneDrive\Desktop\GangaMitra-KAVAAI\frontend\src\assets\logo.png"
$resDir = "C:\Users\hp\OneDrive\Desktop\GangaMitra-KAVAAI\frontend\android\app\src\main\res"

if (-not (Test-Path $sourceLogo)) {
    $sourceLogo = "C:\Users\hp\OneDrive\Desktop\GangaMitra-KAVAAI\frontend\public\logo.png"
}

$srcImage = [System.Drawing.Image]::FromFile($sourceLogo)

function Resize-And-Save($src, $width, $height, $destPath) {
    $destBitmap = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($destBitmap)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.Clear([System.Drawing.Color]::Transparent)
    $graphics.DrawImage($src, 0, 0, $width, $height)
    $destBitmap.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $destBitmap.Dispose()
    Write-Host "Created: $destPath ($width x $height)"
}

# 1. Launcher Mipmaps
$sizes = @(
    @{ folder = "mipmap-mdpi"; size = 48; fgSize = 108 },
    @{ folder = "mipmap-hdpi"; size = 72; fgSize = 162 },
    @{ folder = "mipmap-xhdpi"; size = 96; fgSize = 216 },
    @{ folder = "mipmap-xxhdpi"; size = 144; fgSize = 324 },
    @{ folder = "mipmap-xxxhdpi"; size = 192; fgSize = 432 }
)

foreach ($s in $sizes) {
    $folderPath = Join-Path $resDir $s.folder
    if (-not (Test-Path $folderPath)) {
        New-Item -ItemType Directory -Path $folderPath | Out-Null
    }

    $launcherPath = Join-Path $folderPath "ic_launcher.png"
    Resize-And-Save $srcImage $s.size $s.size $launcherPath

    $roundPath = Join-Path $folderPath "ic_launcher_round.png"
    Resize-And-Save $srcImage $s.size $s.size $roundPath

    $fgPath = Join-Path $folderPath "ic_launcher_foreground.png"
    Resize-And-Save $srcImage $s.fgSize $s.fgSize $fgPath
}

# 2. Splash Drawables
$drawableDirs = Get-ChildItem -Path $resDir -Directory -Filter "drawable*"
foreach ($d in $drawableDirs) {
    $splashPath = Join-Path $d.FullName "splash.png"
    if (Test-Path $splashPath) {
        Resize-And-Save $srcImage 480 480 $splashPath
    }
}

$srcImage.Dispose()
Write-Host "All icons & splash screens successfully updated!"
