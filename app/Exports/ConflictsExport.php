<?php

namespace App\Exports;

use App\Models\Conflicto\{ConflictoQueryBuilder AS QueryBuilder, Etapa, EtapaQueryBuilder};
use Maatwebsite\Excel\Concerns\{Exportable, FromView, WithColumnWidths, WithProperties, WithStyles};
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\View\View;

class ConflictsExport implements FromView, WithProperties, WithColumnWidths, WithStyles
{
    use Exportable;

    protected $params;

    protected $urlReport;

    protected $name;

    protected $stages;

    public function __construct(array $params = [])
    {
        $this->setStages(Etapa::with(['parametros'])->get());
        $this->setParams($params);
        $this->setUrlReport(null);
    }

    public function setStages($stages)
    {
        $this->stages = $stages;
    }

    public function getStages()
    {
        return $this->stages;
    }

    public function sizeColumns($start = 'A', $itera = 1, $pad = 'A')
    {        
        $columns = [];
        foreach ($this->getStages() as $stage) {
            $columns = array_merge($columns, $this->initColumns($stage['parametros'], $start, $itera, $pad)); 
        }   

        return $columns;
    }

    public function defaultColumns(): array
    {
        return [
            'A' => 17, 'C' => 16, 'D' => 55, 'E' => 30, 'F' => 30, 'H' => 30, 'I' => 30, 'K' => 16, 'L' => 17,            
        ];
    }

    public function columnWidths(): array
    {#print_r($this->sizeColumns('M'));exit;
        return array_merge($this->defaultColumns(), $this->sizeColumns('M'));
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

    public function background()
    {
        return [
            1=>['stage'=>'#600f2f', 'param'=>'#9a2045'],
            2=>['stage'=>'#042d27', 'param'=>'#145b4d'],
            3=>['stage'=>'#a4802c', 'param'=>'#e6d293'],
            4=>['stage'=>'#0d0d0d', 'param'=>'#808080'],
            5=>['stage'=>'#600f2f', 'param'=>'#9a2045'],
            6=>['stage'=>'#042d27', 'param'=>'#145b4d'],
            7=>['stage'=>'#a4802c', 'param'=>'#e6d293'],
            8=>['stage'=>'#0d0d0d', 'param'=>'#808080'],
            9=>['stage'=>'#600f2f', 'param'=>'#9a2045'],
            10=>['stage'=>'#042d27', 'param'=>'#145b4d'],
            11=>['stage'=>'#a4802c', 'param'=>'#e6d293'],
            12=>['stage'=>'#0d0d0d', 'param'=>'#808080'],
            13=>['stage'=>'#600f2f', 'param'=>'#9a2045'],
            14=>['stage'=>'#042d27', 'param'=>'#145b4d'],
            15=>['stage'=>'#a4802c', 'param'=>'#e6d293'],
            16=>['stage'=>'#0d0d0d', 'param'=>'#808080'],
            17=>['stage'=>'#600f2f', 'param'=>'#9a2045'],
            18=>['stage'=>'#042d27', 'param'=>'#145b4d'],
            19=>['stage'=>'#a4802c', 'param'=>'#e6d293'],
            20=>['stage'=>'#0d0d0d', 'param'=>'#808080'], 
            21=>['stage'=>'#600f2f', 'param'=>'#9a2045'],
            22=>['stage'=>'#042d27', 'param'=>'#145b4d'],
            23=>['stage'=>'#a4802c', 'param'=>'#e6d293'],
            24=>['stage'=>'#0d0d0d', 'param'=>'#808080'],          
            25=>['stage'=>'#600f2f', 'param'=>'#9a2045'],
            26=>['stage'=>'#042d27', 'param'=>'#145b4d'],
            27=>['stage'=>'#a4802c', 'param'=>'#e6d293'],
            28=>['stage'=>'#0d0d0d', 'param'=>'#808080'],
            29=>['stage'=>'#600f2f', 'param'=>'#9a2045'],
            30=>['stage'=>'#042d27', 'param'=>'#145b4d'],
            31=>['stage'=>'#a4802c', 'param'=>'#e6d293'],
            32=>['stage'=>'#0d0d0d', 'param'=>'#808080'],
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('M2:AS2')->getAlignment()->setWrapText(true);
        #$sheet->getColumnDimension('M')->setWidth(30);
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

        /*foreach ($this->agregarCapturas(QueryBuilder::listarConflictos($this->getParams())) as $conflict) {
            foreach ($conflict->parametros as $param) {
                $param->captura ? $param->captura = json_decode($param->captura) : null;  
                isset($param->captura->value) ? print_r($param->captura->value) : null;
            }
        }exit;*/
        return view('exports.conflicts', [
            'conflicts' => $this->agregarCapturas(QueryBuilder::listarConflictos($this->getParams())),
            'background'=>$this->background(),
            'stages'=>$this->getStages(),
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

    protected function initColumns($params, &$start, &$itera, &$pad)
    {
        $columns = [];
        foreach ($params as $param) {
            $columns[str_pad($start, $itera, $pad, STR_PAD_LEFT )] = 20;
            if ($start === 'Z') {
                $start = 'A'; 
                if ($pad === 'Z') {
                    $pad = 'A'; $itera++;
                    continue;
                } 
                if ($itera === 1) {
                    $itera++;
                    continue;
                }
                $pad++;
                continue;                                
            } 
            $start++;                
        }

        return $columns;
    }
}
