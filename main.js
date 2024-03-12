
let map = L.map('map', {                // criar variável map
    center: [-12.812713, -50.500242],   // coordenadas centrais que o mapa será carregado
    zoom: 5,                           // zoom/escala que o mapa será carragado (0 = mundo)
    minZoom: 3,                         // zoom/escala mínima possível, que corresponde ao enquadramento mínimo
    maxZoom: 18                         // zoom/escala máxima possível
    });

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {                             // carrega base do mapa
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
,  // informação da fonte da base
    }).addTo(map);                                                                          // adicionar à variável map (criada acima)

L.control.scale({maxWidth: 200		// adicionar a escala (comprimento 200 pixel)
		}).addTo(map);

L.geoJSON.ajax('dados/precisao5.geojson').addTo(map);

//Plugin magic goes here! Note that you cannot use the same layer object again, as that will confuse the two map controls
		var osm2 = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                   {minZoom: 0, maxZoom: 13, attribution: 'Map data &copy; OpenStreetMap contributors' });
		var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(map);


L.imageOverlay('dados/araguaia_teste.png',  // imagem a ser projetada
		[[-18.0645362089999999, -55.4145545949999985], [-5.2869447669999996,-47.6682185960000027]]	// coordenadas (long-lat sup esquedo)
		).addTo(map);

/* add watermark */
L.Control.Watermark = L.Control.extend({
    onAdd: function(map) {
        var img = L.DomUtil.create('img');

        img.src = 'img/logo.png';
        img.style.width = '290px';

        return img;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.control.watermark = function(opts) {
    return new L.Control.Watermark(opts);
}

L.control.watermark({ position: 'bottomright' }).addTo(map);




// formatação da caixa
const caixa = L.control({ position: "topright" });

caixa.onAdd = function () {
  let div = L.DomUtil.create("div", "description");
  L.DomEvent.disableClickPropagation(div);
  const text =
    "<h1>TÍTULO PRINCIPAL</h1><br></br><p>Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...</p>";
  div.insertAdjacentHTML("beforeend", text);
  return div;
};

caixa.addTo(map);

