<?php

namespace App\Http\Libraries\Report;

use App\Models\Conflicto\{ConflictoQueryBuilder AS QueryBuilder};

class Conflicto
{
    public function listar(array $params = [])
    {
        return QueryBuilder::listarConflictos($params);
    }
}
