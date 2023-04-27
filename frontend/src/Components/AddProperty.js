import React, {useEffect, useRef, useMemo, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import {useImmerReducer} from 'use-immer';

// React Leaflet
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';

// Contexts
import StateContext from '../Contexts/StateContext';

// MUI Imports
import {
  Grid,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
} from '@mui/material';

import Camden from './Assets/borough/Camden';
import Greenwich from './Assets/borough/Greenwich';
import Hackney from './Assets/borough/Hackney';
import Hammersmith from './Assets/borough/Hammersmith';
import Islington from './Assets/borough/Islington';
import Kensington from './Assets/borough/Kensington';
import Lambeth from './Assets/borough/Lambeth';
import Lewisham from './Assets/borough/Lewisham';
import Southwark from './Assets/borough/Southwark';
import Hamlets from './Assets/borough/Hamlets';
import Wandsworth from './Assets/borough/Wandsworth';
import Westminster from './Assets/borough/Westminster';
import City_of_London from './Assets/borough/City_of_London';
import Barking from './Assets/borough/Barking';
import Barnet from './Assets/borough/Barnet';
import Bexley from './Assets/borough/Bexley';
import Brent from './Assets/borough/Brent';
import Bromley from './Assets/borough/Bromley';
import Croydon from './Assets/borough/Croydon';
import Ealing from './Assets/borough/Ealing';
import Enfield from './Assets/borough/Enfield';
import Haringey from './Assets/borough/Haringey';
import Harrow from './Assets/borough/Harrow';
import Havering from './Assets/borough/Havering';
import Hillingdon from './Assets/borough/Hillingdon';
import Hounslow from './Assets/borough/Hounslow';
import Kingston from './Assets/borough/Kingston';
import Merton from './Assets/borough/Merton';
import Newham from './Assets/borough/Newham';
import Redbridge from './Assets/borough/Redbridge';
import Richmond from './Assets/borough/Richmond';
import Sutton from './Assets/borough/Sutton';
import Waltham from './Assets/borough/Waltham';

const style = {
  formContainer: {
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '3rem',
    border: '5px solid black',
    padding: '3rem',
  },

  textInput: {
    marginTop: '1rem',
  },

  buttonInput: {
    marginTop: '1rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  registerBtn: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: '1.1rem',
    marginLeft: '1rem',
    '&:hover': {
      backgroundColor: 'orange',
    },
  },

  picturesBtn: {
    backgroundColor: 'blue',
    color: 'white',
    fontSize: '0.8rem',
    border: '1px solid black',
    marginLeft: '1rem',
    '&:hover': {
      backgroundColor: 'cyan',
      color: 'black',
    },
  },
};

const areaOptions = [
  {
    value: '',
    label: '',
  },
  {
    value: 'Inner London',
    label: 'Inner London',
  },
  {
    value: 'Outer London',
    label: 'Outer London',
  },
];

const innerLondonOptions = [
  {
    value: '',
    label: '',
  },
  {
    value: 'Camden',
    label: 'Camden',
  },
  {
    value: 'Greenwich',
    label: 'Greenwich',
  },
  {
    value: 'Hackney',
    label: 'Hackney',
  },
  {
    value: 'Hammersmith and Fulham',
    label: 'Hammersmith and Fulham',
  },
  {
    value: 'Islington',
    label: 'Islington',
  },
  {
    value: 'Kensington and Chelsea',
    label: 'Kensington and Chelsea',
  },
  {
    value: 'Lambeth',
    label: 'Lambeth',
  },
  {
    value: 'Lewisham',
    label: 'Lewisham',
  },
  {
    value: 'Southwark',
    label: 'Southwark',
  },
  {
    value: 'Tower Hamlets',
    label: 'Tower Hamlets',
  },
  {
    value: 'Wandsworth',
    label: 'Wandsworth',
  },
  {
    value: 'Westminster',
    label: 'Westminster',
  },
  {
    value: 'City of London',
    label: 'City of London',
  },
];

const outerLondonOptions = [
  {
    value: '',
    label: '',
  },
  {
    value: 'Barking and Dangenham',
    label: 'Barking and Dangenham',
  },
  {
    value: 'Barnet',
    label: 'Barnet',
  },
  {
    value: 'Bexley',
    label: 'Bexley',
  },
  {
    value: 'Brent',
    label: 'Brent',
  },
  {
    value: 'Bromley',
    label: 'Bromley',
  },
  {
    value: 'Croydon',
    label: 'Croydon',
  },
  {
    value: 'Ealing',
    label: 'Ealing',
  },
  {
    value: 'Enfield',
    label: 'Enfield',
  },
  {
    value: 'Haringey',
    label: 'Haringey',
  },
  {
    value: 'Harrow',
    label: 'Harrow',
  },
  {
    value: 'Havering',
    label: 'Havering',
  },
  {
    value: 'Hillingdon',
    label: 'Hillingdon',
  },
  {
    value: 'Hounslow',
    label: 'Hounslow',
  },
  {
    value: 'Kingston upon Thames',
    label: 'Kingston upon Thames',
  },
  {
    value: 'Merton',
    label: 'Merton',
  },
  {
    value: 'Newham',
    label: 'Newham',
  },
  {
    value: 'Redbridge',
    label: 'Redbridge',
  },
  {
    value: 'Richmond upon Thames',
    label: 'Richmond upon Thames',
  },
  {
    value: 'Sutton',
    label: 'Sutton',
  },
  {
    value: 'Waltham Forest',
    label: 'Waltham Forest',
  },
];

const listingTypeOptions = [
  {
    value: '',
    label: '',
  },
  {
    value: 'Apartment',
    label: 'Apartment',
  },
  {
    value: 'House',
    label: 'House',
  },
  {
    value: 'Office',
    label: 'Office',
  },
];

const propertyStatusOptions = [
  {
    value: '',
    label: '',
  },
  {
    value: 'Sale',
    label: 'Sale',
  },
  {
    value: 'Rent',
    label: 'Rent',
  },
];

const rentalFrequencyOptions = [
  {
    value: '',
    label: '',
  },
  {
    value: 'Month',
    label: 'Month',
  },
  {
    value: 'Week',
    label: 'Week',
  },
  {
    value: 'Day',
    label: 'Day',
  },
];

function AddProperty() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  const initialState = {
    titleValue: '',
    listingTypeValue: '',
    descriptionValue: '',
    areaValue: '',
    boroughValue: '',
    latitudeValue: '',
    longitudeValue: '',
    propertyStatusValue: '',
    priceValue: '',
    rentalFrequencyValue: '',
    roomsValue: '',
    furnishedValue: false,
    poolValue: false,
    elevatorValue: false,
    cctvValue: false,
    parkingValue: false,
    picture1Value: '',
    picture2Value: '',
    picture3Value: '',
    picture4Value: '',
    picture5Value: '',
    mapInstance: null,
    markerPosition: {
      lat: '51.505',
      lng: '-0.09',
    },
    uploadedPictures: [],
    sendRequest: false,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case 'catchTitleChange':
        draft.titleValue = action.value;
        break;
      case 'catchListingTypeChange':
        draft.listingTypeValue = action.value;
        break;
      case 'catchDescriptionChange':
        draft.descriptionValue = action.value;
        break;
      case 'catchAreaChange':
        draft.areaValue = action.value;
        break;
      case 'catchBoroughChange':
        draft.boroughValue = action.value;
        break;
      case 'catchLatitudeChange':
        draft.latitudeValue = action.value;
        break;
      case 'catchLongitudeChange':
        draft.longitudeValue = action.value;
        break;
      case 'catchPropertyStatusChange':
        draft.propertyStatusValue = action.value;
        break;
      case 'catchPriceChange':
        draft.priceValue = action.value;
        break;
      case 'catchRentalFrequencyChange':
        draft.rentalFrequencyValue = action.value;
        break;
      case 'catchRoomsChange':
        draft.roomsValue = action.value;
        break;
      case 'catchFurnishedChange':
        draft.furnishedValue = action.value;
        break;
      case 'catchPoolChange':
        draft.poolValue = action.value;
        break;
      case 'catchElevatorChange':
        draft.elevatorValue = action.value;
        break;
      case 'catchCctvChange':
        draft.cctvValue = action.value;
        break;
      case 'catchParkingChange':
        draft.parkingValue = action.value;
        break;
      case 'catchPicture1Change':
        draft.picture1Value = action.value;
        break;
      case 'catchPicture2Change':
        draft.picture2Value = action.value;
        break;
      case 'catchPicture3Change':
        draft.picture3Value = action.value;
        break;
      case 'catchPicture4Change':
        draft.picture4Value = action.value;
        break;
      case 'catchPicture5Change':
        draft.picture5Value = action.value;
        break;
      case 'getMap':
        draft.mapInstance = action.mapData;
        break;
      case 'changeMarkerPosition':
        draft.markerPosition.lat = action.changeLatitude;
        draft.markerPosition.lng = action.changeLongitude;
        draft.latitudeValue = '';
        draft.longitudeValue = '';
        break;
      case 'catchUploadedPictures':
        draft.uploadedPictures = action.value;
        break;
      case 'changeSendRequest':
        draft.sendRequest = !draft.sendRequest;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  function FormSubmit(e) {
    e.preventDefault();
    dispatch({type: 'changeSendRequest'});
  }

  useEffect(() => {
    if (state.sendRequest) {
      async function AddProperty() {
        const formData = new FormData();
        formData.append('title', state.titleValue);
        formData.append('description', state.descriptionValue);
        formData.append('area', state.areaValue);
        formData.append('borough', state.boroughValue);
        formData.append('listing_type', state.listingTypeValue);
        formData.append('property_status', state.propertyStatusValue);
        formData.append('price', state.priceValue);
        formData.append('rental_frequency', state.rentalFrequencyValue);
        formData.append('rooms', state.roomsValue);
        formData.append('furnished', state.furnishedValue);
        formData.append('pool', state.poolValue);
        formData.append('elevator', state.elevatorValue);
        formData.append('cctv', state.cctvValue);

        formData.append(
          'location',
          `POINT(${state.longitudeValue} ${state.latitudeValue})`
        );

        formData.append('picture1', state.picture1Value);
        formData.append('picture2', state.picture2Value);
        formData.append('picture3', state.picture3Value);
        formData.append('picture4', state.picture4Value);
        formData.append('picture5', state.picture5Value);
        formData.append('seller', GlobalState.userId);
        try {
          const response = await Axios.post(
            'http://localhost:8000/api/listings/create/',
            formData
          );
          console.log(response);
          navigate('/listings');
        } catch (error) {
          console.log(error.response);
        }
      }
      AddProperty();
    }
  }, [state.sendRequest]);

  function TextChoiceFormItem(props) {
    return (
      <Grid item xs={5} sx={style.textInput}>
        <TextField
          id={props.id}
          label={props.label}
          variant="standard"
          disabled={props.disabled}
          value={props.value}
          select
          SelectProps={{
            native: true,
          }}
          onChange={e =>
            dispatch({
              type: props.dispatch_type,
              value: e.target.value,
            })
          }
          helperText={props.helper}
          fullWidth
        >
          {props.choice}
        </TextField>
      </Grid>
    );
  }

  const innerChoices = {
    area: areaOptions.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    )),
    borough:
      state.areaValue === 'Inner London'
        ? innerLondonOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        : state.areaValue === 'Outer London'
        ? outerLondonOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        : '',
    listingType: listingTypeOptions.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    )),
    propertyStatus: propertyStatusOptions.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    )),
    rentalFrequency: rentalFrequencyOptions.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    )),
  };

  function CheckboxFormItem(props) {
    return (
      <Grid item container sx={{marginTop: '1rem'}}>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.value}
              onChange={e =>
                dispatch({
                  type: props.dispatch_type,
                  value: e.target.checked,
                })
              }
            ></Checkbox>
          }
          label={props.label}
        />
      </Grid>
    );
  }

  function TheMapComponent() {
    const map = useMap();
    dispatch({type: 'getMap', mapData: map});
    return null;
  }

  // Use effect to change map view
  useEffect(() => {
    if (state.boroughValue === 'Camden') {
      state.mapInstance.setView([51.54103467179952, -0.14870897037846917], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.54103467179952,
        changeLongitude: -0.14870897037846917,
      });
    } else if (state.boroughValue === 'Greenwich') {
      state.mapInstance.setView([51.486316313935134, 0.005925763550159742], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.486316313935134,
        changeLongitude: 0.005925763550159742,
      });
    } else if (state.boroughValue === 'Hackney') {
      state.mapInstance.setView([51.55421119118178, -0.061054618357071246], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.55421119118178,
        changeLongitude: -0.061054618357071246,
      });
    } else if (state.boroughValue === 'Hammersmith and Fulham') {
      state.mapInstance.setView([51.496961673854216, -0.22495912738555046], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.496961673854216,
        changeLongitude: -0.22495912738555046,
      });
    } else if (state.boroughValue === 'Islington') {
      state.mapInstance.setView([51.54974373783584, -0.10746608414711818], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.54974373783584,
        changeLongitude: -0.10746608414711818,
      });
    } else if (state.boroughValue === 'Kensington and Chelsea') {
      state.mapInstance.setView([51.49779579272461, -0.1908227388030137], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.49779579272461,
        changeLongitude: -0.1908227388030137,
      });
    } else if (state.boroughValue === 'Lambeth') {
      state.mapInstance.setView([51.457598293463874, -0.12030697867735651], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.457598293463874,
        changeLongitude: -0.12030697867735651,
      });
    } else if (state.boroughValue === 'Lewisham') {
      state.mapInstance.setView([51.45263474786279, -0.017657579903930083], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.45263474786279,
        changeLongitude: -0.017657579903930083,
      });
    } else if (state.boroughValue === 'Southwark') {
      state.mapInstance.setView([51.47281414549159, -0.07657080658293915], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.47281414549159,
        changeLongitude: -0.07657080658293915,
      });
    } else if (state.boroughValue === 'Tower Hamlets') {
      state.mapInstance.setView([51.52222760075287, -0.03427379217816716], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.52222760075287,
        changeLongitude: -0.03427379217816716,
      });
    } else if (state.boroughValue === 'Wandsworth') {
      state.mapInstance.setView([51.45221859319854, -0.1910578642162312], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.45221859319854,
        changeLongitude: -0.1910578642162312,
      });
    } else if (state.boroughValue === 'Westminster') {
      state.mapInstance.setView([51.51424692365236, -0.1557886924596714], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.51424692365236,
        changeLongitude: -0.1557886924596714,
      });
    } else if (state.boroughValue === 'City of London') {
      state.mapInstance.setView([51.51464652712437, -0.09207257068971077], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.51464652712437,
        changeLongitude: -0.09207257068971077,
      });
    } else if (state.boroughValue === 'Barking and Dangenham') {
      state.mapInstance.setView([51.54475354441844, 0.13730036835406337], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.54475354441844,
        changeLongitude: 0.13730036835406337,
      });
    } else if (state.boroughValue === 'Barnet') {
      state.mapInstance.setView([51.61505810569654, -0.20104146847921367], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.61505810569654,
        changeLongitude: -0.20104146847921367,
      });
    } else if (state.boroughValue === 'Bexley') {
      state.mapInstance.setView([51.45784336604241, 0.1386755093498764], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.45784336604241,
        changeLongitude: 0.1386755093498764,
      });
    } else if (state.boroughValue === 'Brent') {
      state.mapInstance.setView([51.55847917911348, -0.2623697479848262], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.55847917911348,
        changeLongitude: -0.2623697479848262,
      });
    } else if (state.boroughValue === 'Bromley') {
      state.mapInstance.setView([51.37998089785619, 0.056091833685512606], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.37998089785619,
        changeLongitude: 0.056091833685512606,
      });
    } else if (state.boroughValue === 'Croydon') {
      state.mapInstance.setView([51.36613815034951, -0.08597242883896719], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.36613815034951,
        changeLongitude: -0.08597242883896719,
      });
    } else if (state.boroughValue === 'Ealing') {
      state.mapInstance.setView([51.52350664933499, -0.33384540332179463], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.52350664933499,
        changeLongitude: -0.33384540332179463,
      });
    } else if (state.boroughValue === 'Enfield') {
      state.mapInstance.setView([51.650718869158275, -0.07999628038008409], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.650718869158275,
        changeLongitude: -0.07999628038008409,
      });
    } else if (state.boroughValue === 'Haringey') {
      state.mapInstance.setView([51.591214467057085, -0.10319530898095737], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.591214467057085,
        changeLongitude: -0.10319530898095737,
      });
    } else if (state.boroughValue === 'Harrow') {
      state.mapInstance.setView([51.60218606442213, -0.33540294600548437], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.60218606442213,
        changeLongitude: -0.33540294600548437,
      });
    } else if (state.boroughValue === 'Havering') {
      state.mapInstance.setView([51.57230623503768, 0.2256095005492423], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.57230623503768,
        changeLongitude: 0.2256095005492423,
      });
    } else if (state.boroughValue === 'Hillingdon') {
      state.mapInstance.setView([51.5430033964411, -0.4435905982156584], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.5430033964411,
        changeLongitude: -0.4435905982156584,
      });
    } else if (state.boroughValue === 'Hounslow') {
      state.mapInstance.setView([51.475988836438525, -0.3660060903075389], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.475988836438525,
        changeLongitude: -0.3660060903075389,
      });
    } else if (state.boroughValue === 'Kingston upon Thames') {
      state.mapInstance.setView([51.39401320084246, -0.2841003136670212], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.39401320084246,
        changeLongitude: -0.2841003136670212,
      });
    } else if (state.boroughValue === 'Merton') {
      state.mapInstance.setView([51.41148120353897, -0.18805584151013174], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.41148120353897,
        changeLongitude: -0.18805584151013174,
      });
    } else if (state.boroughValue === 'Newham') {
      state.mapInstance.setView([51.533282275935306, 0.031692014878610064], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.533282275935306,
        changeLongitude: 0.031692014878610064,
      });
    } else if (state.boroughValue === 'Redbridge') {
      state.mapInstance.setView([51.585885574074965, 0.07764760021283491], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.585885574074965,
        changeLongitude: 0.07764760021283491,
      });
    } else if (state.boroughValue === 'Richmond upon Thames') {
      state.mapInstance.setView([51.450368976651696, -0.30801386088548505], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.450368976651696,
        changeLongitude: -0.30801386088548505,
      });
    } else if (state.boroughValue === 'Sutton') {
      state.mapInstance.setView([51.363672040828504, -0.1702200806863363], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.363672040828504,
        changeLongitude: -0.1702200806863363,
      });
    } else if (state.boroughValue === 'Waltham Forest') {
      state.mapInstance.setView([51.59466635701797, -0.012215840493378892], 12);
      dispatch({
        type: 'changeMarkerPosition',
        changeLatitude: 51.59466635701797,
        changeLongitude: -0.012215840493378892,
      });
    }
  }, [state.boroughValue]);

  function BoroughDisplay() {
    if (state.boroughValue === 'Camden') {
      return <Polygon positions={Camden} />;
    } else if (state.boroughValue === 'Greenwich') {
      return <Polygon positions={Greenwich} />;
    } else if (state.boroughValue === 'Hackney') {
      return <Polygon positions={Hackney} />;
    } else if (state.boroughValue === 'Hammersmith and Fulham') {
      return <Polygon positions={Hammersmith} />;
    } else if (state.boroughValue === 'Islington') {
      return <Polygon positions={Islington} />;
    } else if (state.boroughValue === 'Kensington and Chelsea') {
      return <Polygon positions={Kensington} />;
    } else if (state.boroughValue === 'Lambeth') {
      return <Polygon positions={Lambeth} />;
    } else if (state.boroughValue === 'Lewisham') {
      return <Polygon positions={Lewisham} />;
    } else if (state.boroughValue === 'Southwark') {
      return <Polygon positions={Southwark} />;
    } else if (state.boroughValue === 'Tower Hamlets') {
      return <Polygon positions={Hamlets} />;
    } else if (state.boroughValue === 'Wandsworth') {
      return <Polygon positions={Wandsworth} />;
    } else if (state.boroughValue === 'Westminster') {
      return <Polygon positions={Westminster} />;
    } else if (state.boroughValue === 'City of London') {
      return <Polygon positions={City_of_London} />;
    } else if (state.boroughValue === 'Barking and Dangenham') {
      return <Polygon positions={Barking} />;
    } else if (state.boroughValue === 'Barnet') {
      return <Polygon positions={Barnet} />;
    } else if (state.boroughValue === 'Bexley') {
      return <Polygon positions={Bexley} />;
    } else if (state.boroughValue === 'Brent') {
      return <Polygon positions={Brent} />;
    } else if (state.boroughValue === 'Bromley') {
      return <Polygon positions={Bromley} />;
    } else if (state.boroughValue === 'Croydon') {
      return <Polygon positions={Croydon} />;
    } else if (state.boroughValue === 'Ealing') {
      return <Polygon positions={Ealing} />;
    } else if (state.boroughValue === 'Enfield') {
      return <Polygon positions={Enfield} />;
    } else if (state.boroughValue === 'Haringey') {
      return <Polygon positions={Haringey} />;
    } else if (state.boroughValue === 'Harrow') {
      return <Polygon positions={Harrow} />;
    } else if (state.boroughValue === 'Havering') {
      return <Polygon positions={Havering} />;
    } else if (state.boroughValue === 'Hillingdon') {
      return <Polygon positions={Hillingdon} />;
    } else if (state.boroughValue === 'Hounslow') {
      return <Polygon positions={Hounslow} />;
    } else if (state.boroughValue === 'Kingston upon Thames') {
      return <Polygon positions={Kingston} />;
    } else if (state.boroughValue === 'Merton') {
      return <Polygon positions={Merton} />;
    } else if (state.boroughValue === 'Newham') {
      return <Polygon positions={Newham} />;
    } else if (state.boroughValue === 'Redbridge') {
      return <Polygon positions={Redbridge} />;
    } else if (state.boroughValue === 'Richmond upon Thames') {
      return <Polygon positions={Richmond} />;
    } else if (state.boroughValue === 'Sutton') {
      return <Polygon positions={Sutton} />;
    } else if (state.boroughValue === 'Waltham Forest') {
      return <Polygon positions={Waltham} />;
    }
  }

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        dispatch({type: 'catchLatitudeChange', value: marker.getLatLng().lat});
        dispatch({type: 'catchLongitudeChange', value: marker.getLatLng().lng});
      },
    }),
    []
  );

  // Catching picture files
  useEffect(() => {
    if (state.uploadedPictures[0]) {
      dispatch({
        type: 'catchPicture1Change',
        value: state.uploadedPictures[0],
      });
    }
  }, [state.uploadedPictures[0]]);
  useEffect(() => {
    if (state.uploadedPictures[1]) {
      dispatch({
        type: 'catchPicture2Change',
        value: state.uploadedPictures[1],
      });
    }
  }, [state.uploadedPictures[1]]);
  useEffect(() => {
    if (state.uploadedPictures[2]) {
      dispatch({
        type: 'catchPicture3Change',
        value: state.uploadedPictures[2],
      });
    }
  }, [state.uploadedPictures[2]]);
  useEffect(() => {
    if (state.uploadedPictures[3]) {
      dispatch({
        type: 'catchPicture4Change',
        value: state.uploadedPictures[3],
      });
    }
  }, [state.uploadedPictures[3]]);
  useEffect(() => {
    if (state.uploadedPictures[4]) {
      dispatch({
        type: 'catchPicture5Change',
        value: state.uploadedPictures[4],
      });
    }
  }, [state.uploadedPictures[4]]);

  function PriceDisplay() {
    if (
      state.propertyStatusValue === 'Rent' &&
      state.rentalFrequencyValue === 'Day'
    ) {
      return 'Price per Day';
    } else if (
      state.propertyStatusValue === 'Rent' &&
      state.rentalFrequencyValue === 'Week'
    ) {
      return 'Price per Week';
    } else if (
      state.propertyStatusValue === 'Rent' &&
      state.rentalFrequencyValue === 'Month'
    ) {
      return 'Price per Month';
    } else {
      return 'Price';
    }
  }

  return (
    <div style={style.formContainer}>
      <form onSubmit={FormSubmit}>
        <Grid item container justifyContent="center">
          <Typography variant="h4">SUBMIT A PROPERTY</Typography>
        </Grid>

        <Grid item xs={5} sx={style.textInput}>
          <TextField
            id="title"
            label="Title"
            variant="standard"
            value={state.titleValue}
            onChange={e =>
              dispatch({
                type: 'catchTitleChange',
                value: e.target.value,
              })
            }
            fullWidth
          />
        </Grid>

        <Grid item container justifyContent="space-between">
          <TextChoiceFormItem
            id="listingType"
            label="Listing Type"
            value={state.listingTypeValue}
            dispatch_type="catchListingTypeChange"
            helper="Please select your listing type"
            choice={innerChoices.listingType}
          />
          <TextChoiceFormItem
            id="propertyStatus"
            label="Property Status"
            value={state.propertyStatusValue}
            dispatch_type="catchPropertyStatusChange"
            helper="Please select your property status"
            choice={innerChoices.propertyStatus}
          />

          <TextChoiceFormItem
            id="rentalFrequency"
            label="Rental Frequency"
            value={state.rentalFrequencyValue}
            disabled={state.propertyStatusValue === 'Sale' ? true : false}
            dispatch_type="catchRentalFrequencyChange"
            helper="Please select your rental frequency"
            choice={innerChoices.rentalFrequency}
          />

          <Grid item xs={5} sx={style.textInput}>
            <TextField
              id="price"
              label={PriceDisplay()}
              variant="standard"
              value={state.priceValue}
              onChange={e =>
                dispatch({
                  type: 'catchPriceChange',
                  value: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid item container sx={style.textInput}>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={6}
            value={state.descriptionValue}
            onChange={e =>
              dispatch({
                type: 'catchDescriptionChange',
                value: e.target.value,
              })
            }
            fullWidth
          />
        </Grid>

        {state.listingTypeValue === 'Office' ? (
          ''
        ) : (
          <Grid item container xs={6}>
            <Grid item xs={5} sx={style.textInput}>
              <TextField
                id="rooms"
                label="Rooms"
                type="number"
                variant="standard"
                value={state.roomsValue}
                onChange={e =>
                  dispatch({
                    type: 'catchRoomsChange',
                    value: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
          </Grid>
        )}

        <Grid item container justifyContent="space-between">
          <Grid item xs={2}>
            <CheckboxFormItem
              label="Furnished"
              value={state.furnishedValue}
              dispatch_type="catchFurnishedChange"
            />
          </Grid>
          <Grid item xs={2}>
            <CheckboxFormItem
              label="Pool"
              value={state.poolValue}
              dispatch_type="catchPoolChange"
            />
          </Grid>
          <Grid item xs={2}>
            <CheckboxFormItem
              label="Elevator"
              value={state.elevatorValue}
              dispatch_type="catchElevatorChange"
            />
          </Grid>
          <Grid item xs={2}>
            <CheckboxFormItem
              label="CCTV"
              value={state.cctvValue}
              dispatch_type="catchCctvChange"
            />
          </Grid>
          <Grid item xs={2}>
            <CheckboxFormItem
              label="Parking"
              value={state.parkingValue}
              dispatch_type="catchParkingChange"
            />
          </Grid>
        </Grid>

        <Grid item container justifyContent="space-between">
          <TextChoiceFormItem
            id="area"
            label="Area"
            value={state.areaValue}
            dispatch_type="catchAreaChange"
            helper="Please select your area"
            choice={innerChoices.area}
          />

          <TextChoiceFormItem
            id="borough"
            label="Borough"
            value={state.boroughValue}
            dispatch_type="catchBoroughChange"
            helper="Please select your borough"
            choice={innerChoices.borough}
          />
        </Grid>

        {/* MAP CONTAINER */}
        <Grid item container sx={{height: '35rem', marginTop: '1rem'}}>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={12}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TheMapComponent />
            {BoroughDisplay()}
            <Marker
              draggable
              eventHandlers={eventHandlers}
              position={state.markerPosition}
              ref={markerRef}
            ></Marker>
          </MapContainer>
        </Grid>

        <Grid item container xs={6} sx={style.buttonInput}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={style.picturesBtn}
          >
            UPLOAD PICTURES (MAX 5)
            <input
              type="file"
              multiple
              accept="image/png, image/gif, image/jpg, image/jpeg"
              hidden
              onChange={e =>
                dispatch({type: 'catchUploadedPictures', value: e.target.files})
              }
            />
          </Button>
        </Grid>

        <Grid item container>
          <ul>
            {state.picture1Value ? <li>{state.picture1Value.name}</li> : ''}
            {state.picture2Value ? <li>{state.picture2Value.name}</li> : ''}
            {state.picture3Value ? <li>{state.picture3Value.name}</li> : ''}
            {state.picture4Value ? <li>{state.picture4Value.name}</li> : ''}
            {state.picture5Value ? <li>{state.picture5Value.name}</li> : ''}
          </ul>
        </Grid>

        <Grid item container xs={8} sx={style.buttonInput}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={style.registerBtn}
          >
            SUBMIT
          </Button>
        </Grid>
      </form>
    </div>
  );
}

export default AddProperty;
