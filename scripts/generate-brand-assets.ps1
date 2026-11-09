param(
  [string]$WorkspaceRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$brandDirectory = Join-Path $WorkspaceRoot 'public\assets\brand'
$iconsDirectory = Join-Path $WorkspaceRoot 'public\icons'
$portraitPath = Join-Path $WorkspaceRoot 'public\assets\profile\gabriel-machado.jpg'

[System.IO.Directory]::CreateDirectory($brandDirectory) | Out-Null
[System.IO.Directory]::CreateDirectory($iconsDirectory) | Out-Null

function New-AppIcon {
  param(
    [int]$Size,
    [string]$OutputPath,
    [bool]$Maskable = $false
  )

  $bitmap = [System.Drawing.Bitmap]::new($Size, $Size)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#11110f'))

  $safe = if ($Maskable) { [int]($Size * 0.2) } else { [int]($Size * 0.12) }
  $coralBrush = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#ff6847'))
  $mintBrush = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#b8f4d1'))
  $whiteBrush = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#fffdf8'))
  $font = [System.Drawing.Font]::new('Segoe UI', [single]($Size * 0.27), [System.Drawing.FontStyle]::Bold)

  $graphics.FillEllipse($mintBrush, $Size - $safe - [int]($Size * 0.16), $safe, [int]($Size * 0.14), [int]($Size * 0.14))
  $graphics.FillRectangle($coralBrush, $Size - $safe - [int]($Size * 0.16), [int]($Size * 0.33), [int]($Size * 0.11), [int]($Size * 0.43))
  $graphics.DrawString('GM', $font, $whiteBrush, [single]$safe, [single]($Size * 0.36))
  $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

  $font.Dispose()
  $whiteBrush.Dispose()
  $mintBrush.Dispose()
  $coralBrush.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

function New-SocialBanner {
  param(
    [int]$Width,
    [int]$Height,
    [string]$OutputPath,
    [bool]$Compact = $false
  )

  $bitmap = [System.Drawing.Bitmap]::new($Width, $Height)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#11110f'))

  $coralBrush = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#ff6847'))
  $mintBrush = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#b8f4d1'))
  $whiteBrush = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#fffdf8'))
  $mutedBrush = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#aaa79f'))

  $graphics.FillEllipse($coralBrush, [int]($Width * 0.77), [int](-$Height * 0.35), [int]($Height * 1.1), [int]($Height * 1.1))
  $graphics.FillEllipse($mintBrush, [int]($Width * 0.06), [int]($Height * 0.76), [int]($Height * 0.28), [int]($Height * 0.28))

  if (Test-Path $portraitPath) {
    $portrait = [System.Drawing.Image]::FromFile($portraitPath)
    $targetWidth = [int]($Width * 0.31)
    $targetHeight = [int]($Height * 0.9)
    $targetX = $Width - $targetWidth - [int]($Width * 0.055)
    $targetY = [int]($Height * 0.05)
    $sourceRatio = $portrait.Width / $portrait.Height
    $targetRatio = $targetWidth / $targetHeight
    if ($sourceRatio -gt $targetRatio) {
      $sourceHeight = $portrait.Height
      $sourceWidth = [int]($sourceHeight * $targetRatio)
      $sourceX = [int](($portrait.Width - $sourceWidth) / 2)
      $sourceY = 0
    } else {
      $sourceWidth = $portrait.Width
      $sourceHeight = [int]($sourceWidth / $targetRatio)
      $sourceX = 0
      $sourceY = [int](($portrait.Height - $sourceHeight) * 0.22)
    }
    $graphics.DrawImage($portrait, [System.Drawing.Rectangle]::new($targetX, $targetY, $targetWidth, $targetHeight), $sourceX, $sourceY, $sourceWidth, $sourceHeight, [System.Drawing.GraphicsUnit]::Pixel)
    $portrait.Dispose()
  }

  $left = [single]($Width * 0.07)
  $eyebrowFont = [System.Drawing.Font]::new('Segoe UI', [single]($Height * 0.035), [System.Drawing.FontStyle]::Bold)
  $nameScale = if ($Compact) { 0.18 } else { 0.10 }
  $nameFont = [System.Drawing.Font]::new('Georgia', [single]($Height * $nameScale), [System.Drawing.FontStyle]::Regular)
  $roleFont = [System.Drawing.Font]::new('Segoe UI', [single]($Height * 0.036), [System.Drawing.FontStyle]::Regular)

  $graphics.DrawString('SOFTWARE ENGINEER | FULL STACK | ARCHITECTURE', $eyebrowFont, $coralBrush, $left, [single]($Height * 0.2))
  $graphics.DrawString('Gabriel Machado', $nameFont, $whiteBrush, $left, [single]($Height * 0.32))
  $graphics.DrawString('Interfaces claras. Sistemas confiaveis. Entrega continua.', $roleFont, $mutedBrush, $left, [single]($Height * 0.65))

  $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

  $roleFont.Dispose()
  $nameFont.Dispose()
  $eyebrowFont.Dispose()
  $mutedBrush.Dispose()
  $whiteBrush.Dispose()
  $mintBrush.Dispose()
  $coralBrush.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

New-AppIcon -Size 192 -OutputPath (Join-Path $iconsDirectory 'icon-192.png')
New-AppIcon -Size 512 -OutputPath (Join-Path $iconsDirectory 'icon-512.png')
New-AppIcon -Size 512 -OutputPath (Join-Path $iconsDirectory 'icon-maskable-512.png') -Maskable $true
New-SocialBanner -Width 1200 -Height 630 -OutputPath (Join-Path $brandDirectory 'og-gabriel-machado.png')
New-SocialBanner -Width 1584 -Height 396 -OutputPath (Join-Path $brandDirectory 'linkedin-banner.png') -Compact $true
