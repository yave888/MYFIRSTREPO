# ���݂̓��t�Ǝ������擾
$us = New-Object system.globalization.cultureinfo("en-US")



$currentDate = (Get-Date).ToString("yyyy/MMM/dd:hh",$us)



#$currentTime = Get-Date -Format "HH:mm"

# �A�N�Z�X���O�̃p�X�����
$logPath = Read-Host "�A�N�Z�X���O�̃p�X���L�����Ă�������"
Write-Host

# �R�}���h�����s���A���ʂ��N���b�v�{�[�h�ɃR�s�[
#$command = "less /var/www/$logPath | grep $currentDate`:$currentTime | awk '{print `$1}' | sort | uniq -c | sort -nr | less"
#$command | Set-Clipboard

$command = "less /var/www/$logPath | grep $currentDate | awk '{print `$1}' | sort | uniq -c | sort -nr | less"
$command | Set-Clipboard

Write-Host "�R�}���h���N���b�v�{�[�h�ɃR�s�[����܂����B"
Write-Host

# �ꎞ�I�ȓ��͑҂�
Write-Host "�X�N���v�g�̎��s���I�����܂����B�����L�[�������ďI�����Ă�������..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyUp")
