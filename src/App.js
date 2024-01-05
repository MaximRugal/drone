import './index.css';
import React, { useEffect, useRef, useState } from 'react';
import BasicModal from './Modal';
import ButtonEnter from './ButtonEnter';
import LocationPlacemark from '@mui/icons-material/LocationOn';
import SvgIcon from '@mui/material/SvgIcon';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';
import { Button, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GeolocationControl, Map, ZoomControl, FullscreenControl, TypeSelector, Circle } from 'react-yandex-maps';
import { useStyles } from './App.styles';
import helicopter from './helicopter.svg';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import SelectAutoWidth from './Select';

const mapOptions = {
  modules: ['geocode', 'SuggestView'],
  defaultOptions: { suppressMapOpenBlock: true },
  width: 1500,
  height: 1000,
};

const geolocationOptions = {
  defaultOptions: { maxWidth: 128 },
  defaultData: { content: 'Determine' },
};

const initialState = {
  title: '',
  center: [53.863216, 27.60131],
  zoom: 15,
};

export default function YMapsTest() {
  const [state, setState] = useState({ ...initialState });
  const [openMap, setOpenMap] = useState(false);
  const [mapConstructor, setMapConstructor] = useState(null);
  const [weaponAlert, setWeaponAlert] = useState(false);
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
    setWeaponAlert(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  // submits
  const handleSubmit = () => {
    console.log({ title: state.title, center: mapRef.current.getCenter() });
  };

  const handleEnterSystem = () => {
    setOpenMap(true);
    setTimeout(() => handleOpenModal(), 5000);
  };

  // reset state & search
  const handleReset = () => {
    setState({ ...initialState });
    searchRef.current.value = '';
    mapRef.current.setCenter(initialState.center);
    mapRef.current.setZoom(initialState.zoom);
  };

  // search popup
  useEffect(() => {
    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current).events.add('select', function (e) {
        const selectedName = e.get('item').value;
        mapConstructor.geocode(selectedName).then((result) => {
          const newCoords = result.geoObjects.get(0).geometry.getCoordinates();
          setState((prevState) => ({ ...prevState, center: newCoords }));
        });
      });
    }
  }, [mapConstructor]);

  // change title
  const handleBoundsChange = (e) => {
    const newCoords = mapRef.current.getCenter();
    mapConstructor.geocode(newCoords).then((res) => {
      const nearest = res.geoObjects.get(0);
      const foundAddress = nearest.properties.get('text');
      const [centerX, centerY] = nearest.geometry.getCoordinates();
      const [initialCenterX, initialCenterY] = initialState.center;
      if (centerX !== initialCenterX && centerY !== initialCenterY) {
        setState((prevState) => ({ ...prevState, title: foundAddress }));
      }
    });
  };

  // RENDER
  return (
    <>
      {!openMap && <ButtonEnter handleClick={handleEnterSystem} />}
      {openMap && (
        <>
          <BasicModal openModal={openModal} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} />
          <Box sx={{ m: 2, width: 1400 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SelectAutoWidth />
              <Box className={classes['searchRoot']}>
                <Box className={classes['searchFieldBox']}>
                  <input ref={searchRef} placeholder='Поиск...' disabled={!mapConstructor} />
                  <Box
                    className={clsx(classes['titleBox'], {
                      [classes['titleBox_show']]: Boolean(state.title.length),
                    })}
                  >
                    <Typography title={state.title} gutterBottom={false}>
                      {state.title}
                    </Typography>
                    <IconButton onClick={handleReset}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Button
                  onClick={handleSubmit}
                  disabled={Boolean(!state.title.length)}
                  className={classes['searchSubmitBtn']}
                >
                  Ok
                </Button>
              </Box>
            </div>
            <Box className={classes['mapRoot']}>
              <Map
                {...mapOptions}
                state={state}
                onLoad={setMapConstructor}
                onBoundsChange={handleBoundsChange}
                instanceRef={mapRef}
              >
                {weaponAlert && (
                  <>
                    <Circle
                      geometry={[[53.866, 27.61], 100]}
                      options={{
                        draggable: false,
                        fillColor: '#DB709377',
                        strokeColor: '#990066',
                        strokeOpacity: 0.8,
                        strokeWidth: 5,
                      }}
                      onClick={() => alert('Стрельба из огнестрельного оружия : AK-47')}
                    />
                    <Circle
                      geometry={[[53.863, 27.602], 100]}
                      options={{
                        draggable: false,
                        fillColor: '#DB709377',
                        strokeColor: '#990066',
                        strokeOpacity: 0.8,
                        strokeWidth: 5,
                      }}
                      onClick={() => alert('Взрывная волна 10 ДБ')}
                    />
                  </>
                )}

                <FullscreenControl />
                <div className='rotating'>
                  <img
                    src={helicopter}
                    alt='helicopter'
                    style={{
                      position: 'absolute',
                      top: '200px',
                      left: '300px',
                      zIndex: '10000',
                    }}
                  />
                </div>
                {/* <LocationPlacemark className={classes['placemark']} color='primary' /> */}
                {/* <GeolocationControl {...geolocationOptions} /> */}
                <GeolocationControl options={{ float: 'left' }} />
                <TypeSelector options={{ float: 'right' }} />
                <ZoomControl />
              </Map>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
