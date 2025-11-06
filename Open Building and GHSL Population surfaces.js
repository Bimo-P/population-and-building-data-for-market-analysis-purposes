
// Visualization of GOOGLE/Research/open-buildings/v3/polygons.

var t = ee.FeatureCollection('GOOGLE/Research/open-buildings/v3/polygons').filterBounds(geometry);
var t1 = ee.FeatureCollection('GOOGLE/Research/open-buildings/v3/polygons').filterBounds(Threshold);

var t_065_070 = t.filter('confidence >= 0.65 && confidence < 0.7');
var t_070_075 = t.filter('confidence >= 0.7 && confidence < 0.75');
var t_gte_075 = t.filter('confidence >= 0.75');
var t1_gte_075 = t1.filter('confidence >= 0.75');

Map.addLayer(t_065_070, {color: 'FF0000'}, 'Buildings confidence [0.65; 0.7)');
Map.addLayer(t_070_075, {color: 'FFFF00'}, 'Buildings confidence [0.7; 0.75)');
Map.addLayer(t_gte_075, {color: '00FF00'}, 'Buildings confidence >= 0.75');
Map.addLayer(t1_gte_075, {color: '00FF00'}, 'Buildings confidence >= 0.75_1');

//confidence >= 0.75
Export.table.toDrive({
  collection: t_gte_075,
  description: 'Building_gte_075_inside_ring_road_jogja',
  fileFormat: 'GeoJSON'
});

var population = ee.ImageCollection("JRC/GHSL/P2023A/GHS_POP")


Map.addLayer(population.toBands().clip(geometry),[],'population')

print(
  ui.Chart.image.series(population, geometry, ee.Reducer.sum(),
  100, 'system:time_start')
  )
//Visualisation 2025
var population1 = ee.Image('JRC/GHSL/P2023A/GHS_POP/2025');
var populationCountVis = {
  min: 0.0,
  max: 100.0,
  palette:
      ['000004', '320A5A', '781B6C', 'BB3654', 'EC6824', 'FBB41A', 'FCFFA4']
};
Map.addLayer(population1.clip(Threshold),populationCountVis,'population1')
Map.addLayer(Threshold)

//sources : 
//Google earth engine default open Building
//Amir Hossein Ahrari Population Youtube Videos
//for open building video tutorial for indonesian can open Izzuddin Muhammad YT channel