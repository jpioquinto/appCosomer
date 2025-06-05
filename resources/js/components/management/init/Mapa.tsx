import React, {useState} from 'react'

import republica from '../../../data/Republica_Mexicana.json'

import { MapContainer, TileLayer, Polygon, Popup, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Mapa() {
    const [polygonCoords] = useState([
    [40.96548, -5.66443], [40.96527, -5.66338], [40.96451, -5.66373], [40.9647, -5.66468]
  ]);

  const setColor = ({ properties }) => {
    return { weight: 1, opacity: 1, fillColor:'#909090 ', color: 'white', dashArray: '3', fillOpacity: 1.0};
  }

  const onEachFeature = (feature, layer) => {
    //console.log(feature)

  }

  return (
    <MapContainer center={[21.1846327,-102.6561339]} zoom={5.2} style={{ height: '600px', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy;SEDATU'
        />
        <GeoJSON 
            data={republica} style={setColor}
            onEachFeature={onEachFeature}
        />
    </MapContainer>
  )
}
