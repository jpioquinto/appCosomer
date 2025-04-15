<?php
namespace App\Http\Helpers;

class CadenaHelper
{
    static function clearFileName(string $input)
    {
        return str_replace(
            ['Á','É','Í','Ó','Ú','Ü','á','é','í','ó','ú','ü','Ñ','ñ','#','Ã³', '°', '/'],
            ['A','E','I','O','U','U','a','e','i','o','u','u','N','n','-','o', 'o', '|'],
            $input
        );
    }

}
