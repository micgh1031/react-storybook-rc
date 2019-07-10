import { delay } from './';
import treesJson from './fakeTrees';

export const getForests = () => {
  return delay(300).then(() => {
    if (Math.random() < 0.05) {
      throw new Error('There was a problem fetching the forests');
    }

    return forests;
  });
};

export const getMyForests = () => {
  return delay(300).then(() => {
    if (Math.random() < 0.05) {
      throw new Error('There was a problem fetching your forests');
    }

    return myForests;
  });
};

export const getForestDetails = id => {
  return delay(300).then(() => {
    if (id !== 1) {
      throw new Error('No forest found');
    }

    return forestDetail;
  });
};

export const getForestPatrons = (id, pageIndex = 1, pageLength = 5) => {
  return delay(300).then(() => {
    if (id !== 1) {
      throw new Error('No forest found');
    }

    if (pageLength > 10) {
      throw new Error('Something');
    }

    if (pageIndex === 1) {
      return forestPatrons1;
    }

    if (pageIndex === 2) {
      return forestPatrons2;
    }

    if (pageIndex === 3) {
      return forestPatrons3;
    }

    throw new Error('No page');
  });
};

export const getForestTrees = id => {
  return delay(300).then(() => {
    if (id !== 1) {
      throw new Error('No forest found');
    }

    return forestTrees;
  });
};

export const getForestGallery = id => {
  return delay(300).then(() => {
    if (id !== 1) {
      throw new Error('No forest found');
    }

    return forestGallery;
  });
};

// Helpers

const forestInfo = {
  id: 1,
  name: "Génesis",
  main_image: "https://c402277.ssl.cf1.rackcdn.com/photos/946/images/story_full_width/forests-why-matter_63516847.jpg?1345534028",
  short_desc: `Our first project in the great Amazon, the lungs of the earth.
    Our civilisation has already cut down almost 800,000 square kilometers of
    forest in the amazon. Let's reforest it together!`,
  location_desc: "Picos de Europa, Spain",
  total_surface: 3169,
  available: true,
  coordinates: [ -4.849634, 43.193356 ],
  fitbounds: [
    [-4.855092592729449, 43.19054849871202],
    [-4.844272410869195, 43.196076849354256]
  ],
  surface_json: {
    "type": "geojson",
    "data": {
      "type": "Feature",
      "properties": {
        "name": "Genesis",
        "area": "19238m2",
        "country": "Spain"
      },
      "geometry": {
        "coordinates": [
          [
            [-4.84997, 43.19049],
            [-4.851554, 43.19075],
            [-4.851792, 43.191183],
            [-4.852267, 43.191472],
            [-4.852979, 43.192338],
            [-4.853573, 43.192598],
            [-4.854246, 43.192829],
            [-4.854959, 43.194127],
            [-4.854326, 43.195542],
            [-4.852663, 43.194762],
            [-4.851594, 43.194762],
            [-4.851158, 43.195022],
            [-4.850287, 43.195513],
            [-4.847397, 43.195975],
            [-4.846843, 43.194705],
            [-4.844626, 43.194647],
            [-4.844388, 43.193752],
            [-4.844467, 43.192829],
            [-4.845932, 43.192424],
            [-4.845536, 43.191558],
            [-4.846244, 43.191658],
            [-4.846714, 43.191353],
            [-4.847971, 43.191609],
            [-4.848426, 43.190794],
            [-4.84997,43.19049]
          ]
        ],
        "type": "Polygon"
      }
    }
  },
  timeline_formula: "if(y<20){r = 0.0000672*(Math.pow(Math.E,(0.3722*y)))}else if(y<50){r=0.0274*(Math.pow(Math.E,0.0748*y));}else{r=0.6197*(Math.pow(Math.E,0.0122*y));}return (r*1000);",
  price: 2,
};

const forestInfo2 = {
  id: 124,
  name: "The great lungs",
  main_image: "http://foresteurope.org/wp-content/uploads/2016/09/103055DSC0172ssw2-1024x685.jpg",
  short_desc: `Our first project in the great Amazon, the lungs of the earth.
    Our civilisation has already cut down almost 800,000 square kilometers of
    forest in the amazon. Let's reforest it together!`,
  location_desc: "Picos de Europa, Spain",
  total_surface: 98563,
  available: true,
  coordinates: [ -4.849634, 43.193356 ],
  fitbounds: [
    [-4.855092592729449, 43.19054849871202],
    [-4.844272410869195, 43.196076849354256]
  ],
  timeline_formula: "if(y<50){r=0.0274*(Math.pow(Math.E,0.0748*y));}else{r=0.6197*(Math.pow(Math.E,0.0122*y));}return (r*1000);",
  price: 4,
};

const forests = [
  {
    ...forestInfo,
  },
  {
    ...forestInfo2
  },
];

const myForests = {
  data: {
    status: 200
  },
  array: [
    {
      ...forestInfo,
      my_surface: 200,
      my_coordinates: [-4.8509591309, 43.1929802528],
      my_surface_json: {
        "type": "geojson",
        "data": {
          "geometry": {
            "coordinates": [
              [
                [
                  -4.8513348671032475,
                  43.193169912814255
                ],
                [
                  -4.8513348671032475,
                  43.192755959776576
                ],
                [
                  -4.850570526647317,
                  43.192755959776576
                ],
                [
                  -4.850570526647317,
                  43.19324951884707
                ],
                [
                  -4.8513348671032475,
                  43.193169912814255
                ]
              ]
            ],
            "type": "Polygon"
          },
          "type": "Feature",
          "properties": {}
        },
      },
      captured_co2: 8876123,
      generated_o2: 1289371,
    },
  ]
};

const forestGallery = [
  {
    id: 876,
    type: "image",
    url: "http://lorempixel.com/1200/700/",
    title: "Planting génesis",
    description: "This is a description",
  },
  {
    id: 877,
    type: "image",
    url: "https://unsplash.it/1200/700",
    title: "Another title",
    description: "This is a description",
  },
  {
    id: 878,
    type: "image",
    url: "https://unsplash.it/1000/500",
    title: "The little creatures",
    description: "This is a description",
  },
  {
    id: 879,
    type: "image",
    url: "https://unsplash.it/1400/800",
    title: "Oak tree",
    description: "This is a description",
  },
];

const forestDetail = {
  ...forestInfo,
  reforested_surface: 2000,
  succession_plan: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Phasellus aliquet est non consequat placerat. Nullam vestibulum nulla risus,
  mollis tincidunt arcu condimentum et. Phasellus rhoncus laoreet ex, tempus
  faucibus neque fringilla ut. Etiam viverra blandit nisl, vitae hendrerit
  sapien. Etiam mi orci, convallis ac metus a, eleifend volutpat magna. Morbi
  ac volutpat sapien. Aliquam tempus tellus sed finibus efficitur. Nunc vitae
  arcu vel risus ultrices fringilla et eget enim. Etiam non mauris sodales,
  maximus nibh eu, facilisis est. Aliquam nibh nisl, iaculis ut facilisis et,
  convallis eu magna. Mauris dui felis, tincidunt at mi sit amet, viverra
  malesuada augue. Cras diam sem, placerat in felis faucibus, dignissim placerat
  est. Sed ultrices, ligula volutpat consequat posuere, dui ligula pharetra ex,
  ac ultrices erat justo eu urna. Quisque eu justo eget est ullamcorper feugiat
  eu et tortor. Nullam feugiat felis at efficitur rutrum. Suspendisse fermentum,
  ipsum sit amet tempor efficitur, sem dolor gravida lectus, vitae tincidunt ex
  urna sed felis. Aenean scelerisque maximus odio vitae semper. Quisque ornare
  vestibulum diam, eu interdum magna feugiat eget. In a nisi vulputate,
  imperdiet libero rutrum, venenatis felis. Vestibulum ut metus ultrices,
  consectetur mi eleifend, accumsan lorem. Pellentesque vel mi orci. Donec
  quis purus ornare, tristique libero ac, feugiat dui. Nunc consectetur leo ac
  lorem condimentum, non mattis sapien hendrerit. Curabitur non erat semper,
  posuere ante eget, molestie urna. Vestibulum enim neque, porttitor convallis
  lorem ornare, porta vestibulum tellus. Duis egestas ex elit, at venenatis
  augue iaculis non.`,
  gallery: [
    "http://lorempixel.com/1200/700/",
    'https://unsplash.it/1200/700',
    'https://unsplash.it/1000/500',
    'https://unsplash.it/1400/800'
  ],
  species: [
    {
      id: 124,
      name: "Sycamore fig",
      latin_name: "Ficus sycomorus",
      icon: "http://lorempixel.com/96/96/",
    },
    {
      id: 125,
      name: "Oak",
      latin_name: "Carvalhus",
      icon: "https://unsplash.it/96/96",
    },
    {
      id: 126,
      name: "Maple tree",
      latin_name: "Acer palmatum",
      icon: "http://lorempixel.com/96/96/",
    },
    {
      id: 127,
      name: "Sycamore fig",
      latin_name: "Ficus sycomorus",
      icon: "https://unsplash.it/96/96",
    },
    {
      id: 128,
      name: "Sycamore fig",
      latin_name: "Ficus sycomorus",
      icon: "http://lorempixel.com/96/96/",
    },
    {
      id: 129,
      name: "Sycamore fig",
      latin_name: "Ficus sycomorus",
      icon: "https://unsplash.it/96/96",
    },
  ],
  team: [
    {
      id: 87234,
      name: "John Smith",
      title: "Forest engineer",
      bio: "Our first project in the great Amazon, the lungs of the earth. Our civilisation has already cut down almost 800,000 square kilometers of forest in the amazon. Let's reforest it together!",
      image: "http://lorempixel.com/96/96/"
    },
    {
      id: 21346345,
      name: "Jane Doe",
      title: "Tree climber",
      bio: "Our first project in the great Amazon, the lungs of the earth. Our civilisation has already cut down almost 800,000 square kilometers of forest in the amazon. Let's reforest it together!",
      image: "http://lorempixel.com/96/96/"
    }
  ],
};

const forestTrees = {
  id: 1,
  trees: treesJson,
};

const forestPatrons1 = {
  forest: 123,
  self_position: 12,
  self_surface: 432,
  total: 13,
  patrons:
  [
    {
      id: 123,
      name: "Barbara Jones",
      surface: 3169,
      ranking: 1,
      badges: null,
      avatar: "http://lorempixel.com/240/240/"
    },
    {
      id: 623,
      name: "Matthew Park",
      surface: 2194,
      ranking: 2,
      badges: null,
      avatar: "http://lorempixel.com/240/240/"
    },
    {
      id: 755,
      name: "John Doe",
      surface: 1876,
      ranking: 3,
      badges: null,
      avatar: "http://lorempixel.com/240/240/"
    },
    {
      id: 756,
      name: "Mathias Ruff",
      surface: 1567,
      ranking: 4,
      badges: null,
      avatar: "http://lorempixel.com/240/240/"
    },
    {
      id: 757,
      name: "Ronald McDonald",
      surface: 1456,
      ranking: 5,
      badges: null,
      avatar: "http://lorempixel.com/240/240/"
    },
  ]
};

const forestPatrons2 = {
  forest: 123,
  self_position: 12,
  self_surface: 432,
  total: 13,
  patrons:
  [
    {
      id: 347,
      name: "Another one",
      surface: 1320,
      ranking: 6,
      badges: null,
      avatar: "http://lorempixel.com/240/240/"
    },
    {
      id: 987,
      name: "Jessica Mathews",
      surface: 987,
      ranking: 7,
      badges: null,
      avatar: "http://lorempixel.com/240/240/"
    },
    {
      id: 988,
      name: "Marianne Adrian",
      surface: 957,
      ranking: 8,
      badges: null,
      avatar: "http://lorempixel.com/240/240/"
    },
    {
      id: 999,
      name: "John Markis",
      surface: 767,
      ranking: 9,
      badges: null,
      avatar: "http://lorempixel.com/240/240/"
    },
    {
      id: 1000,
      name: "Paul Potus",
      surface: 754,
      ranking: 10,
      badges: null,
      avatar: "http://lorempixel.com/240/240/"
    },
  ]
};

const forestPatrons3 = {
  forest: 123,
  self_position: 12,
  self_surface: 432,
  total: 13,
  patrons:
  [
    {
      id: 1001,
      name: "Adrian Matt",
      surface: 640,
      ranking: 11,
      badges: null,
      avatar: "http://lorempixel.com/240/240/"
    },
    {
      id: 1002,
      name: "Pedro Brandão",
      surface: 432,
      ranking: 12,
      badges: null,
      avatar: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
      id: 1003,
      name: "Otto Octo",
      surface: 430,
      ranking: 13,
      badges: null,
      avatar: "http://lorempixel.com/240/240/"
    },
  ]
};
