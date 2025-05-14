<table>
    <thead>
        <tr>
            <th colspan="12" height="50" style="text-align: center;background:#000000;color:#FFFFFF;font-size:10pt;font-weight:bold;vertical-align:middle;">DATOS GENERALES</th>
            @foreach($stages as $stage)
                @php
                    $bg = isset($background[$stage['id']]) ? 'background:' . $background[$stage['id']]['stage'] : ''; 
                @endphp
                <th colspan="{{count($stage['parametros'])}}" style="text-align: center;color:#FFFFFF;font-size:10pt;font-weight:bold;vertical-align:middle;{{$bg}}">{{mb_strtoupper($stage['etapa'])}}</th>
            @endforeach
        </tr>        
        <tr>
            <th height="50" style="text-align: center;background:#000000;color:#FFFFFF;font-size:9pt;font-weight:200;vertical-align:middle;">Folio</th>
            <th style="text-align: center;background:#000000;color:#FFFFFF;font-size:9pt;font-weight:100;vertical-align:middle;">Rubro</th>
            <th style="text-align: center;background:#000000;color:#FFFFFF;font-size:9pt;font-weight:100;vertical-align:middle;">Ejercicio Fiscal</th>
            <th style="text-align: center;background:#000000;color:#FFFFFF;font-size:9pt;font-weight:100;vertical-align:middle;">Asunto</th>
            <th style="text-align: center;background:#000000;color:#FFFFFF;font-size:9pt;font-weight:100;vertical-align:middle;">Entidad</th>
            <th style="text-align: center;background:#000000;color:#FFFFFF;font-size:9pt;font-weight:100;vertical-align:middle;">Municipio</th>
            <th style="text-align: center;background:#000000;color:#FFFFFF;font-size:9pt;font-weight:100;vertical-align:middle;">Promovente</th>
            <th style="text-align: center;background:#000000;color:#FFFFFF;font-size:9pt;font-weight:100;vertical-align:middle;">Contraparte</th>
            <th style="text-align: center;background:#000000;color:#FFFFFF;font-size:9pt;font-weight:100;vertical-align:middle;">Nombre del Predio</th>
            <th style="text-align: center;background:#000000;color:#FFFFFF;font-size:9pt;font-weight:100;vertical-align:middle;">Estatus</th>
            <th style="text-align: center;background:#000000;color:#FFFFFF;font-size:9pt;font-weight:100;vertical-align:middle;">Superficie Legal</th>
            <th style="text-align: center;background:#000000;color:#FFFFFF;font-size:9pt;font-weight:100;vertical-align:middle;">Superficie Medida</th>
            @foreach($stages as $stage)
                @php
                    $bg = isset($background[$stage['id']]) ? 'background:' . $background[$stage['id']]['param'] : ''; 
                @endphp
                @foreach($stage['parametros']->sortBy('orden') as $param)
                    <th style="text-align: center;color:#FFFFFF;font-size:9pt;font-weight:100;vertical-align:middle;{{$bg}}">{{$param['parametro']}}</th>
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