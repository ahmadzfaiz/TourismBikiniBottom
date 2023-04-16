import React, {useState} from 'react'

// React-Leaflet Imports
import {MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet'
import {Icon} from 'leaflet'

// MUI Imports
import {Grid, AppBar, Typography, Button} from '@mui/material'

// Assets
import houseIcon from './Assets/map-icon/bighouse.png'
import apartmentIcon from './Assets/map-icon/apartment.png'
import officeIcon from './Assets/map-icon/office-building.png'
import spongebobHouse from './Assets/object-img/spongebob-house.jpg'
import myListings from './Assets/data/DummyData'

const mapIcon = {
  houseIcon: new Icon({
    iconUrl: houseIcon,
    iconSize: [40, 40] 
  }),
  apartmentIcon: new Icon({
    iconUrl: apartmentIcon,
    iconSize: [40, 40] 
  }),
  officeIcon: new Icon({
    iconUrl: officeIcon,
    iconSize: [40, 40] 
  })
}


function Listings() {
  const [latitude, setLatitude] = useState(51.505)
  const [longitude, setLongitude] = useState(-0.09)

  const direction = {
    goNorth: function(){
      setLatitude(latitude + 0.001)
    },
    goSouth: function(){
      setLatitude(latitude - 0.001)
    },
    goEast: function(){
      setLongitude(longitude + 0.001)
    },
    goWest: function(){
      setLongitude(longitude - 0.001)
    },
  }

  return (
    <Grid container>
      <Grid item xs={4}>
        <h1>Hello World</h1>
      </Grid>
      <Grid item xs={8}>
        <AppBar position='sticky'>
          <div style={{height: '100vh'}}>
            <MapContainer center={[51.505, -0.09]} zoom={12} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {myListings.map((listing)=>{
                function IconDisplay(){
                  if(listing.listing_type === 'House'){
                    return mapIcon.houseIcon
                  } else if(listing.listing_type === 'Apartment'){
                    return mapIcon.apartmentIcon
                  } else if(listing.listing_type === 'Office'){
                    return mapIcon.officeIcon
                  }
                }
                return (
                  <Marker 
                    key={listing.id}
                    position={[
                      listing.location.coordinates[0], 
                      listing.location.coordinates[1]
                    ]}
                    icon={IconDisplay()}
                  >
                    <Popup>
                      <Typography variant='h5'>{listing.title}</Typography>
                      <img src={listing.picture1} style={{height: '14rem', width: '18rem'}}></img>
                      <Typography variant='body1'>{listing.description.substring(0, 150)}...</Typography>
                      <Button variant='contained' fullWidth>Details</Button>
                    </Popup>
                  </Marker>
                )
              })}
            </MapContainer>
          </div>    
        </AppBar>
      </Grid>
    </Grid>
  )
}

export default Listings