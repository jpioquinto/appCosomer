<?php
namespace App\Http\Libraries\Upload;

use App\Http\Libraries\Validations\ValidaUploadEvidence;
use App\Models\Conflicto\{Conflicto, Parametro};
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Http\Helpers\CadenaHelper;
use Illuminate\Http\Request;

class UploadEvidence extends ValidaUploadEvidence
{
    protected $directory;

    protected $evidence;

    protected $request;

    protected $conflict;

    protected $param; 
    
    protected $error;

    protected $path;

    public function __construct(Request $request)
    {      
        parent::__construct($request->all());

        $this->setRequest($request);

        $this->setConflict(Conflicto::with(['ur'])->where('id', $request->conflictoId)->first());

        $this->setParam(Parametro::where('id', $request->parametroId)->first());

        $this->setDirectory(sprintf("docs/%s/", $this->conflict->ur->carpeta ?? auth()->user()->ur->carpeta));
    }

    public function setRequest(Request $request)
    {
        $this->request = $request;
    }

    public function setConflict(Conflicto $conflict)
    {
        $this->conflict = $conflict;
    }

    public function setParam(Parametro $param)
    {
        $this->param = $param;
    }

    public function setDirectory(string $directory)
    {
        $this->directory = $directory;
    }

    public function getDirectory()
    {
        return $this->directory;
    }

    public function setError(array $error)
    {
        $this->error = $error;
    }

    public function getError()
    {
        return $this->error;
    }

    public function setPath(string $path)
    {
        $this->path = $path;
    }

    public function getPath()
    {
        return $this->path;
    }

    public function upload()
    {
        if ($this->existsError()) {
            return ['solicitud'=>false, 'message'=>$this->getFirstError()];
        }

        if (!$this->existsDirectory()) {
            return $this->getError();
        }

        $this->setDirectory($this->getDirectory().$this->conflict->folio . '/Seguimiento');
        
        if (!$this->move()) {
            return ['solicitud'=>false, 'message'=>'Error al intentar cargar el archivo.'];
        }

        return [
            'solicitud'=>true, 
            'path'=>$this->getPath(), 
            'message'=>'Carga realizada correctamente.',
            'url'=>Storage::disk('s3')->url($this->getPath()) . '?hash=' . mt_rand()
        ];
    }

    protected function move()
    {
        $load = $this->request->file('archivo')->storePubliclyAs(
            $this->getDirectory(),
            $this->fileName(CadenaHelper::clearFileName($this->param->parametro)),
            's3'
        );

        if ($load!==FALSE) {
            $this->setPath($load);
        }

        return $load !== FALSE ? true : false;
    }   

    protected function fileName(string $name, $numFile = 2)
    {
        if (count(Storage::disk('s3')->files($this->getDirectory())) == 0) {
            return $name;
        }

        if (Storage::disk('s3')->exists($this->getDirectory() . "/{$name}")) {
            return $this->fileName( trim( preg_replace("/(\d+)$/", "", $name) ) . ' ' . $numFile, ++$numFile);
        }

        return $name;
    }

    protected function existsDirectory()
    {
        if (empty(auth()->user()->ur->carpeta)) {
            $this->setError(['solicitud'=>false, 'message'=>'No se encontró el directorio principal de la Unidad Responsable.']);
            return false;
        }

        if (empty($this->conflict->folio)) {
            $this->setError(['solicitud'=>false, 'message'=>'No se encontró el directorio principal del Asunto.']);
            return false;
        }

        return true;                 
    } 
}