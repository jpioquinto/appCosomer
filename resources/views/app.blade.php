<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link href='https://framework-gb.cdn.gob.mx/favicon.ico' rel='shortcut icon'>

        <title>{{ config('app.name', 'Programa de Atención de Conflictos Agrarios') }}</title>
    </head>
    <body class="trendy-layout">
        <div id="app"></div>
    </body>
</html>
