// ============================================================
// Cut2Fill — MVP App
// ============================================================

// ===== MATERIAL TOOLTIPS =====
const materialTooltips = {
    'clean-fill': 'No testing required under EP Act for clean earth. Suitable for general fill purposes.',
    'rock': 'Generally exempt from testing if visually free of contamination. Crushing on-site may require ERA.',
    'sand': 'No testing required if naturally occurring. Marine sand may need acid sulfate assessment.',
    'topsoil': 'No specific permits for clean topsoil. Must be free of weed seed for landscaping use.',
    'concrete': 'Recycled concrete exempt under End of Waste code (ENEW07547517). Must be free of asbestos.',
    'mixed': 'Mixed C&D waste requires disposal at licensed facility. Sorting on-site may reduce disposal costs.',
    'acid-sulfate': 'ASSMP may be required below 5m AHD (10m AHD in some LGAs). See SPP guidelines.',
    'contaminated': 'Soil Disposal Permit required if from EMR/CLR listed site. Chain of custody documentation essential.'
};

// ===== REGISTERED SITES (user-submitted, verified by Archers) =====
// This array will be populated as users register their sites and Archers verifies them.
// For MVP launch, this starts empty — all map data comes from registeredFacilities.
const registeredSites = [];

// ===== FACILITY TYPE LABELS & COLORS =====
const facilityTypeLabels = {
    'quarry': 'Quarry',
    'landfill': 'Landfill',
    'transfer': 'Transfer Station',
    'soil-treatment': 'Soil Treatment',
    'cd-recycler': 'C&D Recycler',
    'pfas-treatment': 'PFAS Treatment',
    'concrete': 'Concrete Supplier'
};
const facilityTypeColors = {
    'quarry': '#8a8478',
    'landfill': '#a0734a',
    'transfer': '#5c8a97',
    'soil-treatment': '#8b7eb5',
    'cd-recycler': '#6a9e8f',
    'pfas-treatment': '#b85c4a',
    'concrete': '#d4a05a'
};
const facilityTypeIcons = {
    'quarry': 'fa-gem',
    'landfill': 'fa-dumpster',
    'transfer': 'fa-recycle',
    'soil-treatment': 'fa-flask',
    'cd-recycler': 'fa-cogs',
    'pfas-treatment': 'fa-biohazard',
    'concrete': 'fa-industry'
};

// ===== FIRE ANT BIOSECURITY ZONES (inline QLD Government data) =====
let fireAntZone1Polys = []; // Array of polygon rings for zone 1
let fireAntZone2Polys = []; // Array of polygon rings for zone 2

const fireAntGeoJSON = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[152.512,-28.143],[152.545,-28.134],[152.564,-28.106],[152.563,-28.087],[152.552,-28.068],[152.521,-28.053],[152.485,-28.059],[152.472,-28.068],[152.46,-28.091],[152.463,-28.115],[152.476,-28.132],[152.49,-28.14],[152.512,-28.143]]],[[[152.511,-27.386],[152.495,-27.379],[152.474,-27.378],[152.453,-27.385],[152.438,-27.4],[152.41,-27.387],[152.38,-27.391],[152.357,-27.412],[152.329,-27.422],[152.315,-27.437],[152.31,-27.451],[152.311,-27.471],[152.32,-27.486],[152.315,-27.492],[152.308,-27.49],[152.295,-27.465],[152.271,-27.452],[152.241,-27.45],[152.216,-27.461],[152.204,-27.476],[152.2,-27.5],[152.214,-27.531],[152.232,-27.542],[152.228,-27.553],[152.214,-27.556],[152.198,-27.567],[152.186,-27.594],[152.171,-27.61],[152.151,-27.612],[152.135,-27.62],[152.12,-27.639],[152.117,-27.659],[152.126,-27.681],[152.144,-27.695],[152.16,-27.7],[152.182,-27.698],[152.176,-27.715],[152.181,-27.74],[152.191,-27.752],[152.21,-27.763],[152.24,-27.764],[152.264,-27.751],[152.277,-27.729],[152.276,-27.707],[152.287,-27.711],[152.322,-27.707],[152.332,-27.718],[152.329,-27.738],[152.318,-27.761],[152.315,-27.791],[152.305,-27.811],[152.308,-27.844],[152.316,-27.861],[152.336,-27.876],[152.339,-27.888],[152.354,-27.907],[152.377,-27.918],[152.41,-27.915],[152.42,-27.939],[152.398,-27.954],[152.388,-27.974],[152.392,-28.017],[152.408,-28.043],[152.433,-28.054],[152.452,-28.054],[152.51,-28.029],[152.53,-28.038],[152.555,-28.038],[152.57,-28.042],[152.573,-28.064],[152.587,-28.081],[152.607,-28.091],[152.628,-28.092],[152.649,-28.084],[152.648,-28.08],[152.642,-28.081],[152.636,-28.061],[152.644,-28.056],[152.641,-28.039],[152.658,-28.029],[152.651,-28.022],[152.656,-28.009],[152.661,-28.007],[152.661,-28.002],[152.64,-27.991],[152.649,-27.988],[152.65,-27.982],[152.656,-27.983],[152.656,-27.978],[152.662,-27.984],[152.67,-27.96],[152.676,-27.961],[152.677,-27.957],[152.698,-27.96],[152.702,-27.95],[152.698,-27.95],[152.699,-27.945],[152.704,-27.946],[152.705,-27.938],[152.711,-27.934],[152.719,-27.936],[152.72,-27.931],[152.74,-27.934],[152.744,-27.936],[152.743,-27.944],[152.765,-27.956],[152.764,-27.964],[152.784,-27.966],[152.794,-27.973],[152.798,-27.965],[152.808,-27.964],[152.822,-27.954],[152.851,-27.951],[152.858,-27.943],[152.877,-27.937],[152.88,-27.925],[152.873,-27.918],[152.88,-27.92],[152.882,-27.916],[152.876,-27.91],[152.884,-27.905],[152.896,-27.909],[152.895,-27.9],[152.897,-27.895],[152.904,-27.897],[152.904,-27.887],[152.868,-27.882],[152.888,-27.85],[152.88,-27.848],[152.878,-27.836],[152.867,-27.83],[152.878,-27.82],[152.878,-27.809],[152.891,-27.803],[152.902,-27.822],[152.906,-27.801],[152.893,-27.797],[152.875,-27.803],[152.869,-27.793],[152.831,-27.782],[152.803,-27.786],[152.808,-27.759],[152.792,-27.755],[152.797,-27.75],[152.799,-27.732],[152.774,-27.729],[152.777,-27.708],[152.748,-27.705],[152.744,-27.674],[152.747,-27.665],[152.719,-27.66],[152.729,-27.651],[152.714,-27.655],[152.711,-27.648],[152.703,-27.647],[152.699,-27.658],[152.681,-27.655],[152.672,-27.661],[152.671,-27.668],[152.641,-27.664],[152.631,-27.653],[152.636,-27.648],[152.621,-27.648],[152.615,-27.638],[152.619,-27.632],[152.61,-27.616],[152.617,-27.613],[152.605,-27.601],[152.596,-27.599],[152.598,-27.591],[152.605,-27.588],[152.6,-27.579],[152.613,-27.573],[152.609,-27.566],[152.612,-27.567],[152.617,-27.55],[152.609,-27.548],[152.611,-27.535],[152.621,-27.532],[152.636,-27.538],[152.643,-27.529],[152.663,-27.537],[152.668,-27.528],[152.662,-27.521],[152.654,-27.521],[152.656,-27.51],[152.648,-27.509],[152.65,-27.501],[152.646,-27.496],[152.628,-27.493],[152.629,-27.487],[152.604,-27.484],[152.6,-27.468],[152.59,-27.468],[152.593,-27.448],[152.571,-27.446],[152.572,-27.439],[152.564,-27.436],[152.561,-27.425],[152.564,-27.415],[152.558,-27.41],[152.563,-27.382],[152.553,-27.388],[152.539,-27.384],[152.511,-27.386]]],[[[151.739,-27.461],[151.758,-27.457],[151.775,-27.446],[151.786,-27.428],[151.787,-27.408],[151.778,-27.389],[151.762,-27.376],[151.738,-27.369],[151.716,-27.371],[151.697,-27.382],[151.687,-27.394],[151.682,-27.408],[151.683,-27.425],[151.693,-27.443],[151.704,-27.452],[151.739,-27.461]]],[[[148.495,-23.522],[148.514,-23.518],[148.53,-23.507],[148.539,-23.492],[148.542,-23.472],[148.537,-23.456],[148.526,-23.443],[148.511,-23.434],[148.491,-23.431],[148.475,-23.434],[148.454,-23.449],[148.445,-23.466],[148.444,-23.483],[148.457,-23.508],[148.477,-23.52],[148.495,-23.522]]],[[[148.557,-23.024],[148.578,-23.019],[148.591,-23.01],[148.601,-22.996],[148.604,-22.973],[148.59,-22.946],[148.573,-22.936],[148.552,-22.933],[148.533,-22.938],[148.516,-22.951],[148.506,-22.98],[148.509,-22.994],[148.522,-23.012],[148.538,-23.021],[148.557,-23.024]]],[[[148.252,-22.037],[148.271,-22.033],[148.287,-22.022],[148.297,-22.006],[148.299,-21.984],[148.281,-21.956],[148.265,-21.948],[148.245,-21.946],[148.228,-21.951],[148.211,-21.965],[148.202,-21.996],[148.215,-22.023],[148.235,-22.035],[148.252,-22.037]]],[[[147.986,-21.876],[148.003,-21.873],[148.021,-21.86],[148.031,-21.842],[148.032,-21.823],[148.014,-21.795],[147.996,-21.787],[147.977,-21.786],[147.946,-21.802],[147.938,-21.815],[147.935,-21.835],[147.941,-21.853],[147.955,-21.868],[147.986,-21.876]]],[[[148.163,-21.779],[148.182,-21.775],[148.197,-21.765],[148.208,-21.747],[148.21,-21.728],[148.196,-21.701],[148.179,-21.691],[148.158,-21.688],[148.139,-21.693],[148.12,-21.709],[148.113,-21.726],[148.113,-21.741],[148.119,-21.757],[148.133,-21.771],[148.163,-21.779]]]]},"properties":{"biozone":"Fire ant biosecurity zone 1","label":"Zone 1"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[153.249,-27.35],[153.249,-27.35]]],[[[153.247,-27.349],[153.247,-27.349]]],[[[152.861,-27.009],[152.869,-26.986],[152.866,-26.968],[152.851,-26.949],[152.828,-26.939],[152.802,-26.94],[152.781,-26.951],[152.767,-26.973],[152.766,-26.995],[152.774,-27.012],[152.799,-27.029],[152.823,-27.031],[152.847,-27.023],[152.84,-27.038],[152.84,-27.053],[152.847,-27.069],[152.885,-27.101],[152.906,-27.11],[152.901,-27.137],[152.906,-27.15],[152.919,-27.164],[152.909,-27.183],[152.91,-27.205],[152.923,-27.225],[152.946,-27.236],[152.936,-27.277],[152.918,-27.289],[152.906,-27.31],[152.892,-27.316],[152.879,-27.33],[152.845,-27.344],[152.828,-27.357],[152.803,-27.395],[152.804,-27.423],[152.786,-27.432],[152.771,-27.454],[152.756,-27.451],[152.744,-27.434],[152.73,-27.426],[152.697,-27.423],[152.685,-27.402],[152.661,-27.389],[152.64,-27.388],[152.622,-27.394],[152.602,-27.381],[152.573,-27.379],[152.563,-27.382],[152.558,-27.41],[152.564,-27.415],[152.561,-27.425],[152.564,-27.436],[152.572,-27.439],[152.571,-27.446],[152.593,-27.448],[152.59,-27.468],[152.6,-27.468],[152.604,-27.484],[152.629,-27.487],[152.628,-27.493],[152.646,-27.496],[152.65,-27.501],[152.648,-27.509],[152.656,-27.51],[152.654,-27.521],[152.662,-27.521],[152.668,-27.528],[152.663,-27.537],[152.643,-27.529],[152.636,-27.538],[152.621,-27.532],[152.611,-27.535],[152.609,-27.548],[152.617,-27.55],[152.612,-27.567],[152.609,-27.566],[152.613,-27.573],[152.6,-27.579],[152.605,-27.588],[152.598,-27.591],[152.596,-27.599],[152.605,-27.601],[152.617,-27.613],[152.61,-27.616],[152.619,-27.632],[152.615,-27.638],[152.621,-27.648],[152.636,-27.648],[152.631,-27.653],[152.641,-27.664],[152.671,-27.668],[152.672,-27.661],[152.681,-27.655],[152.699,-27.658],[152.703,-27.647],[152.711,-27.648],[152.714,-27.655],[152.729,-27.651],[152.719,-27.66],[152.747,-27.665],[152.744,-27.674],[152.748,-27.705],[152.777,-27.708],[152.774,-27.729],[152.799,-27.732],[152.797,-27.75],[152.792,-27.755],[152.808,-27.759],[152.803,-27.786],[152.831,-27.782],[152.869,-27.793],[152.875,-27.803],[152.893,-27.797],[152.906,-27.801],[152.902,-27.822],[152.891,-27.803],[152.878,-27.809],[152.878,-27.82],[152.867,-27.83],[152.87,-27.834],[152.875,-27.832],[152.874,-27.836],[152.88,-27.839],[152.879,-27.847],[152.888,-27.85],[152.868,-27.882],[152.904,-27.887],[152.904,-27.897],[152.897,-27.895],[152.896,-27.909],[152.884,-27.905],[152.876,-27.91],[152.882,-27.916],[152.88,-27.92],[152.873,-27.918],[152.88,-27.925],[152.877,-27.937],[152.858,-27.943],[152.851,-27.951],[152.822,-27.954],[152.808,-27.964],[152.798,-27.965],[152.794,-27.973],[152.784,-27.966],[152.764,-27.964],[152.765,-27.956],[152.743,-27.944],[152.744,-27.936],[152.721,-27.931],[152.719,-27.936],[152.713,-27.933],[152.705,-27.938],[152.704,-27.946],[152.699,-27.945],[152.698,-27.95],[152.702,-27.95],[152.698,-27.96],[152.685,-27.957],[152.67,-27.96],[152.662,-27.984],[152.656,-27.978],[152.656,-27.983],[152.65,-27.982],[152.649,-27.988],[152.64,-27.991],[152.661,-28.002],[152.651,-28.022],[152.658,-28.029],[152.641,-28.039],[152.644,-28.056],[152.636,-28.061],[152.642,-28.081],[152.648,-28.08],[152.649,-28.084],[152.665,-28.069],[152.709,-28.081],[152.729,-28.078],[152.747,-28.068],[152.758,-28.052],[152.78,-28.041],[152.793,-28.021],[152.817,-28.038],[152.844,-28.04],[152.822,-28.048],[152.805,-28.063],[152.795,-28.093],[152.798,-28.115],[152.806,-28.128],[152.826,-28.141],[152.843,-28.144],[152.832,-28.17],[152.812,-28.169],[152.794,-28.175],[152.778,-28.189],[152.77,-28.21],[152.779,-28.24],[152.799,-28.255],[152.815,-28.259],[152.836,-28.257],[152.854,-28.248],[152.879,-28.252],[152.899,-28.246],[152.921,-28.224],[152.924,-28.2],[152.968,-28.205],[152.998,-28.194],[153.03,-28.144],[153.031,-28.127],[153.024,-28.11],[153.034,-28.111],[153.051,-28.136],[153.048,-28.159],[153.057,-28.178],[153.076,-28.193],[153.092,-28.198],[153.122,-28.194],[153.143,-28.178],[153.164,-28.175],[153.18,-28.167],[153.196,-28.189],[153.22,-28.199],[153.249,-28.196],[153.272,-28.178],[153.282,-28.187],[153.303,-28.195],[153.329,-28.193],[153.35,-28.18],[153.363,-28.198],[153.388,-28.209],[153.416,-28.207],[153.435,-28.187],[153.457,-28.181],[153.468,-28.162],[153.476,-28.157],[153.486,-28.157],[153.535,-28.178],[153.541,-28.169],[153.552,-28.164],[153.525,-28.167],[153.508,-28.157],[153.487,-28.125],[153.482,-28.128],[153.475,-28.123],[153.462,-28.094],[153.449,-28.082],[153.432,-28.013],[153.429,-27.967],[153.433,-27.938],[153.429,-27.936],[153.434,-27.935],[153.429,-27.936],[153.425,-27.91],[153.435,-27.809],[153.449,-27.749],[153.448,-27.729],[153.454,-27.721],[153.454,-27.704],[153.426,-27.706],[153.434,-27.694],[153.436,-27.679],[153.462,-27.657],[153.473,-27.604],[153.487,-27.564],[153.484,-27.561],[153.489,-27.559],[153.519,-27.481],[153.488,-27.471],[153.487,-27.449],[153.469,-27.425],[153.448,-27.416],[153.426,-27.416],[153.397,-27.433],[153.387,-27.453],[153.387,-27.464],[153.369,-27.476],[153.358,-27.499],[153.36,-27.519],[153.374,-27.538],[153.397,-27.55],[153.425,-27.55],[153.4,-27.57],[153.365,-27.533],[153.332,-27.526],[153.333,-27.509],[153.32,-27.485],[153.296,-27.473],[153.279,-27.456],[153.243,-27.446],[153.239,-27.437],[153.242,-27.42],[153.226,-27.418],[153.228,-27.424],[153.215,-27.411],[153.23,-27.397],[153.238,-27.401],[153.243,-27.389],[153.237,-27.36],[153.214,-27.327],[153.192,-27.318],[153.16,-27.322],[153.133,-27.309],[153.09,-27.315],[153.082,-27.296],[153.067,-27.281],[153.075,-27.271],[153.07,-27.267],[153.096,-27.239],[153.099,-27.219],[153.094,-27.204],[153.086,-27.206],[153.05,-27.194],[153.037,-27.197],[153.033,-27.192],[153.03,-27.174],[153.042,-27.159],[153.043,-27.149],[153.037,-27.112],[153.022,-27.093],[152.999,-27.083],[152.962,-27.085],[152.965,-27.078],[152.982,-27.08],[153.001,-27.075],[153.021,-27.058],[153.027,-27.047],[153.028,-27.025],[153.017,-27.004],[153.008,-26.996],[152.985,-26.988],[152.965,-26.989],[152.947,-26.997],[152.918,-26.988],[152.903,-26.99],[152.861,-27.009]]],[[[152.796,-26.921],[152.814,-26.918],[152.833,-26.905],[152.843,-26.887],[152.844,-26.87],[152.828,-26.843],[152.81,-26.833],[152.788,-26.831],[152.772,-26.835],[152.756,-26.846],[152.747,-26.859],[152.743,-26.877],[152.748,-26.895],[152.761,-26.911],[152.777,-26.919],[152.796,-26.921]]],[[[153.041,-26.699],[153.05,-26.677],[153.045,-26.653],[153.031,-26.638],[153.011,-26.629],[152.985,-26.63],[152.964,-26.641],[152.952,-26.658],[152.949,-26.676],[152.957,-26.698],[152.973,-26.712],[152.99,-26.718],[153.014,-26.716],[152.998,-26.745],[153,-26.765],[153.013,-26.783],[152.997,-26.804],[152.992,-26.83],[152.998,-26.848],[153.011,-26.862],[153.043,-26.872],[153.058,-26.87],[153.094,-26.853],[153.114,-26.834],[153.119,-26.815],[153.133,-26.817],[153.133,-26.808],[153.151,-26.802],[153.149,-26.791],[153.141,-26.789],[153.137,-26.775],[153.135,-26.727],[153.104,-26.735],[153.096,-26.717],[153.082,-26.705],[153.061,-26.698],[153.041,-26.699]]],[[[152.971,-26.564],[152.991,-26.56],[153.007,-26.549],[153.018,-26.53],[153.019,-26.511],[153.011,-26.493],[152.995,-26.479],[152.978,-26.473],[152.959,-26.473],[152.929,-26.489],[152.92,-26.505],[152.918,-26.523],[152.925,-26.542],[152.939,-26.556],[152.971,-26.564]]]]},"properties":{"biozone":"Fire ant biosecurity zone 2","label":"Zone 2"}}]};


// ===== POINT-IN-POLYGON (ray casting) =====
function pointInPolygon(lat, lng, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0], yi = polygon[i][1];
        const xj = polygon[j][0], yj = polygon[j][1];
        const intersect = ((yi > lng) !== (yj > lng)) && (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

function getLocationZone(lat, lng) {
    for (const poly of fireAntZone1Polys) {
        if (pointInPolygon(lat, lng, poly)) return 1;
    }
    for (const poly of fireAntZone2Polys) {
        if (pointInPolygon(lat, lng, poly)) return 2;
    }
    return 0;
}

// ===== MAP INITIALIZATION =====
const QLD_CENTER = [-22.5, 146.0];
const SEQ_CENTER = [-27.47, 152.95];
const SEQ_BOUNDS = [[-26.0, 151.5], [-28.3, 153.6]];

const map = L.map('map', {
    center: SEQ_CENTER,
    zoom: 9,
    zoomControl: true,
    minZoom: 5
});

// Tile layers
const osmLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://osm.org/copyright">OSM</a>',
    maxZoom: 19,
    className: 'map-tiles-warm'
}).addTo(map);

// Labels on a separate layer so they sit on top
const labelLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    pane: 'overlayPane'
}).addTo(map);

const satLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 19
});

let usingSatellite = false;

// Fire ant zone layers (loaded from QLD Government GeoJSON)
let fireAntLayerGroup = L.layerGroup();
let fireAntVisible = false;

// LGA boundary layers
let lgaLayerGroup = L.layerGroup();
let lgaVisible = true;

// 12 distinct colours, cycled across all LGAs for visibility
const lgaColorPalette = [
    '#3b82f6', '#f59e0b', '#22c55e', '#8b5cf6', '#14b8a6',
    '#f97316', '#a855f7', '#06b6d4', '#84cc16', '#ec4899',
    '#ef4444', '#6366f1'
];
function lgaColor(name) {
    // Hash the name to pick a consistent colour
    let h = 0;
    for (let i = 0; i < name.length; i++) h = ((h << 5) - h + name.charCodeAt(i)) | 0;
    return lgaColorPalette[Math.abs(h) % lgaColorPalette.length];
}

// Convert GeoJSON [lng, lat] to Leaflet [lat, lng]
function geoJsonToLeaflet(coords) {
    return coords.map(c => [c[1], c[0]]);
}

// Load fire ant zones from inline data
function loadFireAntZones() {
    fireAntGeoJSON.features.forEach(feature => {
        const isZone1 = feature.properties.label === 'Zone 1';
        const color = isZone1 ? '#ef4444' : '#f59e0b';
        const fillOpacity = isZone1 ? 0.12 : 0.06;
        const opacity = isZone1 ? 0.7 : 0.5;
        const label = isZone1 ? 'Fire Ant Biosecurity Zone 1 (Restricted)' : 'Fire Ant Biosecurity Zone 2 (Buffer)';

        feature.geometry.coordinates.forEach(polygon => {
            const rings = polygon.map(ring => geoJsonToLeaflet(ring));
            // Store for point-in-polygon checks (using [lat,lng] format)
            if (isZone1) fireAntZone1Polys.push(rings[0]);
            else fireAntZone2Polys.push(rings[0]);

            const leafletPoly = L.polygon(rings, {
                color: color,
                weight: 2,
                opacity: opacity,
                fillColor: color,
                fillOpacity: fillOpacity,
                dashArray: isZone1 ? '6, 4' : '8, 6'
            });
            leafletPoly.bindTooltip(label, { sticky: true });
            fireAntLayerGroup.addLayer(leafletPoly);
        });
    });
}

// Load LGA boundaries from external GeoJSON file
async function loadLGABoundaries() {
    try {
        const resp = await fetch('data/qld-lga-boundaries.geojson?v=2');
        const data = await resp.json();
        data.features.forEach(feature => {
            const name = feature.properties.abbrev_name;
            const fullName = feature.properties.lga;
            const color = lgaColor(name);

            const addPolygon = (rings) => {
                const leafletRings = rings.map(ring => geoJsonToLeaflet(ring));
                const poly = L.polygon(leafletRings, {
                    color: color,
                    weight: 1.5,
                    opacity: 0.6,
                    fillColor: color,
                    fillOpacity: 0.04,
                    dashArray: '4, 4'
                });
                poly.bindTooltip(fullName, { sticky: true, className: 'custom-tooltip' });
                lgaLayerGroup.addLayer(poly);
            };

            if (feature.geometry.type === 'MultiPolygon') {
                feature.geometry.coordinates.forEach(polygon => addPolygon(polygon));
            } else {
                addPolygon(feature.geometry.coordinates);
            }
        });
    } catch (e) {
        console.warn('Failed to load LGA boundaries:', e);
    }
}

// ===== ADDRESS SEARCH =====
let searchTimeout = null;
let searchMarker = null;
let searchCircle = null;
let userSiteLocation = null;  // { lat, lng, label }

// ===== LOGISTICS & EMISSIONS CALCULATOR =====
const truckProfiles = {
    'body-truck': { label: 'Body Truck', payload: 12, fuelPer100km: 35, icon: 'fa-truck' },
    'truck-and-dog': { label: 'Truck & Dog', payload: 22, fuelPer100km: 45, icon: 'fa-truck-moving' },
    'semi-tipper': { label: 'Semi Tipper', payload: 28, fuelPer100km: 50, icon: 'fa-trailer' },
};
const DIESEL_CO2_PER_LITRE = 2.68;  // kg CO2-e per litre (NGA Factors 2024)
const AVG_SPEED_KMH = 45;           // average urban/peri-urban SEQ
const ROAD_FACTOR = 1.35;           // straight-line to road distance multiplier

function haversineKm(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function calcLogistics(distKm, tonnes, truckType) {
    const truck = truckProfiles[truckType];
    const loads = Math.ceil(tonnes / truck.payload);
    const roundTripKm = distKm * 2;
    const totalKm = roundTripKm * loads;
    const fuelLitres = totalKm * truck.fuelPer100km / 100;
    const co2Kg = fuelLitres * DIESEL_CO2_PER_LITRE;
    const hoursPerTrip = roundTripKm / AVG_SPEED_KMH + 0.5; // +30min load/unload
    const totalHours = hoursPerTrip * loads;
    return { loads, roundTripKm, totalKm, fuelLitres, co2Kg, totalHours, truck };
}

let routeLine = null;

function showRouteLine(fromLat, fromLng, toLat, toLng) {
    if (routeLine) map.removeLayer(routeLine);
    routeLine = L.polyline([[fromLat, fromLng], [toLat, toLng]], {
        color: '#6b8f5e',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 8'
    }).addTo(map);
}

function clearRouteLine() {
    if (routeLine) { map.removeLayer(routeLine); routeLine = null; }
}

function buildLogisticsPanel(facility) {
    if (!userSiteLocation) return '';
    const straightKm = haversineKm(userSiteLocation.lat, userSiteLocation.lng, facility.lat, facility.lng);
    const roadKm = (straightKm * ROAD_FACTOR).toFixed(1);

    return `
        <div class="logistics-section" style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.08);">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
                <i class="fas fa-route" style="color:var(--green);"></i>
                <strong style="font-size:13px;">Delivery Estimator</strong>
                <span class="badge" style="background:rgba(107,143,94,0.15);color:var(--green);margin-left:auto;font-size:11px;">~${roadKm} km each way</span>
            </div>
            <div style="display:flex;gap:8px;margin-bottom:8px;">
                <div style="flex:1;">
                    <label style="font-size:11px;color:var(--text-muted);display:block;margin-bottom:3px;">Tonnes</label>
                    <input type="number" id="calcTonnes" value="500" min="1" step="50" style="width:100%;padding:6px 8px;border-radius:6px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text);font-size:13px;">
                </div>
                <div style="flex:1.5;">
                    <label style="font-size:11px;color:var(--text-muted);display:block;margin-bottom:3px;">Truck Type</label>
                    <select id="calcTruckType" style="width:100%;padding:6px 8px;border-radius:6px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text);font-size:13px;">
                        <option value="body-truck">Body Truck (12t)</option>
                        <option value="truck-and-dog" selected>Truck &amp; Dog (22t)</option>
                        <option value="semi-tipper">Semi Tipper (28t)</option>
                    </select>
                </div>
            </div>
            <div id="calcResults" style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12px;"></div>
        </div>
    `;
}

function updateCalcResults(facility) {
    const container = document.getElementById('calcResults');
    if (!container || !userSiteLocation) return;
    const tonnes = parseFloat(document.getElementById('calcTonnes').value) || 0;
    const truckType = document.getElementById('calcTruckType').value;
    const straightKm = haversineKm(userSiteLocation.lat, userSiteLocation.lng, facility.lat, facility.lng);
    const roadKm = straightKm * ROAD_FACTOR;
    const r = calcLogistics(roadKm, tonnes, truckType);

    container.innerHTML = `
        <div style="background:rgba(255,255,255,0.04);border-radius:6px;padding:8px;text-align:center;">
            <div style="font-size:18px;font-weight:700;color:var(--text);">${r.loads}</div>
            <div style="color:var(--text-muted);font-size:11px;"><i class="fas ${r.truck.icon}"></i> Loads</div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border-radius:6px;padding:8px;text-align:center;">
            <div style="font-size:18px;font-weight:700;color:var(--amber);">${r.totalHours.toFixed(1)}h</div>
            <div style="color:var(--text-muted);font-size:11px;"><i class="fas fa-clock"></i> Truck Hours</div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border-radius:6px;padding:8px;text-align:center;">
            <div style="font-size:18px;font-weight:700;color:var(--blue);">${r.fuelLitres.toFixed(0)}L</div>
            <div style="color:var(--text-muted);font-size:11px;"><i class="fas fa-gas-pump"></i> Diesel</div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border-radius:6px;padding:8px;text-align:center;">
            <div style="font-size:18px;font-weight:700;color:${r.co2Kg > 5000 ? '#ef4444' : r.co2Kg > 2000 ? 'var(--amber)' : 'var(--green)'};">${r.co2Kg >= 1000 ? (r.co2Kg/1000).toFixed(1)+'t' : r.co2Kg.toFixed(0)+'kg'}</div>
            <div style="color:var(--text-muted);font-size:11px;"><i class="fas fa-leaf"></i> CO₂-e</div>
        </div>
    `;
    // Also show total km
    const totalKmNote = document.getElementById('calcTotalKmNote');
    if (!totalKmNote) {
        const note = document.createElement('div');
        note.id = 'calcTotalKmNote';
        note.style.cssText = 'font-size:11px;color:var(--text-muted);text-align:center;margin-top:6px;grid-column:1/-1;';
        note.innerHTML = `${r.totalKm.toFixed(0)} km total · ${r.truck.payload}t per load · ${r.truck.fuelPer100km}L/100km · NGA Factors 2024`;
        container.appendChild(note);
    } else {
        totalKmNote.innerHTML = `${r.totalKm.toFixed(0)} km total · ${r.truck.payload}t per load · ${r.truck.fuelPer100km}L/100km · NGA Factors 2024`;
    }
}

function initAddressSearch() {
    const input = document.getElementById('addressInput');
    const results = document.getElementById('addressResults');

    input.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        const query = input.value.trim();
        if (query.length < 3) {
            results.innerHTML = '';
            results.style.display = 'none';
            return;
        }
        searchTimeout = setTimeout(() => searchAddress(query), 400);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            results.style.display = 'none';
            input.blur();
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.address-search')) {
            results.style.display = 'none';
        }
    });
}

async function searchAddress(query) {
    const results = document.getElementById('addressResults');
    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Queensland, Australia')}&limit=5&addressdetails=1`;
        const resp = await fetch(url);
        const data = await resp.json();

        if (data.length === 0) {
            results.innerHTML = '<div class="address-result-item">No results found</div>';
            results.style.display = 'block';
            return;
        }

        results.innerHTML = data.map(r => `
            <div class="address-result-item" data-lat="${r.lat}" data-lng="${r.lon}">
                <i class="fas fa-map-marker-alt"></i>
                <span>${r.display_name}</span>
            </div>
        `).join('');
        results.style.display = 'block';

        results.querySelectorAll('.address-result-item[data-lat]').forEach(item => {
            item.addEventListener('click', () => {
                const lat = parseFloat(item.dataset.lat);
                const lng = parseFloat(item.dataset.lng);
                zoomToLocation(lat, lng, item.querySelector('span').textContent);
                document.getElementById('addressInput').value = item.querySelector('span').textContent;
                results.style.display = 'none';
            });
        });
    } catch (e) {
        results.innerHTML = '<div class="address-result-item">Search unavailable — try again</div>';
        results.style.display = 'block';
    }
}

function zoomToLocation(lat, lng, label) {
    // Store user site location for logistics calculator
    userSiteLocation = { lat, lng, label };
    clearRouteLine();

    // Remove previous search marker/circle
    if (searchMarker) map.removeLayer(searchMarker);
    if (searchCircle) map.removeLayer(searchCircle);

    // 50km radius circle
    searchCircle = L.circle([lat, lng], {
        radius: 50000,
        color: '#6b8f5e',
        weight: 2,
        opacity: 0.5,
        fillColor: '#6b8f5e',
        fillOpacity: 0.04,
        dashArray: '8, 6'
    }).addTo(map);

    // Location marker
    searchMarker = L.marker([lat, lng], {
        icon: L.divIcon({
            className: '',
            html: '<div style="width:36px;height:36px;border-radius:50%;background:#6b8f5e;border:3px solid #e0dbd3;display:flex;align-items:center;justify-content:center;font-size:16px;color:#fff;box-shadow:0 3px 10px rgba(0,0,0,0.5);"><i class="fas fa-crosshairs"></i></div>',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        })
    }).addTo(map);
    searchMarker.bindTooltip(`<strong>Your Site</strong><br>${label}`, { direction: 'top', offset: [0, -20] });

    // Zoom to fit the 50km radius
    map.fitBounds(searchCircle.getBounds(), { padding: [40, 40] });
}

// ===== DASHBOARD =====
function renderDashboard() {
    // Site stats — from registered facilities
    const quarryCount = registeredFacilities.filter(f => f.type === 'quarry').length;
    const landfillCount = registeredFacilities.filter(f => f.type === 'landfill').length;
    const transferCount = registeredFacilities.filter(f => f.type === 'transfer').length;
    const otherCount = registeredFacilities.filter(f => !['quarry','landfill','transfer'].includes(f.type)).length;

    document.getElementById('dashSiteStats').innerHTML = `
        <div class="dash-stat-item">
            <span class="dash-stat-number" style="color:#9ca3af;">${quarryCount}</span>
            <span class="dash-stat-label">Quarries</span>
        </div>
        <div class="dash-stat-item">
            <span class="dash-stat-number" style="color:#92400e;">${landfillCount}</span>
            <span class="dash-stat-label">Landfills</span>
        </div>
        <div class="dash-stat-item">
            <span class="dash-stat-number blue">${transferCount}</span>
            <span class="dash-stat-label">Transfer Stations</span>
        </div>
        <div class="dash-stat-item">
            <span class="dash-stat-number green">${otherCount}</span>
            <span class="dash-stat-label">Recyclers / Treatment</span>
        </div>
    `;

    // Volume stats — registered sites (user-submitted)
    const siteCount = registeredSites.length;
    document.getElementById('dashVolumeStats').innerHTML = `
        <div class="dash-stat-item">
            <span class="dash-stat-number" style="color:var(--text);">${registeredFacilities.length}</span>
            <span class="dash-stat-label">Total Facilities</span>
        </div>
        <div class="dash-stat-item">
            <span class="dash-stat-number green">${registeredFacilities.filter(f => f.hours === 'business').length}</span>
            <span class="dash-stat-label">Business Hours</span>
        </div>
        <div class="dash-stat-item">
            <span class="dash-stat-number amber">${registeredFacilities.filter(f => f.hours === '24/7').length}</span>
            <span class="dash-stat-label">24/7 Operations</span>
        </div>
        <div class="dash-stat-item">
            <span class="dash-stat-number blue">${siteCount}</span>
            <span class="dash-stat-label">Registered Sites</span>
        </div>
    `;

    // Top facility types — computed from actual data
    document.getElementById('materialChart').innerHTML = '';  // No material data without listings

    // Facility breakdown by type
    const facTypes = {};
    const facTypeLabels = {
        'quarry': 'Quarries', 'landfill': 'Landfills', 'transfer': 'Transfer Stations',
        'soil-treatment': 'Soil Treatment', 'cd-recycler': 'C&D Recyclers', 'pfas-treatment': 'PFAS Treatment'
    };
    registeredFacilities.forEach(f => {
        facTypes[f.type] = (facTypes[f.type] || 0) + 1;
    });
    const maxFac = Math.max(...Object.values(facTypes), 1);
    document.getElementById('facilityBars').innerHTML = Object.entries(facTypes)
        .sort((a, b) => b[1] - a[1])
        .map(([type, count]) => `
        <div class="region-bar">
            <div class="region-bar-label">${facTypeLabels[type] || type}</div>
            <div class="region-bar-track">
                <div class="region-bar-fill blue" style="width:${(count/maxFac)*100}%">${count}</div>
            </div>
        </div>
    `).join('');
}

// ===== VIEW SWITCHING =====
function switchView(view) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-view="${view}"]`).classList.add('active');

    document.getElementById('mapView').style.display = view === 'map' ? '' : 'none';
    document.getElementById('dashboardView').style.display = view === 'dashboard' ? '' : 'none';

    if (view === 'map') {
        setTimeout(() => map.invalidateSize(), 100);
    }
    if (view === 'dashboard') {
        renderDashboard();
    }
}

// ===== TOAST =====
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3500);
}

// ===== REGISTERED FACILITIES =====
const registeredFacilities = [
    // Quarries (all business hours)
    // Brisbane City Council
    { name: 'BCC — Mt Coot-tha Quarry', type: 'quarry', lat: -27.4860, lng: 152.9540, suburb: 'Mt Coot-tha', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Council-owned quarry operating since 1890s. Metamorphic rock — ~400,000t/yr. Supplies 90%+ of BCC asphalt aggregate. ~10 years remaining resource.' },
    { name: 'Boral — Ormeau Quarry', type: 'quarry', lat: -27.8212, lng: 153.2216, suburb: 'Kingsholme', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Hard rock quarry producing aggregates, road base and concrete products for Brisbane-Gold Coast corridor.' },
    { name: 'Boral — Mt Cotton Quarry', type: 'quarry', lat: -27.6200, lng: 153.2200, suburb: 'Mt Cotton', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Major quarry producing aggregates and road base materials. Commercial supply.' },
    { name: 'Boral — Narangba Quarry', type: 'quarry', lat: -27.2330, lng: 152.9064, suburb: 'Narangba', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Operating since 1969. Produces aggregates, road base and concrete products.' },
    { name: 'Boral — West Burleigh Quarry', type: 'quarry', lat: -28.1050, lng: 153.4230, suburb: 'West Burleigh', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Hard rock quarry on Gold Coast producing aggregates and road base.' },
    { name: 'Boral — Pine Rivers Quarry', type: 'quarry', lat: -27.2800, lng: 152.9400, suburb: 'Petrie', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Sand and gravel extraction. Supplies north Brisbane region.' },
    { name: 'Boral — Purga Quarry', type: 'quarry', lat: -27.7700, lng: 152.7200, suburb: 'Peak Crossing', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Basalt source producing aggregates and road base. ~500k tonnes p.a.' },
    { name: 'Boral — Moy Pocket Quarry', type: 'quarry', lat: -26.5332, lng: 152.7423, suburb: 'Moy Pocket', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Sunshine Coast hinterland. Produces aggregates and road base.' },
    { name: 'SCC — Image Flat Quarry', type: 'quarry', lat: -26.6150, lng: 152.9450, suburb: 'Image Flat', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '178 Image Flat Rd. Council-owned since 1960s. Rhyolite aggregates, road base, crusher dust. Mon-Sat 6am-5pm.' },
    { name: 'SCC — Dulong Quarry', type: 'quarry', lat: -26.6230, lng: 152.8660, suburb: 'Dulong', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Council-owned since 1970s. Basalt aggregates, road base, drainage rock. Haul route via Sherwell Rd to Image Flat.' },
    { name: 'Parklands Blue Metal', type: 'quarry', lat: -26.6000, lng: 152.9600, suburb: 'Parklands', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Oleander Dr, Parklands (4km north of Nambour). Operating since 1953. Blue metal, crushed stone, gravel, sand, aggregate. Neil Mansell Concrete subsidiary.' },
    { name: 'Karreman — Mt Cotton Quarry', type: 'quarry', lat: -27.6350, lng: 153.1950, suburb: 'Sheldon', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '616-632 West Mt Cotton Rd. Operating since 1977, 2M+ tonnes p.a. Brisbane\'s leading road base supplier.' },
    { name: 'Barro — Mt Cotton Quarry', type: 'quarry', lat: -27.6280, lng: 153.2050, suburb: 'Mt Cotton', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Operating since 1960s. Key Resource Area. Concrete aggregates and road materials.' },
    { name: 'Barro — Mt Marrow Quarry', type: 'quarry', lat: -27.5938, lng: 152.6218, suburb: 'Mt Marrow', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '15km west of Ipswich. Blue metal aggregates and road base.' },
    { name: 'Hanson — Wolffdene Quarry', type: 'quarry', lat: -27.7850, lng: 153.2100, suburb: 'Luscombe', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Hanson\'s largest SEQ operation. Crushed rock, sand, gravel and road base.' },
    { name: 'Hanson — Ormeau Quarry', type: 'quarry', lat: -27.7700, lng: 153.2500, suburb: 'Ormeau', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Sand and gravel quarry. Large-scale commercial supply for SEQ construction.' },
    { name: 'Hanson — Nerang Quarry', type: 'quarry', lat: -27.9950, lng: 153.3350, suburb: 'Nerang', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Hard rock quarry producing aggregates for Gold Coast market.' },
    { name: 'Hanson — Upper Kedron Quarry', type: 'quarry', lat: -27.4180, lng: 152.9180, suburb: 'Upper Kedron', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Hard rock quarry producing aggregates for western Brisbane.' },
    { name: 'Hanson — Glass House Mountains Quarry', type: 'quarry', lat: -26.9110, lng: 152.9133, suburb: 'Glass House Mountains', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Hard rock quarry producing aggregate and road base for Sunshine Coast. Now branded Heidelberg Materials.' },
    // Noosa Shire
    { name: 'Cordwell Resources — Kin Kin Quarry', type: 'quarry', lat: -26.2750, lng: 152.8800, suburb: 'Kin Kin', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '250 Sheppersons Lane, Kin Kin. Andesite/latite hard rock — TMR-approved aggregates, road base, drainage, crusher dust. ERA permit up to 1M tonnes/yr (to 2033).' },
    { name: 'Holcim — Rocksberg Quarry', type: 'quarry', lat: -27.1000, lng: 152.8800, suburb: 'Rocksberg', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Hard rock quarry. Aggregates, road base, drainage rock.' },
    { name: 'Holcim — Bli Bli Quarry', type: 'quarry', lat: -26.6250, lng: 152.9950, suburb: 'Bli Bli', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '110 Cooney Rd, Bli Bli. TMR Registered (RQ023). Hard rock aggregates, road base, concrete products.' },
    { name: 'Holcim — Beerburrum Quarry (Sunrock)', type: 'quarry', lat: -26.9600, lng: 152.9680, suburb: 'Beerburrum', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Nursery Rd, Beerburrum. TMR Registered (RQ015). Hard rock aggregates and road base for Sunshine Coast hinterland.' },
    { name: 'Conondale Quarry', type: 'quarry', lat: -26.6400, lng: 152.7800, suburb: 'Conondale', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '2316 Maleny-Kenilworth Rd, Conondale. TMR Registered (RQ495). SMSF Property Resources.' },
    { name: 'Holcim — Beenleigh Quarry', type: 'quarry', lat: -27.7750, lng: 153.2300, suburb: 'Luscombe', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Hard rock quarry producing aggregates and concrete products for Gold Coast/Logan area.' },
    { name: 'Holcim — Petrie Quarry', type: 'quarry', lat: -27.2476, lng: 152.9281, suburb: 'Kurwongbah', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Produces aggregates and road base for Moreton Bay region.' },
    { name: 'BCC — Bracalba Quarry', type: 'quarry', lat: -26.9750, lng: 152.8550, suburb: 'Bracalba', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '1865 D\'Aguilar Hwy, Bracalba. BCC-owned, 1M+ tonnes/yr. Crushing aggregates for concrete, asphalt, drainage, road base. Lab services and cement treating on-site.' },
    // Lockyer Valley
    { name: 'Brooks Quarries — Gatton', type: 'quarry', lat: -27.5550, lng: 152.2750, suburb: 'Gatton', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Saleyard Rd, Gatton. Family business since 1955. Blue metal (2 quarries), sandstone, bedding sand, washed sand. Services Lockyer Valley region.' },
    { name: 'Rock Trade Industries — Helidon', type: 'quarry', lat: -27.5350, lng: 152.1350, suburb: 'Helidon', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '613 Seventeen Mile Rd, Helidon. Operating since 2007. Sandstone boulders, crushed stone, premium sand, gravel, asphalt and concrete aggregates. 100% resource utilisation.' },
    // Toowoomba
    { name: 'Boral — Wellcamp Quarry', type: 'quarry', lat: -27.5600, lng: 151.7900, suburb: 'Wellcamp', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '1511 Toowoomba Cecil Plains Rd, Wellcamp. Formerly Wagners — acquired by Boral. Concrete, sealing, asphalt and drainage aggregates, road base, pavement materials. TMR Registered (RQ049).' },
    { name: 'Boral — Malu Quarry', type: 'quarry', lat: -27.5200, lng: 151.6400, suburb: 'Malu', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Malu Rd, off Warrego Hwy. TMR Registered (RQ036). Boral Resources. Hard rock aggregates and road base for western Toowoomba corridor.' },
    { name: 'Captains Mountain Quarry', type: 'quarry', lat: -27.7100, lng: 151.6800, suburb: 'Captains Mountain', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '113-117 Blackwell Rd, Captains Mountain. TMR Registered (RQ253). Corbet Quarries and Concrete. Hard rock aggregates.' },
    { name: 'Harlaxton Quarry', type: 'quarry', lat: -27.5400, lng: 151.9700, suburb: 'Harlaxton', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '3 Munro St, Harlaxton. TMR Registered (RQ005). Quarry Products Pty Ltd. Hard rock aggregates and road base.' },
    { name: 'Yatala Quarry', type: 'quarry', lat: -27.7400, lng: 153.2500, suburb: 'Luscombe', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Peachy Rd, Luscombe. TMR Registered (RQ106). Crushing Dynamics (QLD). Hard rock aggregates.' },
    { name: 'Fulton Hogan — Stapylton Quarry', type: 'quarry', lat: -27.7350, lng: 153.2700, suburb: 'Stapylton', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Hard rock quarry producing aggregates, sand and road base for northern Gold Coast.' },
    { name: 'Nucrush — Oxenford Quarry', type: 'quarry', lat: -27.8850, lng: 153.3150, suburb: 'Oxenford', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '50+ years operating. Meta-greywacke (blue metal) quarry. Key Resource Area.' },
    { name: 'Kennedy Group — Bromelton Quarry', type: 'quarry', lat: -27.9927, lng: 152.9640, suburb: 'Bromelton', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '100M+ tonne blue rock deposit — one of largest in QLD. Hard rock aggregates.' },
    { name: 'Neilsen Group — Cryna Quarry', type: 'quarry', lat: -28.0050, lng: 152.9800, suburb: 'Beaudesert', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Operating since 1997. Hard rock basalt quarry producing concrete aggregates and road base.' },
    { name: 'Sand & Soil Company — Tamborine', type: 'quarry', lat: -27.8700, lng: 153.1000, suburb: 'Tamborine', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '742 Mundoolun Connection Rd, Tamborine. Sandstone quarry — base sand, fill. 670ha site, 3.5M+ tonnes remaining. Approved to 2032.' },
    { name: 'Adbri — Kalbar Quarry', type: 'quarry', lat: -27.8100, lng: 152.6300, suburb: 'Frazerview', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '637 Frazerview Rd, Frazerview. TMR Registered (RQ364). Hy-Tec/Zanow. Trachyandesite — asphalt, concrete and drainage aggregates, road base, rock fill.' },
    { name: 'Neilsens — Bromelton North Quarry', type: 'quarry', lat: -27.9800, lng: 152.9350, suburb: 'Bromelton', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Sandy Creek Rd, Bromelton. TMR Registered (RQ191). Neilsens Quality Gravels. Hard rock aggregates and road base.' },
    // Somerset Regional Council
    { name: 'Adbri — Fernvale Quarry', type: 'quarry', lat: -27.4600, lng: 152.6500, suburb: 'Fernvale', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '1630 Brisbane Valley Hwy, Fernvale. Sand, gravel, aggregates and ready-mix concrete. Est. 1957 (formerly Zanows, acquired by Adbri 2022). Two quarry operations on site.' },
    { name: 'Adbri — Coominya Quarry', type: 'quarry', lat: -27.4000, lng: 152.5300, suburb: 'Coominya', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '1020 Atkinsons Dam Rd, Coominya. Aggregates and ready-mix concrete (Hy-Tec brand). Hard rock quarry resource.' },
    { name: 'Rockwell — Buaraba Quarry', type: 'quarry', lat: -27.4300, lng: 152.4100, suburb: 'Buaraba', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '156 Skew Gully Rd, Buaraba. Sandstone quarry — washed sands, gravels, road base, decorative crushed sandstone. Family-owned, 25+ years. Delivers across SEQ.' },
    { name: 'Karreman — Harlin Quarry', type: 'quarry', lat: -27.0400, lng: 152.3700, suburb: 'Harlin', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Sinnamon Lane, Harlin. TMR Registered (RQ271). Karreman Quarries. Andesite porphyry hard rock — KRA 167 state-protected resource. Aggregates and road base.' },
    // ===== QLD-WIDE QUARRIES (TMR Registered, geocoded 2026-03-25) =====
    // Balonne
    { name: 'Bonathorne Quarry', type: 'quarry', lat: -28.5860, lng: 148.2291, suburb: 'Dirranbandi', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '7785 Castlereagh Highway, Dirranbandi QLD 4486. TMR Registered (RQ402). K & D Hadenfeldt Pty Ltd. Siltstone' },
    { name: 'Cutlers Sand Pit - St George', type: 'quarry', lat: -28.0604, lng: 148.5585, suburb: 'St George', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Whyenbah Road, St George QLD 4487. TMR Registered (RQ257). St George Excavators Pty Ltd. Mainly Medium to Coarse Quartzose Alluvi' },
    { name: 'Rockville Pit', type: 'quarry', lat: -28.0312, lng: 147.4753, suburb: 'Bollon', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Balonne Highway, Bollon QLD 4488 (24km west of Bollon). TMR Registered (RQ523). Tierney Crushing & Transport Pty Ltd. Indurated and Variably Ferruginised & Si' },
    // Banana
    { name: 'Castle Creek Quarry', type: 'quarry', lat: -24.8605, lng: 150.1806, suburb: 'Castle Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '499 Defence Road, Castle Creek QLD 4718. TMR Registered (RQ135). Regional Group Australia (RGA) Pty Ltd. Andesite' },
    { name: 'Fairview Quarry', type: 'quarry', lat: -24.3192, lng: 150.0910, suburb: 'Banana', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '310 Fairview Road, Banana QLD 4702. TMR Registered (RQ220). Regional Group Australia (RGA) Pty Ltd. Andesitic Porphyry' },
    { name: 'Kianga Quarries', type: 'quarry', lat: -24.0000, lng: 150.1450, suburb: 'Banana', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 80 Leichhardt Highway, Banana QLD 4702 (On Leichhardt Highway approximately . TMR Registered (RQ411). Kianga Quarries Pty Ltd. Silica Undersaturated Glassy Porphyritic' },
    { name: 'Theodore (Shoecraft) Quarry', type: 'quarry', lat: -24.8605, lng: 150.1806, suburb: 'Castle Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '514 Defence Road, Castle Creek QLD 4718. TMR Registered (RQ594). Shoecraft Plant Hire Pty Ltd. Andesite' },
    { name: 'Yalkara Quarry', type: 'quarry', lat: -24.3774, lng: 150.3625, suburb: 'Orange Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Orange Creek Road, Orange Creek QLD 4715. TMR Registered (RQ222). Heidelberg Materials Australia Pty Ltd.. Hornfelsed Volcanoclastic Arenite & Silt' },
    // Barcaldine
    { name: 'Chesalon (Alpha) Quarry', type: 'quarry', lat: -23.7115, lng: 146.5987, suburb: 'Alpha', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '2027 Alpha-Tambo Road, Alpha QLD 4725 (Approximately 19km south of Alpha). TMR Registered (RQ112). Michael Horman Transport Pty Ltd. Porphyritic Andesite' },
    // Bundaberg
    { name: 'Boral Booyal Quarry', type: 'quarry', lat: -25.2532, lng: 152.0856, suburb: 'Booyal', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '196 Ringwood Road, Booyal QLD 4671. TMR Registered (RQ198). Boral Resources (Qld) Pty Ltd. Hornfelsed Volcanoclastic Metasiltstone ' },
    { name: 'Boral Tomato Island Quarry', type: 'quarry', lat: -24.8839, lng: 152.2944, suburb: 'Bundaberg', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Tomato Island Road (off Branyan Road), Bundaberg QLD 4670. TMR Registered (RQ092). Boral Resources (Qld) Pty Ltd. Medium to Coarse Quartzofeldspathic and ' },
    { name: 'Kleicon Hardrock Quarry (Gin-Gin Quarries Pty Ltd)', type: 'quarry', lat: -25.0115, lng: 152.0414, suburb: 'Lot 4 Clarkes Road Delan', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 4 Clarkes Road Delan QLD 4671. TMR Registered (RQ586). Gin Gin Quarries Pty Ltd. Partly Hornfelsed  Volcanoclastic Sandst' },
    { name: 'Paverock Quarry', type: 'quarry', lat: -25.1714, lng: 152.3273, suburb: 'Redridge', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '1485 Goodwood Road, Redridge QLD 4660. TMR Registered (RQ041). Paveways Pty Ltd T/A Paverock Quarry. Silica Oversaturated Glassy Olivine Basa' },
    { name: 'Schaffers Road Quarry', type: 'quarry', lat: -25.2240, lng: 152.2010, suburb: 'Apple Tree Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '47 Schaffers Road, Apple Tree Creek QLD 4660. TMR Registered (RQ548). Mckey Earthmoving Pty Ltd. Residual Silty Sand derived from Decompo' },
    { name: 'Sunstate Sands Bundaberg', type: 'quarry', lat: -24.9717, lng: 152.4509, suburb: 'Coonarr', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Palm Beach Road, Coonarr QLD 4670. TMR Registered (RQ246). Sunstate Sands Bundaberg. Mainly Fine to Medium Quartz Dunal Sand' },
    { name: 'Whymere Sands (Extraction Area A)', type: 'quarry', lat: -24.7949, lng: 152.3057, suburb: 'Fairymead', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Gooburrum Road, Fairymead QLD 4670. TMR Registered (RQ575). McBrides Sands. Mainly Medium Quartzose Aeolian Sand' },
    // Burdekin
    { name: 'Mt. Inkerman Quarry', type: 'quarry', lat: -19.7444, lng: 147.4934, suburb: 'Inkerman', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '37 Mt Inkerman Road (via Home Hill), Inkerman QLD 4806. TMR Registered (RQ431). L. D. and L. J. Hillery T/A Hillery Group. Granite' },
    { name: 'Mt. Kelly Red Binder Pit', type: 'quarry', lat: -19.6717, lng: 147.3087, suburb: 'Kelly', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Warana Road, Mt. Kelly QLD 4807. TMR Registered (RQ503). BQC Quarries Pty Ltd. Fine to Coarse Quartzofeldspathic and Li' },
    { name: 'Mt. Kelly White Binder Pit', type: 'quarry', lat: -19.6724, lng: 147.3084, suburb: 'Kelly', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Warana Road,  Mt. Kelly QLD 4807. TMR Registered (RQ504). BQC Quarries Pty Ltd. Medium to Coarse Quartzofeldspathic and ' },
    { name: 'Stokes Range Quarry', type: 'quarry', lat: -19.7265, lng: 147.3290, suburb: 'Kirknie', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Rifle Range Road, Kirknie QLD 4806. TMR Registered (RQ076). BQC Quarries Pty Ltd. Microdiorite and Andesitic Porphyry with' },
    // Burke
    { name: 'QCrush Horse Creek Quarry', type: 'quarry', lat: -18.7191, lng: 139.2175, suburb: 'Gregory', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Gregory Downs - Camooweal Road,  Gregory QLD 4830 (Approximately 19.7 km south o. TMR Registered (RQ227). QCrush Pty Ltd. Ferricrete' },
    // Cairns
    { name: 'Boral Redlynch Quarry', type: 'quarry', lat: -16.9000, lng: 145.6978, suburb: 'Redlynch', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '622 Redlynch Intake Road, Redlynch QLD 4870. TMR Registered (RQ013). Boral Resources (Qld) Pty Ltd. Metagreywacke' },
    { name: 'Maitland Road Quarry (Zappala Quarries)', type: 'quarry', lat: -17.0657, lng: 145.7537, suburb: 'Gordonvale', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '209-211 Maitland Road, Gordonvale QLD 4865. TMR Registered (RQ391). Zappala Quarries Pty Ltd. Metagreywacke, Greenschist and Metasilts' },
    { name: 'Marino Kanimbla Quarry', type: 'quarry', lat: -16.9204, lng: 145.7212, suburb: 'Kanimbla', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'McFarlane Drive, Kanimbla QLD 4870 (Via Ramsey Drive, Kanimbla QLD 4870). TMR Registered (RQ458). Marino Quarry Pty Ltd. Siliceous Phyllite and Metagreywacke wit' },
    { name: 'PNQ Barron Sands', type: 'quarry', lat: -16.8651, lng: 145.6928, suburb: 'Caravonica', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Stewarts Road, Caravonica QLD 4870. TMR Registered (RQ020). Pioneer North Queensland Pty Ltd. Quartzofeldspathic and Lithic Alluvial S' },
    // Cassowary Coast
    { name: 'Singh Pit Quarry', type: 'quarry', lat: -17.7179, lng: 146.0791, suburb: 'McCutcheon', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '361 Stephenson Road, McCutcheon QLD 4856. TMR Registered (RQ543). Zappala Quarries Pty Ltd. Fine Grained Quartzose Natural Dunal San' },
    // Central Highlands
    { name: 'Bauhinia Quarry', type: 'quarry', lat: -24.6220, lng: 149.4007, suburb: 'Bauhinia', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 1 Dawson Highway, Bauhinia QLD 4718. TMR Registered (RQ362). Thomas Plant Hire. Olivine Basalt' },
    { name: 'Black Hill Quarry', type: 'quarry', lat: -23.5496, lng: 149.1432, suburb: 'Bluff', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Walton Road, Bluff QLD 4702. TMR Registered (RQ334). Blackwater Quarries Pty Ltd. Silica Undersaturated Glassy Olivine Bas' },
    { name: 'Blackwater (Bedford Weir) Quarry', type: 'quarry', lat: -23.5523, lng: 148.8615, suburb: 'Blackwater', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '2403 Blackwater-Cooroorah Road, Blackwater QLD 4717. TMR Registered (RQ188). Blackwater Quarries Pty Ltd. Olivine Basalt and Gabbro' },
    { name: 'Eureka Quarry', type: 'quarry', lat: -23.0958, lng: 148.0679, suburb: 'Capella', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '2098 Yan Yan Road, Capella QLD 4723. TMR Registered (RQ340). Quarries of Queensland Pty Ltd. Silica Oversaturated Glassy Olivine Basa' },
    { name: 'Glendon Quarry', type: 'quarry', lat: -23.5709, lng: 147.8254, suburb: 'Anakie', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Glendon Road, Anakie QLD 4702. TMR Registered (RQ201). Regional Quarries Australia Pty Ltd. Silica Undersaturated Glassy Olivine Bas' },
    { name: 'Mt Curio (Pinnacle) Quarry', type: 'quarry', lat: -24.1213, lng: 148.1021, suburb: 'Springsure', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Gap Road, Springsure QLD 4722. TMR Registered (RQ236). Quarries of Queensland Pty Ltd. Silica Oversaturated Glassy Olivine Basa' },
    // Charters Towers
    { name: 'Plum Tree Quarry (Gromac Quarries)', type: 'quarry', lat: -20.1072, lng: 146.2459, suburb: 'Charters Towers', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '11343 Flinders Highway, Charters Towers QLD 4820. TMR Registered (RQ042). Gromac Quarries (NQ) Pty Ltd. Microgranite, Granodiorite, Granite with' },
    { name: 'Townsville Graded Sands - Macrossan Sand Plant', type: 'quarry', lat: -20.0595, lng: 146.3032, suburb: 'Flinders Highway Breddan', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Flinders Highway Breddan QLD 4820. TMR Registered (RQ564). Townsville Graded Sands Pty Ltd. Medium to Coarse Quartzose Feldspathic L' },
    // Cloncurry
    { name: 'Castlereagh Quarry', type: 'quarry', lat: -20.3527, lng: 140.7242, suburb: 'Cloncurry', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Zingari Road, Cloncurry QLD 4824. TMR Registered (RQ224). Wagners Quarries Pty Ltd. Calc-Silicate Hornfels' },
    // Cook
    { name: 'Mt. Amos Quarry', type: 'quarry', lat: -15.6467, lng: 145.2743, suburb: 'Cooktown', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '41 Mt Amos Road, Cooktown QLD 4895. TMR Registered (RQ278). Nambal Resources and Quarries Pty Ltd. Metagreywacke' },
    // Douglas
    { name: 'Coastal Quarries Pty Ltd', type: 'quarry', lat: -16.3736, lng: 145.4108, suburb: 'Rocky Point', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Mossman Daintree Road, Rocky Point QLD 4873. TMR Registered (RQ565). Ross Dorrens Garnsey. Loamy Sandy Silt/Silty Sand' },
    // Fraser Coast
    { name: 'Boral Dundowran Quarry', type: 'quarry', lat: -25.2990, lng: 152.7963, suburb: 'Dundowran', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lower Mountain Road, Dundowran QLD 4655. TMR Registered (RQ028). Boral Resources (Qld) Pty Ltd. Olivine Basalt' },
    { name: 'Dundowran West Quarry (Barro Group)', type: 'quarry', lat: -25.3115, lng: 152.7417, suburb: 'Takura', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '351 Hornes Road, Takura QLD 4655. TMR Registered (RQ055). Dundowran Blue Metal Quarries Pty Ltd. Silica Oversaturated Glassy Olivine Basa' },
    { name: 'Fraser Coast Sand & Gravel', type: 'quarry', lat: -25.2931, lng: 152.6994, suburb: 'Takura', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '12 Toogoom Cane Road, Takura QLD 4655. TMR Registered (RQ071). Yougro Pty Ltd. Fine Grained Dunal Quartz Sand' },
    { name: 'Hard Rock Quarries (Yerra - Black Pit)', type: 'quarry', lat: -25.5659, lng: 152.5450, suburb: 'Yerra', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '776 Yerra Road, Yerra QLD 4650. TMR Registered (RQ437). Quarry Boys Gympie Pty Ltd. Trachyte' },
    { name: 'Maryborough Quarries (Antigua)', type: 'quarry', lat: -25.6347, lng: 152.5782, suburb: 'Antigua', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '6 Gilmers Road, Antigua QLD 4650. TMR Registered (RQ018). Maryborough Quarries. Porphyritic Dacite' },
    // Gladstone
    { name: 'Graymont (Calliope) Quarry', type: 'quarry', lat: -24.0390, lng: 151.2132, suburb: 'Calliope', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'MS24 Taragoola Road, Calliope QLD 4680. TMR Registered (RQ075). Graymont (Calliope) Pty Limited. Recrystallized Fossiliferous Limestone' },
    { name: 'Koorrooeenah Quarry', type: 'quarry', lat: -24.5005, lng: 151.8085, suburb: 'Taunton', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '785 Tableland Road, (off Koorrooeenah Rd) Taunton QLD 4674. TMR Registered (RQ203). Berajondo Pty Ltd ATF Sal Bonanno Family Trust trading as Be. Hydrothermally Altered Silica Oversatura' },
    // Goondiwindi
    { name: 'Inglewood Quarry', type: 'quarry', lat: -28.4040, lng: 151.1903, suburb: 'Coolmunda', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '23266 Cunningham Highway, Coolmunda QLD 4387. TMR Registered (RQ006). Johnstone Concrete and Quarries Pty Ltd. Silica Undersaturated Glassy Leucite Oli' },
    { name: 'Kildonan Quarry', type: 'quarry', lat: -28.6502, lng: 150.4719, suburb: 'Kurumbul', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 14, Kildonan Road, Kurumbul QLD 4388. TMR Registered (RQ173). Wagners Quarries Pty Ltd. Quartzofeldspathic and Lithic Alluvial S' },
    { name: 'McNultys Road Pit (Bulmers)', type: 'quarry', lat: -28.6954, lng: 150.9460, suburb: 'Beebo', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'McNultys Road, Beebo QLD 4385. TMR Registered (RQ247). L. Bulmer & Co Pty Ltd. Silcrete / Ridge Gravel' },
    // Hinchinbrook
    { name: 'Quarrybrook Quarry', type: 'quarry', lat: -18.6076, lng: 146.2535, suburb: 'Cordelia', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '125 Quarry Road, Cordelia QLD 4850 (Off Cooks Lane). TMR Registered (RQ086). Jaycat Earthmoving Pty Ltd. Acid/Rhyolite Porphyry' },
    // Isaac
    { name: 'Daunia Quarry', type: 'quarry', lat: -22.0123, lng: 148.3319, suburb: '1566 Barada Barna Road Valkyrie', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '1566 Barada Barna Road Valkyrie QLD 4742. (Previously 2503 Annandale Road, Coppa. TMR Registered (RQ421). Moorvale Earthmoving Pty Ltd. Feldspar Porphyry' },
    { name: 'Huddys Sand Deposit (Isaac River)', type: 'quarry', lat: -22.0366, lng: 148.0801, suburb: 'Moranbah', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Grosvenor Downs, Moranbah QLD 4744 (Via Moranbah Access Road). TMR Registered (RQ553). Quarrico Products Pty Ltd. Medium to Coarse Grained Alluvial Quartz' },
    { name: 'Mals Plant Hire Pty Ltd', type: 'quarry', lat: -21.8295, lng: 147.9885, suburb: 'Isaac', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Red Hill Road, Moranbah  4744. TMR Registered (RQ176). Mals Plant Hire Pty Ltd. Medium to Coarse Grained Alluvial Quartz' },
    { name: 'May Downs Quarry', type: 'quarry', lat: -22.7171, lng: 149.1893, suburb: 'May Downs', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '1548 May Downs Road, May Downs QLD 4746. TMR Registered (RQ547). CNN Resources Pty Ltd. Hydrothermally Altered Trachyte & Andesi' },
    { name: 'Mazeppa Quarry', type: 'quarry', lat: -22.1689, lng: 147.2207, suburb: 'Frankfield', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '5998 Gregory Developmental Road, Frankfield QLD 4721 (Near Mazeppa Park). TMR Registered (RQ260). Quarries of Queensland Pty Ltd. Vein Quartz' },
    { name: 'Moranbah South Quarry', type: 'quarry', lat: -22.0305, lng: 148.1422, suburb: 'Moranbah', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '9566 Peak Downs Highway, Moranbah QLD 4744. TMR Registered (RQ154). Quarrico Products Pty Ltd. Silica Oversaturated Glassy Olivine Basa' },
    { name: 'Skyville Quarry', type: 'quarry', lat: -22.0305, lng: 148.1422, suburb: 'Moranbah', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '7905 Peak Downs Highway, Moranbah QLD 4744. TMR Registered (RQ488). Quarries of Queensland Pty Ltd. Silica Undersaturated Glassy Olivine Bas' },
    { name: 'Waitara (BRW) Quarry', type: 'quarry', lat: -21.7047, lng: 148.6985, suburb: 'Nebo', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '24 Braeside Road, Nebo QLD 4742. TMR Registered (RQ105). BRW Transport & Quarries Pty Ltd. Rhyolite' },
    { name: 'Waitara (Braeside) Quarry', type: 'quarry', lat: -21.7047, lng: 148.6985, suburb: 'Nebo', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Braeside Road, Nebo QLD 4742. TMR Registered (RQ093). W Wall & Sons. Rhyolite' },
    { name: 'Winchester Downs Sand Deposit (Isaac River)', type: 'quarry', lat: -22.1259, lng: 148.1150, suburb: 'Moranbah', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Winchester Downs, Moranbah QLD 4745 (Access via Winchester Access Road). TMR Registered (RQ554). Quarrico Products Pty Ltd. Mainly Medium to Coarse Grained Alluvial' },
    { name: 'Winchester Quarry', type: 'quarry', lat: -22.1259, lng: 148.1150, suburb: 'Moranbah', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Winchester Road, Moranbah QLD 4744. TMR Registered (RQ183). Quarrico Products Pty Ltd. Porphyritic Quartz microdiorite' },
    // Livingstone
    { name: 'The Caves Quarry QLD', type: 'quarry', lat: -23.1652, lng: 150.4406, suburb: 'The Caves', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Mt Charlton Road, The Caves QLD 4702. TMR Registered (RQ109). RC Contracting (QLD) Pty Ltd. Hornfelsed Volcanoclastic Metasiltstone' },
    // Livingstone
    { name: 'Holcim Nerimbera Quarry', type: 'quarry', lat: -23.3742, lng: 150.6021, suburb: 'Nerimbera', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '4 Arnold Drive, Nerimbera QLD 4701. TMR Registered (RQ478). Holcim Australia Pty Ltd. Indurated Volcanoclastic Meta-arenite / ' },
    { name: 'Schneider Sand and Stone', type: 'quarry', lat: -23.1331, lng: 150.3889, suburb: '333 Flood Road Yaamba', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '333 Flood Road Yaamba QLD 4704. TMR Registered (RQ502). Scott Schneider. Alluvial Sand' },
    // Longreach
    { name: 'Longreach Sand Quarry', type: 'quarry', lat: -23.2794, lng: 144.2555, suburb: 'Longreach', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '600 Cramsie-Muttaburra Road Longreach Qld 4730 (site access via a right hand tur. TMR Registered (RQ499). Champion Contracting Pty Ltd. Medium to Coarse Grained Quartzose Alluv' },
    // Mackay
    { name: 'Bussey (Palmyra) Quarry', type: 'quarry', lat: -21.2151, lng: 149.0750, suburb: 'Palmyra', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Boomerang Road, Palmyra QLD 4751. TMR Registered (RQ218). Summit Construction Materials Pty Ltd. Hornfelsed Carbonaceous Mudstone/ Siltst' },
    { name: 'Farleigh Quarry', type: 'quarry', lat: -21.0632, lng: 149.0810, suburb: 'Habana', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '398 Farleigh Habana Road, Habana QLD 4740. TMR Registered (RQ136). Heidelberg Materials Australia Pty Ltd. Meta-basalt / Meta-andesitic Porphyry an' },
    { name: 'Harris (Palmyra) Quarry', type: 'quarry', lat: -21.2060, lng: 149.0761, suburb: 'Palmyra', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '303 Bells Road, Palmyra QLD 4751. TMR Registered (RQ137). Summit Construction Materials Pty Ltd. Hornfelsed Volcanoclastic Arenite/Siltst' },
    { name: 'Kings (Barrie Lane) Quarry', type: 'quarry', lat: -21.2701, lng: 149.0457, suburb: 'Homebush', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '627 Barrie Lane, Homebush QLD 4740. TMR Registered (RQ264). Mobile Crushing Co Pty Ltd. Variably Metamorphosed Tuffaceous Volcan' },
    { name: 'Mt. Bassett Quarry', type: 'quarry', lat: -21.1158, lng: 149.2125, suburb: 'Mackay', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '22, Ron Searle Drive, Mackay QLD 4740. TMR Registered (RQ177). CJD Investments (NQ) Pty Ltd. Microdiorite and Andesite' },
    { name: 'Scriha Sand Site', type: 'quarry', lat: -21.1665, lng: 148.8238, suburb: 'Eungella Road Benholme', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '3084 Mackay-Eungella Road Benholme QLD 4754. TMR Registered (RQ581). Mobile Crushing Co Pty Ltd. Mainly Medium to Coarse Grained Quartzof' },
    // Maranoa
    { name: 'Maranoa River Sands', type: 'quarry', lat: -26.5066, lng: 147.9909, suburb: 'Mitchell', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 192, Mitchell Road, Mitchell QLD 4465. TMR Registered (RQ462). Roma Sands Pty Ltd. Mainly Medium to Coarse Alluvial Quartz ' },
    { name: 'Roma Quarry (Maranoa Regional Council)', type: 'quarry', lat: -26.3214, lng: 148.7531, suburb: 'Eumamurrin', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '3401 Carnarvon Highway, Eumamurrin QLD 4455. TMR Registered (RQ143). Maranoa Regional Council. Silica Undersaturated Glassy Olivine Bas' },
    { name: 'Warrians Quarry', type: 'quarry', lat: -26.4219, lng: 148.7904, suburb: 'Maranoa', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Roma-Taroom Road, Euthulla 4455. TMR Registered (RQ062). Corbet Quarries and Concrete Pty Ltd. Silica Oversaturated Glassy Basalt' },
    { name: 'Yuleba Creek Sand', type: 'quarry', lat: -26.4527, lng: 149.4367, suburb: 'Yuleba', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 43, Yuleba -Taroom Road, Yuleba QLD 4427. TMR Registered (RQ408). Roma Sands Pty Ltd. Fine to Coarse Grained Quartzofeldspathi' },
    // Mareeba
    { name: 'Biboohra Sands', type: 'quarry', lat: -16.9196, lng: 145.4077, suburb: 'Biboohra', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '225 Pickford Road, Biboohra QLD 4738. TMR Registered (RQ468). CQB Services Pty Ltd. Medium to Mainly Coarse Grained Quartzof' },
    { name: 'Mount Carbine Quarry', type: 'quarry', lat: -16.6517, lng: 145.2456, suburb: 'Mt Carbine', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '6888 Mulligan Highway, Mt Carbine QLD 4871. TMR Registered (RQ242). Owner - State Government of Queensland. Pelitic Hornfels' },
    { name: 'Narcotic Creek Sand Quarry', type: 'quarry', lat: -17.0758, lng: 145.3689, suburb: 'Mareeba', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '303 Narcotic Creek Road Mareeba Qld 4880. TMR Registered (RQ551). Conmat Pty Ltd. Fine to Coarse Grained Quartzose Alluvia' },
    { name: 'Tinaroo Creek Quarry', type: 'quarry', lat: -17.0167, lng: 145.4687, suburb: 'Mareeba', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '936 Tinaroo Creek Road, Mareeba QLD 4880. TMR Registered (RQ511). Conmat Pty Ltd. Granite' },
    { name: 'Top Rock Quarry', type: 'quarry', lat: -16.8240, lng: 145.6513, suburb: 'Lot 46 Kennedy Highway Kuranda', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 46 Kennedy Highway Kuranda QLD 4881. TMR Registered (RQ323). FGF Developments Pty Ltd. Metagreywacke with minor hornfelsed carb' },
    { name: 'Walsh River Quarry', type: 'quarry', lat: -17.1169, lng: 145.3046, suburb: 'Mareeba', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '450, Borzi Road, Mareeba QLD 4880. TMR Registered (RQ273). CQB Services Pty Ltd. Hornfelsed Metagreywacke /Hornfels' },
    // North Burnett
    { name: 'Baldwins Cattle Creek Coarse Sand', type: 'quarry', lat: -25.0292, lng: 150.8388, suburb: 'Rawbelle', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Old Rawbelle Road, Rawbelle QLD 4630. TMR Registered (RQ361). Baldwins and Sons Pty Ltd. Quartzofeldspathic and Lithic Mainly Med' },
    { name: 'Biggenden Quarry', type: 'quarry', lat: -25.5217, lng: 152.0049, suburb: 'Biggenden', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '446 Biggenden Mines Road, Biggenden QLD 4621. TMR Registered (RQ021). Gregory (Tom) McIntyre. Hornfelsed Calcsilicate Skarn' },
    { name: 'Coles Quarry', type: 'quarry', lat: -25.3587, lng: 152.0982, suburb: 'Dallarnil', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 178 & Lot 179 Mount Goonaneman Road, Dallarnil QLD 4621. TMR Registered (RQ419). Coles Quarry Supplies Pty Ltd. Hornfelsed Volcanoclastic Siltstone and ' },
    // Rockhampton
    { name: 'Coorooman Quarry', type: 'quarry', lat: -23.2999, lng: 150.6947, suburb: 'Coorooman', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '2816 Emu Park Road, Coorooman QLD 4702. TMR Registered (RQ531). Barlows Earthmoving Pty Ltd. Volcanoclastic Metasiltstone/Metasandsto' },
    { name: 'Kinka Beach Sand Pit', type: 'quarry', lat: -23.2242, lng: 150.7744, suburb: 'Tanby', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '230 Kinka Beach Road, Tanby QLD 4702. TMR Registered (RQ115). Barlows Earthmoving Pty Ltd. Fine to Medium Grained Quartz Reworked D' },
    { name: 'Malchi Quarry', type: 'quarry', lat: -23.4467, lng: 150.4047, suburb: 'Gracemere', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 3 Nine Mile Road, Gracemere QLD 4702 (5km off Capricorn Highway). TMR Registered (RQ589). Galilee Crushing & Civil Pty Ltd. Metagreywacke and metasiltstone' },
    { name: 'Marmor Quarry', type: 'quarry', lat: -23.6606, lng: 150.7197, suburb: 'Marmor', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '129 Bills Road, Marmor QLD 4702. TMR Registered (RQ140). Capricorn Quarries Pty Ltd. Meta-volcanoclastic Sandstone' },
    { name: 'Pink Lily Sands', type: 'quarry', lat: -23.3392, lng: 150.4654, suburb: 'Pink Lily', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '205 Pink Lily Road, Pink Lily QLD 4702. TMR Registered (RQ123). Heidelberg Materials Australia Pty Ltd. Mainly Medium to Coarse Quartzose and Li' },
    { name: 'Quarry at Midgee', type: 'quarry', lat: -23.5194, lng: 150.5512, suburb: 'Midgee', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '5943 Bruce Highway, Midgee QLD 4702. TMR Registered (RQ124). Hopkins Brothers Pty Ltd. Hornfelsed and Indurated Volcanoclastic ' },
    { name: 'Rockhampton Sands', type: 'quarry', lat: -23.4056, lng: 150.4482, suburb: 'Fairy Bower', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '250 Fogarty Road, Fairy Bower QLD 4702. TMR Registered (RQ510). Nine Mile Sands Pty Ltd T/A Rockhampton Sands. Fine to Coarse Grained Lithic and Quartz' },
    { name: 'Thirsty Creek Quarry', type: 'quarry', lat: -23.5943, lng: 150.0324, suburb: 'Gogango', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '802 Thirsty Creek Road, Gogango QLD 4702. TMR Registered (RQ591). Thomas Plant Hire. Heavily altered amygdaloidal basalt, bre' },
    // Southern Downs
    { name: 'Bolzan Sand Supplies (Allora)', type: 'quarry', lat: -28.0381, lng: 151.9645, suburb: 'Allora', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '1157 Dalrymple Creek Rd, Allora QLD 4362. TMR Registered (RQ108). Bolzan Pty Ltd. Fine to Coarse Quartzose Residual Sand S' },
    { name: 'Hutchison Quarries (Leslie Dam Quarry)', type: 'quarry', lat: -28.1935, lng: 151.9263, suburb: 'Leslie Dam', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '518 Pink Gum Lane, Leslie Dam QLD 4370 (Via Rabbit Road). TMR Registered (RQ060). Hutchison Quarries Pty Ltd. Hornfelsed Metasandstone & Metasiltstone' },
    { name: 'MRP Sand Quarry', type: 'quarry', lat: -28.0769, lng: 151.9263, suburb: 'Talgai', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '391 Hendon Victoria Hill Road, Talgai QLD 4362. TMR Registered (RQ534). Chevron Sands Pty Ltd Trading as MRP Sand Quarry. Fine to Coarse Quartzose Lithic Residual' },
    // Tablelands
    { name: 'Sole Resources - Mt. Garnet Alluvial Quarry', type: 'quarry', lat: -17.6722, lng: 145.1050, suburb: 'Mt Garnet', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '324 Nymbool Road, Mt Garnet QLD 4872. TMR Registered (RQ393). Sole Resources (Mt. Garnet) Pty Ltd. Metasandstone & Intermediate Tuff' },
    { name: 'Sole Resources - Mt. Garnet Hardrock Quarry', type: 'quarry', lat: -17.6722, lng: 145.1050, suburb: 'Mt Garnet', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '324 Nymbool Road, Mt Garnet QLD 4872. TMR Registered (RQ300). Sole Resources (Mt. Garnet) Pty Ltd. Andesite / Andesitic Tuff' },
    // Townsville
    { name: 'Adbri Cape Cleveland Sand Pit', type: 'quarry', lat: -19.3533, lng: 147.0493, suburb: 'Cape Cleveland', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '159 Meehan Road, Cape Cleveland QLD 4816. TMR Registered (RQ352). Hy-Tec Industries (Queensland) Pty Ltd. Quartzofeldspathic & Lithic Fine to Medi' },
    { name: 'Adbri Manton Road Quarry', type: 'quarry', lat: -19.6511, lng: 146.8201, suburb: 'Calcium', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Manton Road, Calcium QLD 4816. TMR Registered (RQ313). HY-Tec Industries (QLD) Pty Ltd. Partly Metamorphosed Limestone with subo' },
    { name: 'Boral Roseneath Quarry', type: 'quarry', lat: -19.3483, lng: 146.8354, suburb: 'Roseneath', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '720 Stuart Drive, Roseneath QLD 4816. TMR Registered (RQ190). Boral Resources (QLD) Pty Ltd. Rhyodacitic Acid Tuff with subordinate R' },
    { name: 'Brookhill Quarry', type: 'quarry', lat: -19.3794, lng: 146.8333, suburb: 'Brookhill', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '1-3 Pats Road, Brookhill QLD 4816. TMR Registered (RQ133). Stradacon Penna Pty Ltd. Porphyritic Rhyolite with minor Quartz L' },
    { name: 'CAMM Roseneath Quarry', type: 'quarry', lat: -19.3761, lng: 146.8294, suburb: 'Roseneath', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '36 Curley Circuit, Roseneath QLD 4811. TMR Registered (RQ480). CAMM Quarries Pty Ltd. Rhyodacitic Acid Tuff with Rhyolite/Micr' },
    { name: 'Cape Fine Sands (CFS)', type: 'quarry', lat: -19.3629, lng: 147.0386, suburb: 'Cape Cleveland', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '159 Carty Road, Cape Cleveland QLD 4810. TMR Registered (RQ294). Bedrock Landscape Suppliers Townsville Pty Ltd. Mainly Fine to Medium Quartzofeldspathic' },
    { name: 'Cungulla Fine Sand', type: 'quarry', lat: -19.3629, lng: 147.0386, suburb: 'Cape Cleveland', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Carty Road, Cape Cleveland QLD 4810 (Off Goodsell Road). TMR Registered (RQ027). Hanson Construction Materials Pty Ltd. Mainly Fine to Medium Quartzofeldspathic' },
    { name: 'Holcim Cleveland Sands', type: 'quarry', lat: -19.2687, lng: 147.0556, suburb: 'Cape Cleveland', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Cape Cleveland Road, Cape Cleveland QLD 4810. TMR Registered (RQ069). Holcim Australia Pty Ltd. Quartzofeldspathic and Lithic Fine Grain' },
    // Western Downs
    { name: 'Bell Quarry', type: 'quarry', lat: -26.8131, lng: 151.4400, suburb: '5750 Bunya Highway Cooranga', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '5750 Bunya Highway Cooranga QLD 4408. TMR Registered (RQ578). Kingaroy Quarry Supplies Pty Ltd. Olivine Basalt' },
    { name: 'Gulera Road Pit', type: 'quarry', lat: -27.2001, lng: 150.9517, suburb: 'Western Downs', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '234 Gulera Road, Kumbarilla, QLD 4405. TMR Registered (RQ545). Tierney Crushing & Transport Pty Ltd. Sandstone, Siltstone, Mudstone with Part' },
    { name: 'Hustons Road Quarry', type: 'quarry', lat: -27.0709, lng: 151.2553, suburb: 'Pirrinuan', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 290 Hustons Road, Pirrinuan QLD 4405. TMR Registered (RQ101). RSA Construction Materials Pty Ltd. Silica Oversaturated Glassy Basalt' },
    { name: 'Jimbour Quarry (Western Downs Regional Council)', type: 'quarry', lat: -26.9669, lng: 151.2629, suburb: 'Jimbour', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '666 Jimbour Station Road, Jimbour QLD 4406. TMR Registered (RQ151). Western Downs Regional Council. Silica Undersaturated Glassy Olivine Bas' },
    // Whitsunday
    { name: 'Abbot Point Quarry', type: 'quarry', lat: -19.9015, lng: 148.0818, suburb: 'Abbot Point', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Abbot Point Road, Abbot Point QLD 4805. TMR Registered (RQ163). L D & L J Hillery Pty Ltd T/A Hillery Group. Microgabbro/Dolerite with minor Micro-Mo' },
    { name: 'Gordons Quarry Bowen', type: 'quarry', lat: -20.2447, lng: 147.9615, suburb: 'Bowen', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '2204, Bowen Developmental Road, Bowen QLD 4804. TMR Registered (RQ085). L D & L J Hillery Pty Ltd T/A Hillery Group. Micro-granodiorite / Microgranite with m' },
    { name: 'North Gregory Quarry', type: 'quarry', lat: -20.2896, lng: 148.5760, suburb: 'Gregory River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 78 & Lot 313, Patullo Road, Gregory River QLD 4800. TMR Registered (RQ206). L D & L J Hillery Pty Ltd. Porphyritic Andesite' },
    { name: 'Umina Quarry', type: 'quarry', lat: -20.5268, lng: 147.8253, suburb: 'Collinsville', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '7430 Bowen Developmental Road, Collinsville QLD 4804. TMR Registered (RQ213). L D & L J Hillery Pty Ltd T/A Hillery Group. Altered Porphyritic Trachyandesite' },
    { name: 'West Euri Creek (BQC) Quarry', type: 'quarry', lat: -20.0262, lng: 148.1198, suburb: 'Bowen', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '500 West Euri Road, Bowen QLD 4805. TMR Registered (RQ050). BQC Quarries Pty Ltd. Granodiorite/Tonalite and Rhyolite with ' },
    { name: 'Whitsunday Quarry', type: 'quarry', lat: -20.3465, lng: 148.6267, suburb: 'Mt Marlow', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '824 Shute-Harbour Rd, Mt Marlow QLD 4800. TMR Registered (RQ121). L D & L J Hillery Pty Ltd. Altered Andesitic Ash Tuff and minor Pyr' },
    // ===== QLD-WIDE QUARRIES — UNVERIFIED LOCATION (suburb-level accuracy) =====
    // Banana
    { name: 'Westwood Quarry', type: 'quarry', lat: -23.9074, lng: 150.1953, suburb: 'Westwood', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Corner Capricorn Highway & Leichardt Highway, Westwood QLD 4702. TMR Registered (RQ067). Regional Quarries Australia Pty Ltd. Altered Silica Undersaturated Glassy Bas. Location unverified — suburb-level accuracy' },
    // Barcoo
    { name: 'Stonehenge Quarry', type: 'quarry', lat: -24.2205, lng: 142.4842, suburb: 'Stonehenge', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Hillview Park, Thomson Developmental Road, Stonehenge QLD 4730. TMR Registered (RQ453). Champion Contracting Pty Ltd. Ferruginised Silcrete. Location unverified — suburb-level accuracy' },
    // Boulia
    { name: 'Burke River Sand Deposit', type: 'quarry', lat: -22.2808, lng: 138.7441, suburb: 'Boulia', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Burke River, Winton-Boulia Road, Boulia QLD 4829. TMR Registered (RQ520). PE & GC Harris Road Contractors Pty Ltd. Mainly Medium to Coarse Grained Quartzos. Location unverified — suburb-level accuracy' },
    { name: 'Granton (Boulia) Quarry', type: 'quarry', lat: -22.2808, lng: 138.7441, suburb: 'Boulia', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Granton Station, Winton-Boulia Road, Boulia QLD 4829 (54km east of Boulia). TMR Registered (RQ518). PE & GC Harris Road Contractors Pty Ltd. Micritic Limestone. Location unverified — suburb-level accuracy' },
    // Bundaberg
    { name: 'Mailmans Quarry', type: 'quarry', lat: -24.8436, lng: 151.9094, suburb: 'Monduran', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '210 Mailmans Road via Monduran Road, Monduran QLD 4671. TMR Registered (RQ310). Berajondo Earthmoving and Haulage Pty Ltd trading as Berajon. Andesitic Tuff / Andesitic Agglomerate. Location unverified — suburb-level accuracy' },
    { name: 'Whymere Sands (Extraction Area D)', type: 'quarry', lat: -24.7915, lng: 152.3598, suburb: 'Fairymead', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Hills Road, off Fairydale Road, Fairymead QLD 4670. TMR Registered (RQ319). McBrides Sands. Fine to Medium Grained Quartzofeldspathi. Location unverified — suburb-level accuracy' },
    // Burdekin
    { name: 'BQC Sands Pty Ltd', type: 'quarry', lat: -19.6201, lng: 147.3982, suburb: 'McDesme', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Bed of Burdekin River, 5-11 Mackenzie Street, Off Old Ayr-Home Hill Road, McDesm. TMR Registered (RQ082). BQC Sands Pty Ltd. Mainly Medium to Coarse Quartzofeldspath. Location unverified — suburb-level accuracy' },
    { name: 'Haughton River Sand (Burdekin Transport Services)', type: 'quarry', lat: -19.3201, lng: 146.7237, suburb: 'Burdekin', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Bed of Haughton River, off Coach road, Adjacent to 1004 Upper Haughton Road, Upp. TMR Registered (RQ501). Burdekin Transport Services Pty Ltd. Medium to Coarse Lithic-Quartzose Alluvi. Location unverified — suburb-level accuracy' },
    { name: 'Haughton River Sand Deposit (McCahill)', type: 'quarry', lat: -19.4811, lng: 147.1342, suburb: 'Giru', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Corner of Poletti Road & Upper Haughton Road, Giru QLD 4809. TMR Registered (RQ489). Greg McCahill Earthworks & Haulage Pty Ltd operating as Bulk. Medium to Coarse Quartzose Feldspathic a. Location unverified — suburb-level accuracy' },
    { name: 'Haughton River Sand Pit (Barro Group)', type: 'quarry', lat: -19.4811, lng: 147.1342, suburb: 'Giru', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Bahrs Road, Giru QLD 4809. TMR Registered (RQ270). Barro Group Pty Ltd. Medium to Coarse Quartzose Feldspathic a. Location unverified — suburb-level accuracy' },
    { name: 'Inkerman Fine Sand Quarry', type: 'quarry', lat: -19.5759, lng: 147.4054, suburb: 'Burdekin', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '226 Gladys Road, Grouper Creek, QLD 4806. TMR Registered (RQ482). Humphries Pty Ltd. Mainly Fine to Medium Quartzofeldspathic. Location unverified — suburb-level accuracy' },
    { name: 'The Rocks (BQC) Quarry', type: 'quarry', lat: -19.5759, lng: 147.4054, suburb: 'Ayr', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '1464 Ayr Dalbeg Road, Ayr QLD 4807 (via Mona Park). TMR Registered (RQ046). BQC Quarries Pty Ltd. Granite. Location unverified — suburb-level accuracy' },
    // Burke
    { name: 'Brumby Quarry', type: 'quarry', lat: -23.0858, lng: 148.0232, suburb: 'Gregory', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Wills Development Road, Gregory QLD 4830 (26km west from Gregory Township). TMR Registered (RQ239). QCrush Pty Ltd. Partially Duricrustic Ferruginous and Si. Location unverified — suburb-level accuracy' },
    // Cairns
    { name: 'PNQ Edmonton Quarry', type: 'quarry', lat: -17.0201, lng: 145.7445, suburb: 'Edmonton', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Hussey Road, Edmonton QLD 4869. TMR Registered (RQ029). Pioneer North Queensland Pty Ltd. Metagreywacke and Carbonaceous Meta-Silt. Location unverified — suburb-level accuracy' },
    // Carpentaria
    { name: 'Shady Lagoon Quarry', type: 'quarry', lat: -17.6694, lng: 141.0794, suburb: 'Carpentaria', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Access via an unsealed road via Gulf Development Road, Normanton, QLD 4890. TMR Registered (RQ304). Wells Plant Hire Pty Ltd. Indurated Ferruginous Silcrete. Location unverified — suburb-level accuracy' },
    { name: 'Smithburne River Sand Quarry', type: 'quarry', lat: -17.0587, lng: 141.2802, suburb: 'Howitt', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 221, Lotusvale Station, Lotus Vale - Stirling Road, Howitt QLD 4890. TMR Registered (RQ560). Wells Plant Hire Pty Ltd. Mainly Medium to Coarse Quartzofeldspath. Location unverified — suburb-level accuracy' },
    // Cassowary Coast
    { name: 'Bonassi Tully River Sand (Ikes Sand Deposit)', type: 'quarry', lat: -17.9848, lng: 146.0109, suburb: 'Lower Tully', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Tully Hull Road, Lower Tully QLD 4854. TMR Registered (RQ538). FA & J Bonassi Farming Pty Ltd. Medium to Coarse Grained Quartzose and L. Location unverified — suburb-level accuracy' },
    { name: 'Bonassis Bilyana Quarry', type: 'quarry', lat: -18.1210, lng: 145.7914, suburb: 'Murray Upper', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lauder Road, Off Middle Murray Road, Off Upper Murray Road, Murray Upper QLD 485. TMR Registered (RQ187). FA & J Bonassi Farming Pty Ltd. Porphyritic Rhyodacite with minor Doleri. Location unverified — suburb-level accuracy' },
    { name: 'PNQ Innisfail Quarry', type: 'quarry', lat: -17.5240, lng: 146.0312, suburb: 'Innisfail', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '6 Coorumba Road, Off Palmerston Highway, Innisfail QLD 4860. TMR Registered (RQ043). Pioneer North Queensland Pty Ltd. Silica Undersaturated Glassy Olivine Bas. Location unverified — suburb-level accuracy' },
    { name: 'Shamrock Quarry (Tully)', type: 'quarry', lat: -17.9153, lng: 145.9763, suburb: 'Merryburn', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '19 Lloyd Bell Road, off Tully-Beach Rd (via South Mission Beach Road), Merryburn. TMR Registered (RQ087). Shamrock Quarry. Granite [Adamellite/Monzogranite]. Location unverified — suburb-level accuracy' },
    // Central Highlands
    { name: 'Central Highlands Quarry', type: 'quarry', lat: -23.4190, lng: 147.6982, suburb: 'Rubyvale', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Off Rubyvale - Sapphire Road (Old Quarry Road), Rubyvale QLD 4702. TMR Registered (RQ399). Crystal Mining Pty Ltd. Fine to coarse quartzose and lithic allu. Location unverified — suburb-level accuracy' },
    { name: 'Red Rock Quarry', type: 'quarry', lat: -23.6675, lng: 148.5302, suburb: 'Comet', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '2403 Blackwater Rolleston Road, Comet QLD 4702. TMR Registered (RQ208). Blackwater Quarries Pty Ltd. Silica Oversaturated Glassy Olivine Basa. Location unverified — suburb-level accuracy' },
    { name: 'Salmons Quarry', type: 'quarry', lat: -23.4190, lng: 147.6982, suburb: 'Rubyvale', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Poinsetta, Quarry Road, Off Rubyvale - Sapphire Road, Rubyvale QLD 4702. TMR Registered (RQ400). Gavin Salmon – Salmon’s Quarry and Mining Pty Ltd. Fine to Coarse Quartz Sand. Location unverified — suburb-level accuracy' },
    { name: 'Shepton Quarry', type: 'quarry', lat: -23.0858, lng: 148.0232, suburb: 'Capella', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '3/1143 Montrose Road, Capella QLD 4723. TMR Registered (RQ125). Wagners Quarries Pty Ltd. Silica Undersaturated Glassy Olivine Bas. Location unverified — suburb-level accuracy' },
    { name: 'Wallaby Hill Quarry (Springsure)', type: 'quarry', lat: -24.0862, lng: 148.0775, suburb: 'Springsure', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '2380 Dawson Development Road, Springsure QLD 4722 (Access along Cona Creek Schoo. TMR Registered (RQ378). Krit Co Pty Ltd t/a Lanes Land Developments. Olivine Basalt. Location unverified — suburb-level accuracy' },
    // Charters Towers
    { name: 'Sellheim Sand Plant', type: 'quarry', lat: -20.0692, lng: 146.2616, suburb: 'Sellheim', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Corner of Flinders Highway & Archers Road, Sellheim QLD 4820. TMR Registered (RQ360). Bulk Sand and Natural Aggregates (BSNA). Medium to Coarse Quartzose Feldspathic a. Location unverified — suburb-level accuracy' },
    // Cloncurry
    { name: 'Cloncurry River Sand & Gravel Operation', type: 'quarry', lat: -20.7054, lng: 140.5056, suburb: 'Cloncurry', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Burke Development Road, Cloncurry QLD 4824. TMR Registered (RQ225). Lawlor Contracting Pty Ltd. Alluvial Sand and Gravel. Location unverified — suburb-level accuracy' },
    { name: 'Leichhardt River Quarry', type: 'quarry', lat: -20.7054, lng: 140.5056, suburb: 'Cloncurry', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Coolullah Station, Kajabii, Off Burke Development Road, QLD 4824. TMR Registered (RQ238). Lawlor Contracting Pty Ltd. Alluvial Sand and Gravel. Location unverified — suburb-level accuracy' },
    { name: 'Mindie Alluvial Gravel Quarry', type: 'quarry', lat: -20.7054, lng: 140.5056, suburb: 'Cloncurry', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'The bed of Cloncurry River, Mindie Station, Zingarie Road, Cloncurry QLD 4824. TMR Registered (RQ544). Lawlor Contracting Pty Ltd. Alluvial Sand and Gravel. Location unverified — suburb-level accuracy' },
    { name: 'Mindie Hard Rock Quarry', type: 'quarry', lat: -20.7054, lng: 140.5056, suburb: 'Cloncurry', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Mindie Station, Zingarie Road, Cloncurry QLD 4824. TMR Registered (RQ414). Lawlor Contracting Pty Ltd. Granite. Location unverified — suburb-level accuracy' },
    // Croydon
    { name: 'Belmore Creek Gravel Pit', type: 'quarry', lat: -18.1226, lng: 142.3007, suburb: 'Croydon', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Access via Belmore Road, adjacent to Gulf Developmental Road, Croydon QLD 4871. TMR Registered (RQ303). Wells Plant Hire Pty Ltd. Alluvial Gravel and Cobbles Derived Pred. Location unverified — suburb-level accuracy' },
    { name: 'Jubilee Quarry', type: 'quarry', lat: -18.1226, lng: 142.3007, suburb: 'Croydon', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Clothilda Road, Off Gulf Development Road, Croydon QLD 4871. TMR Registered (RQ034). Bolwarra Enterprises Pty Ltd. Rhyolite. Location unverified — suburb-level accuracy' },
    // Douglas
    { name: 'Mossman Quarry', type: 'quarry', lat: -16.4595, lng: 145.3735, suburb: 'Mossman', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Mountain View Drive, Mossman QLD 4873. TMR Registered (RQ252). Mossman Quarry Pty Ltd. Metagreywacke. Location unverified — suburb-level accuracy' },
    // Etheridge
    { name: 'Routh Quarry', type: 'quarry', lat: -18.2898, lng: 143.5477, suburb: 'Georgetown', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Routh Creek Station, Lot 5277 Gulf Development Road, Georgetown QLD 4871. TMR Registered (RQ266). Bolwarra Enterprises Pty Ltd. Rhyodacite. Location unverified — suburb-level accuracy' },
    // Flinders
    { name: 'Barabon Quarry', type: 'quarry', lat: -20.7291, lng: 143.1417, suburb: 'Richmond', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Barabon Road, Richmond QLD 4821. TMR Registered (RQ241). Gromac Quarries (NQ) Pty Ltd. Olivine Basalt. Location unverified — suburb-level accuracy' },
    // Fraser Coast
    { name: 'Bay City Sand and Stone Pty Ltd', type: 'quarry', lat: -25.5249, lng: 152.6995, suburb: 'Maryborough', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '23 Janet Road, Maryborough QLD 4650. TMR Registered (RQ088). Bay City Sand and Stone Pty Ltd. Mainly Medium to Coarse Quartzofeldspath. Location unverified — suburb-level accuracy' },
    { name: 'Takura Quarry (Byrne Bros Quarries Pty Ltd)', type: 'quarry', lat: -25.3041, lng: 152.7127, suburb: 'Takura', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Cork Road, Off Hornes Road, Takura QLD 4650. TMR Registered (RQ144). Byrne Bros Quarries Pty Ltd. Olivine Basalt. Location unverified — suburb-level accuracy' },
    // Gladstone
    { name: 'Calliope Pit', type: 'quarry', lat: -24.0066, lng: 151.2005, suburb: 'Calliope', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Carrara Road, Calliope QLD 4680 (approximately 8km northwest of Calliope). TMR Registered (RQ392). Grycan Pty Ltd, T/A Blomfield Excavations. Mainly Medium to Coarse Quartzofeldspath. Location unverified — suburb-level accuracy' },
    { name: 'Regional Quarries Australia – Gladstone Quarry', type: 'quarry', lat: -23.8118, lng: 151.1427, suburb: 'Yarwun', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '94 Quarry Road, Yarwun QLD 4694. TMR Registered (RQ184). Regional Quarries Australia Pty Ltd. Hornfelsed Volcanoclastic Siltstone/Sand. Location unverified — suburb-level accuracy' },
    { name: 'Silica Road Pit', type: 'quarry', lat: -24.0039, lng: 151.3310, suburb: 'Benaraby', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Silica Road, via Bruce Highway, Benaraby QLD 4680. TMR Registered (RQ377). Grycan Pty Ltd, T/A Blomfield Excavations. Medium to Mainly Coarse Lithic and Quart. Location unverified — suburb-level accuracy' },
    { name: 'Yarwun Quarries', type: 'quarry', lat: -23.8118, lng: 151.1427, suburb: 'Yarwun', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 31, Off Guerassimoff Road, Yarwun QLD 4694. TMR Registered (RQ162). Butlers Yarwun Quarries Pty Ltd. Hornfelsed Volcanoclastic Sandstone and . Location unverified — suburb-level accuracy' },
    // Goondiwindi
    { name: 'Bengalla Sand Quarry', type: 'quarry', lat: -28.5379, lng: 150.6667, suburb: 'Yelarbon', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Bengalla, Kildonan Yelarbon Road, Yelarbon QLD 4388. TMR Registered (RQ584). Johnstone Concrete and Quarries Pty Ltd. Quartzofeldspathic and Lithic Medium to . Location unverified — suburb-level accuracy' },
    // Gympie
    { name: 'Adbri Goomeri Quarry', type: 'quarry', lat: -26.1825, lng: 152.0695, suburb: 'Goomeri', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Adjacent to the Burnett Highway at CH51.86Km, Goomeri QLD 4601. TMR Registered (RQ171). HY-Tec Industries (Queensland) Pty Ltd. Silica Undersaturated Glassy Andesitic l. Location unverified — suburb-level accuracy' },
    { name: 'Adbri Scotchy Pocket Quarry', type: 'quarry', lat: -26.0722, lng: 152.5988, suburb: 'Curra', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lindleys Lane, Off Bruce Highway, Curra QLD 4570. TMR Registered (RQ365). HY-Tec Industries (Queensland) Pty Ltd. Andesite Porphyry. Location unverified — suburb-level accuracy' },
    { name: 'Boral Moy Pocket Quarry', type: 'quarry', lat: -26.5953, lng: 152.7276, suburb: 'Kenilworth', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '720 Moy Pocket Road, Kenilworth QLD 4574. TMR Registered (RQ037). Boral Resources (Qld) Pty Ltd. Latite porphyry. Location unverified — suburb-level accuracy' },
    { name: 'Buckley Concrete Recycling Site', type: 'quarry', lat: -26.2173, lng: 152.6503, suburb: 'Gympie', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '5 Buckley Drive, Gympie QLD 4570. TMR Registered (RQ541). Buckley Concrete Recycling Pty Ltd. Recycled Material. Location unverified — suburb-level accuracy' },
    { name: 'Traveston (Corbet) Quarry', type: 'quarry', lat: -26.3234, lng: 152.7609, suburb: 'Traveston', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '1944, Corner of Mary Valley Link Road and the Old Bruce Highway, Traveston QLD 4. TMR Registered (RQ459). Corbet Quarries and Concrete Pty Ltd. Brecciated and Altered Metabasalt. Location unverified — suburb-level accuracy' },
    // Hinchinbrook
    { name: 'Herbert River (Spina) Sand Pit', type: 'quarry', lat: -18.4389, lng: 145.9241, suburb: 'Abergowrie', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Access via Ingham-Abergowrie Road, Abergowrie QLD 4850. TMR Registered (RQ126). Zanghi Earthmoving Pty Ltd for Holcim (Australia) Pty Ltd. Mainly Medium to Coarse Grained Quartzof. Location unverified — suburb-level accuracy' },
    { name: 'Mortons Quarry', type: 'quarry', lat: -18.6132, lng: 145.9621, suburb: 'Lannercost', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Woolleys Road, Lannercost QLD 4850. TMR Registered (RQ463). Mortons Earthmoving Pty Ltd. Granite with minor andesite & microdiori. Location unverified — suburb-level accuracy' },
    // Isaac
    { name: 'Grosvenor Quarry', type: 'quarry', lat: -22.0012, lng: 148.0455, suburb: 'Moranbah', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Off Moranbah Access Road, Moranbah QLD 4744. TMR Registered (RQ202). Quarrico Products Pty Ltd. Silica Oversaturated Glassy Olivine Basa. Location unverified — suburb-level accuracy' },
    { name: 'Harrybrandt Sand Quarry', type: 'quarry', lat: -21.6888, lng: 148.6882, suburb: 'Nebo', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Harrybrandt Creek, Off Fitzroy Development Road, Nebo QLD 4742. TMR Registered (RQ438). Glenn Howell - HB Contractors Pty Ltd. Fine to Mainly Medium Quartzose Alluvial. Location unverified — suburb-level accuracy' },
    { name: 'Luxor Quarry', type: 'quarry', lat: -22.5265, lng: 148.3173, suburb: 'Dysart', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Near Saraji Coal Mine, Off 2251 Saraji Station Road (24km North of Dysart), Dysa. TMR Registered (RQ412). Regional Quarries Australia Pty Ltd. Silica Oversaturated Glassy Olivine Basa. Location unverified — suburb-level accuracy' },
    // Livingstone
    { name: 'Kunwarara Quarry', type: 'quarry', lat: -23.0134, lng: 150.1021, suburb: 'Canoona', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Kunwarara Road, Canoona QLD 4702 (4.4km south of the Stanage Bay Road of Bruce H. TMR Registered (RQ530). Grycan Pty Ltd, T/A Blomfield Excavations. Hydrothermally Altered Amphibolite & Qua. Location unverified — suburb-level accuracy' },
    { name: 'Marlborough Quarry', type: 'quarry', lat: -22.8134, lng: 149.8895, suburb: 'Marlborough', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '“Woodstock Station”, 1668 Marlborough Road, Marlborough QLD 4705. TMR Registered (RQ425). RC Contracting (QLD) Pty Ltd. Greenstone. Location unverified — suburb-level accuracy' },
    // Mackay
    { name: 'Bakers Creek Fine Sand', type: 'quarry', lat: -21.1416, lng: 149.1868, suburb: 'Mackay', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Off Connors Rd, Bakers Creek, QLD 4740. TMR Registered (RQ185). Johnny Farming Company. Fine Grained Quartzofeldspathic & Lithic. Location unverified — suburb-level accuracy' },
    { name: 'Boral Cedars Quarry', type: 'quarry', lat: -21.6089, lng: 149.2464, suburb: 'Mackay', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Woodwards Road, Off Holts Road, Mackay QLD 4502. TMR Registered (RQ110). Boral Resources (QLD) Pty Ltd. Microdiorite/Andesite and Granodiorite w. Location unverified — suburb-level accuracy' },
    { name: 'Cullen Island - Ron Camm Sand', type: 'quarry', lat: -21.1528, lng: 149.1655, suburb: 'West Mackay', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Access via Hume Street, West Mackay QLD 4740. TMR Registered (RQ215). Mobile Crushing Co. Pty. Ltd T/A Mackay Sand and Gravel Sale. Quartzofeldspathic and Lithic Medium to . Location unverified — suburb-level accuracy' },
    { name: 'Hewitts Pit', type: 'quarry', lat: -21.3198, lng: 148.8331, suburb: 'Pinevale', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'The bank of the Pioneer River, via Mia Mia Connection Road, QLD, Pinevale QLD 47. TMR Registered (RQ114). Mobile Crushing Co. Pty Ltd. Mainly Medium to Coarse Feldspathic Quar. Location unverified — suburb-level accuracy' },
    { name: 'Holcim Alligator Creek Sand Deposit', type: 'quarry', lat: -21.4221, lng: 149.2167, suburb: 'Sarina', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Off Bruce Highway, Sarina QLD 4737 (Approximately 20km South of Mackay). TMR Registered (RQ216). Holcim (Australia) Pty Ltd. Mainly Fine Grained Quartzofeldspathic a. Location unverified — suburb-level accuracy' },
    { name: 'Mackay Harbour Board Reserve 483', type: 'quarry', lat: -21.1164, lng: 149.2123, suburb: 'Mackay Harbour', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Off Edmund Casey Drive, Mackay Harbour QLD 4740. TMR Registered (RQ103). C & J C Camilleri. Medium Grained Quartzofeldspathic and Li. Location unverified — suburb-level accuracy' },
    { name: 'Mt. Chelona Quarry (Parklands Blue Metal)', type: 'quarry', lat: -21.4221, lng: 149.2167, suburb: 'Sarina', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '125 Malins Road, Sarina QLD 4737. TMR Registered (RQ432). Parklands Blue Metal Pty Ltd. Tonalite/Granite/Monzogranite with Minor. Location unverified — suburb-level accuracy' },
    { name: 'North Wall Dunes', type: 'quarry', lat: -21.1164, lng: 149.2123, suburb: 'Mackay Harbour', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Spiller Avenue via Edmond Casey Drive, Mackay Harbour  QLD 4740. TMR Registered (RQ223). Mackay Sand & Gravel Sales. Fine to Mainly Medium Grained Quartzofel. Location unverified — suburb-level accuracy' },
    { name: 'Pinevale Sand Pit', type: 'quarry', lat: -21.3198, lng: 148.8331, suburb: 'Pinevale', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Access via Pinevale Road, Pinevale QLD 4745. TMR Registered (RQ158). C & J C Camilleri. Mainly Medium to Coarse Quartzofeldspath. Location unverified — suburb-level accuracy' },
    { name: 'R. Watt Road Site', type: 'quarry', lat: -21.1609, lng: 148.8069, suburb: 'Benholme', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'The bank of the Cattle Creek, 174 Watts Road, Benholme QLD 4754. TMR Registered (RQ127). Mobile Crushing Co. Pty Ltd. Medium to Coarse Feldspathic Quartzose a. Location unverified — suburb-level accuracy' },
    // Maranoa
    { name: 'Blyth Creek Sand (The Bend)', type: 'quarry', lat: -26.5746, lng: 148.7935, suburb: 'Roma', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'The Bend Road, off Blythdale Road, Roma QLD 4455. TMR Registered (RQ404). Roma Sands Pty Ltd. Fine to Mainly Medium Grained Quartzofel. Location unverified — suburb-level accuracy' },
    // Mareeba
    { name: 'Emu Creek Sand Quarry', type: 'quarry', lat: -16.9921, lng: 145.4219, suburb: 'Mareeba', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'ML20663 Tinaroo Creek Road, Mareeba QLD 4880. TMR Registered (RQ550). Conmat Pty Ltd. Medium to Mainly Coarse Grained Quartzof. Location unverified — suburb-level accuracy' },
    { name: 'PNQ Dimbulah Sands', type: 'quarry', lat: -17.2030, lng: 145.0518, suburb: 'Dimbulah', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Leafgold Wier Road, Dimbulah QLD 4872. TMR Registered (RQ574). Pioneer North Queensland Pty Ltd. Fine to Mainly Medium Grained Quartz San. Location unverified — suburb-level accuracy' },
    // Mount Isa
    { name: 'Bluff Quarry', type: 'quarry', lat: -20.7290, lng: 139.4932, suburb: 'Mount Isa', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Adjacent to Leichhardt River Road/ Lake Moondarra Drive, Mount Isa QLD 4825. TMR Registered (RQ472). Qcrush Pty Ltd. Metasandstone/Quartzite with minor metas. Location unverified — suburb-level accuracy' },
    // Murweh
    { name: 'Lesdale Quarry', type: 'quarry', lat: -26.3811, lng: 146.7729, suburb: 'Sommariva', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lesdale 69450 Warrego Highway, Sommariva QLD 4470 (via Charleville). TMR Registered (RQ276). Tickell Grazing Pty Ltd ATF the Tickell Family Trust. Ferruginous and Silicified Sandstone. Location unverified — suburb-level accuracy' },
    // North Burnett
    { name: 'Burnett River Sand', type: 'quarry', lat: -25.6260, lng: 151.6109, suburb: 'Gayndah', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Located in bed  off Burnett River, Lot 64 Richards Rd, Gayndah QLD 4625. TMR Registered (RQ230). Coeur D’Alene Pty Ltd and Calbeninka Pty Ltd T/A Boodles Co. Medium to Coarse Grained Quartzofeldspat. Location unverified — suburb-level accuracy' },
    { name: 'Moonford Quarry', type: 'quarry', lat: -24.8647, lng: 151.1235, suburb: 'Monto', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '1364 Youlambi Road, Monto QLD 4630. TMR Registered (RQ232). Baldwins Sand Gravel & Concrete Pty Ltd. Silica Oversaturated Glassy Olivine Basa. Location unverified — suburb-level accuracy' },
    // Rockhampton
    { name: 'Nine Mile Quarry', type: 'quarry', lat: -23.3500, lng: 150.4617, suburb: 'Pink Lily', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Corner Forgarty road & Nile Mile Road, Pink Lily QLD 4702. TMR Registered (RQ326). Heidelberg Materials Australia Pty Ltd. Fine to Medium Grained Quartzose and Lit. Location unverified — suburb-level accuracy' },
    { name: 'Peak Hill Quarry', type: 'quarry', lat: -23.3698, lng: 150.5068, suburb: 'North Rockhampton', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '184 Rockhampton-Yeppoon Road, North Rockhampton QLD 4701. TMR Registered (RQ122). Vynque Pty Ltd. Diorite Porphyry and Rhyodacitic Tuff. Location unverified — suburb-level accuracy' },
    { name: 'Stanwell Quarry', type: 'quarry', lat: -23.5300, lng: 150.3180, suburb: 'Stanwell', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Access from Capricorn Highway, via Power Plant Road, Stanwell QLD 4702.. TMR Registered (RQ160). Regional Group Australia (RGA) Pty Ltd. Quartz Microdiorite / Quartz Diorite. Location unverified — suburb-level accuracy' },
    // South Burnett
    { name: 'Gordonbrook Sand Quarry', type: 'quarry', lat: -26.4554, lng: 151.6995, suburb: 'Gordonbrook', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Wilson Road, Gordonbrook QLD 4610. TMR Registered (RQ476). Second Chance (AUST) Pty Ltd T/A Mick Johnson Haulage. Fine to Coarse Quartzofeldspathic Alluvi. Location unverified — suburb-level accuracy' },
    { name: 'Hodgleigh Quarry (South Burnett Quarries)', type: 'quarry', lat: -26.6066, lng: 151.9385, suburb: 'Hodgleigh', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '22 Hodgleigh North Road, Hodgleigh QLD 4615. TMR Registered (RQ100). South Burnett Quarries Pty Ltd. Hornfels and Quartzite. Location unverified — suburb-level accuracy' },
    { name: 'Wondai (Corbet) Quarry', type: 'quarry', lat: -26.3430, lng: 151.5094, suburb: 'Ballogie', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '12653 Wondai - Chinchilla Rd, Ballogie QLD 4610. TMR Registered (RQ030). Corbet Quarries and Concrete Pty Ltd. Silica Undersaturated Glassy Olivine Bas. Location unverified — suburb-level accuracy' },
    // Southern Downs
    { name: 'Braeside Quarry', type: 'quarry', lat: -28.4014, lng: 151.9059, suburb: 'Braeside', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '21229 New England Highway, Braeside QLD 4370. TMR Registered (RQ150). Australian Crushing Services (ACS) Pty Ltd. Hornfels. Location unverified — suburb-level accuracy' },
    { name: 'Stanthorpe Sands', type: 'quarry', lat: -28.6576, lng: 151.9902, suburb: 'Dalcouth', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Access via Dalcouth and Sugarloaf Roads, Dalcouth QLD 4380. TMR Registered (RQ179). Twin Towns Sand and Gravel Pty Ltd T/As Stanthorpe Sands. Medium to Coarse Quartzofeldspathic and . Location unverified — suburb-level accuracy' },
    // Tablelands
    { name: 'Wongabel Quarry', type: 'quarry', lat: -17.2663, lng: 145.4754, suburb: 'Atherton', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '458 Wongabel Road, Atherton QLD 4883. TMR Registered (RQ063). Wongabel Quarries and Concrete. Granite [Adamellite]. Location unverified — suburb-level accuracy' },
    // Townsville
    { name: 'Black River Quarry (Barro Group Pty Ltd)', type: 'quarry', lat: -19.2599, lng: 146.5943, suburb: 'Black River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Gieseman Road, off Black River Road, Black River QLD 4818. TMR Registered (RQ022). Barro Group Pty Ltd. Rhyolite & Microgranite. Location unverified — suburb-level accuracy' },
    { name: 'CAMM North Quarry', type: 'quarry', lat: -19.0438, lng: 146.3846, suburb: 'Rollingstone', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'via Toomulla Road, Off Bruce Highway, Rollingstone QLD 4816. TMR Registered (RQ347). CAMM North Pty Ltd. Porphyritic Rhyolite/Microgranite and Gr. Location unverified — suburb-level accuracy' },
    { name: 'Hiles Pit (Woodlands Station)', type: 'quarry', lat: -19.5289, lng: 146.7806, suburb: 'Barringha', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 172 Woodlands Road, Barringha QLD 4816. TMR Registered (RQ398). Townsville Mini Loads. Fine to Medium Quartz Alluvial Sand. Location unverified — suburb-level accuracy' },
    { name: 'Holcim Bohle Quarry', type: 'quarry', lat: -19.2470, lng: 146.7239, suburb: 'Bohle', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 42, Off Woolcock Street, Bruce Highway, Bohle QLD 4818. TMR Registered (RQ024). Holcim Australia Pty Ltd. Rhyodacitic Ash Tuff and Subordinate Alt. Location unverified — suburb-level accuracy' },
    { name: 'Pinnacles Quarry (Townsville)', type: 'quarry', lat: -19.3561, lng: 146.6858, suburb: 'Gumlow', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Moncrieff Road, Gumlow QLD 4817 (or Gumlow Road, Gumlow QLD 4817). TMR Registered (RQ090). Gromac Quarries (NQ) Pty Ltd. Microgranite and Dacite with minor Rhyol. Location unverified — suburb-level accuracy' },
    // Western Downs
    { name: 'Juandah Sand and Gravel Quarry', type: 'quarry', lat: -26.2897, lng: 149.8452, suburb: 'Woleebee', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '208 Giligulgul Road, Woleebee QLD 4426. TMR Registered (RQ335). Juandah Quarry Pty Ltd. Fine to Mainly Medium Grained Quartzose . Location unverified — suburb-level accuracy' },
    // Whitsunday
    { name: 'Belmore Quarry (Basalt Source Pit)', type: 'quarry', lat: -20.5534, lng: 147.8467, suburb: 'Collinsville', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Weir Road, Adjacent to Collinsville Road, Collinsville QLD 4804. TMR Registered (RQ132). L D & L J Hillery Pty Ltd T/A Hillery Group. Hydrothermally Altered Basalt with infil. Location unverified — suburb-level accuracy' },
    { name: 'Don River (Bowen) Sand Deposit', type: 'quarry', lat: -20.0008, lng: 148.2377, suburb: 'Bowen', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Near Russels Crossing, Off Lower Don Road, Millers Lane, Don River, Bowen QLD 48. TMR Registered (RQ311). L D & L J Hillery Pty Ltd T/A Hillery Group. Mainly Medium to Coarse Grained Lithic a. Location unverified — suburb-level accuracy' },
    { name: 'Don River Mouth Sand', type: 'quarry', lat: -20.0008, lng: 148.2377, suburb: 'Bowen', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Bed of Don River near mouth, Off Lower Don Road, Bowen QLD 4805. TMR Registered (RQ436). Mirthill Pty Ltd / Pat McDonnell Earthmoving. Fine to Mainly Medium Quartzofeldspathic. Location unverified — suburb-level accuracy' },
    { name: 'Donsford Crossing Sand', type: 'quarry', lat: -20.0008, lng: 148.2377, suburb: 'Bowen', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Adjacent to Lot 1 and Lot 46 on Plan B6611, Off Bowen Developmental Road, Bowen . TMR Registered (RQ372). Pat McDonnell Earthmoving. Mainly Medium to Coarse Quartzofeldspath. Location unverified — suburb-level accuracy' },
    { name: 'Foxdale Quarry', type: 'quarry', lat: -20.4013, lng: 148.5807, suburb: 'Proserpine', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Quarry Road, Proserpine QLD 4800. TMR Registered (RQ267). Whitsunday Regional Council. Andesitic Tuff and Microdiorite. Location unverified — suburb-level accuracy' },
    { name: 'Gladstone Park Sand Quarry', type: 'quarry', lat: -20.0008, lng: 148.2377, suburb: 'Bowen', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Bed of the Don River, Gladstone Park Road, Bowen QLD 4806. TMR Registered (RQ464). Humphries Pty Ltd. Medium to Coarse Quartzofeldspathic and . Location unverified — suburb-level accuracy' },
    { name: 'Longford Creek (Eden Lassie) Quarry', type: 'quarry', lat: -20.0008, lng: 148.2377, suburb: 'Bowen', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '15864 Off Bruce Highway, Longford Creek, Bowen QLD 4805. TMR Registered (RQ064). W Wall & Sons. Alluvial Gravel. Location unverified — suburb-level accuracy' },
    // Winton
    { name: 'Ayrshire Hills Quarry', type: 'quarry', lat: -22.3815, lng: 143.0470, suburb: 'Landsborough Highway Winton', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Ayrshire Downs, Landsborough Highway Winton QLD 4735. TMR Registered (RQ470). Qcrush Pty Ltd. Siltstone & Mudstone / Ferricrete & Silc. Location unverified — suburb-level accuracy' },
    { name: 'Peppercorn Quarry', type: 'quarry', lat: -28.0347, lng: 148.5800, suburb: 'Balonne', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '28477 Moonie Highway, St. George QLD4487. TMR Registered (RQ460). Graham Jackson Wippell and Helen Gayle Wippell. Indurated and Variably Ferruginised & Si. Location unverified — suburb-level accuracy' },
    { name: 'Wilgatoo Pit', type: 'quarry', lat: -28.0347, lng: 148.5800, suburb: 'Balonne', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Wilgatoo,  Moonie Highway, St. George QLD4487. TMR Registered (RQ505). Tierney Crushing & Transport Pty Ltd. Sandstone, Siltstone, Mudstone & Conglom. Location unverified — suburb-level accuracy' },
    { name: 'McIlwraith Quarry (LCB Quarry)', type: 'quarry', lat: -24.9932, lng: 151.9604, suburb: '547 McIlwraith Road Gin Gin', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '547 McIlwraith Road Gin Gin QLD 4671. TMR Registered (RQ572). LCB Civil Pty Ltd. Partly Hornfelsed  Volcanoclastic Sandst. Location unverified — suburb-level accuracy' },
    { name: 'McDonald Road Sand Lease (Goodshell) - Burdekin River', type: 'quarry', lat: -19.5725, lng: 147.5080, suburb: 'Adjacent to 33 McDonald Road Jarvisified', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Adjacent to 33 McDonald Road Jarvisified QLD 4807. TMR Registered (RQ576). Goodshell Earthmoving  Pty Ltd. Quartzofeldspathic and Lithic Medium to . Location unverified — suburb-level accuracy' },
    { name: 'Mungabunda (CHRC) Quarry', type: 'quarry', lat: -24.5684, lng: 149.2940, suburb: 'Via Bauhinia', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '‘Cowandilla’ 1203 Mungabunda Road, Via Bauhinia QLD 4718. TMR Registered (RQ454). Central Highlands Regional Council. Silica Undersaturated Glassy Olivine Bas. Location unverified — suburb-level accuracy' },
    { name: 'Robin Mine Quarry', type: 'quarry', lat: -20.6500, lng: 140.5000, suburb: 'Barkly Highway Argylla', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Rosebud Station, Barkly Highway Argylla QLD 4825. TMR Registered (RQ142). Lawlor Contracting Pty Ltd. Feldspathic Quartzite. Location unverified — suburb-level accuracy' },
    { name: 'Mt. Beckford Quarry', type: 'quarry', lat: -20.8430, lng: 144.2003, suburb: 'Flinders', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '1042  Kennedy Development Road, Hughenden Qld 4821. TMR Registered (RQ205). Gromac Quarries (NQ) Pty Ltd. Silica Undersaturated Glassy Olivine Bas. Location unverified — suburb-level accuracy' },
    { name: 'Byrne Bros Mary River Quarry', type: 'quarry', lat: -25.5437, lng: 152.6930, suburb: 'Fraser Coast', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Jupiter Street (off Queen St), 344 Queen Street, Maryborough Qld 4650. TMR Registered (RQ117). Byrne Bros Pty Ltd. Natural Alluvial Sand and Gravel. Location unverified — suburb-level accuracy' },
    { name: 'Andrews M & K Quarry', type: 'quarry', lat: -28.5379, lng: 150.6667, suburb: 'Avenel Merton Road Yelarbon', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Avenel Merton Road Yelarbon QLD 4388. TMR Registered (RQ573). M & K Andrews Transport (QLD) Pty Ltd. Sandstone, Siltstone, Mudstone & Claysto. Location unverified — suburb-level accuracy' },
    { name: 'Fairfield Quarry', type: 'quarry', lat: -22.3500, lng: 148.2500, suburb: 'Wolfgang', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Peak Downs Highway, Wolfgang QLD 4721. TMR Registered (RQ199). Regional Quarries Australia Pty Ltd. Olivine Basalt. Location unverified — suburb-level accuracy' },
    { name: 'Keatings Quarry', type: 'quarry', lat: -21.4221, lng: 149.2167, suburb: '90365 Bruce Highway Sarina', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '90365 Bruce Highway Sarina QLD 4737. TMR Registered (RQ379). Crush-It Pty Ltd. Volcanolithic Tuffaceous Rhyolite and Mi. Location unverified — suburb-level accuracy' },
    { name: 'Mandarana Quarry', type: 'quarry', lat: -21.0957, lng: 149.0898, suburb: '296 Balnagowan Mandarana Road Farleigh', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '296 Balnagowan Mandarana Road Farleigh QLD 4740. TMR Registered (RQ139). Summit Construction Materials Pty Ltd. Hornfelsed Volcanoclastic Siltstone, Mud. Location unverified — suburb-level accuracy' },
    { name: 'Amby Compagnoni Quarry', type: 'quarry', lat: -26.5000, lng: 148.5000, suburb: 'Wallhallow', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 62 Warrego Hwy, Wallhallow QLD 4465. TMR Registered (RQ017). Corbet Quarries and Concrete Pty Ltd. Silica Oversaturated Glassy Olivine Basa. Location unverified — suburb-level accuracy' },
    { name: 'Tatti Sand', type: 'quarry', lat: -17.0695, lng: 145.3749, suburb: 'Mareeba', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '897-994 Chewko Rd, Chewko Qld 4880. TMR Registered (RQ161). Senport Pty Ltd. Fine to Mainly Medium Quartzose Alluvial. Location unverified — suburb-level accuracy' },
    { name: 'Big One Mine (Thorntonia Quarry)', type: 'quarry', lat: -19.9218, lng: 138.1206, suburb: 'Thorntonia Station via Camooweal', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Yelvertoft Road, Thorntonia Station via Camooweal QLD 4828. TMR Registered (RQ079). Myuma Pty Ltd. Crystalline and Micritic Limestone. Location unverified — suburb-level accuracy' },
    { name: 'Bassridge Quarry', type: 'quarry', lat: -20.7291, lng: 143.1417, suburb: 'Off Flinders Highway', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Stewart Park, Villadale Road, Off Flinders Highway QLD 4822. TMR Registered (RQ442). Bassridge Pty Ltd trading as Lillyman Earthmoving. Olivine Basalt. Location unverified — suburb-level accuracy' },
    { name: 'Bassridge Quarry Supplementary Material Pit', type: 'quarry', lat: -20.7291, lng: 143.1417, suburb: 'Off Flinders Highway', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Stewart Park, Villadale Road, Off Flinders Highway QLD 4822. TMR Registered (RQ555). Bassridge Pty Ltd trading as Lillyman Earthmoving. Fine to Medium Silty Sand. Location unverified — suburb-level accuracy' },
    { name: 'Fairy Bower Quarry', type: 'quarry', lat: -23.4180, lng: 150.4542, suburb: 'Rockhampton', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '247 McLaughlin Street Gracemere QLD4700. TMR Registered (RQ563). Lewdalla Group Pty Ltd T/A QVC Operations. Volcanoclastic Metasiltstone and Metasan. Location unverified — suburb-level accuracy' },
    { name: 'Wattlegrove Quarry', type: 'quarry', lat: -26.5666, lng: 151.6973, suburb: 'South Burnett', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '1304 Wattlegrove Road, Wattlegrove Qld 4610. TMR Registered (RQ535). Kingaroy Quarry Supplies Pty Ltd. Microgranite [Adamellite]. Location unverified — suburb-level accuracy' },
    { name: 'Boral Tichum Creek Quarry', type: 'quarry', lat: -16.9788, lng: 145.5305, suburb: 'Tichum Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: '3445 Kennedy Highway, Tichum Creek QLD 4880. TMR Registered (RQ047). Boral Resources (Qld) Pty Ltd. Silica Undersaturated Glassy Olivine Bas. Location unverified — suburb-level accuracy' },
    { name: 'Townsville Graded Sands – Kelso Plant', type: 'quarry', lat: -19.3887, lng: 146.7169, suburb: 'Upper Ross River Road Kelso', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'Lot 1, Upper Ross River Road Kelso QLD 4815. TMR Registered (RQ317). Townsville Graded Sands Pty Ltd. Fine to Medium Grained Feldspathic Quart. Location unverified — suburb-level accuracy' },
    // ===== RIVER EXTRACTION SITES (DRDMW Quarry Material Allocation Notices) =====
    { name: 'Balonne River — ST. GEORGE EXCAVATORS PTY. LTD.', type: 'quarry', lat: -28.1012, lng: 148.6193, suburb: 'Balonne River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 12,000 m3 allocated. 4,000 m3/yr max. QMAN 300280. ST. GEORGE EXCAVATORS PTY. LTD.. Balonne River, Balonne-Condamine Basin Basin' },
    { name: 'Maranoa River — ROMA SANDS PTY LTD', type: 'quarry', lat: -26.8404, lng: 148.0500, suburb: 'Maranoa River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 30,800 m3 allocated. 7,700 m3/yr max. QMAN 300436. ROMA SANDS PTY LTD. Maranoa River, Balonne-Condamine Basin Basin' },
    { name: 'Yuleba Creek — ROMA SANDS PTY LTD', type: 'quarry', lat: -26.4154, lng: 149.4494, suburb: 'Yuleba Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Other. 60,800 m3 allocated. 15,200 m3/yr max. QMAN 300359. ROMA SANDS PTY LTD. Yuleba Creek, Balonne-Condamine Basin Basin' },
    // Balonne
    { name: 'Balonne River — BARRY JOHN RHEA', type: 'quarry', lat: -28.2002, lng: 148.5326, suburb: 'Balonne River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 25,000 m3 allocated. 5,000 m3/yr max. QMAN 300447. BARRY JOHN RHEA. Balonne River, Balonne-Condamine Basin Basin' },
    // Banana
    { name: 'Castle Creek — SARATOGA COUNTRY INDUSTRIES PTY LTD', type: 'quarry', lat: -24.9011, lng: 150.1121, suburb: 'Castle Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 35,000 m3 allocated. 7,000 m3/yr max. QMAN 300367. SARATOGA COUNTRY INDUSTRIES PTY LTD. Castle Creek, Fitzroy Basin Basin' },
    // Barcaldine
    { name: 'Alice River — MICHAEL HORMAN TRANSPORT PTY. LTD.', type: 'quarry', lat: -23.5939, lng: 145.2994, suburb: 'Alice River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 20,000 m3 allocated. 4,000 m3/yr max. QMAN 300118. MICHAEL HORMAN TRANSPORT PTY. LTD.. Alice River, Coopers Creek Basin Basin' },
    { name: 'Greentree Creek — BARCALDINE REGIONAL COUNCIL', type: 'quarry', lat: -23.1158, lng: 146.5047, suburb: 'Greentree Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 4,000 m3 allocated. 800 m3/yr max. QMAN 300404. BARCALDINE REGIONAL COUNCIL. Greentree Creek, Burdekin Basin Basin' },
    { name: 'Lagoon Creek — BROWN DOG CONTRACTING P.L.', type: 'quarry', lat: -23.3342, lng: 146.4853, suburb: 'Lagoon Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 225,000 m3 allocated. 45,000 m3/yr max. QMAN 300254. BROWN DOG CONTRACTING P.L.. Lagoon Creek, Burdekin Basin Basin' },
    // Blackall Tambo
    { name: 'Dismal Creek — KERRY DAVID SPINKS', type: 'quarry', lat: -24.2661, lng: 145.7005, suburb: 'Dismal Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 1,500 m3 allocated. 300 m3/yr max. QMAN 100952. KERRY DAVID SPINKS. Dismal Creek, Coopers Creek Basin Basin' },
    // Boulia
    { name: 'Burke River — PE & GC HARRIS ROAD CONTRACTORS PTY LTD', type: 'quarry', lat: -22.9064, lng: 138.9219, suburb: 'Burke River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 25,000 m3 allocated. 5,000 m3/yr max. QMAN QMA10000070. PE & GC HARRIS ROAD CONTRACTORS PTY LTD. Burke River, Georgina Basin Basin' },
    { name: 'Burke River — CURRY PROPERTY PTY LTD AS TRUSTEE FOR', type: 'quarry', lat: -22.2025, lng: 140.0822, suburb: 'Burke River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 45,000 m3 allocated. 15,000 m3/yr max. QMAN 300421. CURRY PROPERTY PTY LTD AS TRUSTEE FOR. Burke River, Georgina Basin Basin' },
    { name: 'Burke River — BOULIA SHIRE COUNCIL', type: 'quarry', lat: -22.8919, lng: 139.9397, suburb: 'Burke River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 25,000 m3 allocated. 5,000 m3/yr max. QMAN 300414. BOULIA SHIRE COUNCIL. Burke River, Georgina Basin Basin' },
    { name: 'Moonah Creek — STEELCON QUARRIES PTY LTD', type: 'quarry', lat: -21.0958, lng: 139.2361, suburb: 'Moonah Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 25,000 m3 allocated. 5,000 m3/yr max. QMAN 300445. STEELCON QUARRIES PTY LTD. Moonah Creek, Georgina Basin Basin' },
    { name: 'Split Creek — DARRIN  GAUNT', type: 'quarry', lat: -21.7193, lng: 139.0015, suburb: 'Split Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 15,000 m3 allocated. 3,000 m3/yr max. QMAN 300377. DARRIN  GAUNT. Split Creek, Georgina Basin Basin' },
    { name: 'Split Creek — DARRIN GAUNT', type: 'quarry', lat: -21.7325, lng: 138.9833, suburb: 'Split Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 5,021 m3 allocated. 5,021 m3/yr max. QMAN QMA10000217. DARRIN GAUNT. Split Creek, Georgina Basin Basin' },
    // Bulloo
    { name: 'Macintyre Creek — The Trustee for CROSS COUNTRY FUSION TRUST', type: 'quarry', lat: -28.2816, lng: 143.8593, suburb: 'Macintyre Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 1,400 m3 allocated. 280 m3/yr max. QMAN QMA10000393. The Trustee for CROSS COUNTRY FUSION TRUST. Macintyre Creek, Bulloo Basin Basin' },
    // Bundaberg
    { name: 'Burnett River — BERAJONDO PTY. LTD. T/A BERAJONDO EARTHMOVIN', type: 'quarry', lat: -24.9670, lng: 152.1110, suburb: 'Burnett River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 330,000 m3 allocated. 66,000 m3/yr max. QMAN QMA10000523. BERAJONDO PTY. LTD. T/A BERAJONDO EARTHMOVING AND . Burnett River, Burnett Basin Basin' },
    { name: 'Burnett River — BERAJONDO PTY. LTD. T/A BERAJONDO EARTHMOVIN', type: 'quarry', lat: -24.9713, lng: 152.1398, suburb: 'Burnett River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 140,000 m3 allocated. 28,000 m3/yr max. QMAN QMA10000543. BERAJONDO PTY. LTD. T/A BERAJONDO EARTHMOVING AND . Burnett River, Burnett Basin Basin' },
    { name: 'Burnett River — YNNAD PTY LTD ATF THE BRASSINGTON HOLDING TR', type: 'quarry', lat: -25.0213, lng: 152.1065, suburb: 'Burnett River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 7,900 m3 allocated. 7,900 m3/yr max. QMAN QMA10000541. YNNAD PTY LTD ATF THE BRASSINGTON HOLDING TRUST. Burnett River, Burnett Basin Basin' },
    // Burdekin
    { name: 'Burdekin River — COLEVALE ESTATES PTY. LTD.,M & T POPULIN PT', type: 'quarry', lat: -19.6270, lng: 147.4120, suburb: 'Burdekin River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 240,000 m3 allocated. 60,000 m3/yr max. QMAN 300264. COLEVALE ESTATES PTY. LTD.,M & T POPULIN PTY LTD,T. Burdekin River, Burdekin Basin Basin' },
    { name: 'Burdekin River — COLEVALE ESTATES PTY. LTD.,M & T POPULIN PT', type: 'quarry', lat: -19.6244, lng: 147.4194, suburb: 'Burdekin River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 292,000 m3 allocated. 73,000 m3/yr max. QMAN 300085. COLEVALE ESTATES PTY. LTD.,M & T POPULIN PTY LTD,T. Burdekin River, Burdekin Basin Basin' },
    { name: 'Burdekin River — JUST BEINIT PTY LTD', type: 'quarry', lat: -19.6244, lng: 147.4194, suburb: 'Burdekin River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 120,000 m3 allocated. 30,000 m3/yr max. QMAN 101080. JUST BEINIT PTY LTD. Burdekin River, Burdekin Basin Basin' },
    { name: 'Burdekin River — BURDEKIN SHIRE COUNCIL', type: 'quarry', lat: -19.6273, lng: 147.4104, suburb: 'Burdekin River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 16,000 m3 allocated. 4,000 m3/yr max. QMAN 300318. BURDEKIN SHIRE COUNCIL. Burdekin River, Burdekin Basin Basin' },
    { name: 'Burdekin River — COLEVALE ESTATES PTY. LTD.,M & T POPULIN PT', type: 'quarry', lat: -19.6244, lng: 147.4194, suburb: 'Burdekin River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 80,000 m3 allocated. 20,000 m3/yr max. QMAN 300076. COLEVALE ESTATES PTY. LTD.,M & T POPULIN PTY LTD,T. Burdekin River, Burdekin Basin Basin' },
    { name: 'Burdekin River — HANSON CONSTRUCTION MATERIALS PTY LTD', type: 'quarry', lat: -19.6236, lng: 147.4228, suburb: 'Burdekin River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 260,000 m3 allocated. 65,000 m3/yr max. QMAN 101088. HANSON CONSTRUCTION MATERIALS PTY LTD. Burdekin River, Burdekin Basin Basin' },
    { name: 'Burdekin River — M & T POPULIN PTY LTD,TWIN ROCK PTY. LTD.,B', type: 'quarry', lat: -19.6244, lng: 147.4194, suburb: 'Burdekin River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 75,000 m3 allocated. 18,750 m3/yr max. QMAN QMA10000379. M & T POPULIN PTY LTD,TWIN ROCK PTY. LTD.,BORAL CO. Burdekin River, Burdekin Basin Basin' },
    { name: 'Burdekin River — SPUNCLIP PTY LIMITED', type: 'quarry', lat: -19.6219, lng: 147.4539, suburb: 'Burdekin River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 40,000 m3 allocated. 10,000 m3/yr max. QMAN 300120. SPUNCLIP PTY LIMITED. Burdekin River, Burdekin Basin Basin' },
    { name: 'Burdekin River — HOLCIM (AUSTRALIA) PTY LTD', type: 'quarry', lat: -19.8884, lng: 147.2271, suburb: 'Burdekin River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 300,000 m3 allocated. 60,000 m3/yr max. QMAN 101073. HOLCIM (AUSTRALIA) PTY LTD. Burdekin River, Burdekin Basin Basin' },
    { name: 'Haughton River — GREG MCCAHILL EARTHWORKS & HAULAGE PTY LTD', type: 'quarry', lat: -19.6036, lng: 147.0986, suburb: 'Haughton River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 50,000 m3 allocated. 10,000 m3/yr max. QMAN QMA10000057. GREG MCCAHILL EARTHWORKS & HAULAGE PTY LTD. Haughton River, Haughton Basin Basin' },
    { name: 'Haughton River — DAVID RICHARD VIVIAN COX', type: 'quarry', lat: -19.7061, lng: 147.0454, suburb: 'Haughton River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 25,000 m3 allocated. 5,000 m3/yr max. QMAN QMA10000412. DAVID RICHARD VIVIAN COX. Haughton River, Haughton Basin Basin' },
    { name: 'Haughton River — BURDEKIN TRANSPORT SERVICES PTY. LTD.', type: 'quarry', lat: -19.6411, lng: 147.1058, suburb: 'Haughton River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 500,000 m3 allocated. 100,000 m3/yr max. QMAN QMA10000184. BURDEKIN TRANSPORT SERVICES PTY. LTD.. Haughton River, Haughton Basin Basin' },
    { name: 'Haughton River — JACQUELINE LOUISE LAGO,JOSHUA ROBERT LAGO', type: 'quarry', lat: -19.6383, lng: 147.1074, suburb: 'Haughton River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 37,500 m3 allocated. 7,500 m3/yr max. QMAN 300301. JACQUELINE LOUISE LAGO,JOSHUA ROBERT LAGO. Haughton River, Haughton Basin Basin' },
    { name: 'Haughton River — BARRO GROUP PTY. LIMITED', type: 'quarry', lat: -19.6086, lng: 147.1027, suburb: 'Haughton River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 200,000 m3 allocated. 40,000 m3/yr max. QMAN 101101. BARRO GROUP PTY. LIMITED. Haughton River, Haughton Basin Basin' },
    { name: 'Haughton River — BULK SANDS TOWNSVILLE PTY LTD', type: 'quarry', lat: -19.6036, lng: 147.0986, suburb: 'Haughton River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 12,500 m3 allocated. 2,500 m3/yr max. QMAN 100734. BULK SANDS TOWNSVILLE PTY LTD. Haughton River, Haughton Basin Basin' },
    // Burke
    { name: 'Fiery Creek — QCRUSH PTY LTD', type: 'quarry', lat: -18.7880, lng: 139.4172, suburb: 'Fiery Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 15,000 m3 allocated. 3,000 m3/yr max. QMAN 100834. QCRUSH PTY LTD. Fiery Creek, Leichhardt Basin Basin' },
    { name: 'Gregory River — QCRUSH PTY LTD', type: 'quarry', lat: -18.7119, lng: 139.1908, suburb: 'Gregory River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 10,000 m3 allocated. 2,000 m3/yr max. QMAN 100531. QCRUSH PTY LTD. Gregory River, Nicholson Basin Basin' },
    { name: 'Gregory River — QCRUSH PTY LTD', type: 'quarry', lat: -18.8167, lng: 139.1483, suburb: 'Gregory River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 25,000 m3 allocated. 5,000 m3/yr max. QMAN 101125. QCRUSH PTY LTD. Gregory River, Nicholson Basin Basin' },
    { name: 'Leichhardt River — BURKE SHIRE COUNCIL', type: 'quarry', lat: -18.2203, lng: 139.8767, suburb: 'Leichhardt River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 16,750 m3 allocated. 3,350 m3/yr max. QMAN 100572. BURKE SHIRE COUNCIL. Leichhardt River, Leichhardt Basin Basin' },
    { name: 'Nicholson River — BURKE SHIRE COUNCIL', type: 'quarry', lat: -17.8944, lng: 139.2814, suburb: 'Nicholson River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 27,500 m3 allocated. 5,500 m3/yr max. QMAN 100674. BURKE SHIRE COUNCIL. Nicholson River, Nicholson Basin Basin' },
    { name: 'Sandy Creek — QCRUSH PTY LTD', type: 'quarry', lat: -18.6189, lng: 139.0625, suburb: 'Sandy Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 15,000 m3 allocated. 3,000 m3/yr max. QMAN 100835. QCRUSH PTY LTD. Sandy Creek, Nicholson Basin Basin' },
    // Cairns
    { name: 'Babinda Creek — PANEBIANCO ENTERPRISES PTY LTD.', type: 'quarry', lat: -17.3311, lng: 145.9467, suburb: 'Babinda Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 7,500 m3 allocated. 1,500 m3/yr max. QMAN 300189. PANEBIANCO ENTERPRISES PTY LTD.. Babinda Creek, Mulgrave-Russell Basin Basin' },
    { name: 'Russell River — STEPHEN  SACCHETTI', type: 'quarry', lat: -17.4056, lng: 145.9372, suburb: 'Russell River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 17,500 m3 allocated. 3,500 m3/yr max. QMAN 300086. STEPHEN  SACCHETTI. Russell River, Mulgrave-Russell Basin Basin' },
    { name: 'Russell River — STEPHEN  SACCHETTI', type: 'quarry', lat: -17.3931, lng: 145.9650, suburb: 'Russell River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 7,500 m3 allocated. 1,500 m3/yr max. QMAN 300413. STEPHEN  SACCHETTI. Russell River, Mulgrave-Russell Basin Basin' },
    // Carpentaria
    { name: 'Flinders River — PETER FRANCIS WELLS', type: 'quarry', lat: -17.8935, lng: 140.7968, suburb: 'Flinders River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 5,000 m3 allocated. 1,000 m3/yr max. QMAN 100534. PETER FRANCIS WELLS. Flinders River, Flinders Basin Basin' },
    { name: 'Mitchell River — CARPENTARIA SHIRE COUNCIL', type: 'quarry', lat: -15.9687, lng: 142.4032, suburb: 'Mitchell River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 95,000 m3 allocated. 19,000 m3/yr max. QMAN 300290. CARPENTARIA SHIRE COUNCIL. Mitchell River, Mitchell Basin Basin' },
    { name: 'Smithburne River — PETER FRANCIS WELLS', type: 'quarry', lat: -17.0417, lng: 141.3762, suburb: 'Smithburne River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 10,000 m3 allocated. 2,000 m3/yr max. QMAN 100533. PETER FRANCIS WELLS. Smithburne River, Gilbert Basin Basin' },
    { name: 'Smithburne River — PETER FRANCIS WELLS', type: 'quarry', lat: -17.0418, lng: 141.3763, suburb: 'Smithburne River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 20,000 m3 allocated. 4,000 m3/yr max. QMAN QMA10000304. PETER FRANCIS WELLS. Smithburne River, Gilbert Basin Basin' },
    // Cassowary Coast
    { name: 'Davidson Creek — MACKAY GROUP PROPERTIES PTY LTD', type: 'quarry', lat: -17.9718, lng: 145.7435, suburb: 'Davidson Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,000 m3 allocated. 600 m3/yr max. QMAN QMA10000575. MACKAY GROUP PROPERTIES PTY LTD. Davidson Creek, Tully Basin Basin' },
    { name: 'Davidson Creek — MACKAY GROUP PROPERTIES PTY LTD', type: 'quarry', lat: -17.9918, lng: 145.7271, suburb: 'Davidson Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,000 m3 allocated. 600 m3/yr max. QMAN QMA10000598. MACKAY GROUP PROPERTIES PTY LTD. Davidson Creek, Tully Basin Basin' },
    { name: 'Echo Creek — STEPHEN BERNARD JOHNSTON', type: 'quarry', lat: -17.9409, lng: 145.7644, suburb: 'Echo Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 2,500 m3 allocated. 500 m3/yr max. QMAN QMA10000036. STEPHEN BERNARD JOHNSTON. Echo Creek, Tully Basin Basin' },
    { name: 'Jarra Creek — VINCENZO  GERARD LIZZIO,LEONARDO ALFIO LIZZIO', type: 'quarry', lat: -17.9782, lng: 145.8688, suburb: 'Jarra Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 5,000 m3 allocated. 1,000 m3/yr max. QMAN 100891. VINCENZO  GERARD LIZZIO,LEONARDO ALFIO LIZZIO. Jarra Creek, Tully Basin Basin' },
    { name: 'Jarra Creek — DANNY EDWIN CHRUSTOPH TEITZEL,DANA MAREE SCUDE', type: 'quarry', lat: -17.9319, lng: 145.8624, suburb: 'Jarra Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,000 m3 allocated. 600 m3/yr max. QMAN 300401. DANNY EDWIN CHRUSTOPH TEITZEL,DANA MAREE SCUDERI. Jarra Creek, Tully Basin Basin' },
    { name: 'Kaygaroo Creek — JANICE MARY GILLIS,JOHN WILLIAM GILLIS', type: 'quarry', lat: -17.7920, lng: 146.0371, suburb: 'Kaygaroo Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 1,500 m3 allocated. 300 m3/yr max. QMAN 300304. JANICE MARY GILLIS,JOHN WILLIAM GILLIS. Kaygaroo Creek, Johnstone Basin Basin' },
    { name: 'Liverpool Creek — AZZOS EXCAVATOR & TRUCK HIRE PTY LTD', type: 'quarry', lat: -17.7033, lng: 146.0722, suburb: 'Liverpool Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 14,500 m3 allocated. 2,900 m3/yr max. QMAN QMA10000032. AZZOS EXCAVATOR & TRUCK HIRE PTY LTD. Liverpool Creek, Johnstone Basin Basin' },
    { name: 'Liverpool Creek — RANDEEP SINGH SAHOTA,PARVEEN  GILL', type: 'quarry', lat: -17.7119, lng: 146.0392, suburb: 'Liverpool Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,750 m3 allocated. 750 m3/yr max. QMAN 300409. RANDEEP SINGH SAHOTA,PARVEEN  GILL. Liverpool Creek, Johnstone Basin Basin' },
    { name: 'Liverpool Creek — KULBIR SINGH,KULWINDER KAUR', type: 'quarry', lat: -17.7096, lng: 146.0400, suburb: 'Liverpool Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 1,000 m3 allocated. 1,000 m3/yr max. QMAN 100733. KULBIR SINGH,KULWINDER KAUR. Liverpool Creek, Johnstone Basin Basin' },
    { name: 'Murray River — GF & EA LYONS', type: 'quarry', lat: -18.0501, lng: 145.8452, suburb: 'Murray River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 550 m3 allocated. 550 m3/yr max. QMAN 101054. GF & EA LYONS. Murray River, Murray Basin Basin' },
    { name: 'Murray River — CARMELA GIOVANNA DORE,GERARD  DORE', type: 'quarry', lat: -18.0501, lng: 145.8452, suburb: 'Murray River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 2,750 m3 allocated. 550 m3/yr max. QMAN 101054. CARMELA GIOVANNA DORE,GERARD  DORE. Murray River, Murray Basin Basin' },
    { name: 'Tully River — G & J FLEGLER PTY LTD', type: 'quarry', lat: -17.8969, lng: 145.7664, suburb: 'Tully River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 3,250 m3 allocated. 650 m3/yr max. QMAN QMA10000027. G & J FLEGLER PTY LTD. Tully River, Tully Basin Basin' },
    { name: 'Tully River — VINCENZO  GERARD LIZZIO,LEONARDO LIZZIO', type: 'quarry', lat: -17.9669, lng: 145.8386, suburb: 'Tully River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 8,250 m3 allocated. 1,650 m3/yr max. QMAN QMA10000033. VINCENZO  GERARD LIZZIO,LEONARDO LIZZIO. Tully River, Tully Basin Basin' },
    { name: 'Tully River — RONALD HENRY REICHARDT', type: 'quarry', lat: -18.0006, lng: 145.9169, suburb: 'Tully River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 10,000 m3 allocated. 2,000 m3/yr max. QMAN 100516. RONALD HENRY REICHARDT. Tully River, Tully Basin Basin' },
    { name: 'Tully River — WILLIAM GEORGE JENKINS', type: 'quarry', lat: -17.9942, lng: 145.8844, suburb: 'Tully River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 10,000 m3 allocated. 2,000 m3/yr max. QMAN 300116. WILLIAM GEORGE JENKINS. Tully River, Tully Basin Basin' },
    { name: 'Tully River — TULLY SUGAR LIMITED', type: 'quarry', lat: -17.9983, lng: 145.9208, suburb: 'Tully River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,250 m3 allocated. 650 m3/yr max. QMAN 100574. TULLY SUGAR LIMITED. Tully River, Tully Basin Basin' },
    { name: 'Tully River — GIOVANNI SALVATORE VECCHIO,SARINA VECCHIO', type: 'quarry', lat: -17.9914, lng: 145.9403, suburb: 'Tully River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,000 m3 allocated. 600 m3/yr max. QMAN 100544. GIOVANNI SALVATORE VECCHIO,SARINA VECCHIO. Tully River, Tully Basin Basin' },
    { name: 'Tully River — MARK VINCENT LIZZIO,CARRIE MARIE LIZZIO', type: 'quarry', lat: -17.9760, lng: 145.8575, suburb: 'Tully River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 2,495 m3 allocated. 499 m3/yr max. QMAN QMA10000242. MARK VINCENT LIZZIO,CARRIE MARIE LIZZIO. Tully River, Tully Basin Basin' },
    { name: 'Tully River — ECHO CREEK PTY LTD,DUNDEE CREEK FARMING PTY LT', type: 'quarry', lat: -17.9630, lng: 145.8408, suburb: 'Tully River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 2,500 m3 allocated. 500 m3/yr max. QMAN QMA10000035. ECHO CREEK PTY LTD,DUNDEE CREEK FARMING PTY LTD. Tully River, Tully Basin Basin' },
    { name: 'Tully River — MAC FARMS PTY LTD', type: 'quarry', lat: -17.9734, lng: 145.8466, suburb: 'Tully River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,250 m3 allocated. 650 m3/yr max. QMAN QMA10000273. MAC FARMS PTY LTD. Tully River, Tully Basin Basin' },
    { name: 'Tully River — STUART JACK GILBERT', type: 'quarry', lat: -17.9994, lng: 145.8744, suburb: 'Tully River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,250 m3 allocated. 650 m3/yr max. QMAN QMA10000588. STUART JACK GILBERT. Tully River, Tully Basin Basin' },
    // Central Highlands
    { name: 'Mimosa Creek — CAEL HOLDINGS PTY LTD', type: 'quarry', lat: -24.4522, lng: 149.7444, suburb: 'Mimosa Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 15,000 m3 allocated. 3,000 m3/yr max. QMAN 100780. CAEL HOLDINGS PTY LTD. Mimosa Creek, Fitzroy Basin Basin' },
    { name: 'Panorama Creek — MATTHEW ALEXANDER SMITH', type: 'quarry', lat: -24.5182, lng: 148.5661, suburb: 'Panorama Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 15,000 m3 allocated. 3,000 m3/yr max. QMAN 101140. MATTHEW ALEXANDER SMITH. Panorama Creek, Fitzroy Basin Basin' },
    { name: 'Planet Creek — MATTHEW ALEXANDER SMITH', type: 'quarry', lat: -24.3750, lng: 148.6966, suburb: 'Planet Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 35,000 m3 allocated. 7,000 m3/yr max. QMAN 300232. MATTHEW ALEXANDER SMITH. Planet Creek, Fitzroy Basin Basin' },
    { name: 'Theresa Creek — REGIONAL QUARRIES AUSTRALIA PTY LIMITED', type: 'quarry', lat: -23.0481, lng: 147.6353, suburb: 'Theresa Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 40,000 m3 allocated. 8,000 m3/yr max. QMAN 101176. REGIONAL QUARRIES AUSTRALIA PTY LIMITED. Theresa Creek, Fitzroy Basin Basin' },
    { name: 'Theresa Creek — DAVID JOHN BROWN,JOHN CHARLES BROWN', type: 'quarry', lat: -23.1566, lng: 147.8449, suburb: 'Theresa Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 5,000 m3 allocated. 1,000 m3/yr max. QMAN 300126. DAVID JOHN BROWN,JOHN CHARLES BROWN. Theresa Creek, Fitzroy Basin Basin' },
    { name: 'Theresa Creek — REGIONAL QUARRIES AUSTRALIA PTY LIMITED', type: 'quarry', lat: -22.9989, lng: 147.6239, suburb: 'Theresa Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 50,000 m3 allocated. 10,000 m3/yr max. QMAN 300183. REGIONAL QUARRIES AUSTRALIA PTY LIMITED. Theresa Creek, Fitzroy Basin Basin' },
    { name: 'Theresa Creek — CENTRAL HIRE & CONTRACTING PTY. LIMITED', type: 'quarry', lat: -23.1827, lng: 147.8915, suburb: 'Theresa Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 50,000 m3 allocated. 10,000 m3/yr max. QMAN 300206. CENTRAL HIRE & CONTRACTING PTY. LIMITED. Theresa Creek, Fitzroy Basin Basin' },
    // Charters Towers
    { name: 'Broughton River — ALAN JOSEPH EDDY,DEBORAH EVELYN EDDY', type: 'quarry', lat: -20.1728, lng: 146.3129, suburb: 'Broughton River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 12,500 m3 allocated. 2,500 m3/yr max. QMAN QMA10000034. ALAN JOSEPH EDDY,DEBORAH EVELYN EDDY. Broughton River, Burdekin Basin Basin' },
    { name: 'Burdekin River — JILL MARY THOMASSON', type: 'quarry', lat: -19.9895, lng: 146.4331, suburb: 'Burdekin River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 58,350 m3 allocated. 11,670 m3/yr max. QMAN 300454. JILL MARY THOMASSON. Burdekin River, Burdekin Basin Basin' },
    { name: 'Burdekin River — GREG MCCAHILL EARTHWORKS & HAULAGE PTY LTD', type: 'quarry', lat: -20.0044, lng: 146.4364, suburb: 'Burdekin River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 150,000 m3 allocated. 30,000 m3/yr max. QMAN QMA10000449. GREG MCCAHILL EARTHWORKS & HAULAGE PTY LTD. Burdekin River, Burdekin Basin Basin' },
    { name: 'Burdekin River — GRUMPYS CONCRETE', type: 'quarry', lat: -19.9895, lng: 146.4350, suburb: 'Burdekin River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 25,000 m3 allocated. 5,000 m3/yr max. QMAN 101064. GRUMPYS CONCRETE. Burdekin River, Burdekin Basin Basin' },
    { name: 'Cape River — CLAYTON DONALD MACLEAN', type: 'quarry', lat: -20.4752, lng: 145.4742, suburb: 'Cape River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 10,000 m3 allocated. 10,000 m3/yr max. QMAN 300243. CLAYTON DONALD MACLEAN. Cape River, Burdekin Basin Basin' },
    { name: 'Clarke Creek — HILL-WARNER ENTERPRISES PTY LTD', type: 'quarry', lat: -20.2180, lng: 146.3095, suburb: 'Clarke Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,250 m3 allocated. 650 m3/yr max. QMAN 300322. HILL-WARNER ENTERPRISES PTY LTD. Clarke Creek, Burdekin Basin Basin' },
    { name: 'Connolly Creek — MCCAHILLS EARTHMOVING & SUPPLIES PTY. LTD.', type: 'quarry', lat: -20.1854, lng: 146.8630, suburb: 'Connolly Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 15,000 m3 allocated. 3,000 m3/yr max. QMAN 300097. MCCAHILLS EARTHMOVING & SUPPLIES PTY. LTD.. Connolly Creek, Burdekin Basin Basin' },
    { name: 'Hann Creek — ALAN JOSEPH EDDY,DEBORAH EVELYN EDDY', type: 'quarry', lat: -19.8953, lng: 146.2212, suburb: 'Hann Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 3,250 m3 allocated. 650 m3/yr max. QMAN 300375. ALAN JOSEPH EDDY,DEBORAH EVELYN EDDY. Hann Creek, Burdekin Basin Basin' },
    { name: 'Keelbottom Creek — BEDROCK LANDSCAPE SUPPLIES TOWNSVILLE PTY', type: 'quarry', lat: -19.4111, lng: 146.3619, suburb: 'Keelbottom Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 15,000 m3 allocated. 3,000 m3/yr max. QMAN 101156. BEDROCK LANDSCAPE SUPPLIES TOWNSVILLE PTY LTD. Keelbottom Creek, Burdekin Basin Basin' },
    { name: 'Oaky Creek — FARRELL LANDSCAPING PTY LTD', type: 'quarry', lat: -19.0586, lng: 145.8233, suburb: 'Oaky Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 5,000 m3 allocated. 1,000 m3/yr max. QMAN 101138. FARRELL LANDSCAPING PTY LTD. Oaky Creek, Burdekin Basin Basin' },
    { name: 'Speed Creek — BEDROCK LANDSCAPE SUPPLIES TOWNSVILLE PTY LTD', type: 'quarry', lat: -19.4308, lng: 146.3889, suburb: 'Speed Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 10,000 m3 allocated. 2,000 m3/yr max. QMAN 100899. BEDROCK LANDSCAPE SUPPLIES TOWNSVILLE PTY LTD. Speed Creek, Burdekin Basin Basin' },
    { name: 'Star River — BEDROCK LANDSCAPE SUPPLIES TOWNSVILLE PTY LTD', type: 'quarry', lat: -19.3882, lng: 146.0336, suburb: 'Star River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 100,000 m3 allocated. 20,000 m3/yr max. QMAN 101002. BEDROCK LANDSCAPE SUPPLIES TOWNSVILLE PTY LTD. Star River, Burdekin Basin Basin' },
    { name: 'Star River — DAVID JOHN NICHOLAS', type: 'quarry', lat: -19.3764, lng: 146.0517, suburb: 'Star River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 50,000 m3 allocated. 10,000 m3/yr max. QMAN 101109. DAVID JOHN NICHOLAS. Star River, Burdekin Basin Basin' },
    // Cloncurry
    { name: 'Burke River — QCRUSH PTY LTD', type: 'quarry', lat: -21.8477, lng: 140.1500, suburb: 'Burke River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 25,000 m3 allocated. 5,000 m3/yr max. QMAN 300316. QCRUSH PTY LTD. Burke River, Georgina Basin Basin' },
    { name: 'Burke River — CLONCURRY SAND AND GRAVEL PTY LTD', type: 'quarry', lat: -21.9746, lng: 140.1520, suburb: 'Burke River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 45,000 m3 allocated. 15,000 m3/yr max. QMAN 300211. CLONCURRY SAND AND GRAVEL PTY LTD. Burke River, Georgina Basin Basin' },
    { name: 'Cloncurry River — TONKIN CONCRETE & CRUSHING PTY LTD', type: 'quarry', lat: -20.7139, lng: 140.4850, suburb: 'Cloncurry River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 20,000 m3 allocated. 10,000 m3/yr max. QMAN 300402. TONKIN CONCRETE & CRUSHING PTY LTD. Cloncurry River, Flinders Basin Basin' },
    { name: 'Cloncurry River — LAWLOR CONTRACTING PTY. LTD.', type: 'quarry', lat: -20.6442, lng: 140.4955, suburb: 'Cloncurry River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 25,000 m3 allocated. 5,000 m3/yr max. QMAN QMA10000265. LAWLOR CONTRACTING PTY. LTD.. Cloncurry River, Flinders Basin Basin' },
    { name: 'Cloncurry River — LAWLOR CONTRACTING PTY. LTD.', type: 'quarry', lat: -20.5634, lng: 140.5260, suburb: 'Cloncurry River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 50,000 m3 allocated. 10,000 m3/yr max. QMAN 300171. LAWLOR CONTRACTING PTY. LTD.. Cloncurry River, Flinders Basin Basin' },
    { name: 'Kolar Creek — QCRUSH PTY LTD', type: 'quarry', lat: -22.0332, lng: 140.1224, suburb: 'Kolar Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 19,000 m3 allocated. 3,800 m3/yr max. QMAN 300411. QCRUSH PTY LTD. Kolar Creek, Georgina Basin Basin' },
    { name: 'Leichhardt River — LAWLOR CONTRACTING PTY. LTD.', type: 'quarry', lat: -19.6828, lng: 140.0911, suburb: 'Leichhardt River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 250,000 m3 allocated. 50,000 m3/yr max. QMAN 300065. LAWLOR CONTRACTING PTY. LTD.. Leichhardt River, Leichhardt Basin Basin' },
    { name: 'The Mort River — CHINOVA RESOURCES CLONCURRY MINES PTY LTD', type: 'quarry', lat: -21.8447, lng: 140.4396, suburb: 'The Mort River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 4,000 m3 allocated. 2,000 m3/yr max. QMAN 300231. CHINOVA RESOURCES CLONCURRY MINES PTY LTD. The Mort River, Georgina Basin Basin' },
    // Cook
    { name: 'Archer River — DEPARTMENT OF TRANSPORT AND MAIN ROADS', type: 'quarry', lat: -13.4352, lng: 142.9438, suburb: 'Archer River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 5,000 m3 allocated. 1,000 m3/yr max. QMAN 101175. DEPARTMENT OF TRANSPORT AND MAIN ROADS. Archer River, Archer Basin Basin' },
    { name: 'Coen River — DEPARTMENT OF TRANSPORT AND MAIN ROADS', type: 'quarry', lat: -13.9362, lng: 143.1998, suburb: 'Coen River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 5,000 m3 allocated. 1,000 m3/yr max. QMAN 101174. DEPARTMENT OF TRANSPORT AND MAIN ROADS. Coen River, Archer Basin Basin' },
    { name: 'Kennedy River — DEPARTMENT OF TRANSPORT AND MAIN ROADS', type: 'quarry', lat: -15.4188, lng: 144.1841, suburb: 'Kennedy River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 7,500 m3 allocated. 1,500 m3/yr max. QMAN 101171. DEPARTMENT OF TRANSPORT AND MAIN ROADS. Kennedy River, Normanby Basin Basin' },
    { name: 'Laura River — DEPARTMENT OF TRANSPORT AND MAIN ROADS', type: 'quarry', lat: -15.5322, lng: 144.4397, suburb: 'Laura River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 27,500 m3 allocated. 5,500 m3/yr max. QMAN 101170. DEPARTMENT OF TRANSPORT AND MAIN ROADS. Laura River, Normanby Basin Basin' },
    { name: 'Morehead River — DEPARTMENT OF TRANSPORT AND MAIN ROADS', type: 'quarry', lat: -15.0227, lng: 143.6649, suburb: 'Morehead River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 15,000 m3 allocated. 3,000 m3/yr max. QMAN 101172. DEPARTMENT OF TRANSPORT AND MAIN ROADS. Morehead River, Normanby Basin Basin' },
    { name: 'Oaky Creek — ERIC  CLARK', type: 'quarry', lat: -15.5319, lng: 145.1522, suburb: 'Oaky Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,000 m3 allocated. 1,500 m3/yr max. QMAN 100725. ERIC  CLARK. Oaky Creek, Endeavour Basin Basin' },
    { name: 'Stewart River — DEPARTMENT OF TRANSPORT AND MAIN ROADS', type: 'quarry', lat: -14.1320, lng: 143.2741, suburb: 'Stewart River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 5,000 m3 allocated. 1,000 m3/yr max. QMAN 101173. DEPARTMENT OF TRANSPORT AND MAIN ROADS. Stewart River, Stewart Basin Basin' },
    { name: 'Trevethan Creek — ERIC  CLARK', type: 'quarry', lat: -15.6066, lng: 145.2112, suburb: 'Trevethan Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 7,500 m3 allocated. 1,500 m3/yr max. QMAN 100726. ERIC  CLARK. Trevethan Creek, Endeavour Basin Basin' },
    // Croydon
    { name: 'Belmore Creek — PETER FRANCIS WELLS', type: 'quarry', lat: -18.1741, lng: 142.2089, suburb: 'Belmore Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 19,150 m3 allocated. 3,830 m3/yr max. QMAN 100532. PETER FRANCIS WELLS. Belmore Creek, Norman Basin Basin' },
    // Douglas
    { name: 'Saltwater Creek — SHANE WILLIAM QUAID,PRISCILLA  QUAID', type: 'quarry', lat: -16.3963, lng: 145.3632, suburb: 'Saltwater Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 1,500 m3 allocated. 300 m3/yr max. QMAN 300229. SHANE WILLIAM QUAID,PRISCILLA  QUAID. Saltwater Creek, Daintree Basin Basin' },
    { name: 'Saltwater Creek — WILLIAM JOSEPH BELLERO', type: 'quarry', lat: -16.3914, lng: 145.3931, suburb: 'Saltwater Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 300 m3 allocated. 300 m3/yr max. QMAN 300236. WILLIAM JOSEPH BELLERO. Saltwater Creek, Daintree Basin Basin' },
    // Etheridge
    { name: 'Etheridge River — BOLWARRA ENTERPRISES PTY LTD', type: 'quarry', lat: -18.2724, lng: 143.5520, suburb: 'Etheridge River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 67,500 m3 allocated. 13,500 m3/yr max. QMAN 300321. BOLWARRA ENTERPRISES PTY LTD. Etheridge River, Gilbert Basin Basin' },
    // Flinders
    { name: 'Flinders River — PRAIRIE SERVICES PTY LTD', type: 'quarry', lat: -20.7554, lng: 144.4818, suburb: 'Flinders River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 50,000 m3 allocated. 10,000 m3/yr max. QMAN QMA10000522. PRAIRIE SERVICES PTY LTD. Flinders River, Flinders Basin Basin' },
    { name: 'Flinders River — FLINDERS SHIRE COUNCIL', type: 'quarry', lat: -20.8386, lng: 144.2139, suburb: 'Flinders River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 12,500 m3 allocated. 2,500 m3/yr max. QMAN 300107. FLINDERS SHIRE COUNCIL. Flinders River, Flinders Basin Basin' },
    { name: 'Flinders River — CLAYTON DONALD MACLEAN', type: 'quarry', lat: -20.6502, lng: 143.8725, suburb: 'Flinders River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 6,000 m3 allocated. 6,000 m3/yr max. QMAN 300406. CLAYTON DONALD MACLEAN. Flinders River, Flinders Basin Basin' },
    { name: 'Flinders River — DARREN BRIAN BEETON', type: 'quarry', lat: -20.6728, lng: 143.9034, suburb: 'Flinders River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 7,500 m3 allocated. 7,500 m3/yr max. QMAN 300291. DARREN BRIAN BEETON. Flinders River, Flinders Basin Basin' },
    { name: 'Torrens Creek — BEDROCK LANDSCAPE SUPPLIES TOWNSVILLE PTY LT', type: 'quarry', lat: -20.8389, lng: 145.0389, suburb: 'Torrens Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 31,250 m3 allocated. 6,250 m3/yr max. QMAN 300108. BEDROCK LANDSCAPE SUPPLIES TOWNSVILLE PTY LTD. Torrens Creek, Coopers Creek Basin Basin' },
    // Goondiwindi
    { name: 'Bracker Creek — PEARLJANEY PTY LTD ATF KEIBOOBILLY FAMILY TR', type: 'quarry', lat: -28.4617, lng: 151.2533, suburb: 'Bracker Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Gravel. 103,800 m3 allocated. 62,500 m3/yr max. QMAN QMA10000291. PEARLJANEY PTY LTD ATF KEIBOOBILLY FAMILY TRUST TR. Bracker Creek, Border Rivers Basin Basin' },
    // Hinchinbrook
    { name: 'Frances Creek — HERBERT RIVER DISTRICT CANE GROWERS ORGANISA', type: 'quarry', lat: -18.7359, lng: 146.1612, suburb: 'Frances Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 35,485 m3 allocated. 35,485 m3/yr max. QMAN 300293. HERBERT RIVER DISTRICT CANE GROWERS ORGANISATION L. Frances Creek, Herbert Basin Basin' },
    { name: 'Herbert River — GREG MCCAHILL EARTHWORKS & HAULAGE PTY LTD', type: 'quarry', lat: -18.6183, lng: 146.1797, suburb: 'Herbert River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 75,000 m3 allocated. 15,000 m3/yr max. QMAN 300138. GREG MCCAHILL EARTHWORKS & HAULAGE PTY LTD. Herbert River, Herbert Basin Basin' },
    { name: 'Herbert River — ROJO QUARRIES PTY LTD', type: 'quarry', lat: -18.6272, lng: 146.1089, suburb: 'Herbert River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 40,000 m3 allocated. 8,000 m3/yr max. QMAN 300186. ROJO QUARRIES PTY LTD. Herbert River, Herbert Basin Basin' },
    { name: 'Herbert River — BRENDEN DANIEL ACCORNERO,MONICA ACCORNERO', type: 'quarry', lat: -18.6183, lng: 146.1797, suburb: 'Herbert River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,000 m3 allocated. 600 m3/yr max. QMAN QMA10000427. BRENDEN DANIEL ACCORNERO,MONICA ACCORNERO. Herbert River, Herbert Basin Basin' },
    { name: 'Herbert River — RAMON MARBELLI', type: 'quarry', lat: -18.6191, lng: 146.1774, suburb: 'Herbert River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 2,000 m3 allocated. 400 m3/yr max. QMAN QMA10000488. RAMON MARBELLI. Herbert River, Herbert Basin Basin' },
    { name: 'Herbert River — RAMON MARBELLI', type: 'quarry', lat: -18.6286, lng: 146.1081, suburb: 'Herbert River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 10,000 m3 allocated. 2,000 m3/yr max. QMAN 100604. RAMON MARBELLI. Herbert River, Herbert Basin Basin' },
    { name: 'Herbert River — SCOVAZZI INVESTMENTS PTY LTD', type: 'quarry', lat: -18.6288, lng: 146.1115, suburb: 'Herbert River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 2,500 m3 allocated. 500 m3/yr max. QMAN 300390. SCOVAZZI INVESTMENTS PTY LTD. Herbert River, Herbert Basin Basin' },
    { name: 'Herbert River — IC0N PTY LTD', type: 'quarry', lat: -18.6317, lng: 146.1231, suburb: 'Herbert River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 700 m3 allocated. 700 m3/yr max. QMAN 300309. IC0N PTY LTD. Herbert River, Herbert Basin Basin' },
    { name: 'Herbert River — BEN  FINLAYSON', type: 'quarry', lat: -18.4965, lng: 145.9791, suburb: 'Herbert River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,250 m3 allocated. 650 m3/yr max. QMAN 300315. BEN  FINLAYSON. Herbert River, Herbert Basin Basin' },
    { name: 'Herbert River — ALAN FEDERICK BURDELL', type: 'quarry', lat: -18.6183, lng: 146.1797, suburb: 'Herbert River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 2,500 m3 allocated. 500 m3/yr max. QMAN 100642. ALAN FEDERICK BURDELL. Herbert River, Herbert Basin Basin' },
    { name: 'Herbert River — JAYCAT EARTHMOVING PTY LTD', type: 'quarry', lat: -18.6286, lng: 146.1081, suburb: 'Herbert River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 2,500 m3 allocated. 500 m3/yr max. QMAN 100588. JAYCAT EARTHMOVING PTY LTD. Herbert River, Herbert Basin Basin' },
    { name: 'Herbert River — STEPHEN PHILIP ACCORNERO', type: 'quarry', lat: -18.6183, lng: 146.1797, suburb: 'Herbert River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 3,000 m3 allocated. 600 m3/yr max. QMAN 100783. STEPHEN PHILIP ACCORNERO. Herbert River, Herbert Basin Basin' },
    { name: 'Herbert River — F.A. & J. BONASSI FARMING PTY. LTD.', type: 'quarry', lat: -18.6286, lng: 146.1081, suburb: 'Herbert River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 32,500 m3 allocated. 6,500 m3/yr max. QMAN 300177. F.A. & J. BONASSI FARMING PTY. LTD.. Herbert River, Herbert Basin Basin' },
    // Isaac
    { name: 'Denison Creek — KELLI  DURIE', type: 'quarry', lat: -21.7672, lng: 148.7875, suburb: 'Denison Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 1,500 m3 allocated. 1,500 m3/yr max. QMAN 100713. KELLI  DURIE. Denison Creek, Fitzroy Basin Basin' },
    { name: 'Harrybrandt Creek — TREVOR EDWARD HOWELL', type: 'quarry', lat: -21.8843, lng: 148.5601, suburb: 'Harrybrandt Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 10,000 m3 allocated. 2,000 m3/yr max. QMAN 101029. TREVOR EDWARD HOWELL. Harrybrandt Creek, Fitzroy Basin Basin' },
    { name: 'Harrybrandt Creek — TREVOR EDWARD HOWELL', type: 'quarry', lat: -21.8850, lng: 148.5644, suburb: 'Harrybrandt Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 10,000 m3 allocated. 2,000 m3/yr max. QMAN 100671. TREVOR EDWARD HOWELL. Harrybrandt Creek, Fitzroy Basin Basin' },
    { name: 'Harrybrandt Creek — CQS PTY LTD', type: 'quarry', lat: -21.8834, lng: 148.5526, suburb: 'Harrybrandt Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 100,000 m3 allocated. 20,000 m3/yr max. QMAN QMA10000415. CQS PTY LTD. Harrybrandt Creek, Fitzroy Basin Basin' },
    { name: 'Isaac River — QUARRICO PRODUCTS PTY LTD', type: 'quarry', lat: -22.1419, lng: 148.2969, suburb: 'Isaac River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 150,000 m3 allocated. 30,000 m3/yr max. QMAN 300283. QUARRICO PRODUCTS PTY LTD. Isaac River, Fitzroy Basin Basin' },
    { name: 'Isaac River — BLUEJAY INVESTMENTS PTY LTD', type: 'quarry', lat: -22.4506, lng: 148.6147, suburb: 'Isaac River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 35,500 m3 allocated. 7,100 m3/yr max. QMAN 300155. BLUEJAY INVESTMENTS PTY LTD. Isaac River, Fitzroy Basin Basin' },
    { name: 'Isaac River — QUARRICO PRODUCTS PTY LTD', type: 'quarry', lat: -22.0495, lng: 148.1301, suburb: 'Isaac River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 225,000 m3 allocated. 45,000 m3/yr max. QMAN 300334. QUARRICO PRODUCTS PTY LTD. Isaac River, Fitzroy Basin Basin' },
    { name: 'Isaac River — ANGLO COAL (MORANBAH NORTH MANAGEMENT) PTY LIM', type: 'quarry', lat: -21.8719, lng: 147.9792, suburb: 'Isaac River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 2,500 m3 allocated. 500 m3/yr max. QMAN 100802. ANGLO COAL (MORANBAH NORTH MANAGEMENT) PTY LIMITED. Isaac River, Fitzroy Basin Basin' },
    { name: 'Isaac River — HANSON CONSTRUCTION MATERIALS PTY LTD', type: 'quarry', lat: -22.0511, lng: 148.1347, suburb: 'Isaac River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 325,000 m3 allocated. 65,000 m3/yr max. QMAN 300052. HANSON CONSTRUCTION MATERIALS PTY LTD. Isaac River, Fitzroy Basin Basin' },
    { name: 'Isaac River — ANGLO COAL (MORANBAH NORTH MANAGEMENT) PTY LIM', type: 'quarry', lat: -21.9233, lng: 148.0189, suburb: 'Isaac River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 17,500 m3 allocated. 3,500 m3/yr max. QMAN 300164. ANGLO COAL (MORANBAH NORTH MANAGEMENT) PTY LIMITED. Isaac River, Fitzroy Basin Basin' },
    { name: 'Isaac River — MALS PLANT HIRE PTY LTD', type: 'quarry', lat: -22.0024, lng: 148.0966, suburb: 'Isaac River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 135,000 m3 allocated. 45,000 m3/yr max. QMAN 300150. MALS PLANT HIRE PTY LTD. Isaac River, Fitzroy Basin Basin' },
    { name: 'Isaac River — MALS PLANT HIRE PTY LTD', type: 'quarry', lat: -21.9714, lng: 148.0533, suburb: 'Isaac River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 24,000 m3 allocated. 6,000 m3/yr max. QMAN 101072. MALS PLANT HIRE PTY LTD. Isaac River, Fitzroy Basin Basin' },
    { name: 'Nebo Creek — PHILLIP JOHN MCDONALD', type: 'quarry', lat: -21.6958, lng: 148.6894, suburb: 'Nebo Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 12,000 m3 allocated. 6,000 m3/yr max. QMAN 300325. PHILLIP JOHN MCDONALD. Nebo Creek, Fitzroy Basin Basin' },
    { name: 'Nebo Creek — KELLI  DURIE', type: 'quarry', lat: -21.6436, lng: 148.6767, suburb: 'Nebo Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,000 m3 allocated. 3,000 m3/yr max. QMAN 100895. KELLI  DURIE. Nebo Creek, Fitzroy Basin Basin' },
    // Longreach
    { name: 'Unnamed Tributary of Thomson River — CHAMPION CONTRACTING PT', type: 'quarry', lat: -23.2533, lng: 144.3164, suburb: 'Unnamed Tributary of Thomson River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 6,000 m3 allocated. 1,200 m3/yr max. QMAN 300119. CHAMPION CONTRACTING PTY LTD. Unnamed Tributary of Thomson River, Coopers Creek Basin Basin' },
    // Mackay
    { name: 'Blacks Creek — ANDREW T DEGUARA,MELISSA DEGUARA', type: 'quarry', lat: -21.3109, lng: 148.8338, suburb: 'Blacks Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 42,000 m3 allocated. 14,000 m3/yr max. QMAN 300300. ANDREW T DEGUARA,MELISSA DEGUARA. Blacks Creek, Pioneer Basin Basin' },
    { name: 'Blacks Creek and Pioneer River — ANDREW T DEGUARA,MELISSA DE', type: 'quarry', lat: -21.3044, lng: 148.8403, suburb: 'Blacks Creek and Pioneer River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 15,000 m3 allocated. 5,000 m3/yr max. QMAN 300214. ANDREW T DEGUARA,MELISSA DEGUARA. Blacks Creek and Pioneer River, Pioneer Basin Basin' },
    { name: 'Cattle Creek — ANTHONY SCRIHA', type: 'quarry', lat: -21.1782, lng: 148.8192, suburb: 'Cattle Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 100,000 m3 allocated. 20,000 m3/yr max. QMAN 300391. ANTHONY SCRIHA. Cattle Creek, Pioneer Basin Basin' },
    { name: 'Cattle Creek — MOBILE CRUSHING CO. PTY. LTD.', type: 'quarry', lat: -21.1932, lng: 148.7871, suburb: 'Cattle Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 250,000 m3 allocated. 50,000 m3/yr max. QMAN 300368. MOBILE CRUSHING CO. PTY. LTD.. Cattle Creek, Pioneer Basin Basin' },
    { name: 'O Connell River — TALBOTS EARTHMOVING & BULK HAULAGE PTY. LT', type: 'quarry', lat: -20.6197, lng: 148.5869, suburb: 'O Connell River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 6,000 m3 allocated. 3,000 m3/yr max. QMAN 100689. TALBOTS EARTHMOVING & BULK HAULAGE PTY. LTD.. O Connell River, OConnell Basin Basin' },
    { name: 'O Connell River — TALBOTS EARTHMOVING & BULK HAULAGE PTY. LT', type: 'quarry', lat: -20.6261, lng: 148.5794, suburb: 'O Connell River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 4,000 m3 allocated. 2,000 m3/yr max. QMAN 100703. TALBOTS EARTHMOVING & BULK HAULAGE PTY. LTD.. O Connell River, OConnell Basin Basin' },
    { name: 'Pioneer River — CLANVILLE SUGAR PTY LTD', type: 'quarry', lat: -21.2786, lng: 148.8253, suburb: 'Pioneer River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 250,000 m3 allocated. 50,000 m3/yr max. QMAN 300225. CLANVILLE SUGAR PTY LTD. Pioneer River, Pioneer Basin Basin' },
    { name: 'Pioneer River — MOBILE CRUSHING CO. PTY. LTD.', type: 'quarry', lat: -21.2302, lng: 148.8138, suburb: 'Pioneer River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 48,750 m3 allocated. 9,750 m3/yr max. QMAN QMA10000401. MOBILE CRUSHING CO. PTY. LTD.. Pioneer River, Pioneer Basin Basin' },
    { name: 'Pioneer River — CLANVILLE SUGAR PTY LTD', type: 'quarry', lat: -21.2881, lng: 148.8295, suburb: 'Pioneer River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 34,445 m3 allocated. 6,889 m3/yr max. QMAN 300335. CLANVILLE SUGAR PTY LTD. Pioneer River, Pioneer Basin Basin' },
    { name: 'Pioneer River — MOBILE CRUSHING CO. PTY. LTD.', type: 'quarry', lat: -21.2500, lng: 148.8142, suburb: 'Pioneer River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 17,500 m3 allocated. 3,500 m3/yr max. QMAN 101100. MOBILE CRUSHING CO. PTY. LTD.. Pioneer River, Pioneer Basin Basin' },
    // Maranoa
    { name: 'Blyth Creek — ROMA SANDS PTY LTD', type: 'quarry', lat: -26.5451, lng: 149.0007, suburb: 'Blyth Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 30,800 m3 allocated. 7,700 m3/yr max. QMAN 300235. ROMA SANDS PTY LTD. Blyth Creek, Balonne-Condamine Basin Basin' },
    { name: 'Bungeworgorai Creek — ROMA SANDS PTY LTD', type: 'quarry', lat: -26.4446, lng: 148.6491, suburb: 'Bungeworgorai Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 13,000 m3 allocated. 3,250 m3/yr max. QMAN 300204. ROMA SANDS PTY LTD. Bungeworgorai Creek, Balonne-Condamine Basin Basin' },
    { name: 'Maranoa River — CARMELO CICERO ,WENDY LEANNE CICERO', type: 'quarry', lat: -26.4723, lng: 147.9572, suburb: 'Maranoa River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 300,000 m3 allocated. 100,000 m3/yr max. QMAN 300312. CARMELO CICERO ,WENDY LEANNE CICERO. Maranoa River, Balonne-Condamine Basin Basin' },
    { name: 'Maranoa River — ROMA SANDS PTY LTD', type: 'quarry', lat: -26.5984, lng: 148.0400, suburb: 'Maranoa River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 5,000 m3 allocated. 5,000 m3/yr max. QMAN QMA10000487. ROMA SANDS PTY LTD. Maranoa River, Balonne-Condamine Basin Basin' },
    { name: 'Maranoa River — ROMA SANDS PTY LTD', type: 'quarry', lat: -26.5624, lng: 148.0096, suburb: 'Maranoa River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 10,000 m3 allocated. 10,000 m3/yr max. QMAN QMA10000540. ROMA SANDS PTY LTD. Maranoa River, Balonne-Condamine Basin Basin' },
    // Mareeba
    { name: 'Barron River — JOHN DAVID GREGO,RON  GREGO', type: 'quarry', lat: -16.8122, lng: 145.6289, suburb: 'Barron River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 3,000 m3 allocated. 600 m3/yr max. QMAN 300453. JOHN DAVID GREGO,RON  GREGO. Barron River, Barron Basin Basin' },
    { name: 'Barron River — RON  GREGO,JOHN DAVID GREGO', type: 'quarry', lat: -16.8004, lng: 145.5791, suburb: 'Barron River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 1,000 m3 allocated. 200 m3/yr max. QMAN QMA10000019. RON  GREGO,JOHN DAVID GREGO. Barron River, Barron Basin Basin' },
    { name: 'Barron River — DALE LEIGH MATTSSON', type: 'quarry', lat: -16.8023, lng: 145.5801, suburb: 'Barron River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 5,500 m3 allocated. 5,500 m3/yr max. QMAN QMA10000023. DALE LEIGH MATTSSON. Barron River, Barron Basin Basin' },
    { name: 'Emu Creek — WATTOS EARTHMOVING  & MACHINERY HIRE PTY LTD', type: 'quarry', lat: -17.3350, lng: 144.9508, suburb: 'Emu Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 15,000 m3 allocated. 3,000 m3/yr max. QMAN 300417. WATTOS EARTHMOVING  & MACHINERY HIRE PTY LTD. Emu Creek, Mitchell Basin Basin' },
    // McKinlay
    { name: 'Mckinlay River — PETER ALEXANDER MCAULEY,DIANA JULIE MCAULEY', type: 'quarry', lat: -21.6644, lng: 140.9970, suburb: 'Mckinlay River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 20,000 m3 allocated. 4,000 m3/yr max. QMAN QMA10000290. PETER ALEXANDER MCAULEY,DIANA JULIE MCAULEY. Mckinlay River, Flinders Basin Basin' },
    // Mckinlay
    { name: 'Mckinlay River — PETER ALEXANDER MCAULEY,DIANA JULIE MCAULEY', type: 'quarry', lat: -21.6644, lng: 140.9970, suburb: 'Mckinlay River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 65,000 m3 allocated. 13,000 m3/yr max. QMAN QMA10000226. PETER ALEXANDER MCAULEY,DIANA JULIE MCAULEY. Mckinlay River, Flinders Basin Basin' },
    // Mount Isa
    { name: 'Leichhardt River — MICHAEL JAMES DERRICK', type: 'quarry', lat: -20.5233, lng: 139.7347, suburb: 'Leichhardt River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 2,000 m3 allocated. 2,000 m3/yr max. QMAN QMA10000426. MICHAEL JAMES DERRICK. Leichhardt River, Leichhardt Basin Basin' },
    { name: 'Leichhardt River (East Branch) — MICHAEL JAMES DERRICK', type: 'quarry', lat: -20.5239, lng: 139.7356, suburb: 'Leichhardt River (East Branch)', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 2,000 m3 allocated. 2,000 m3/yr max. QMAN 100833. MICHAEL JAMES DERRICK. Leichhardt River (East Branch), Leichhardt Basin Basin' },
    { name: 'Moonah Creek — COROMANDEL HOLDINGS PTY LTD', type: 'quarry', lat: -21.3828, lng: 139.0461, suburb: 'Moonah Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 40,000 m3 allocated. 8,000 m3/yr max. QMAN 300109. COROMANDEL HOLDINGS PTY LTD. Moonah Creek, Georgina Basin Basin' },
    { name: 'WAVERLY CREEK — ISA SAND PTY LTD', type: 'quarry', lat: -21.4278, lng: 139.1208, suburb: 'WAVERLY CREEK', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 15,000 m3 allocated. 5,000 m3/yr max. QMAN 101067. ISA SAND PTY LTD. WAVERLY CREEK, Georgina Basin Basin' },
    // Murweh
    { name: 'Warrego River — JAMES ARTHUR CASTLE', type: 'quarry', lat: -26.3962, lng: 146.2445, suburb: 'Warrego River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 230 m3 allocated. 230 m3/yr max. QMAN QMA10000302. JAMES ARTHUR CASTLE. Warrego River, Warrego Basin Basin' },
    // North Burnett
    { name: 'Burnett River — Callum Boodle', type: 'quarry', lat: -25.6136, lng: 151.6339, suburb: 'Burnett River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 50,000 m3 allocated. 10,000 m3/yr max. QMAN QMA10000090. Callum Boodle. Burnett River, Burnett Basin Basin' },
    { name: 'Burnett River — TREVOR TAYLOR EARTHMOVING PTY LTD', type: 'quarry', lat: -25.6165, lng: 151.6336, suburb: 'Burnett River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 3,000 m3 allocated. 600 m3/yr max. QMAN QMA10000150. TREVOR TAYLOR EARTHMOVING PTY LTD. Burnett River, Burnett Basin Basin' },
    { name: 'Burnett River — Callum George Boodle', type: 'quarry', lat: -25.5963, lng: 151.3372, suburb: 'Burnett River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 15,000 m3 allocated. 5,000 m3/yr max. QMAN QMA10000192. Callum George Boodle. Burnett River, Burnett Basin Basin' },
    { name: 'Burnett River — QUEENSLAND PREMIX PTY LTD', type: 'quarry', lat: -25.6025, lng: 151.6239, suburb: 'Burnett River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 15,000 m3 allocated. 3,000 m3/yr max. QMAN 300222. QUEENSLAND PREMIX PTY LTD. Burnett River, Burnett Basin Basin' },
    // Paroo
    { name: 'Warrego River — PAROO SHIRE COUNCIL', type: 'quarry', lat: -28.1167, lng: 145.6858, suburb: 'Warrego River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 45,000 m3 allocated. 45,000 m3/yr max. QMAN 300446. PAROO SHIRE COUNCIL. Warrego River, Warrego Basin Basin' },
    { name: 'Warrego River — Cameron Mauch,Raelene Mauch', type: 'quarry', lat: -28.1596, lng: 145.7072, suburb: 'Warrego River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 5,000 m3 allocated. 5,000 m3/yr max. QMAN QMA10000091. Cameron Mauch,Raelene Mauch. Warrego River, Warrego Basin Basin' },
    { name: 'Warrego River — Anthony & Kerri-anne Tuckwell', type: 'quarry', lat: -28.1394, lng: 145.6946, suburb: 'Warrego River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 1,000 m3 allocated. 1,000 m3/yr max. QMAN QMA10000420. Anthony & Kerri-anne Tuckwell. Warrego River, Warrego Basin Basin' },
    // Richmond
    { name: 'Dutton River — JS SANDS PTY LTD', type: 'quarry', lat: -20.7353, lng: 143.1918, suburb: 'Dutton River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 75,000 m3 allocated. 15,000 m3/yr max. QMAN QMA10000511. JS SANDS PTY LTD. Dutton River, Flinders Basin Basin' },
    { name: 'Dutton River — JS SANDS PTY LTD', type: 'quarry', lat: -20.7336, lng: 143.1661, suburb: 'Dutton River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 75,000 m3 allocated. 15,000 m3/yr max. QMAN QMA10000515. JS SANDS PTY LTD. Dutton River, Flinders Basin Basin' },
    { name: 'Flinders River — CLONCURRY SAND AND GRAVEL PTY LTD', type: 'quarry', lat: -20.6541, lng: 142.8550, suburb: 'Flinders River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 60,000 m3 allocated. 20,000 m3/yr max. QMAN 300192. CLONCURRY SAND AND GRAVEL PTY LTD. Flinders River, Flinders Basin Basin' },
    { name: 'Stawell River — VONIJIM PTY. LIMITED', type: 'quarry', lat: -20.4412, lng: 142.9126, suburb: 'Stawell River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 75,000 m3 allocated. 15,000 m3/yr max. QMAN QMA10000479. VONIJIM PTY. LIMITED. Stawell River, Flinders Basin Basin' },
    // Rockhampton
    { name: 'Fitzroy River (Barrage Storage) — HEIDELBERG MATERIALS AUSTR', type: 'quarry', lat: -23.3256, lng: 150.4672, suburb: 'Fitzroy River (Barrage Storage)', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 500,000 m3 allocated. 150,000 m3/yr max. QMAN 101085. HEIDELBERG MATERIALS AUSTRALIA PTY LTD. Fitzroy River (Barrage Storage), Fitzroy Basin Basin' },
    { name: 'Fitzroy River (Barrage Storage) — HEIDELBERG MATERIALS AUSTR', type: 'quarry', lat: -23.3203, lng: 150.4722, suburb: 'Fitzroy River (Barrage Storage)', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 300,000 m3 allocated. 150,000 m3/yr max. QMAN QMA10000497. HEIDELBERG MATERIALS AUSTRALIA PTY LTD. Fitzroy River (Barrage Storage), Fitzroy Basin Basin' },
    { name: 'Fitzroy River (Barrage Storage) — HOPEMAN PTY. LTD.', type: 'quarry', lat: -23.3339, lng: 150.4480, suburb: 'Fitzroy River (Barrage Storage)', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 500,000 m3 allocated. 100,000 m3/yr max. QMAN 300428. HOPEMAN PTY. LTD.. Fitzroy River (Barrage Storage), Fitzroy Basin Basin' },
    // South Burnett
    { name: 'Boyne River — BURNETT READYMIX PTY LTD', type: 'quarry', lat: -26.3969, lng: 151.2963, suburb: 'Boyne River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 45,000 m3 allocated. 9,000 m3/yr max. QMAN 300310. BURNETT READYMIX PTY LTD. Boyne River, Burnett Basin Basin' },
    { name: 'Hirst Creek — MICHAEL JOHNSON', type: 'quarry', lat: -26.4320, lng: 151.6521, suburb: 'Hirst Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 13,500 m3 allocated. 6,750 m3/yr max. QMAN QMA10000134. MICHAEL JOHNSON. Hirst Creek, Burnett Basin Basin' },
    { name: 'Stuart River — GTE TRANSPORT SERVICES PTY LTD', type: 'quarry', lat: -26.4150, lng: 151.6461, suburb: 'Stuart River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 600 m3 allocated. 600 m3/yr max. QMAN QMA10000514. GTE TRANSPORT SERVICES PTY LTD. Stuart River, Burnett Basin Basin' },
    // Southern Downs
    { name: 'Sandy Creek — DENIS HUGH JOHN MIDDLETON', type: 'quarry', lat: -28.1951, lng: 151.9405, suburb: 'Sandy Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 2,000 m3 allocated. 2,000 m3/yr max. QMAN QMA10000520. DENIS HUGH JOHN MIDDLETON. Sandy Creek, Balonne-Condamine Basin Basin' },
    // Tablelands
    { name: 'Wild River — KIDNER CONTRACTING PTY LTD', type: 'quarry', lat: -17.6381, lng: 145.2911, suburb: 'Wild River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 3,000 m3 allocated. 600 m3/yr max. QMAN 300451. KIDNER CONTRACTING PTY LTD. Wild River, Herbert Basin Basin' },
    { name: 'Wild River — HAYDEN SHOREY CONTRACTING PTY LTD', type: 'quarry', lat: -17.6678, lng: 145.2633, suburb: 'Wild River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,100 m3 allocated. 620 m3/yr max. QMAN 101169. HAYDEN SHOREY CONTRACTING PTY LTD. Wild River, Herbert Basin Basin' },
    // Toowoomba
    { name: 'Weir River — MCKINLAYS WESTERN CREEK SAND PTY LTD', type: 'quarry', lat: -27.7199, lng: 150.7443, suburb: 'Weir River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 120,000 m3 allocated. 24,000 m3/yr max. QMAN 300372. MCKINLAYS WESTERN CREEK SAND PTY LTD. Weir River, Border Rivers Basin Basin' },
    { name: 'Western Creek — PEARLJANEY PTY LTD ATF KEIBOOBILLY FAMILY TR', type: 'quarry', lat: -27.8034, lng: 150.9279, suburb: 'Western Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 5,000 m3 allocated. 1,000 m3/yr max. QMAN 300083. PEARLJANEY PTY LTD ATF KEIBOOBILLY FAMILY TRUST TR. Western Creek, Border Rivers Basin Basin' },
    { name: 'Western Creek — MCKINLAY BROTHERS PTY LTD', type: 'quarry', lat: -27.8443, lng: 150.8547, suburb: 'Western Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 120,000 m3 allocated. 24,000 m3/yr max. QMAN 300105. MCKINLAY BROTHERS PTY LTD. Western Creek, Border Rivers Basin Basin' },
    // Townsville
    { name: 'Alice River — NQ SAND & BULK HAULAGE PTY LTD', type: 'quarry', lat: -19.2578, lng: 146.6294, suburb: 'Alice River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 13,250 m3 allocated. 2,650 m3/yr max. QMAN 101158. NQ SAND & BULK HAULAGE PTY LTD. Alice River, Black Basin Basin' },
    { name: 'Alligator Creek — GREG MCCAHILL EARTHWORKS & HAULAGE PTY LTD', type: 'quarry', lat: -19.3753, lng: 146.9644, suburb: 'Alligator Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 2,000 m3 allocated. 1,000 m3/yr max. QMAN 100652. GREG MCCAHILL EARTHWORKS & HAULAGE PTY LTD. Alligator Creek, Ross Basin Basin' },
    { name: 'Black River — NQ SAND & BULK HAULAGE PTY LTD', type: 'quarry', lat: -19.2817, lng: 146.6057, suburb: 'Black River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel. 13,250 m3 allocated. 2,650 m3/yr max. QMAN 300198. NQ SAND & BULK HAULAGE PTY LTD. Black River, Black Basin Basin' },
    { name: 'Black River — PJS EXCAVATIONS PTY LTD', type: 'quarry', lat: -19.2567, lng: 146.6172, suburb: 'Black River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 5,300 m3 allocated. 2,650 m3/yr max. QMAN 100683. PJS EXCAVATIONS PTY LTD. Black River, Black Basin Basin' },
    { name: 'Bluewater Creek — WAYNE  FRANCIS PRICHARD', type: 'quarry', lat: -19.2252, lng: 146.4980, suburb: 'Bluewater Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 9,000 m3 allocated. 3,000 m3/yr max. QMAN 100941. WAYNE  FRANCIS PRICHARD. Bluewater Creek, Black Basin Basin' },
    { name: 'Central Creek — SHANE GREGORY JONSSON', type: 'quarry', lat: -19.4864, lng: 146.7141, suburb: 'Central Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 30,000 m3 allocated. 6,000 m3/yr max. QMAN 300418. SHANE GREGORY JONSSON. Central Creek, Ross Basin Basin' },
    { name: 'Central Creek — TOWNSVILLE GRADED SANDS PTY LTD', type: 'quarry', lat: -19.4868, lng: 146.7087, suburb: 'Central Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 45,000 m3 allocated. 9,000 m3/yr max. QMAN QMA10000586. TOWNSVILLE GRADED SANDS PTY LTD. Central Creek, Ross Basin Basin' },
    { name: 'Four Mile Creek — GREG MCCAHILL EARTHWORKS & HAULAGE PTY LTD', type: 'quarry', lat: -19.5410, lng: 146.8134, suburb: 'Four Mile Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 3,200 m3 allocated. 1,600 m3/yr max. QMAN 100510. GREG MCCAHILL EARTHWORKS & HAULAGE PTY LTD. Four Mile Creek, Ross Basin Basin' },
    { name: 'Ross River — TOWNSVILLE GRADED SANDS PTY LTD', type: 'quarry', lat: -19.4747, lng: 146.7210, suburb: 'Ross River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand. 50,000 m3 allocated. 10,000 m3/yr max. QMAN 100082. TOWNSVILLE GRADED SANDS PTY LTD. Ross River, Ross Basin Basin' },
    { name: 'Ross River — TOWNSVILLE GRADED SANDS PTY LTD', type: 'quarry', lat: -19.4508, lng: 146.7333, suburb: 'Ross River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 200,000 m3 allocated. 200,000 m3/yr max. QMAN 300057. TOWNSVILLE GRADED SANDS PTY LTD. Ross River, Ross Basin Basin' },
    // Western Downs
    { name: 'Juandah Creek — JUANDAH QUARRY PTY LTD', type: 'quarry', lat: -26.3498, lng: 150.0260, suburb: 'Juandah Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 75,000 m3 allocated. 15,000 m3/yr max. QMAN 300276. JUANDAH QUARRY PTY LTD. Juandah Creek, Fitzroy Basin Basin' },
    // Whitsunday
    { name: 'Andromache River — TALBOTS EARTHMOVING & BULK HAULAGE PTY. L', type: 'quarry', lat: -20.5936, lng: 148.5992, suburb: 'Andromache River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 15,000 m3 allocated. 3,000 m3/yr max. QMAN 100966. TALBOTS EARTHMOVING & BULK HAULAGE PTY. LTD.. Andromache River, OConnell Basin Basin' },
    { name: 'Bogie River — WHITSUNDAY REGIONAL COUNCIL', type: 'quarry', lat: -20.3117, lng: 147.9217, suburb: 'Bogie River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 15,000 m3 allocated. 3,000 m3/yr max. QMAN 100878. WHITSUNDAY REGIONAL COUNCIL. Bogie River, Burdekin Basin Basin' },
    { name: 'Bowen River — SEARLES TRANSPORT PTY LTD', type: 'quarry', lat: -20.7517, lng: 147.8361, suburb: 'Bowen River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 15,000 m3 allocated. 3,000 m3/yr max. QMAN 100302. SEARLES TRANSPORT PTY LTD. Bowen River, Burdekin Basin Basin' },
    { name: 'Don River — HUMPHRIES PTY LTD', type: 'quarry', lat: -19.9841, lng: 148.2027, suburb: 'Don River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 75,000 m3 allocated. 15,000 m3/yr max. QMAN 300450. HUMPHRIES PTY LTD. Don River, Don Basin Basin' },
    { name: 'Don River — WHITSUNDAY REGIONAL COUNCIL', type: 'quarry', lat: -20.0030, lng: 148.2032, suburb: 'Don River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 7,500 m3 allocated. 1,500 m3/yr max. QMAN 100811. WHITSUNDAY REGIONAL COUNCIL. Don River, Don Basin Basin' },
    { name: 'Don River — HUMPHRIES PTY LTD', type: 'quarry', lat: -20.0519, lng: 148.1995, suburb: 'Don River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 50,000 m3 allocated. 10,000 m3/yr max. QMAN 300452. HUMPHRIES PTY LTD. Don River, Don Basin Basin' },
    { name: 'Don River — PATRICK NEIL MCDONNELL,AMY FAY MCDONNELL', type: 'quarry', lat: -20.0483, lng: 148.2008, suburb: 'Don River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Other. 180,000 m3 allocated. 36,000 m3/yr max. QMAN 300115. PATRICK NEIL MCDONNELL,AMY FAY MCDONNELL. Don River, Don Basin Basin' },
    { name: 'Don River — MANSELL PREMIX PTY LTD', type: 'quarry', lat: -19.9972, lng: 148.1992, suburb: 'Don River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 50,000 m3 allocated. 10,000 m3/yr max. QMAN 300263. MANSELL PREMIX PTY LTD. Don River, Don Basin Basin' },
    { name: 'Don River — MOBILE CRUSHING CO. PTY. LTD.', type: 'quarry', lat: -19.9993, lng: 148.2038, suburb: 'Don River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 10,000 m3 allocated. 2,000 m3/yr max. QMAN 300144. MOBILE CRUSHING CO. PTY. LTD.. Don River, Don Basin Basin' },
    { name: 'Don River — FYNBAT PTY. LIMITED', type: 'quarry', lat: -19.9968, lng: 148.1999, suburb: 'Don River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 60,000 m3 allocated. 12,000 m3/yr max. QMAN 101155. FYNBAT PTY. LIMITED. Don River, Don Basin Basin' },
    { name: 'Don River — LD & LJ HILLERY PTY LIMITED', type: 'quarry', lat: -19.9891, lng: 148.1986, suburb: 'Don River', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 100,000 m3 allocated. 20,000 m3/yr max. QMAN QMA10000559. LD & LJ HILLERY PTY LIMITED. Don River, Don Basin Basin' },
    { name: 'Dry Creek — MIRTHILL PTY. LTD.', type: 'quarry', lat: -19.9963, lng: 148.1356, suburb: 'Dry Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 40,000 m3 allocated. 8,000 m3/yr max. QMAN 300100. MIRTHILL PTY. LTD.. Dry Creek, Don Basin Basin' },
    { name: 'Rosella Creek — SEARLES TRANSPORT PTY LTD', type: 'quarry', lat: -20.7892, lng: 147.8239, suburb: 'Rosella Creek', icon: 'fa-gem', color: '#8a8478', hours: 'business', notes: 'River extraction — Sand,Gravel,Rock. 13,000 m3 allocated. 2,600 m3/yr max. QMAN 300059. SEARLES TRANSPORT PTY LTD. Rosella Creek, Burdekin Basin Basin' },
    // ===== LANDFILLS =====
    // Commercial Landfills
    { name: 'Veolia — Ti-Tree Bioenergy', type: 'landfill', lat: -27.5500, lng: 152.8600, suburb: 'Ipswich', icon: 'fa-dumpster', color: '#a0734a', hours: '24/7', notes: 'Engineered landfill with bioenergy generation. Accepts C&D and general waste. 24/7 commercial receivals.' },
    { name: 'BMI — Bunya Landfill', type: 'landfill', lat: -27.3300, lng: 152.9500, suburb: 'Bunya', icon: 'fa-dumpster', color: '#a0734a', hours: '24/7', notes: 'Commercial landfill. General waste, green waste, C&D waste. 24/7 commercial receivals.' },
    { name: 'Cleanaway — Stapylton Landfill', type: 'landfill', lat: -27.7300, lng: 153.2600, suburb: 'Stapylton', icon: 'fa-dumpster', color: '#a0734a', hours: '24/7', notes: 'Major commercial landfill servicing Gold Coast and Logan regions. 24/7 commercial receivals.' },
    { name: 'REMONDIS — Swanbank Landfill', type: 'landfill', lat: -27.6500, lng: 152.8500, suburb: 'Swanbank', icon: 'fa-dumpster', color: '#a0734a', hours: '24/7', notes: '426 Swanbank Rd, Swanbank. Commercial landfill and transfer station with methane capture. 24/7 commercial receivals.' },
    { name: 'GCCC — Reedy Creek Landfill', type: 'landfill', lat: -28.1100, lng: 153.3900, suburb: 'Reedy Creek', icon: 'fa-dumpster', color: '#a0734a', hours: 'business', notes: 'Hutchinson St, Burleigh Heads. Active council landfill and waste recycling centre. 7am-4:45pm, 7 days.' },
    { name: 'GCCC — Stapylton Landfill & Recycling', type: 'landfill', lat: -27.7250, lng: 153.2650, suburb: 'Stapylton', icon: 'fa-dumpster', color: '#a0734a', hours: 'business', notes: '16 Rossmanns Rd, Stapylton. Council landfill accepting commercial and domestic waste. 7am-4:45pm, 7 days.' },
    { name: 'TRC — Wellcamp Waste Management', type: 'landfill', lat: -27.5413, lng: 151.8439, suburb: 'Wellcamp', icon: 'fa-dumpster', color: '#a0734a', hours: 'business', notes: '270 O\'Mara Rd, Wellcamp. Toowoomba\'s main waste facility. Landfill and transfer station.' },
    { name: 'LVRC — Gatton Landfill', type: 'landfill', lat: -27.5700, lng: 152.2700, suburb: 'Gatton', icon: 'fa-dumpster', color: '#a0734a', hours: 'business', notes: 'Fords Rd, Gatton. Landfill and transfer station. Mon-Sat 8am-5pm, Sun 9am-5pm.' },
    { name: 'MBRC — Caboolture Waste Management', type: 'landfill', lat: -27.0700, lng: 152.9500, suburb: 'Caboolture', icon: 'fa-dumpster', color: '#a0734a', hours: 'business', notes: 'Caboolture waste management facility with landfill. Accepts asbestos. Open 7 days.' },
    { name: 'SRC — Esk Landfill & Recycling', type: 'landfill', lat: -27.2100, lng: 152.4100, suburb: 'Coal Creek', icon: 'fa-dumpster', color: '#a0734a', hours: 'business', notes: '30 Murrumba Rd, Coal Creek. Landfill and recycling centre. Fri-Tue 8am-5pm.' },

    // ===== TRANSFER STATIONS =====
    // Brisbane City Council (BCC)
    { name: 'BCC — Ferny Grove Transfer Station', type: 'transfer', lat: -27.3950, lng: 152.9350, suburb: 'Ferny Grove', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Council resource recovery centre. General waste, green waste, recyclables. 6:30am-5:45pm, 7 days.' },
    { name: 'BCC — Chandler Transfer Station', type: 'transfer', lat: -27.5100, lng: 153.1400, suburb: 'Chandler', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Eastern suburbs resource recovery centre. Full recycling facilities. 6:30am-5:45pm, 7 days.' },
    { name: 'BCC — Nudgee Transfer Station', type: 'transfer', lat: -27.3700, lng: 153.0900, suburb: 'Nudgee Beach', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '1372 Nudgee Rd, Nudgee Beach. Major resource recovery centre. 6:30am-5:45pm, 7 days incl public holidays.' },
    { name: 'BCC — Willawong Transfer Station', type: 'transfer', lat: -27.6050, lng: 153.0100, suburb: 'Willawong', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '360 Sherbrooke Rd, Willawong. Resource recovery centre. 6:30am-5:45pm, 7 days incl public holidays.' },

    // Gold Coast City Council (GCCC)
    { name: 'GCCC — Merrimac Transfer Station', type: 'transfer', lat: -28.0400, lng: 153.3800, suburb: 'Merrimac', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Boowaggan Rd, Merrimac. Gold Coast Council waste facility. All waste types. 7am-4:45pm, 7 days.' },
    { name: 'GCCC — Molendinar Transfer Station', type: 'transfer', lat: -27.9600, lng: 153.3700, suburb: 'Molendinar', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Cnr Jacobs Rd & Herbertson Dr, Molendinar. Waste and recycling centre. 7am-4:45pm, 7 days.' },

    // Sunshine Coast Council (SCC)
    { name: 'SCC — Nambour Resource Recovery', type: 'transfer', lat: -26.6500, lng: 153.0000, suburb: 'Bli Bli', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Nambour Connection Rd, Bli Bli. Major resource recovery centre (undergoing upgrade). 7am-5pm.' },
    { name: 'SCC — Caloundra Landfill & RRC', type: 'transfer', lat: -26.8050, lng: 153.1000, suburb: 'Caloundra West', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '171 Pierce Ave, Caloundra West. Landfill and resource recovery centre with recycle market. 7am-5pm, 7 days.' },
    { name: 'SCC — Buderim Resource Recovery', type: 'transfer', lat: -26.6800, lng: 153.0600, suburb: 'Buderim', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Syd Lingard Dr, Buderim. Resource recovery centre with recycle market. 7am-5pm, 7 days.' },
    { name: 'SCC — Beerwah Resource Recovery', type: 'transfer', lat: -26.8500, lng: 152.9500, suburb: 'Beerwah', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '121 Roberts Rd, Beerwah. Resource recovery centre with recycle market. 7am-5pm, 7 days.' },

    // Noosa Shire Council (NSC)
    { name: 'NSC — Doonan Resource Recovery', type: 'transfer', lat: -26.4500, lng: 153.0200, suburb: 'Doonan', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '561 Eumundi-Noosa Rd, Doonan. Main Noosa waste facility with landfill. 7am-5pm, 7 days.' },
    { name: 'NSC — Pomona Transfer Station', type: 'transfer', lat: -26.3700, lng: 152.8600, suburb: 'Pomona', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Louis Bazzo Dr, Pomona. Waste transfer station. Fri-Sun 8am-1pm.' },
    { name: 'NSC — Cooroy Transfer Station', type: 'transfer', lat: -26.4200, lng: 152.9100, suburb: 'Cooroy', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Mary River Rd, Cooroy. Waste transfer station. Sat-Mon 8am-1pm.' },

    // Logan City Council (LCC)
    { name: 'LCC — Browns Plains Waste Facility', type: 'transfer', lat: -27.6650, lng: 153.0500, suburb: 'Heritage Park', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '41 Recycle Way, Heritage Park. Waste and recycling facility. Open 7 days.' },
    { name: 'LCC — Carbrook Waste Facility', type: 'transfer', lat: -27.6600, lng: 153.2700, suburb: 'Cornubia', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '35-63 Fabian Rd, Cornubia (entry via 1801 Mt Cotton Rd). Waste and recycling. Open 7 days.' },
    { name: 'LCC — Beenleigh Waste Facility', type: 'transfer', lat: -27.7200, lng: 153.2000, suburb: 'Beenleigh', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '15 Wuraga Rd, Beenleigh. Waste and recycling facility. Open 7 days.' },
    { name: 'LCC — Greenbank Waste Facility', type: 'transfer', lat: -27.7200, lng: 153.0100, suburb: 'New Beith', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '124-142 Pub Lane, New Beith. Waste and recycling facility. Open 7 days.' },
    { name: 'LCC — Logan Village Waste Facility', type: 'transfer', lat: -27.7700, lng: 153.1100, suburb: 'Logan Village', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '1406-1432 Waterford Tamborine Rd, Logan Village. Waste and recycling. Open 7 days.' },

    // Ipswich City Council (ICC)
    { name: 'ICC — Riverview Resource Recovery', type: 'transfer', lat: -27.6000, lng: 152.7700, suburb: 'Riverview', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '81 Riverview Rd, Riverview. Main Ipswich resource recovery centre. Open 7 days.' },
    { name: 'ICC — Rosewood Resource Recovery', type: 'transfer', lat: -27.6400, lng: 152.5900, suburb: 'Rosewood', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '94 Oakleigh Colliery Rd, Rosewood. Resource recovery centre. Open 7 days.' },

    // Moreton Bay Regional Council (MBRC)
    { name: 'MBRC — Bunya Waste Management', type: 'transfer', lat: -27.3500, lng: 152.9400, suburb: 'Bunya', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '384 Bunya Rd, Bunya. Waste management facility. Open 7 days.' },
    { name: 'MBRC — Redcliffe Transfer Station', type: 'transfer', lat: -27.2400, lng: 153.0800, suburb: 'Clontarf', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '261 Duffield Rd, Clontarf. Transfer station. Open 7 days.' },
    { name: 'MBRC — Dayboro Transfer Station', type: 'transfer', lat: -27.2000, lng: 152.8200, suburb: 'Dayboro', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '1721 Dayboro Rd, Dayboro. Transfer station. Open 7 days.' },
    { name: 'MBRC — Upper Caboolture Transfer Station', type: 'transfer', lat: -27.0400, lng: 152.8800, suburb: 'Upper Caboolture', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '789 Caboolture River Rd, Upper Caboolture. Transfer station. Open 7 days.' },

    // Redland City Council (RCC)
    { name: 'RCC — Birkdale Recycling & Waste', type: 'transfer', lat: -27.5000, lng: 153.2200, suburb: 'Birkdale', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '555-607 Old Cleveland Rd East, Birkdale. Main Redlands waste centre. Open 7 days.' },
    { name: 'RCC — Redland Bay Recycling & Waste', type: 'transfer', lat: -27.6400, lng: 153.3000, suburb: 'Redland Bay', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '761-789 German Church Rd, Redland Bay. Waste and recycling centre. Open 7 days.' },
    { name: 'RCC — North Stradbroke Island Transfer', type: 'transfer', lat: -27.4900, lng: 153.4400, suburb: 'North Stradbroke Island', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'East Coast Rd, North Stradbroke Island. Island waste transfer station.' },

    // Scenic Rim Regional Council (SRRC)
    { name: 'SRRC — Bromelton Waste Facility', type: 'transfer', lat: -27.9800, lng: 152.9200, suburb: 'Bromelton', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Waste Facility Rd, Bromelton. Central Scenic Rim facility. 9am-5pm, closed Wednesdays.' },
    { name: 'SRRC — Boonah Transfer Station', type: 'transfer', lat: -28.0100, lng: 152.6800, suburb: 'Dugandan', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '24 Evans Rd, Dugandan. Waste transfer station. 9am-5pm, closed Wednesdays.' },
    { name: 'SRRC — Canungra Transfer Station', type: 'transfer', lat: -28.0300, lng: 153.1600, suburb: 'Canungra', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Canungra waste transfer station. 9am-5pm, closed Wednesdays.' },
    { name: 'SRRC — Tamborine Mountain Transfer Station', type: 'transfer', lat: -27.9400, lng: 153.1800, suburb: 'Tamborine Mountain', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '137 Knoll Rd, Tamborine Mountain. Waste transfer station. 9am-5pm, closed Wednesdays.' },
    { name: 'SRRC — Kalbar Transfer Station', type: 'transfer', lat: -27.9400, lng: 152.6200, suburb: 'Kalbar', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Kalbar waste transfer station. 9am-5pm, limited days.' },
    { name: 'SRRC — Peak Crossing Transfer Station', type: 'transfer', lat: -27.7800, lng: 152.7300, suburb: 'Peak Crossing', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Peak Crossing waste transfer station. 9am-5pm, limited days.' },
    { name: 'SRRC — Rathdowney Transfer Station', type: 'transfer', lat: -28.2200, lng: 152.8700, suburb: 'Rathdowney', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Rathdowney waste transfer station. 9am-5pm, limited days.' },

    // Lockyer Valley Regional Council (LVRC)
    { name: 'LVRC — Laidley Transfer Station', type: 'transfer', lat: -27.6400, lng: 152.3900, suburb: 'Laidley Heights', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Burgess Rd, Laidley Heights. Transfer station. 9am-5pm, 7 days.' },
    { name: 'LVRC — Withcott Transfer Station', type: 'transfer', lat: -27.5600, lng: 152.0300, suburb: 'Withcott', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Spa Water Rd, Withcott. Transfer station. Mon-Fri 9am-1pm, Sat-Sun 9am-5pm.' },

    // Somerset Regional Council (SRC)
    { name: 'SRC — Kilcoy Transfer Station', type: 'transfer', lat: -26.9400, lng: 152.5600, suburb: 'Kilcoy', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '107 Carseldine St, Kilcoy. Refuse and recycling centre.' },
    { name: 'SRC — Coominya Transfer Station', type: 'transfer', lat: -27.3900, lng: 152.5000, suburb: 'Coominya', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '137 Wills Rd, Coominya. Transfer station. Wed-Sun 8am-5pm.' },

    // Toowoomba Regional Council (TRC)
    { name: 'TRC — Kleinton Transfer Station', type: 'transfer', lat: -27.4100, lng: 151.9400, suburb: 'Kleinton', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '210 Kleinton School Rd, Kleinton. Modern waste management facility.' },

    // ===== COMMERCIAL TRANSFER STATIONS =====
    { name: 'REMONDIS — Rocklea RRF', type: 'transfer', lat: -27.5450, lng: 152.9950, suburb: 'Rocklea', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '69 Grindle Rd, Rocklea. Commercial transfer station and resource recovery. Mon-Fri 6am-6pm, Sat 6am-12pm.' },
    { name: 'REMONDIS — Northgate RRF', type: 'transfer', lat: -27.3800, lng: 153.0600, suburb: 'Northgate', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: 'Northgate. Commercial resource recovery facility, transfer station and wastewater treatment. Mon-Fri.' },
    { name: 'Cleanaway — Willawong Transfer Station', type: 'transfer', lat: -27.6000, lng: 153.0050, suburb: 'Willawong', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '343 Bowhill Rd, Willawong. Commercial recycling and transfer station with organics recovery. Mon-Fri.' },
    { name: 'Cleanaway — Narangba Transfer Station', type: 'transfer', lat: -27.1950, lng: 152.9700, suburb: 'Narangba', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '26-32 Potassium St, Narangba. Commercial and industrial transfer station. Mon-Fri.' },
    { name: 'Cleanaway — Hemmant Resource Recovery', type: 'transfer', lat: -27.4500, lng: 153.1300, suburb: 'Hemmant', icon: 'fa-recycle', color: '#5c8a97', hours: 'business', notes: '33 Gosport St, Hemmant. Packaging waste recycling. 75,000t/yr capacity. Mon-Fri.' },
    // Soil Treatment Facilities
    { name: 'HiQ — Yatala Waste Treatment Facility', type: 'soil-treatment', lat: -27.7230, lng: 153.2350, suburb: 'Yatala', icon: 'fa-flask', color: '#8b7eb5', hours: 'business', notes: '12 Byte St, Yatala. Largest soil treatment facility in QLD — licensed 350,000t/yr. Chemical fixation, immobilisation, bioremediation, chemical oxidation. Accepts contaminated soils and controlled wastes. ERA approved. Mon-Fri 6am-5pm.' },
    { name: 'Downer — Brendale Resource Centre', type: 'soil-treatment', lat: -27.3194, lng: 152.9853, suburb: 'Brendale', icon: 'fa-flask', color: '#8b7eb5', hours: 'business', notes: '190 Leitchs Rd, Brendale. Sustainable Road Resource Centre with CDE soil washing plant. Processes contaminated street sweepings, NDD waste, gully pit waste. 35,000t/yr capacity. Mon-Fri 6am-4pm.' },
    { name: 'REMONDIS — Swanbank Soil Treatment', type: 'soil-treatment', lat: -27.6500, lng: 152.8500, suburb: 'Swanbank', icon: 'fa-flask', color: '#8b7eb5', hours: 'business', notes: 'Swanbank Rd, Swanbank. Contaminated soil testing & disposal — heavy metals, PFAS/PFOS, hydrocarbons. Lined landfill cells for regulated waste. 500,000t/yr total capacity. Mon-Fri 6am-5pm.' },
    { name: 'Lantrak — Swanbank Waste & Recycling', type: 'soil-treatment', lat: -27.6480, lng: 152.8650, suburb: 'Swanbank', icon: 'fa-flask', color: '#8b7eb5', hours: 'business', notes: '1 Memorial Dr, Swanbank. Accepts acid sulfate soils, low contaminated soils, asbestos soil. Handles Cat A, B, C material. PASS/ASS treatment. Mon-Sat, all-weather access.' },
    { name: 'Cleanaway — Narangba Hazardous Waste', type: 'soil-treatment', lat: -27.1960, lng: 152.9680, suburb: 'Narangba', icon: 'fa-flask', color: '#8b7eb5', hours: 'business', notes: '26-32 Potassium St, Narangba. Licensed hazardous waste facility. Contaminated soil treatment, dangerous goods disposal. Oil refinery, water treatment plant, on-site laboratory. Mon-Fri.' },
    { name: 'Pure Environmental — Wacol', type: 'soil-treatment', lat: -27.5900, lng: 152.9350, suburb: 'Wacol', icon: 'fa-flask', color: '#8b7eb5', hours: 'business', notes: 'Wacol. Licensed waste processing & treatment centre. Handles contaminated soils, PFAS liquids, hydrocarbon sludges, drilling muds. Hazardous and regulated waste. Mon-Fri 6am-5pm, Sat 6am-12pm.' },
    { name: 'BMI Resource Recovery — Stapylton', type: 'soil-treatment', lat: -27.7350, lng: 153.2100, suburb: 'Stapylton', icon: 'fa-flask', color: '#8b7eb5', hours: 'business', notes: '144 Rossmanns Rd, Stapylton. Accepts contaminated soils, asbestos, regulated waste. Lined landfill for non-recoverable waste. Mon-Fri 6am-6pm, Sat-Sun 6am-5pm.' },
    // C&D Recyclers
    { name: 'Alex Fraser — Narangba Recycling', type: 'cd-recycler', lat: -27.2000, lng: 152.9600, suburb: 'Narangba', icon: 'fa-cogs', color: '#6a9e8f', hours: 'business', notes: 'C&D waste recycling. Crushed concrete, recycled road base, drainage rock. Mon-Fri 6am-4pm, Sat 6am-12pm.' },
    { name: 'ResourceCo — Swanbank Recovery', type: 'cd-recycler', lat: -27.6700, lng: 152.8600, suburb: 'Swanbank', icon: 'fa-cogs', color: '#6a9e8f', hours: 'business', notes: 'Alternative fuels and recycled materials from C&D waste streams. Mon-Fri 6am-5pm.' },
    { name: 'Boral Recycling — Wacol', type: 'cd-recycler', lat: -27.6000, lng: 152.9300, suburb: 'Wacol', icon: 'fa-cogs', color: '#6a9e8f', hours: 'business', notes: 'Concrete and asphalt recycling. Produces certified recycled aggregates. Mon-Fri 6am-4pm.' },
    // PFAS Treatment
    { name: 'HiQ — Yatala PFAS Treatment', type: 'pfas-treatment', lat: -27.7230, lng: 153.2350, suburb: 'Yatala', icon: 'fa-biohazard', color: '#b85c4a', hours: 'business', notes: '12 Byte St, Yatala. First QLD Environmental Authority for PFAS treatment. Activated carbon immobilisation of PFAS in soil, sludges & water. Treats to non-detect standards. Services airports, defence bases, infrastructure. Mon-Fri.' },
    { name: 'Ventia — PFAS Remediation Services', type: 'pfas-treatment', lat: -27.5300, lng: 153.1000, suburb: 'Lytton', icon: 'fa-biohazard', color: '#b85c4a', hours: 'business', notes: 'PFAS soil and water remediation. Defence and commercial projects. Full chain of custody. Project-based treatment capability. Mon-Fri 7am-4pm.' },

    // ===== CONCRETE SUPPLIERS =====
    // Boral / Q-Crete — Brisbane
    { name: 'Q-Crete — Everton Park', type: 'concrete', lat: -27.3970, lng: 152.9830, suburb: 'Everton Park', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '1 Collins Rd, Everton Park. Ready-mix concrete — structural and decorative. Boral subsidiary.' },
    { name: 'Q-Crete — Murarrie', type: 'concrete', lat: -27.4600, lng: 153.0960, suburb: 'Murarrie', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Lytton Rd, Murarrie. Major metro batching plant. Boral subsidiary.' },
    { name: 'Q-Crete — Archerfield', type: 'concrete', lat: -27.5360, lng: 153.0130, suburb: 'Archerfield', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Archerfield. Southern Brisbane batching plant. Boral subsidiary.' },
    { name: 'Boral Concrete — Coopers Plains', type: 'concrete', lat: -27.5660, lng: 153.0320, suburb: 'Coopers Plains', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Metro south ready-mix supply.' },
    { name: 'Boral Concrete — Wacol', type: 'concrete', lat: -27.5870, lng: 152.9320, suburb: 'Wacol', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Amatek Lane, Wacol. Western corridor batching plant.' },
    // Boral / Q-Crete — Moreton Bay
    { name: 'Q-Crete — Narangba', type: 'concrete', lat: -27.1960, lng: 152.9600, suburb: 'Narangba', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '201-205 Potassium St, Narangba. North corridor batching plant. Boral subsidiary.' },
    { name: 'Boral Concrete — Lawnton', type: 'concrete', lat: -27.2800, lng: 152.9760, suburb: 'Lawnton', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'North Brisbane batching plant.' },
    // Boral — Gold Coast / Logan
    { name: 'Boral Concrete — Beenleigh', type: 'concrete', lat: -27.7140, lng: 153.1960, suburb: 'Beenleigh', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Logan/northern Gold Coast supply.' },
    { name: 'Boral Concrete — Biggera Waters', type: 'concrete', lat: -27.9360, lng: 153.3960, suburb: 'Biggera Waters', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '243 Brisbane Rd, Biggera Waters. Central Gold Coast batching plant.' },
    { name: 'Boral Concrete — Bundall', type: 'concrete', lat: -28.0050, lng: 153.4150, suburb: 'Bundall', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Gold Coast CBD corridor supply.' },
    { name: 'Q-Crete — Burleigh Heads', type: 'concrete', lat: -28.0970, lng: 153.4310, suburb: 'Burleigh Heads', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Southern Gold Coast. Boral subsidiary.' },
    // Boral — Ipswich
    { name: 'Boral Concrete — Redbank Plains', type: 'concrete', lat: -27.6440, lng: 152.8600, suburb: 'Redbank Plains', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Ipswich growth corridor supply.' },
    // Boral — Sunshine Coast / Noosa
    { name: 'Boral Concrete — Caloundra West', type: 'concrete', lat: -26.8010, lng: 153.1080, suburb: 'Caloundra West', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '11 Industrial Ave, Caloundra West. Southern Sunshine Coast batching plant.' },
    { name: 'Boral Concrete — Kunda Park', type: 'concrete', lat: -26.6770, lng: 153.0200, suburb: 'Kunda Park', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Central Sunshine Coast batching plant.' },
    { name: 'Boral Concrete — Noosaville', type: 'concrete', lat: -26.4070, lng: 153.0370, suburb: 'Noosaville', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '1 Production St, Noosaville. Northern Sunshine Coast supply.' },
    // Boral — Toowoomba
    { name: 'Boral Concrete — Toowoomba', type: 'concrete', lat: -27.5480, lng: 151.9540, suburb: 'Toowoomba', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Cnr North & Larcombe Sts, Toowoomba. Darling Downs supply.' },

    // Holcim / Readymix
    { name: 'Holcim — Acacia Ridge', type: 'concrete', lat: -27.5800, lng: 153.0270, suburb: 'Acacia Ridge', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Bradman St, Acacia Ridge. Southern Brisbane batching plant.' },
    { name: 'Holcim — Murarrie', type: 'concrete', lat: -27.4580, lng: 153.0980, suburb: 'Murarrie', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '1044 Lytton Rd, Murarrie. Formerly Excel Concrete, now Readymix brand.' },
    { name: 'Holcim — Caboolture', type: 'concrete', lat: -27.0830, lng: 152.9570, suburb: 'Caboolture', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '8 Roseby Rd, Caboolture. Northern corridor batching plant.' },
    { name: 'Holcim — Ipswich', type: 'concrete', lat: -27.6140, lng: 152.7610, suburb: 'Ipswich', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Western growth area supply.' },
    { name: 'Holcim — Coomera', type: 'concrete', lat: -27.8560, lng: 153.3450, suburb: 'Coomera', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Maudsland Rd, Coomera. Northern Gold Coast batching plant.' },
    { name: 'Holcim — Warana', type: 'concrete', lat: -26.6860, lng: 153.1170, suburb: 'Warana', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '11-13 Premier Circuit, Warana. Kawana Waters area supply.' },
    { name: 'Holcim — Noosaville', type: 'concrete', lat: -26.4110, lng: 153.0440, suburb: 'Noosaville', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '91 Eumundi Rd, Noosaville. Northern Sunshine Coast supply.' },
    { name: 'Holcim — Beaudesert', type: 'concrete', lat: -27.9900, lng: 152.9970, suburb: 'Beaudesert', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Barram Court, Beaudesert. Scenic Rim supply.' },
    { name: 'Holcim — Boonah', type: 'concrete', lat: -27.9940, lng: 152.6820, suburb: 'Boonah', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Evans Rd, Boonah. Rural Scenic Rim supply.' },

    // Heidelberg Materials (formerly Hanson)
    { name: 'Heidelberg — Stapylton', type: 'concrete', lat: -27.7290, lng: 153.2600, suburb: 'Stapylton', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Northern Gold Coast / Logan border. Formerly Hanson.' },
    { name: 'Heidelberg — Southport', type: 'concrete', lat: -27.9660, lng: 153.3980, suburb: 'Southport', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Central Gold Coast supply. Formerly Hanson.' },
    { name: 'Heidelberg — Maroochydore', type: 'concrete', lat: -26.6540, lng: 153.0950, suburb: 'Maroochydore', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Central Sunshine Coast supply. Formerly Hanson.' },

    // Wagners
    { name: 'Wagners Concrete — Pinkenba', type: 'concrete', lat: -27.4180, lng: 153.1140, suburb: 'Pinkenba', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '47 Pamela St, Pinkenba. Also cement terminal. Earth Friendly Concrete (EFC geopolymer) available.' },
    { name: 'Wagners Concrete — Narangba', type: 'concrete', lat: -27.1960, lng: 152.9630, suburb: 'Narangba', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '115 Potassium St, Narangba. EFC geopolymer concrete available since 2023.' },
    { name: 'Wagners Concrete — Coolum', type: 'concrete', lat: -26.5400, lng: 153.0680, suburb: 'Coolum Beach', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '97 Quanda Rd, Coolum Beach. EFC geopolymer concrete available since 2023.' },
    { name: 'Wagners Concrete — Toowoomba', type: 'concrete', lat: -27.5580, lng: 151.9590, suburb: 'Toowoomba', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '339 Anzac Ave, Toowoomba. Ready-mix supply.' },

    // Nucon (Nucrush Group)
    { name: 'Nucon — Upper Coomera', type: 'concrete', lat: -27.8700, lng: 153.2960, suburb: 'Upper Coomera', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '19 Hart St, Upper Coomera. Head office + batching plant. 50+ years in SEQ.' },
    { name: 'Nucon — Southport', type: 'concrete', lat: -27.9750, lng: 153.3850, suburb: 'Southport', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '273 Southport Nerang Rd, Southport. Central Gold Coast supply.' },
    { name: 'Nucon — Oxenford', type: 'concrete', lat: -27.8780, lng: 153.3130, suburb: 'Oxenford', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '33 Maudsland Rd, Oxenford. Northern Gold Coast supply.' },
    { name: 'Nucon — Burleigh', type: 'concrete', lat: -28.0930, lng: 153.4250, suburb: 'Burleigh Heads', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '75 Hutchinson St, Burleigh Heads. Southern Gold Coast supply.' },
    { name: 'Nucon — Logan', type: 'concrete', lat: -27.6690, lng: 153.1110, suburb: 'Kingston', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '58 Kingston Rd, Kingston. Logan supply.' },

    // Neilsens Concrete
    { name: 'Neilsens — Brendale', type: 'concrete', lat: -27.3190, lng: 152.9630, suburb: 'Brendale', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'Johnstone Rd, Brendale. HQ and original plant (est. 1993). NATA accredited lab.' },
    { name: 'Neilsens — Carole Park', type: 'concrete', lat: -27.6100, lng: 152.9180, suburb: 'Carole Park', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '39 Mica St, Carole Park. Est. 1997. Includes NATA lab.' },
    { name: 'Neilsens — Windsor', type: 'concrete', lat: -27.4330, lng: 153.0260, suburb: 'Windsor', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '97 Somerset St, Windsor. Est. 2004. Inner north Brisbane supply.' },
    { name: 'Neilsens — Stapylton', type: 'concrete', lat: -27.7280, lng: 153.2600, suburb: 'Stapylton', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '45 Christensen Rd, Stapylton. Est. 2011. Southern corridor supply.' },
    { name: 'Neilsens — Beaudesert', type: 'concrete', lat: -27.9900, lng: 152.9970, suburb: 'Beaudesert', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '43 Cryna Rd, Beaudesert. Est. 2017. Scenic Rim supply.' },

    // Neil Mansell Concrete
    { name: 'Neil Mansell — Kunda Park', type: 'concrete', lat: -26.6750, lng: 153.0250, suburb: 'Kunda Park', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '566-570 Maroochydore Rd, Kunda Park. Sunshine Coast supply. Also operates mobile plants.' },
    { name: 'Neil Mansell — Toowoomba', type: 'concrete', lat: -27.5700, lng: 151.9250, suburb: 'Toowoomba', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '483 Greenwattle St, Toowoomba. Darling Downs supply.' },

    // Sunmix Concrete
    { name: 'Sunmix — Kingston', type: 'concrete', lat: -27.6660, lng: 153.1200, suburb: 'Kingston', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '5-11 Marble Dr, Kingston. Independent operator, 25+ years. Logan/southside Brisbane supply.' },
    { name: 'Sunmix — Beaudesert', type: 'concrete', lat: -27.9730, lng: 153.0010, suburb: 'Beaudesert', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '150 Enterprise Dr North, Beaudesert. Scenic Rim supply.' },

    // Cordwells Concrete
    { name: 'Cordwells — Yandina', type: 'concrete', lat: -26.5630, lng: 152.9550, suburb: 'Yandina', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '11-21 Cordwell Rd, Yandina. Family-owned since 1965. Sunshine Coast\'s longest-established concrete supplier.' },

    // SPS Quality Concrete
    { name: 'SPS Concrete — Ningi', type: 'concrete', lat: -27.0660, lng: 153.0680, suburb: 'Ningi', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '565 Bestmann Rd, Ningi. Family-owned. Head office + batching plant. Moreton Bay supply.' },
    { name: 'SPS Concrete — Bells Creek', type: 'concrete', lat: -26.8100, lng: 153.1020, suburb: 'Bells Creek', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: '21 Ron Parkinson Cres, Bells Creek. Caloundra area supply.' },

    // Hymix (Adbri/CRH)
    { name: 'Hymix — Brendale', type: 'concrete', lat: -27.3220, lng: 152.9550, suburb: 'Brendale', icon: 'fa-industry', color: '#d4a05a', hours: 'business', notes: 'McDonald Rd, Brendale. Adbri/CRH group. Structural and decorative concrete.' },
];

let facilityLayerGroup = L.layerGroup();
let facilitiesVisible = true;

// Zoom-based visibility — minimum zoom level to show each facility type
// Lower number = visible when zoomed out more (higher priority)
const facilityZoomTiers = {
    'quarry': 8,
    'concrete': 9,
    'landfill': 10,
    'transfer': 10,
    'cd-recycler': 11,
    'soil-treatment': 11,
    'pfas-treatment': 11
};

// Featured facilities appear one zoom level earlier (paying customers)
// Set f.featured = true on any facility to bump its visibility
function getMinZoom(f) {
    const base = facilityZoomTiers[f.type] || 10;
    return f.featured ? base - 1 : base;
}

function getFilteredFacilities() {
    const typeFilters = Array.from(document.querySelectorAll('[data-filter="facility"]:checked')).map(c => c.value);
    const hoursFilters = Array.from(document.querySelectorAll('[data-filter="hours"]:checked')).map(c => c.value);
    const search = document.getElementById('searchInput').value.toLowerCase();
    const zoom = map.getZoom();

    return registeredFacilities.filter(f => {
        if (!typeFilters.includes(f.type)) return false;
        if (!hoursFilters.includes(f.hours)) return false;
        // Zoom-based visibility — search overrides zoom restriction
        if (!search && zoom < getMinZoom(f)) return false;
        if (search) {
            const haystack = `${f.name} ${f.suburb} ${f.notes} ${facilityTypeLabels[f.type] || ''}`.toLowerCase();
            if (!haystack.includes(search)) return false;
        }
        return true;
    });
}

function addFacilityMarkers(filtered) {
    facilityLayerGroup.clearLayers();
    if (!filtered) filtered = registeredFacilities;
    filtered.forEach(f => {
        const marker = L.marker([f.lat, f.lng], {
            icon: L.divIcon({
                className: '',
                html: `<div style="width:28px;height:28px;border-radius:50%;background:${f.color};border:2px solid rgba(224,219,211,0.5);display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;box-shadow:0 2px 6px rgba(0,0,0,0.4);cursor:pointer;"><i class="fas ${f.icon}"></i></div>`,
                iconSize: [28, 28],
                iconAnchor: [14, 14]
            })
        });
        marker.bindTooltip(`<strong>${f.name}</strong><br>${f.suburb} · ${f.hours === '24/7' ? '24/7' : 'Business hours'}`, { direction: 'top', offset: [0, -16] });
        marker.on('click', () => showFacilityPanel(f));
        facilityLayerGroup.addLayer(marker);
    });
}

function updateFacilityStats(filtered) {
    document.getElementById('statShown').textContent = filtered.length;
    document.getElementById('statQuarries').textContent = filtered.filter(f => f.type === 'quarry').length;
    document.getElementById('statLandfills').textContent = filtered.filter(f => f.type === 'landfill').length;
    document.getElementById('statTransfer').textContent = filtered.filter(f => f.type === 'transfer').length;
    document.getElementById('statRecyclers').textContent = filtered.filter(f => f.type === 'cd-recycler').length;
}

function applyFacilityFilters() {
    const filtered = getFilteredFacilities();
    addFacilityMarkers(filtered);
    updateFacilityStats(filtered);
    addWaterFillMarkers();
}

function showFacilityPanel(facility) {
    const panel = document.getElementById('infoPanel');
    const hoursBadge = facility.hours === '24/7'
        ? '<span class="badge" style="background:rgba(34,197,94,0.12);color:var(--green);"><i class="fas fa-clock"></i> 24/7</span>'
        : '<span class="badge" style="background:rgba(245,158,11,0.12);color:var(--amber);"><i class="fas fa-sun"></i> Business Hours</span>';

    const logisticsHtml = (facility.type === 'quarry' && userSiteLocation) ? buildLogisticsPanel(facility) :
        (!userSiteLocation && facility.type === 'quarry' ? '<div style="margin-top:10px;padding:10px;border-radius:6px;background:rgba(255,255,255,0.04);font-size:12px;color:var(--text-muted);"><i class="fas fa-info-circle" style="color:var(--blue);margin-right:4px;"></i>Search your site address first to see delivery estimates</div>' : '');

    document.getElementById('infoPanelContent').innerHTML = `
        <div class="info-header">
            <div class="info-icon" style="background:rgba(255,255,255,0.08);color:${facility.color};">
                <i class="fas ${facility.icon}"></i>
            </div>
            <div>
                <div class="info-title">${facility.name}</div>
                <div class="info-subtitle">${facilityTypeLabels[facility.type] || facility.type} · ${facility.suburb}</div>
            </div>
        </div>
        <div class="badge-row">
            <span class="badge" style="background:rgba(255,255,255,0.06);color:${facility.color};"><i class="fas ${facility.icon}"></i> Registered Facility</span>
            ${hoursBadge}
        </div>
        ${facility.notes ? `<div class="info-notes"><i class="fas fa-info-circle" style="color:var(--blue);margin-right:6px;"></i>${facility.notes}</div>` : ''}
        ${logisticsHtml}
    `;
    panel.classList.add('visible');

    // Show route line and fit bounds if site is set
    if (userSiteLocation && facility.type === 'quarry') {
        showRouteLine(userSiteLocation.lat, userSiteLocation.lng, facility.lat, facility.lng);
        const bounds = L.latLngBounds(
            [userSiteLocation.lat, userSiteLocation.lng],
            [facility.lat, facility.lng]
        );
        map.fitBounds(bounds, { padding: [60, 60] });

        // Wire up live calc updates after DOM renders
        setTimeout(() => {
            updateCalcResults(facility);
            document.getElementById('calcTonnes')?.addEventListener('input', () => updateCalcResults(facility));
            document.getElementById('calcTruckType')?.addEventListener('change', () => updateCalcResults(facility));
        }, 50);
    } else {
        clearRouteLine();
        map.panTo([facility.lat, facility.lng]);
    }
}

// ===== WATER FILL POINTS =====
const waterFillPoints = [
    // QUU — Queensland Urban Utilities (23 stations)
    { name: 'QUU — Murarrie Fill Station', code: 'TF001', provider: 'QUU', lat: -27.4600, lng: 153.1000, suburb: 'Murarrie', address: '188 Paringa Road, Murarrie', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Rocklea Fill Station', code: 'TF003', provider: 'QUU', lat: -27.5370, lng: 153.0060, suburb: 'Rocklea', address: '32 Dunn Road, Rocklea', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Rosewood Fill Station', code: 'TF006', provider: 'QUU', lat: -27.6350, lng: 152.5930, suburb: 'Rosewood', address: '59 John Street, Rosewood', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Kholo Fill Station', code: 'TF009', provider: 'QUU', lat: -27.5310, lng: 152.6530, suburb: 'Kholo', address: '80-84 Reservoir Lane, Kholo', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Walloon Fill Station', code: 'TF007', provider: 'QUU', lat: -27.5990, lng: 152.6730, suburb: 'Walloon', address: '527 Karrabin Rosewood Road, Walloon', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Marburg Fill Station', code: 'TF008', provider: 'QUU', lat: -27.5640, lng: 152.5980, suburb: 'Marburg', address: 'Opposite 136-144 Queen Street, Marburg', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Raceview Fill Station', code: 'TF004', provider: 'QUU', lat: -27.6270, lng: 152.7640, suburb: 'Raceview', address: '21 Llewellyn Street, Raceview', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Toogoolawah Fill Station', code: 'TF024', provider: 'QUU', lat: -27.0910, lng: 152.3810, suburb: 'Toogoolawah', address: 'Brisbane Valley Highway, Toogoolawah', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Kilcoy Fill Station', code: 'TF029', provider: 'QUU', lat: -26.9410, lng: 152.5640, suburb: 'Kilcoy', address: '30 McCauley Street, Kilcoy', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Esk Fill Station', code: 'TF025', provider: 'QUU', lat: -27.2380, lng: 152.4200, suburb: 'Esk', address: '72 Esk-Hampton Road, Esk', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Lowood Fill Station (Fernvale Rd)', code: 'TF027', provider: 'QUU', lat: -27.4470, lng: 152.5440, suburb: 'Lowood', address: 'Opposite 2720 Forest Hill-Fernvale Road, Lowood', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Lowood Fill Station (Lindemans)', code: 'TF026', provider: 'QUU', lat: -27.4620, lng: 152.5730, suburb: 'Lowood', address: '19 Lindemans Road, Lowood', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Minden Fill Station', code: 'TF028', provider: 'QUU', lat: -27.5320, lng: 152.5420, suburb: 'Minden', address: '780 Lowood-Minden Road, Minden', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Laidley Fill Station', code: 'TF021', provider: 'QUU', lat: -27.6280, lng: 152.3910, suburb: 'Laidley', address: 'Opposite 2108 Laidley Rosewood Road, Laidley', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Gatton Fill Station', code: 'TF014', provider: 'QUU', lat: -27.5570, lng: 152.2790, suburb: 'Gatton', address: '48 Cochrane Street, Gatton', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Postmans Ridge Fill Station', code: 'TF016', provider: 'QUU', lat: -27.5670, lng: 152.1130, suburb: "Postman's Ridge", address: "112 Murphy's Creek Road, Postman's Ridge", access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Hatton Vale Fill Station', code: 'TF019', provider: 'QUU', lat: -27.5680, lng: 152.4640, suburb: 'Hatton Vale', address: '51 Fairway Drive, Hatton Vale', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Forest Hill Fill Station', code: 'TF018', provider: 'QUU', lat: -27.5860, lng: 152.3570, suburb: 'Forest Hill', address: 'Opposite 15 Forest Hill-Fernvale Rd, Forest Hill', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Beaudesert Fill Station', code: 'TF010', provider: 'QUU', lat: -28.0040, lng: 153.0010, suburb: 'Beaudesert', address: '109 Helen Street, Beaudesert', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Boonah Fill Station', code: 'TF011', provider: 'QUU', lat: -27.9960, lng: 152.6860, suburb: 'Boonah', address: 'Corner Boonah-Rathdowney Road and Milford Road, Boonah', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Canungra Fill Station', code: 'TF013', provider: 'QUU', lat: -28.0210, lng: 153.1610, suburb: 'Canungra', address: '60 Lamington National Park Road, Canungra', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Rathdowney Fill Station', code: 'TF012', provider: 'QUU', lat: -28.2190, lng: 152.8670, suburb: 'Rathdowney', address: '2-4 John Street, Rathdowney', access: 'Card required', waterType: 'potable' },
    { name: 'QUU — Peak Crossing Fill Station', code: 'TF005', provider: 'QUU', lat: -27.7830, lng: 152.7310, suburb: 'Peak Crossing', address: '1323 Ipswich-Boonah Road, Peak Crossing', access: 'Card required', waterType: 'potable' },

    // Unitywater (21 stations)
    { name: 'Unitywater — Beerburrum', provider: 'Unitywater', lat: -26.9580, lng: 152.9530, suburb: 'Beerburrum', address: '54 Red Road, Beerburrum', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Beerwah', provider: 'Unitywater', lat: -26.8570, lng: 152.9570, suburb: 'Beerwah', address: 'Roberts Road, Beerwah', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Cashmere', provider: 'Unitywater', lat: -27.2960, lng: 152.8840, suburb: 'Cashmere', address: 'Warra Lane, Cashmere', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Coolum', provider: 'Unitywater', lat: -26.5340, lng: 153.0760, suburb: 'Coolum', address: '38 Quanda Road, Coolum', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Cooroy', provider: 'Unitywater', lat: -26.4170, lng: 152.9070, suburb: 'Cooroy', address: '271 Lake McDonald Drive, Cooroy', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Dakabin', provider: 'Unitywater', lat: -27.2270, lng: 152.9840, suburb: 'Dakabin', address: 'Plantation Road, Dakabin', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Dayboro', provider: 'Unitywater', lat: -27.1990, lng: 152.8220, suburb: 'Dayboro', address: 'Mt Mee Road, Dayboro', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Kenilworth', provider: 'Unitywater', lat: -26.5980, lng: 152.7310, suburb: 'Kenilworth', address: 'Mary Street (WTP), Kenilworth', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Landsborough', provider: 'Unitywater', lat: -26.8090, lng: 152.9650, suburb: 'Landsborough', address: 'Gympie Street North, Landsborough', access: '6am-10pm Mon-Fri', waterType: 'potable' },
    { name: 'Unitywater — Maleny', provider: 'Unitywater', lat: -26.7630, lng: 152.8480, suburb: 'Maleny', address: 'Maleny Show Ground, Maleny', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Mooloolah', provider: 'Unitywater', lat: -26.7620, lng: 152.9660, suburb: 'Mooloolah', address: 'Connection Road, Mooloolah', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Morayfield', provider: 'Unitywater', lat: -27.1020, lng: 152.9520, suburb: 'Morayfield', address: '215 Buchanan Road, Morayfield', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Nambour', provider: 'Unitywater', lat: -26.6260, lng: 152.9590, suburb: 'Nambour', address: 'Nambour Showgrounds, Nambour', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Noosaville', provider: 'Unitywater', lat: -26.4060, lng: 153.0500, suburb: 'Noosaville', address: '183 Eumundi Road, Noosaville', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Palmwoods', provider: 'Unitywater', lat: -26.6900, lng: 152.9600, suburb: 'Palmwoods', address: 'Woombye-Palmwoods Road, Palmwoods', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Pomona', provider: 'Unitywater', lat: -26.3690, lng: 152.8590, suburb: 'Pomona', address: 'Station Street, Pomona', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Tewantin', provider: 'Unitywater', lat: -26.3920, lng: 153.0340, suburb: 'Tewantin', address: '262 McKinnon Drive, Tewantin', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Wamuran', provider: 'Unitywater', lat: -27.0390, lng: 152.8640, suburb: 'Wamuran', address: 'Bye Road, Wamuran', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Woodford', provider: 'Unitywater', lat: -26.9510, lng: 152.7730, suburb: 'Woodford', address: '9 Chambers Road, Woodford', access: '24/7', waterType: 'potable' },
    { name: 'Unitywater — Yandina', provider: 'Unitywater', lat: -26.5640, lng: 152.9560, suburb: 'Yandina', address: 'Harvest Street, Yandina', access: '24/7', waterType: 'potable' },

    // Gold Coast City Council — Drinking Water (12 stations)
    { name: 'GCCC — Stapylton (N1)', code: 'N1', provider: 'Gold Coast CC', lat: -27.7310, lng: 153.2530, suburb: 'Stapylton', address: 'Angel Road (cnr Penny Lane), Stapylton', access: '24/7', waterType: 'potable' },
    { name: 'GCCC — Ormeau Hills (N2)', code: 'N2', provider: 'Gold Coast CC', lat: -27.7710, lng: 153.2440, suburb: 'Ormeau Hills', address: 'Tillyroen Road, Ormeau Hills', access: '24/7', waterType: 'potable' },
    { name: 'GCCC — Pimpama (N3)', code: 'N3', provider: 'Gold Coast CC', lat: -27.8130, lng: 153.2810, suburb: 'Pimpama', address: 'Kerkin Road North, Pimpama', access: '24/7', waterType: 'potable' },
    { name: 'GCCC — Runaway Bay (N4)', code: 'N4', provider: 'Gold Coast CC', lat: -27.9080, lng: 153.3850, suburb: 'Runaway Bay', address: 'Sports Drive, Runaway Bay', access: '24/7', waterType: 'potable' },
    { name: 'GCCC — Oxenford (N5)', code: 'N5', provider: 'Gold Coast CC', lat: -27.8840, lng: 153.3220, suburb: 'Oxenford', address: "Entertainment Road (south of Wet'n'Wild), Oxenford", access: '24/7', waterType: 'potable' },
    { name: 'GCCC — Upper Coomera (N6)', code: 'N6', provider: 'Gold Coast CC', lat: -27.8690, lng: 153.2870, suburb: 'Upper Coomera', address: 'Tamborine-Oxenford Road, Upper Coomera', access: '24/7', waterType: 'potable' },
    { name: 'GCCC — Maudsland (N7)', code: 'N7', provider: 'Gold Coast CC', lat: -27.9010, lng: 153.2960, suburb: 'Maudsland', address: 'Maudsland Road, Maudsland', access: '24/7', waterType: 'potable' },
    { name: 'GCCC — Nerang (S8)', code: 'S8', provider: 'Gold Coast CC', lat: -27.9870, lng: 153.3340, suburb: 'Nerang', address: 'Yarrimbah Drive, Nerang', access: '24/7', waterType: 'potable' },
    { name: 'GCCC — Worongary (S9)', code: 'S9', provider: 'Gold Coast CC', lat: -28.0420, lng: 153.3590, suburb: 'Worongary', address: 'Worongary Road, Worongary', access: '24/7', waterType: 'potable' },
    { name: 'GCCC — Mudgeeraba (S10)', code: 'S10', provider: 'Gold Coast CC', lat: -28.0830, lng: 153.3660, suburb: 'Mudgeeraba', address: 'Gold Coast-Springbrook Road, Mudgeeraba', access: '24/7', waterType: 'potable' },
    { name: 'GCCC — Mudgeeraba (S11)', code: 'S11', provider: 'Gold Coast CC', lat: -28.0760, lng: 153.3470, suburb: 'Mudgeeraba', address: 'Hardys Road, Mudgeeraba', access: '24/7', waterType: 'potable' },
    { name: 'GCCC — Tallebudgera (S12)', code: 'S12', provider: 'Gold Coast CC', lat: -28.1320, lng: 153.3880, suburb: 'Tallebudgera', address: 'Tallebudgera Connection Road, Tallebudgera', access: '24/7', waterType: 'potable' },

    // Gold Coast City Council — Recycled Water (5 active stations)
    { name: 'GCCC — Coombabah STP (Recycled)', provider: 'Gold Coast CC', lat: -27.8840, lng: 153.3650, suburb: 'Coombabah', address: 'End of Shelter Road, Coombabah', access: '6am-6pm (24hr with card)', waterType: 'recycled' },
    { name: 'GCCC — Merrimac STP (Recycled)', provider: 'Gold Coast CC', lat: -28.0400, lng: 153.3780, suburb: 'Merrimac', address: 'Boowaggon Road, Merrimac', access: '24hr with card', waterType: 'recycled' },
    { name: 'GCCC — Parkwood (Recycled)', provider: 'Gold Coast CC', lat: -27.9620, lng: 153.3730, suburb: 'Parkwood', address: '180 Musgrave Avenue, Parkwood', access: '24/7', waterType: 'recycled' },
    { name: 'GCCC — Pimpama STP (Recycled)', provider: 'Gold Coast CC', lat: -27.8170, lng: 153.2850, suburb: 'Pimpama', address: '270 Kerkin Road North, Pimpama', access: '24hr with card', waterType: 'recycled' },
    { name: 'GCCC — Tugun/Bilinga (Recycled)', provider: 'Gold Coast CC', lat: -28.1320, lng: 153.4880, suburb: 'Tugun', address: '4 Boyd Street, Tugun', access: '24/7', waterType: 'recycled' },

    // Logan City Council (5 filling stations)
    { name: 'Logan CC — Greenbank #1', provider: 'Logan CC', lat: -27.7361, lng: 152.9693, suburb: 'Greenbank', address: '117-123 Pub Lane, Greenbank', access: '24/7', waterType: 'potable' },
    { name: 'Logan CC — Greenbank #2', provider: 'Logan CC', lat: -27.7191, lng: 152.9871, suburb: 'Greenbank', address: 'Cnr Middle Road & Sheppards Drive, Greenbank', access: '24/7', waterType: 'potable' },
    { name: 'Logan CC — Logan Village', provider: 'Logan CC', lat: -27.8037, lng: 153.0829, suburb: 'Logan Village', address: 'Cnr Travis Road & Camp Cable Road, Logan Village', access: '24/7', waterType: 'potable' },
    { name: 'Logan CC — Chambers Flat', provider: 'Logan CC', lat: -27.7195, lng: 153.0724, suburb: 'Chambers Flat', address: 'Opposite 176-186 Koplick Road, Chambers Flat', access: '24/7', waterType: 'potable' },
    { name: 'Logan CC — Jimboomba', provider: 'Logan CC', lat: -27.8350, lng: 153.0250, suburb: 'Jimboomba', address: 'Cerina Circuit, opposite 12-14, Jimboomba', access: '24/7', waterType: 'potable' },

    // Redland City Council (5 filling stations)
    { name: 'Redland CC — Capalaba', provider: 'Redland CC', lat: -27.5260, lng: 153.1920, suburb: 'Capalaba', address: '171 Ney Road, Capalaba', access: '24/7', waterType: 'potable' },
    { name: 'Redland CC — Ormiston', provider: 'Redland CC', lat: -27.5180, lng: 153.2540, suburb: 'Ormiston', address: '101 Sturgeon Street, Fellmonger Park, Ormiston', access: '24/7', waterType: 'potable' },
    { name: 'Redland CC — Thornlands', provider: 'Redland CC', lat: -27.5570, lng: 153.2580, suburb: 'Thornlands', address: '226 Cleveland-Redland Bay Road, Thornlands', access: '24/7', waterType: 'potable' },
    { name: 'Redland CC — Redland Bay', provider: 'Redland CC', lat: -27.6140, lng: 153.3040, suburb: 'Redland Bay', address: '47-49 Orchard Road, Redland Bay', access: '24/7', waterType: 'potable' },
    { name: 'Redland CC — Mount Cotton', provider: 'Redland CC', lat: -27.6240, lng: 153.2310, suburb: 'Mount Cotton', address: '11 Valley Way, Mount Cotton', access: '24/7', waterType: 'potable' },
];

const waterFillColor = '#2196F3';
let waterFillLayerGroup = L.layerGroup();

function addWaterFillMarkers() {
    waterFillLayerGroup.clearLayers();
    const search = document.getElementById('searchInput').value.toLowerCase();
    const zoom = map.getZoom();
    const typeFilters = Array.from(document.querySelectorAll('[data-filter="facility"]:checked')).map(c => c.value);
    const showPotable = typeFilters.includes('water-potable');
    const showRecycled = typeFilters.includes('water-recycled');

    waterFillPoints.forEach(w => {
        if (w.waterType === 'potable' && !showPotable) return;
        if (w.waterType === 'recycled' && !showRecycled) return;
        // Water fill points show at zoom 12+ (or any zoom if searching)
        if (!search && zoom < 12) return;
        if (search) {
            const haystack = `${w.name} ${w.suburb} ${w.provider} ${w.address}`.toLowerCase();
            if (!haystack.includes(search)) return;
        }

        const isRecycled = w.waterType === 'recycled';
        const markerColor = isRecycled ? '#9C27B0' : waterFillColor;
        const marker = L.marker([w.lat, w.lng], {
            icon: L.divIcon({
                className: '',
                html: `<div style="width:24px;height:24px;border-radius:50%;background:${markerColor};border:2px solid rgba(224,219,211,0.5);display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;box-shadow:0 2px 6px rgba(0,0,0,0.4);cursor:pointer;"><i class="fas fa-tint"></i></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            })
        });
        marker.bindTooltip(`<strong>${w.name}</strong><br>${w.address}<br>${w.access}${isRecycled ? '<br><em style="color:#ce93d8;">Recycled water</em>' : ''}`, { direction: 'top', offset: [0, -14] });
        marker.on('click', () => showWaterFillPanel(w));
        waterFillLayerGroup.addLayer(marker);
    });
}

function showWaterFillPanel(w) {
    const panel = document.getElementById('infoPanel');
    const isRecycled = w.waterType === 'recycled';
    document.getElementById('infoPanelContent').innerHTML = `
        <div class="info-header">
            <div class="info-icon" style="background:rgba(255,255,255,0.08);color:${isRecycled ? '#ce93d8' : waterFillColor};">
                <i class="fas fa-tint"></i>
            </div>
            <div>
                <div class="info-title">${w.name}</div>
                <div class="info-subtitle">Water Fill Point · ${w.suburb}</div>
            </div>
        </div>
        <div class="badge-row">
            <span class="badge" style="background:rgba(33,150,243,0.12);color:${isRecycled ? '#ce93d8' : waterFillColor};"><i class="fas fa-tint"></i> ${isRecycled ? 'Recycled Water' : 'Potable Water'}</span>
            <span class="badge" style="background:rgba(255,255,255,0.06);color:var(--text-muted);"><i class="fas fa-building"></i> ${w.provider}</span>
        </div>
        <div class="info-notes"><i class="fas fa-map-marker-alt" style="color:var(--blue);margin-right:6px;"></i>${w.address}</div>
        <div class="info-notes"><i class="fas fa-clock" style="color:var(--green);margin-right:6px;"></i>Access: ${w.access}</div>
        ${w.code ? `<div class="info-notes"><i class="fas fa-tag" style="color:var(--amber);margin-right:6px;"></i>Station code: ${w.code}</div>` : ''}
        ${isRecycled ? '<div class="info-notes" style="color:#ce93d8;"><i class="fas fa-exclamation-triangle" style="margin-right:6px;"></i>Recycled water — not for drinking. Suitable for dust suppression, compaction, and construction use.</div>' : ''}
    `;
    panel.classList.add('visible');
    map.panTo([w.lat, w.lng]);
}

// ===== MAJOR PROJECTS (Brisbane 2032 Olympics Pipeline) =====
const majorProjects = [
    {
        name: 'Brisbane Stadium (Victoria Park)',
        lat: -27.4500, lng: 153.0230,
        suburb: 'Herston',
        description: '$3.8B new 55,000-seat stadium and 64-hectare precinct at Victoria Park. Main venue for Brisbane 2032 Olympics opening/closing ceremonies.',
        status: 'upcoming',
        projectType: 'venue',
        cost: '$3.8B',
        authority: 'Queensland Government / Brisbane 2032 OCA',
        startDate: '2026-06-01',
        expectedEndDate: '2030-12-01',
        phases: [
            { name: 'Site preparation & enabling works', start: '2026-06-01', end: '2027-06-01' },
            { name: 'Bulk earthworks & foundations', start: '2027-01-01', end: '2028-06-01' },
            { name: 'Structure & services', start: '2028-01-01', end: '2030-06-01' },
            { name: 'Fitout & commissioning', start: '2030-01-01', end: '2030-12-01' }
        ],
        estimatedVolume: '800,000+ m³',
        sourceUrl: 'https://www.statedevelopment.qld.gov.au/brisbane-2032'
    },
    {
        name: 'Logan & Gold Coast Faster Rail',
        lat: -27.7100, lng: 153.1800,
        suburb: 'Kuraby–Beenleigh',
        description: '$5.75B rail upgrade — 20km quadruplication from Kuraby to Beenleigh with new stations. Faster, more frequent services for SEQ south.',
        status: 'upcoming',
        projectType: 'rail',
        cost: '$5.75B',
        authority: 'Cross River Rail Delivery Authority',
        startDate: '2026-01-01',
        expectedEndDate: '2032-06-01',
        phases: [
            { name: 'Early works & corridor acquisition', start: '2026-01-01', end: '2027-06-01' },
            { name: 'Bulk earthworks & drainage', start: '2027-06-01', end: '2029-06-01' },
            { name: 'Track & station construction', start: '2029-01-01', end: '2031-12-01' },
            { name: 'Systems & commissioning', start: '2031-06-01', end: '2032-06-01' }
        ],
        estimatedVolume: '1,200,000+ m³',
        sourceUrl: 'https://www.tmr.qld.gov.au/projects/logan-and-gold-coast-faster-rail'
    },
    {
        name: 'Coomera Connector (Second M1)',
        lat: -27.8850, lng: 153.3100,
        suburb: 'Coomera–Nerang',
        description: '$2.16B second motorway corridor — 16km Coomera to Nerang. Stage 1 (northern) open, Central and Southern stages active construction.',
        status: 'active',
        projectType: 'road',
        cost: '$2.16B',
        authority: 'Queensland DTMR',
        startDate: '2022-01-01',
        expectedEndDate: '2028-12-01',
        phases: [
            { name: 'Stage 1 — Northern (complete)', start: '2022-01-01', end: '2025-06-01' },
            { name: 'Stage 2 — Central', start: '2024-06-01', end: '2027-06-01' },
            { name: 'Stage 3 — Southern', start: '2025-01-01', end: '2028-12-01' }
        ],
        estimatedVolume: '600,000+ m³',
        sourceUrl: 'https://www.tmr.qld.gov.au/projects/coomera-connector'
    },
    {
        name: 'Cross River Rail',
        lat: -27.4850, lng: 153.0280,
        suburb: 'Dutton Park–Bowen Hills',
        description: '$19B+ transformational rail project — 10.2km new rail line including 5.9km twin tunnels under Brisbane River and CBD. Four new underground stations.',
        status: 'active',
        projectType: 'rail',
        cost: '$19B+',
        authority: 'Cross River Rail Delivery Authority',
        startDate: '2019-09-01',
        expectedEndDate: '2026-12-01',
        phases: [
            { name: 'Tunnel boring (complete)', start: '2019-09-01', end: '2023-06-01' },
            { name: 'Station cavern fitout', start: '2022-01-01', end: '2025-12-01' },
            { name: 'Rail systems & testing', start: '2025-01-01', end: '2026-06-01' },
            { name: 'Commissioning & opening', start: '2026-06-01', end: '2026-12-01' }
        ],
        estimatedVolume: '500,000+ m³ excavated',
        sourceUrl: 'https://crossriverrail.qld.gov.au'
    },
    {
        name: 'Gabba Entertainment Precinct',
        lat: -27.4858, lng: 153.0381,
        suburb: 'Woolloongabba',
        description: '9-hectare precinct redevelopment centred on the Gabba. Includes demolition/rebuild of stadium and new entertainment, commercial and community spaces.',
        status: 'upcoming',
        projectType: 'precinct',
        cost: 'TBC (~$2.7B)',
        authority: 'Queensland Government / Stadiums Queensland',
        startDate: '2026-10-01',
        expectedEndDate: '2031-06-01',
        phases: [
            { name: 'Demolition & site clearance', start: '2026-10-01', end: '2027-12-01' },
            { name: 'Earthworks & foundations', start: '2027-06-01', end: '2029-01-01' },
            { name: 'Construction & fitout', start: '2028-06-01', end: '2031-01-01' },
            { name: 'Commissioning', start: '2031-01-01', end: '2031-06-01' }
        ],
        estimatedVolume: '350,000+ m³',
        sourceUrl: 'https://www.statedevelopment.qld.gov.au/brisbane-2032'
    },
    {
        name: 'Gateway / Bruce Highway Upgrades',
        lat: -27.3250, lng: 153.0400,
        suburb: 'Bracken Ridge',
        description: '~$2B Gateway Motorway and Bruce Highway interchange upgrades. Major capacity improvements at key northern corridor bottleneck.',
        status: 'upcoming',
        projectType: 'road',
        cost: '~$2B',
        authority: 'Queensland DTMR',
        startDate: '2026-10-01',
        expectedEndDate: '2030-06-01',
        phases: [
            { name: 'Design & early works', start: '2026-10-01', end: '2027-12-01' },
            { name: 'Earthworks & structures', start: '2027-06-01', end: '2029-06-01' },
            { name: 'Roadworks & completion', start: '2029-01-01', end: '2030-06-01' }
        ],
        estimatedVolume: '400,000+ m³',
        sourceUrl: 'https://www.tmr.qld.gov.au/projects/gateway-motorway-and-bruce-highway-upgrade'
    },
    {
        name: 'Inland Rail — Calvert to Kagaru',
        lat: -27.7400, lng: 152.7800,
        suburb: 'Calvert–Kagaru',
        description: '$1.2B, 53km new rail corridor including 1km tunnel. Part of Melbourne-Brisbane Inland Rail. Environmental approvals phase.',
        status: 'planning',
        projectType: 'rail',
        cost: '$1.2B',
        authority: 'ARTC / Inland Rail',
        startDate: '2027-01-01',
        expectedEndDate: '2031-12-01',
        phases: [
            { name: 'EIS & approvals', start: '2024-01-01', end: '2027-01-01' },
            { name: 'Enabling works & land acquisition', start: '2027-01-01', end: '2028-06-01' },
            { name: 'Bulk earthworks & tunnel', start: '2028-01-01', end: '2030-06-01' },
            { name: 'Track laying & commissioning', start: '2030-01-01', end: '2031-12-01' }
        ],
        estimatedVolume: '2,000,000+ m³',
        sourceUrl: 'https://www.inlandrail.gov.au/calvert-to-kagaru'
    },
    {
        name: 'Gold Coast Light Rail Stage 3',
        lat: -28.0800, lng: 153.4300,
        suburb: 'Broadbeach South–Burleigh Heads',
        description: '$1.55B, 6.7km light rail extension from Broadbeach South to Burleigh Heads. Active construction with tunnelling at Burleigh Hill.',
        status: 'active',
        projectType: 'rail',
        cost: '$1.55B',
        authority: 'Queensland DTMR / GoldLinQ',
        startDate: '2023-06-01',
        expectedEndDate: '2028-06-01',
        phases: [
            { name: 'Utility relocation & early works', start: '2023-06-01', end: '2025-06-01' },
            { name: 'Civil works & track laying', start: '2025-01-01', end: '2027-06-01' },
            { name: 'Systems & testing', start: '2027-01-01', end: '2028-01-01' },
            { name: 'Commissioning & opening', start: '2028-01-01', end: '2028-06-01' }
        ],
        estimatedVolume: '150,000+ m³',
        sourceUrl: 'https://www.tmr.qld.gov.au/projects/gold-coast-light-rail-stage-3'
    },
    {
        name: 'Beerburrum to Nambour Rail Upgrade',
        lat: -26.8500, lng: 152.9500,
        suburb: 'Beerburrum–Landsborough',
        description: '$1.6B, 12km rail duplication from Beerburrum to Landsborough. Additional tracks, upgraded stations and level crossing removals.',
        status: 'active',
        projectType: 'rail',
        cost: '$1.6B',
        authority: 'Queensland DTMR',
        startDate: '2023-01-01',
        expectedEndDate: '2027-12-01',
        phases: [
            { name: 'Enabling works & utilities', start: '2023-01-01', end: '2025-01-01' },
            { name: 'Earthworks & bridges', start: '2024-06-01', end: '2026-12-01' },
            { name: 'Track & signalling', start: '2026-06-01', end: '2027-06-01' },
            { name: 'Testing & commissioning', start: '2027-06-01', end: '2027-12-01' }
        ],
        estimatedVolume: '500,000+ m³',
        sourceUrl: 'https://www.tmr.qld.gov.au/projects/beerburrum-to-nambour-rail-upgrade'
    },
    {
        name: 'Northshore Hamilton Athletes Village',
        lat: -27.4380, lng: 153.0700,
        suburb: 'Hamilton',
        description: '304-hectare waterfront precinct at Northshore Hamilton. Athletes Village for Brisbane 2032, converting to mixed-use community post-Games. Street works active.',
        status: 'active',
        projectType: 'precinct',
        cost: 'TBC (multi-billion)',
        authority: 'Economic Development Queensland',
        startDate: '2024-01-01',
        expectedEndDate: '2031-12-01',
        phases: [
            { name: 'Street works & infrastructure', start: '2024-01-01', end: '2026-12-01' },
            { name: 'Village construction', start: '2026-06-01', end: '2030-06-01' },
            { name: 'Games-time operations', start: '2032-07-01', end: '2032-09-01' },
            { name: 'Legacy conversion', start: '2032-09-01', end: '2035-12-01' }
        ],
        estimatedVolume: '600,000+ m³',
        sourceUrl: 'https://economic.development.qld.gov.au/northshore-hamilton'
    }
];

const projectStatusColors = { active: '#22c55e', upcoming: '#f59e0b', planning: '#3b82f6' };
const projectStatusLabels = { active: 'Active', upcoming: 'Upcoming', planning: 'Planning' };
const projectTypeIcons = { rail: 'fa-train', road: 'fa-road', venue: 'fa-building', precinct: 'fa-city' };
let majorProjectLayerGroup = L.layerGroup();
let projectsVisible = true;

function getFilteredProjects() {
    const statusFilters = Array.from(document.querySelectorAll('[data-filter="project-status"]:checked')).map(c => c.value);
    const typeFilters = Array.from(document.querySelectorAll('[data-filter="project-type"]:checked')).map(c => c.value);
    const search = document.getElementById('searchInput').value.toLowerCase();
    const zoom = map.getZoom();
    return majorProjects.filter(p => {
        if (!statusFilters.includes(p.status)) return false;
        if (!typeFilters.includes(p.projectType)) return false;
        // Major projects visible at zoom 7+ (or any zoom if searching)
        if (!search && zoom < 7) return false;
        if (search) {
            const haystack = `${p.name} ${p.suburb} ${p.description} ${p.authority} ${p.projectType} major project`.toLowerCase();
            if (!haystack.includes(search)) return false;
        }
        return true;
    });
}

function addProjectMarkers(filtered) {
    majorProjectLayerGroup.clearLayers();
    if (!filtered) filtered = majorProjects;
    filtered.forEach(p => {
        const color = projectStatusColors[p.status];
        const icon = projectTypeIcons[p.projectType] || 'fa-hard-hat';
        const marker = L.marker([p.lat, p.lng], {
            icon: L.divIcon({
                className: '',
                html: `<div style="width:34px;height:34px;border-radius:50%;background:${color};border:3px solid rgba(224,219,211,0.6);display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;box-shadow:0 3px 10px rgba(0,0,0,0.5);cursor:pointer;"><i class="fas ${icon}"></i></div>`,
                iconSize: [34, 34],
                iconAnchor: [17, 17]
            })
        });
        marker.bindTooltip(`<strong>${p.name}</strong><br>${p.suburb} · ${projectStatusLabels[p.status]} · ${p.cost}`, { direction: 'top', offset: [0, -18], className: 'custom-tooltip' });
        marker.on('click', () => showProjectPanel(p));
        majorProjectLayerGroup.addLayer(marker);
    });
}

function calcProjectProgress(p) {
    const now = Date.now();
    const start = new Date(p.startDate).getTime();
    const end = new Date(p.expectedEndDate).getTime();
    if (now <= start) return 0;
    if (now >= end) return 100;
    return Math.round(((now - start) / (end - start)) * 100);
}

function getPhaseStatus(phase) {
    const now = Date.now();
    const start = new Date(phase.start).getTime();
    const end = new Date(phase.end).getTime();
    if (now >= end) return 'done';
    if (now >= start) return 'current';
    return 'future';
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' });
}

function showProjectPanel(p) {
    const panel = document.getElementById('infoPanel');
    const color = projectStatusColors[p.status];
    const icon = projectTypeIcons[p.projectType] || 'fa-hard-hat';
    const progress = calcProjectProgress(p);

    const phasesHtml = p.phases.map(phase => {
        const status = getPhaseStatus(phase);
        return `<div class="project-phase ${status}">
            <span class="project-phase-name">${phase.name}</span>
            <span class="project-phase-dates">${formatDate(phase.start)} – ${formatDate(phase.end)}</span>
        </div>`;
    }).join('');

    document.getElementById('infoPanelContent').innerHTML = `
        <div class="info-header">
            <div class="info-icon" style="background:rgba(255,255,255,0.08);color:${color};">
                <i class="fas ${icon}"></i>
            </div>
            <div>
                <div class="info-title">${p.name}</div>
                <div class="info-subtitle">${p.suburb} · ${p.projectType.charAt(0).toUpperCase() + p.projectType.slice(1)}</div>
            </div>
        </div>
        <div class="badge-row">
            <span class="info-badge" style="background:${color}22;color:${color};">${projectStatusLabels[p.status]}</span>
            <span class="badge" style="background:rgba(255,255,255,0.06);color:var(--text-muted);"><i class="fas fa-dollar-sign"></i> ${p.cost}</span>
            <span class="badge" style="background:rgba(255,255,255,0.06);color:var(--text-muted);"><i class="fas fa-building"></i> ${p.authority}</span>
        </div>
        <div class="info-notes"><i class="fas fa-info-circle" style="color:var(--blue);margin-right:6px;"></i>${p.description}</div>
        <div style="margin-top:10px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
                <strong style="font-size:12px;"><i class="fas fa-tasks" style="color:var(--amber);margin-right:4px;"></i>Timeline Progress</strong>
                <span style="font-size:11px;color:var(--text-muted);">${progress}%</span>
            </div>
            <div class="project-progress-bar">
                <div class="project-progress-fill" style="width:${progress}%;"></div>
            </div>
            <div class="project-progress-label">
                <span>${formatDate(p.startDate)}</span>
                <span>${formatDate(p.expectedEndDate)}</span>
            </div>
        </div>
        <div class="project-timeline">
            <strong style="font-size:12px;display:block;margin-bottom:6px;"><i class="fas fa-stream" style="color:var(--green);margin-right:4px;"></i>Project Phases</strong>
            ${phasesHtml}
        </div>
        ${p.estimatedVolume ? `<div class="info-notes" style="margin-top:8px;"><i class="fas fa-truck-loading" style="color:var(--amber);margin-right:6px;"></i>Estimated earthworks: <strong>${p.estimatedVolume}</strong></div>` : ''}
        <div style="margin-top:8px;display:flex;gap:6px;align-items:center;">
            <a href="${p.sourceUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-outline" style="font-size:11px;"><i class="fas fa-external-link-alt"></i> Official Project Page</a>
        </div>
        <div style="margin-top:8px;font-size:10px;color:var(--text-dim);"><i class="fas fa-exclamation-circle" style="margin-right:4px;"></i>This data is indicative and sourced from publicly available government information. Dates and volumes are estimates only.</div>
    `;
    panel.classList.add('visible');
    clearRouteLine();
    map.panTo([p.lat, p.lng]);
}

function applyProjectFilters() {
    const filtered = getFilteredProjects();
    addProjectMarkers(filtered);
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {
    // Initial render — facilities, water fill points, and major projects
    applyFacilityFilters();
    facilityLayerGroup.addTo(map);
    waterFillLayerGroup.addTo(map);
    applyProjectFilters();
    majorProjectLayerGroup.addTo(map);
    renderDashboard();

    // Load LGA boundaries and fire ant zones from inline data
    loadLGABoundaries();
    lgaLayerGroup.addTo(map);
    loadFireAntZones();

    // View nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    // Facility & project filters
    document.querySelectorAll('[data-filter]').forEach(cb => {
        cb.addEventListener('change', () => {
            applyFacilityFilters();
            applyProjectFilters();
        });
    });
    document.getElementById('searchInput').addEventListener('input', () => {
        applyFacilityFilters();
        applyProjectFilters();
    });
    document.getElementById('clearFilters').addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(cb => {
            cb.checked = true;
        });
        document.getElementById('searchInput').value = '';
        applyFacilityFilters();
        applyProjectFilters();
    });

    // Clear facility filters — uncheck facility types only, keep hours intact
    document.getElementById('clearFacilityFilters').addEventListener('click', () => {
        document.querySelectorAll('[data-filter="facility"]').forEach(cb => {
            cb.checked = false;
        });
        applyFacilityFilters();
    });

    // Clear project filters — uncheck status only, keep type intact
    document.getElementById('clearProjectFilters').addEventListener('click', () => {
        document.querySelectorAll('[data-filter="project-status"]').forEach(cb => {
            cb.checked = false;
        });
        applyProjectFilters();
    });

    // Address search
    initAddressSearch();

    // Info panel close
    document.getElementById('infoPanelClose').addEventListener('click', () => {
        document.getElementById('infoPanel').classList.remove('visible');
        clearRouteLine();
    });

    // Sidebar toggle
    document.getElementById('btnToggleSidebar').addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
        sidebar.classList.remove('mobile-open');
        document.getElementById('sidebarBackdrop').classList.remove('visible');
        setTimeout(() => map.invalidateSize(), 350);
    });

    // Mobile filter drawer
    document.getElementById('btnMobileFilters').addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        const backdrop = document.getElementById('sidebarBackdrop');
        const isOpen = sidebar.classList.contains('mobile-open');
        sidebar.classList.toggle('mobile-open', !isOpen);
        backdrop.classList.toggle('visible', !isOpen);
    });
    document.getElementById('sidebarBackdrop').addEventListener('click', () => {
        document.getElementById('sidebar').classList.remove('mobile-open');
        document.getElementById('sidebarBackdrop').classList.remove('visible');
    });

    // Satellite toggle
    document.getElementById('btnSatellite').addEventListener('click', function() {
        usingSatellite = !usingSatellite;
        if (usingSatellite) {
            map.removeLayer(osmLayer);
            map.removeLayer(labelLayer);
            satLayer.addTo(map);
        } else {
            map.removeLayer(satLayer);
            osmLayer.addTo(map);
            labelLayer.addTo(map);
        }
        this.classList.toggle('active');
    });

    // LGA boundary toggle
    document.getElementById('btnLGA').addEventListener('click', function() {
        lgaVisible = !lgaVisible;
        if (lgaVisible) {
            lgaLayerGroup.addTo(map);
        } else {
            map.removeLayer(lgaLayerGroup);
        }
        this.classList.toggle('active');
    });

    // Fire ant zone toggle
    document.getElementById('btnFireAnts').addEventListener('click', function() {
        fireAntVisible = !fireAntVisible;
        if (fireAntVisible) {
            fireAntLayerGroup.addTo(map);
        } else {
            map.removeLayer(fireAntLayerGroup);
        }
        this.classList.toggle('active');
    });

    // Major Projects toggle
    document.getElementById('btnProjects').addEventListener('click', function() {
        projectsVisible = !projectsVisible;
        if (projectsVisible) {
            majorProjectLayerGroup.addTo(map);
        } else {
            map.removeLayer(majorProjectLayerGroup);
        }
        this.classList.toggle('active');
    });

    // Zone warning close
    document.getElementById('zoneWarningClose').addEventListener('click', () => {
        document.getElementById('zoneWarningBanner').classList.remove('visible');
    });

    // My location
    document.getElementById('btnMyLocation').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                map.setView([pos.coords.latitude, pos.coords.longitude], 13);
            }, () => {
                showToast('Location access denied');
            });
        }
    });

    // Heatmap toggle
    document.getElementById('btnHeatmap').addEventListener('click', function() {
        this.classList.toggle('active');
        showToast('Heatmap view — coming in full release');
    });

    // Post listing modal
    document.getElementById('btnPostListing').addEventListener('click', () => {
        document.getElementById('postModal').classList.add('visible');
        document.getElementById('formDateFrom').valueAsDate = new Date();
    });
    document.getElementById('modalClose').addEventListener('click', () => {
        document.getElementById('postModal').classList.remove('visible');
    });
    document.getElementById('formCancel').addEventListener('click', () => {
        document.getElementById('postModal').classList.remove('visible');
    });
    document.getElementById('postModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('postModal')) {
            document.getElementById('postModal').classList.remove('visible');
        }
    });

    // Material type tooltip in form
    document.getElementById('formMaterial').addEventListener('change', function() {
        const tip = document.getElementById('materialTooltip');
        const text = materialTooltips[this.value];
        if (text) {
            tip.innerHTML = `<i class="fas fa-info-circle"></i> ${text}`;
            tip.classList.add('visible');
        } else {
            tip.classList.remove('visible');
        }
    });

    // Form submit
    document.getElementById('postForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        try {
            const resp = await fetch('https://formspree.io/f/xdawqlvg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    _subject: 'Cut2Fill — New Site Registration',
                    listingType: document.querySelector('input[name="listingType"]:checked')?.value,
                    company: document.getElementById('formCompany').value,
                    phone: document.getElementById('formPhone').value,
                    email: document.getElementById('formEmail').value,
                    project: document.getElementById('formProject').value,
                    material: document.getElementById('formMaterial').value,
                    volume: document.getElementById('formVolume').value,
                    dateFrom: document.getElementById('formDateFrom').value,
                    dateTo: document.getElementById('formDateTo').value,
                    pricing: document.querySelector('input[name="formPricing"]:checked')?.value,
                    address: document.getElementById('formAddress').value,
                    notes: document.getElementById('formNotes').value,
                    tested: document.getElementById('formTested').checked,
                    pickup: document.getElementById('formPickup').checked,
                    delivery: document.getElementById('formDelivery').checked
                })
            });
            if (resp.ok) {
                showToast('Site submitted for verification — the Archers team will review and be in touch.');
            } else {
                showToast('Failed to send — please try again.');
            }
        } catch (err) {
            showToast('Network error — please try again.');
        }
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit for Verification';
        document.getElementById('postModal').classList.remove('visible');
        document.getElementById('postForm').reset();
        document.getElementById('materialTooltip').classList.remove('visible');
    });

    // Submit a Source modal
    document.getElementById('btnSubmitSource').addEventListener('click', () => {
        document.getElementById('sourceModal').classList.add('visible');
    });
    document.getElementById('sourceModalClose').addEventListener('click', () => {
        document.getElementById('sourceModal').classList.remove('visible');
    });
    document.getElementById('sourceCancel').addEventListener('click', () => {
        document.getElementById('sourceModal').classList.remove('visible');
    });
    document.getElementById('sourceModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('sourceModal')) {
            document.getElementById('sourceModal').classList.remove('visible');
        }
    });
    document.getElementById('sourceForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        try {
            const resp = await fetch('https://formspree.io/f/xdawqlvg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    _subject: 'Cut2Fill — New Material Source Submitted',
                    sourceType: document.getElementById('sourceType').value,
                    location: document.getElementById('sourceLocation').value,
                    town: document.getElementById('sourceTown').value,
                    lga: document.getElementById('sourceLGA').value,
                    name: document.getElementById('sourceName').value,
                    material: document.getElementById('sourceMaterial').value,
                    operator: document.getElementById('sourceOperator').value,
                    notes: document.getElementById('sourceNotes').value,
                    contactName: document.getElementById('sourceContactName').value,
                    contactInfo: document.getElementById('sourceContactInfo').value
                })
            });
            if (resp.ok) {
                showToast('Thanks! Source submitted — the Archers team will verify and add it to the map.');
            } else {
                showToast('Failed to send — please try again.');
            }
        } catch (err) {
            showToast('Network error — please try again.');
        }
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Source';
        document.getElementById('sourceModal').classList.remove('visible');
        document.getElementById('sourceForm').reset();
    });

    // Feedback modal
    document.getElementById('btnFeedback').addEventListener('click', () => {
        document.getElementById('feedbackModal').classList.add('visible');
    });
    document.getElementById('feedbackModalClose').addEventListener('click', () => {
        document.getElementById('feedbackModal').classList.remove('visible');
    });
    document.getElementById('feedbackCancel').addEventListener('click', () => {
        document.getElementById('feedbackModal').classList.remove('visible');
    });
    document.getElementById('feedbackModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('feedbackModal')) {
            document.getElementById('feedbackModal').classList.remove('visible');
        }
    });
    document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        try {
            const resp = await fetch('https://formspree.io/f/xdawqlvg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name: document.getElementById('feedbackName').value,
                    email: document.getElementById('feedbackEmail').value,
                    type: document.getElementById('feedbackType').value,
                    message: document.getElementById('feedbackMessage').value
                })
            });
            if (resp.ok) {
                showToast('Thanks for your feedback! We\'ll review it shortly.');
            } else {
                showToast('Failed to send — please try again.');
            }
        } catch (err) {
            showToast('Network error — please try again.');
        }
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Feedback';
        document.getElementById('feedbackModal').classList.remove('visible');
        document.getElementById('feedbackForm').reset();
    });

    // Legal disclaimer modal
    document.getElementById('disclaimerToggle').addEventListener('click', () => {
        document.getElementById('disclaimerModal').style.display = 'flex';
    });
    document.getElementById('disclaimerClose').addEventListener('click', () => {
        document.getElementById('disclaimerModal').style.display = 'none';
    });
    document.getElementById('disclaimerModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('disclaimerModal')) {
            document.getElementById('disclaimerModal').style.display = 'none';
        }
    });

    // Sign in
    document.getElementById('btnLogin').addEventListener('click', () => {
        showToast('Sign In — coming in full release');
    });

    // Map click to close info panel
    map.on('click', () => {
        document.getElementById('infoPanel').classList.remove('visible');
        clearRouteLine();
    });

    // Re-render markers when zoom changes (zoom-based visibility)
    map.on('zoomend', () => {
        applyFacilityFilters();
        applyProjectFilters();
    });

    // SEQ region boundary replaced by individual LGA boundaries loaded from QLD Government data
});
