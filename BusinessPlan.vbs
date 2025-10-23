REM Avvia_BusinessPlan_Perfetto.vbs
Set objShell = CreateObject("WScript.Shell")
Set objHTTP = CreateObject("MSXML2.XMLHTTP")

' Avvia il server in modalità nascosta
objShell.Run "BusinessPlan.bat", 0, False

' Funzione per controllare se il server è pronto
Function ControllaServer()
    On Error Resume Next
    objHTTP.Open "GET", "http://localhost:5000", False
    objHTTP.Send
    
    If Err.Number = 0 And objHTTP.Status = 200 Then
        ControllaServer = True
    Else
        ControllaServer = False
    End If
    On Error GoTo 0
End Function

' Mostra messaggio di attesa (opzionale)
objShell.Popup "🚀 Avvio Business Plan Generator..." & vbCrLf & "Il browser si aprirà automaticamente.", 3, "Business Plan Generator", 64

' Attendi che il server sia pronto (massimo 30 secondi)
Dim tentativi
tentativi = 0

Do While tentativi < 60  ' 60 tentativi = 30 secondi
    If ControllaServer() Then
        Exit Do
    End If
    WScript.Sleep 500  ' Attendi 0.5 secondi
    tentativi = tentativi + 1
Loop

' Apri il browser solo quando il server è pronto
If tentativi < 60 Then
    objShell.Run "http://localhost:5000", 1, False
Else
    objShell.Popup "⚠️ Timeout: Il server non si è avviato entro 30 secondi." & vbCrLf & "Prova ad aprire manualmente: http://localhost:5000", 0, "Business Plan Generator", 48
End If