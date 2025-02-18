<!DOCTYPE html>
<html>
<head>
    <title>Nouvelle demande de congé soumise</title>
</head>
<body>
    <h1>Nouvelle demande de congé soumise</h1>
    <p>Bonjour,</p>
    <p>
        Une nouvelle demande de congé a été soumise par <strong>{{ $mailData['employee_name'] }}</strong>.
    </p>
    <p>
        Voici les détails de la demande :
    </p>
    <ul>
        <li><strong>Nom de l'employé :</strong> {{ $mailData['employee_name'] }}</li>
        <li><strong>Date de début :</strong> {{ $mailData['leave_from'] }}</li>
        <li><strong>Date de fin :</strong> {{ $mailData['leave_to'] }}</li>
        <li><strong>Raison :</strong> {{ $mailData['reason'] }}</li>
    </ul>
    <p>
        Merci de traiter cette demande dans les plus brefs délais.
    </p>
    <p>Merci,</p>
    <p>L'équipe des ressources humaines</p>
</body>
</html>
