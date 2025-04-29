<?php

namespace App\Exports;

use App\Models\Conflicto\{ConflictoQueryBuilder AS QueryBuilder};
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\View\View;

class ConflictsExport implements FromView
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
    {
        return view('exports.conflicts', [
            'conflicts' => QueryBuilder::listarConflictos($this->getParams())
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
}
