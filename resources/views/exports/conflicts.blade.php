<table>
    <thead>
        <tr>
            <th>Folio</th>
            <th>Rubro</th>
            <th>Ejercicio Fiscal</th>
            <th>Asunto</th>
            <th>Entidad</th>
            <th>Municipio</th>
            <th>Promovente</th>
            <th>Contraparte</th>
            <th>Nombre del Predio</th>
            <th>Estatus</th>
            <th>Superficie Legal</th>
            <th>Superficie Medida</th>
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
            </tr>
        @endforeach
    </tbody>
</table>