<?php

namespace App\Exports;

use App\Models\Conflicto\{ConflictoQueryBuilder AS QueryBuilder, Etapa, EtapaQueryBuilder};
use Maatwebsite\Excel\Concerns\{Exportable, FromView, WithColumnWidths, WithProperties};
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\View\View;

class ConflictsExport implements FromView, WithProperties, WithColumnWidths
{
    use Exportable;

    protected $params;

    protected $urlReport;

    protected $name;

    public function __construct(array $params = [])
    {
        $this->setParams($params);
        $this->setUrlReport(null);
    }

    public function columnWidths(): array
    {
        return [
            'A' => 17,
            'C' => 16,            
            'D' => 55,            
            'E' => 30,            
            'F' => 30,
            'H' => 30,
            'I' => 30,
            'K' => 16,
            'L' => 17,            
        ];
    }

    public function properties(): array
    {
        return [
            'creator'        => 'APP - PADCA',
            'lastModifiedBy' => 'Aplicativo',
            'title'          => 'Reporte de conflictos del Programa',
            'description'    => 'Reporte de conflictos del Programa',
            'subject'        => 'PADCA',
            'keywords'       => 'PADCA,DGCAM,SOAIP,SEDATU',
            'category'       => 'Conflictos',
            'manager'        => 'DGCAM',
            'company'        => 'SOAIP, DGCAM',
        ];
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setUrlReport($url)
    {
        $this->urlReport = $url;
    }

    public function getUrlReport()
    {
        return $this->urlReport;
    }

    public function setParams($params)
    {
        $this->params = $params;
    }

    public function getParams()
    {
        return $this->params;
    }

    public function view(): View
    {#print_r($this->agregarCapturas(QueryBuilder::listarConflictos($this->getParams())));exit;
        return view('exports.conflicts', [
            'conflicts' => $this->agregarCapturas(QueryBuilder::listarConflictos($this->getParams())),
            'stages'=>Etapa::with(['parametros'])->get()
        ]);
    }

    public function export()
    {
        $this->setName(sprintf("temp/conflicts_%s.xlsx", date('Ymd')));

        if (Storage::disk('public')->exists( $this->getName() )) {
            Storage::disk('public')->delete( $this->getName() );
        }       

        if ( !$this->store($this->getName(), 'public') ) {
            return false;
        }

        $this->setUrlReport(Storage::disk('public')->url( $this->getName() ) .  '?hash=' . mt_rand());

        return true; 
    }

    protected function agregarCapturas($conflictos)
    {
        $registros = [];
        foreach ($conflictos as $index => $conflicto) {
            $conflicto->parametros = EtapaQueryBuilder::obtenerCapturas($conflicto->id);
            $registros[] = $conflicto;            
        }
        
        return $registros;
    }
}
