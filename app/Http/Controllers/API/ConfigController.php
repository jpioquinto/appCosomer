<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Config;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    public function getUrl()
    {
        return response()->json([
            'solicitud'=>true,
            'url'=>Config::get('filesystems.disks.s3.url', '')
        ], 200);
    }
}
