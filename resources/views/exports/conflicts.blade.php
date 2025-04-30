<table>
    <thead>
        <tr>
            <th colspan="12" style="text-align: center;background:#CCC;font-weight:bold;">Datos Generales</th>
            @foreach($stages as $stage)
                <th colspan="{{count($stage['parametros'])}}" style="text-align: center;background:#CCC;font-weight:bold;">{{$stage['etapa']}}</th>
            @endforeach
        </tr>        
        <tr>
            <th style="text-align: center;background:#CCC;font-weight:bold;">Folio</th>
            <th style="text-align: center;background:#CCC;font-weight:bold;">Rubro</th>
            <th style="text-align: center;background:#CCC;font-weight:bold;">Ejercicio Fiscal</th>
            <th style="text-align: center;background:#CCC;font-weight:bold;">Asunto</th>
            <th style="text-align: center;background:#CCC;font-weight:bold;">Entidad</th>
            <th style="text-align: center;background:#CCC;font-weight:bold;">Municipio</th>
            <th style="text-align: center;background:#CCC;font-weight:bold;">Promovente</th>
            <th style="text-align: center;background:#CCC;font-weight:bold;">Contraparte</th>
            <th style="text-align: center;background:#CCC;font-weight:bold;">Nombre del Predio</th>
            <th style="text-align: center;background:#CCC;font-weight:bold;">Estatus</th>
            <th style="text-align: center;background:#CCC;font-weight:bold;">Superficie Legal</th>
            <th style="text-align: center;background:#CCC;font-weight:bold;">Superficie Medida</th>
            @foreach($stages as $stage)
                @foreach($stage['parametros']->sortBy('orden') as $param)
                    <th style="text-align: center;background:#CCC;font-weight:bold;">{{$param['parametro']}}</th>
                @endforeach
            @endforeach
        </tr>        
    </thead>
    <tbody>
        @foreach($conflicts as $conflict)
            <tr>
                <td>{{ $conflict->folio }}</td>
                <td>{{ $conflict->vertAcronimo }}</td>
                <td>{{ $conflict->anioFiscal }}</td>
                <td>{{ $conflict->asunto }}</td>
                <td>{{ $conflict->estado }}</td>
                <td>{{ $conflict->municipio }}</td>
                <td>{{ $conflict->promovente }}</td>
                <td>{{ $conflict->contraparte }}</td>
                <td>{{ $conflict->predio }}</td>
                <td>{{ $conflict->descEstatus }}</td>
                <td>{{ $conflict->supconflicto }}</td>
                <td>{{ $conflict->supatendida }}</td> 
                @foreach($conflict->parametros as $param)
                    @php
                        $param->captura ? $param->captura = json_decode($param->captura) : null;
                    @endphp
                    <td>
                        @if ($param->captura)
                            {{$param->captura->type === 'boolean' ? 'SI' : $param->captura->value}}
                        @endif
                    </td>
                @endforeach
            </tr>
        @endforeach
    </tbody>
</table>