import React, {useState} from 'react'

// React-Leaflet Imports
import {MapContainer, TileLayer, useMap, Marker, Popup, Polyline, Polygon} from 'react-leaflet'
import {Icon} from 'leaflet'

// MUI Imports
import {Grid, AppBar, Typography, Button, Card, CardHeader, CardMedia, CardContent} from '@mui/material'

// Assets
import houseIcon from './Assets/map-icon/bighouse.png'
import apartmentIcon from './Assets/map-icon/apartment.png'
import officeIcon from './Assets/map-icon/office-building.png'
import myListings from './Assets/data/DummyData'

// Components
import polygonOne from './Shape'

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

const style = {
  cardStyle: {
    margin: '0.5rem',
    border: '1px solid black',
    position: 'relative'
  },

  pictureStyle: {
    paddingRight: '1rem',
    paddingLeft: '1rem',
    height: '20rem',
    width: '28rem'
  },

  priceOverlay: {
    position: 'absolute',
    backgroundColor: 'green',
    zIndex: '1000',
    color: 'white',
    top: '70px',
    left: '20px',
    padding: '5px'
  }
}


function Listings() {
  const [latitude, setLatitude] = useState(51.505)
  const [longitude, setLongitude] = useState(-0.09)

  const polyOne = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ]

  return (
    <Grid container>
      <Grid item xs={4}>
        {myListings.map((listing)=>{
          return (
            <Card key={listing.id} sx={style.cardStyle}>
              <CardHeader
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title={listing.title}
              />
              <CardMedia component="img" image={listing.picture1} alt={listing.title} sx={style.pictureStyle} />
              <CardContent>
                <Typography variant="body2">{listing.description.substring(0, 200)}...</Typography>
              </CardContent>
              {listing.property_status === 'Sale' ? (
                <Typography sx={style.priceOverlay}>
                  {listing.listing_type} $
                  {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Typography>
                ) : (
                <Typography sx={style.priceOverlay}>
                  {listing.listing_type} $
                  {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / {listing.rental_frequency}
                </Typography>
              )}
              {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions> */}
            </Card>
          )
        })}
      </Grid>
      <Grid item xs={8}>
        <AppBar position='sticky'>
          <div style={{height: '100vh'}}>
            <MapContainer center={[51.505, -0.09]} zoom={12} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Polyline positions={polyOne} weight={10} color='blue' />
              <Polygon positions={polygonOne} color='green' fillColor='red' fillOpacity={0.9}></Polygon>

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