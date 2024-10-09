<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Cosomer v2.0</title>

        <!-- Fonts -->
        

        <!-- Styles -->

        @viteReactRefresh
        @vite(['resources/css/bootstrap.min.css', 'resources/css/app/plugins.min.css', 'resources/css/app/kaiadmin.min.css', 'resources/js/main.tsx'])
    </head>
    <body class="trendy-layout">
        <div id="app"></div>
    </body>
</html>
