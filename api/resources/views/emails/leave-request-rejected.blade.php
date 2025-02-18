
<!DOCTYPE html>
<html>
<head>
    <title>Demande de congé refusée</title>
</head>
<body>
    <h1>Votre demande de congé a été refusée</h1>
    <p>Bonjour {{ $mailData['employee_name'] }},</p>
    <p>
        Votre demande de congé du <strong>{{ $mailData['leave_from'] }}</strong>
        au <strong>{{ $mailData['leave_to'] }}</strong> a été refusée.
    </p>
    <p>Raison : {{ $mailData['reason'] }}</p>
    <p>Merci,</p>
    <p>L'équipe des ressources humaines</p>
</body>
</html>
