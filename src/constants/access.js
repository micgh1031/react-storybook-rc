export default {
  stripe: process.env.REACT_APP_ENV === 'production' ?
    'pk_live_N8NNAbqdh1JSBd6Fm3pSGmcS' :
    'pk_test_llu663bU9CTYhyytyrY1JrI5',
  mapbox: 'pk.eyJ1IjoicmVmb3Jlc3R1bSIsImEiOiJjajR3djhiNGoxN293MzJvMTYzMXJjdHJxIn0.xhPwL8FQq2Q75c3o3tHJmA',
  mapboxStyles: 'mapbox://styles/reforestum/cj9hay02v1ya52sk8iyio6br1',
  mixpanelKey: process.env.REACT_APP_ENV === 'production' ?
      '9fe50b18cab1f221061b3ba827c68978' :
      '72790a561b1c080e0856ae20d9bb9782',
};
