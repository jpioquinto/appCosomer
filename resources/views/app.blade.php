<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Programa de Atención de Conflictos Agrarios') }}</title>

        <!-- Fonts -->
        

        <!-- Styles -->

        @viteReactRefresh
        @vite([
            'resources/css/bootstrap.min.css', 
            'resources/css/app/plugins.min.css', 
            'resources/css/app/kaiadmin.min.css',             
            'resources/js/popper.min.js', 
            'resources/js/bootstrap.min.js', 
            'resources/css/app.css', 
            'resources/js/app.js', 
            'resources/js/main.tsx'])
    </head>
    <body class="trendy-layout">
        <div id="app"></div>
    </body>
</html>
