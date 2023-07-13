import { FC } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { styled } from 'styled-components'
import { LatLngExpression } from 'leaflet'
import { DEFAULT_MAP_POSITION } from 'src/types/input.types'

export interface IMapProps {
    children: React.ReactNode;
    center?: LatLngExpression;
}

const Map : FC<IMapProps> = ({children, center}) => {
    return (
        <StyledMap center={center ?? DEFAULT_MAP_POSITION} zoom={1} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {children}
        </StyledMap>
    )
}

export const StyledMap = styled(MapContainer)`
    height: 40rem;
    width: 100%;
`

export default Map;