Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('C:\Antigravity\Web Denemeler\Tibet_Web_Developer\temp_frame_2.png')
$bmp = New-Object System.Drawing.Bitmap($img)
$color = $bmp.GetPixel(10, 10)
Write-Host ('#' + $color.R.ToString('x2') + $color.G.ToString('x2') + $color.B.ToString('x2'))
$img.Dispose()
$bmp.Dispose()
