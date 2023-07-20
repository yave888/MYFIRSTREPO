# 現在の日付と時刻を取得
$us = New-Object system.globalization.cultureinfo("en-US")



$currentDate = (Get-Date).ToString("yyyy/MMM/dd:hh",$us)



#$currentTime = Get-Date -Format "HH:mm"

# アクセスログのパスを入力
$logPath = Read-Host "アクセスログのパスを記入してください"
Write-Host

# コマンドを実行し、結果をクリップボードにコピー
#$command = "less /var/www/$logPath | grep $currentDate`:$currentTime | awk '{print `$1}' | sort | uniq -c | sort -nr | less"
#$command | Set-Clipboard

$command = "less /var/www/$logPath | grep $currentDate | awk '{print `$1}' | sort | uniq -c | sort -nr | less"
$command | Set-Clipboard

Write-Host "コマンドがクリップボードにコピーされました。"
Write-Host

# 一時的な入力待ち
Write-Host "スクリプトの実行が終了しました。何かキーを押して終了してください..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyUp")
