import { FC } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { styled } from 'styled-components'
import { LatLngExpression } from 'leaflet'

const Map : FC = () => {
    const defaultPosition : LatLngExpression  = [35.081407, -106.650957]; 
    return (
        <StyledMap center={defaultPosition} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={defaultPosition}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </StyledMap>
    )
}

const StyledMap = styled(MapContainer)`
    height: 40rem;
    width: 100%;
`

export default Map;