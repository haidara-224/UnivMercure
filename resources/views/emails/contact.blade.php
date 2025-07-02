<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle demande de contact</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            margin: 0;
            padding: 40px;
            color: #333;
        }
        .container {
            background: #fff;
            padding: 30px;
            border-radius: 8px;
            max-width: 600px;
            margin: auto;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
            color: #007BFF;
            font-size: 1.5rem;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            text-decoration: none;
            color: #fff;
            background: #007BFF;
            padding: 10px 20px;
            border-radius: 4px;
        }
        a:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Vous avez reçu une nouvelle demande de contact</h1>
        <p><strong>Nom et Prénom:</strong> {{ $contacts->prenom }} {{ $contacts->nom }}</p>
        <div>
            {{ $contacts->message }}
        </div>

        <a href="{{ route('home') }}">Retour à l'accueil</a>
    </div>
</body>
</html>
