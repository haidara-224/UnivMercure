<!DOCTYPE html>
<html>
<head>
    <title>Confirmation</title>
</head>
<body>
    <h1>Bonjour {{ $demande->etudiant->name }},</h1>
    <p>Votre document a été traité avec succès.</p>
    <a href="{{ route('etudiant.documents',) }}">Voir la demande</a>
</body>
</html>
