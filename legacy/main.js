window.onload = init;

function init(){
    // Interactive Map
    const map = new ol.Map({
        view: new ol.View({
            center: [15091875.5393, -2890099.0297,],
            zoom: 4,
            extent: [11644482.3712, -5927677.981920381, 17897308.6678, -423055.8371]
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'openlayers-map'
    })

    //Layers URL
    const roa_obj = 'http://localhost:8080/geoserver/Bikini_Bottom/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Bikini_Bottom%3Aroad&maxFeatures=50&outputFormat=application%2Fjson'
    const srv_obj = 'http://localhost:8080/geoserver/Bikini_Bottom/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Bikini_Bottom%3Aservice&maxFeatures=50&outputFormat=application%2Fjson'
    const att_obj = 'http://localhost:8080/geoserver/Bikini_Bottom/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Bikini_Bottom%3Aattraction&maxFeatures=50&outputFormat=application%2Fjson'
    const ame_obj = 'http://localhost:8080/geoserver/Bikini_Bottom/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Bikini_Bottom%3Aamenity&maxFeatures=50&outputFormat=application%2Fjson'

    //POPUP
    const popup_element = document.getElementById('popup');
    const road_value = document.getElementById('popup_name');
    const type_value = document.getElementById('popup_type');
    const cond_value = document.getElementById('popup_cond');
    const stat_value = document.getElementById('popup_stat');
    const prog_value = document.getElementById('popup_prog');
    const budg_value = document.getElementById('popup_budg');
    const vist_value = document.getElementById('popup_vist');
    const lbor_value = document.getElementById('popup_lbor');
    const gdp_value = document.getElementById('popup_gdp');

    const popup = new ol.Overlay({
      element: popup_element
    })
    map.addOverlay(popup)

    map.on('click', function(e){
      popup.setPosition(undefined)
      map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
        let coordinate = e.coordinate
        popup.setPosition(coordinate)
        road_value.innerHTML = feature.get('name')
        type_value.innerHTML = feature.get('type')
        cond_value.innerHTML = feature.get('condition')
        stat_value.innerHTML = feature.get('status')
        prog_value.innerHTML = feature.get('progress')
        budg_value.innerHTML = feature.get('budget').toLocaleString('en')
        vist_value.innerHTML = feature.get('visitor').toLocaleString('en')
        lbor_value.innerHTML = feature.get('labor').toLocaleString('en')
        gdp_value.innerHTML = feature.get('gdp').toLocaleString('en')
      })
    })
    
    //STYLING LAYERS
    //Road
    const road_style = function(feature){
      let road_type = feature.get('type');
  
      // Stroke Style = SEA Nations
      if(road_type === "primary"){
        feature.setStyle([
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: [191, 13, 13,1],
              width: 5
            }),
            zIndex: 4
          })
        ])
      }
      
      if(road_type === "secondary"){
        feature.setStyle([
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: [0, 0, 0, 1],
              width: 3
            }),
            zIndex: 3
          })
        ])
      }

      if(road_type === "tertiary"){
        feature.setStyle([
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: [0, 0, 0, 1],
              width: 1
            }),
            zIndex: 2
          })
        ])
      }

      if(road_type === "service"){
        feature.setStyle([
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: [0, 0, 0, 1],
              width: 1,
              lineDash: [2,4]
            }),
            zIndex: 1
          })
        ])
      }
    }

    //Service
    const service_style = function(feature){
      let service_type = feature.get('type');
  
      //style per attribute
      if(service_type === "hub"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/transport_car_share.png',
              scale: 0.04,
            }),
            zIndex: 4
          })
        ])
      }
      else if(service_type === "watersupply"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/tourist_view_point_blue.png',
              scale: 0.04,
            }),
            zIndex: 5
          })
        ])
      }
      else if(service_type === "wastewater"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/tourist_view_point_brown.png',
              scale: 0.04,
            }),
            zIndex: 6
          })
        ])
      }
      else if(service_type === "solidwaste"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/amenity_waste_bin.png',
              scale: 0.04,
            }),
            zIndex: 7
          })
        ])
      }
      else if(service_type === "electricity"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/poi_tower_power.png',
              scale: 0.04,
            }),
            zIndex: 8
          })
        ])
      }
      else{
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/shopping_garden_centre.png',
              scale: 0.04,
            }),
            zIndex: 9
          })
        ])
      }
    }

    //Attraction
    const attraction_style = function(feature){
      let attraction_type = feature.get('type');
  
      //style per attribute
      if(attraction_type === "amusement"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/tourist_theatre.png',
              scale: 0.04,
            }),
            zIndex: 10
          })
        ])
      }
      if(attraction_type === "cinema"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/tourist_cinema.png',
              scale: 0.04,
            }),
            zIndex: 11
          })
        ])
      }
      if(attraction_type === "culture"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/tourist_monument.png',
              scale: 0.04,
            }),
            zIndex: 12
          })
        ])
      }
      if(attraction_type === "historic house"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/accommodation_house.png',
              scale: 0.04,
            }),
            zIndex: 13
          })
        ])
      }
      if(attraction_type === "landmark"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/tourist_windmill.png',
              scale: 0.04,
            }),
            zIndex: 14
          })
        ])
      }
      if(attraction_type === "nature"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/landuse_deciduous.png',
              scale: 0.04,
            }),
            zIndex: 15
          })
        ])
      }
    }

    //Accomodation
    const amenity_style = function(feature){
      let amenity_type = feature.get('type');
  
      //style per attribute
      if(amenity_type === "fnb"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/food_fastfood.png',
              scale: 0.04,
            }),
            zIndex: 16
          })
        ])
      }
      if(amenity_type === "hotel"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/accommodation_hotel2.png',
              scale: 0.04,
            }),
            zIndex: 17
          })
        ])
      }
      if(amenity_type === "resort"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/city_building.png',
              scale: 0.04,
            }),
            zIndex: 18
          })
        ])
      }
      if(amenity_type === "shop"){
        feature.setStyle([
          new ol.style.Style({
            image: new ol.style.Icon({
              src: '/data/symbol/shop_supermarket.png',
              scale: 0.04,
            }),
            zIndex: 19
          })
        ])
      }
    }
    
    //DISPLAY LAYERS
    // Layers - Infrastructure Road
    const Road_cond = new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/Bikini_Bottom/wms',
        params: {
          LAYERS: 'Bikini_Bottom:road',
          FORMAT: 'image/png'
        }
      }),
      visible: false,
      title: 'Road_cond',
      zIndex: 0
    })
    const Road = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: roa_obj,
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        style: road_style,
        title: 'Road',
        zIndex: 1
    })

    //Layer - Infrastructure Service
    const Service = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: srv_obj,
            format: new ol.format.GeoJSON()
        }),
        visible: false,
        style: service_style,
        title: 'Service',
        zIndex: 11
    })

    //Layer - Attraction
    const Attraction = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: att_obj,
            format: new ol.format.GeoJSON()
        }),
        visible: false,
        style: attraction_style,
        title: 'Attraction',
        zIndex: 12
    })

    const Att_WMS_visit = new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/Bikini_Bottom/wms?styles=Visitor',
        params: {
          LAYERS: 'Bikini_Bottom:attraction',
          FORMAT: 'image/png'
        }
      }),
      visible: false,
      title: 'Att_Visit',
      zIndex: 2
    })

    const Att_WMS_labor = new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/Bikini_Bottom/wms',
        params: {
          LAYERS: 'Bikini_Bottom:attraction',
          FORMAT: 'image/png'
        }
      }),
      visible: false,
      title: 'Att_Labor',
      zIndex: 3
    })
    const Att_WMS_GDP = new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/Bikini_Bottom/wms?styles=GDP',
        params: {
          LAYERS: 'Bikini_Bottom:attraction',
          FORMAT: 'image/png'
        }
      }),
      visible: false,
      title: 'Att_GDP',
      zIndex: 4
    })
    
    //Layer - Amenity
    const Amenity = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: ame_obj,
            format: new ol.format.GeoJSON()
        }),
        visible: false,
        style: amenity_style,
        title: 'Amenity',
        zIndex: 13
    })

    const Ame_WMS_visit = new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/Bikini_Bottom/wms?styles=Visitor',
        params: {
          LAYERS: 'Bikini_Bottom:amenity',
          FORMAT: 'image/png'
        }
      }),
      visible: false,
      title: 'Ame_Visit',
      zIndex: 5
    })

    const Ame_WMS_labor = new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/Bikini_Bottom/wms',
        params: {
          LAYERS: 'Bikini_Bottom:amenity',
          FORMAT: 'image/png'
        }
      }),
      visible: false,
      title: 'Ame_Labor',
      zIndex: 6
    })
    const Ame_WMS_GDP = new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/Bikini_Bottom/wms?styles=GDP',
        params: {
          LAYERS: 'Bikini_Bottom:amenity',
          FORMAT: 'image/png'
        }
      }),
      visible: false,
      title: 'Ame_GDP',
      zIndex: 7
    })

    const LayerGroup = new ol.layer.Group({
        layers: [Road, Service, Attraction, Amenity, Road_cond, Att_WMS_visit, Att_WMS_labor, Att_WMS_GDP, Ame_WMS_visit, Ame_WMS_labor, Ame_WMS_GDP]
    })
    map.addLayer(LayerGroup)

    /// Layer Switcher
    const LayerElements = document.querySelectorAll('.layer > input[type=checkbox]');
    for(let LayerElement of LayerElements){
        LayerElement.addEventListener('change', function(){
            let LayerElementValue = this.value;
            let Layer;
            LayerGroup.getLayers().forEach(function(element, index, array){
                if(LayerElementValue === element.get('title')){
                    Layer = element;
                }
            })
            this.checked ? Layer.setVisible(true) : Layer.setVisible(false)
        })
    }

    // Navigation Button Logic
    const stateNavigations = document.querySelectorAll('.column-navigation > a');
    const stateElement = document.getElementById('state-title');
    const flagElement = document.getElementById('state-flag')
    const mapView = map.getView();

    // Function to zoom on the State/Territory
    for(const stateNavigation of stateNavigations){
        stateNavigation.addEventListener('click', function(e){
            let clickedAnchorElement = this.id;
            if(clickedAnchorElement === "AUS"){
                mapView.animate({center: [15091875, -2890099]}, {zoom: 4});
                stateElement.innerHTML = '<b>Commonwealth of Australia</b>';
                flagElement.setAttribute('src', '/data/image_data/Flag_image_AUS.png');
            }
            if(clickedAnchorElement === "WA"){
                mapView.animate({center: [13479359, -2853693]}, {zoom: 5.3});
                stateElement.innerHTML = '<b>Western Australia</b>';
                flagElement.setAttribute('src', '/data/image_data/Flag_image_WA.png');
            }
            if(clickedAnchorElement === "SA"){
                mapView.animate({center: [15100000, -3900000]}, {zoom: 6});
                stateElement.innerHTML = '<b>South Australia</b>';
                flagElement.setAttribute('src', '/data/image_data/Flag_image_SA.png');
            }
            if(clickedAnchorElement === "VI"){
                mapView.animate({center: [16195076,-4459835]}, {zoom: 6.5});
                stateElement.innerHTML = '<b>Victoria</b>';
                flagElement.setAttribute('src', '/data/image_data/Flag_image_VI.png');
            }
            if(clickedAnchorElement === "NSW"){
                mapView.animate({center: [16367136,-3850157]}, {zoom: 6.2});
                stateElement.innerHTML = '<b>New South Wales</b>';
                flagElement.setAttribute('src', '/data/image_data/Flag_image_NW.png');
            }
            if(clickedAnchorElement === "QL"){
                mapView.animate({center: [16190133,-2260000]}, {zoom: 5.6});
                stateElement.innerHTML = '<b>Queensland</b>';
                flagElement.setAttribute('src', '/data/image_data/Flag_image_QL.png');
            }
            if(clickedAnchorElement === "NT"){
                mapView.animate({center: [14865885, -2112901]}, {zoom: 6});
                stateElement.innerHTML = '<b>Northern Territory</b>';
                flagElement.setAttribute('src', '/data/image_data/Flag_image_NT.png');
            }
            if(clickedAnchorElement === "TS"){
                mapView.animate({center: [16350747, -5177052]}, {zoom: 7});
                stateElement.innerHTML = '<b>Tasmania</b>';
                flagElement.setAttribute('src', '/data/image_data/Flag_image_TS.png');
            }
            if(clickedAnchorElement === "ACT"){
                mapView.animate({center: [16588852, -4224655]}, {zoom: 9});
                stateElement.innerHTML = '<b>Australia Capital Territory</b>';
                flagElement.setAttribute('src', '/data/image_data/Flag_image_ACT.png');
            }
            if(clickedAnchorElement === "BB"){
                mapView.animate({center: [16835000, -2110000]}, {zoom: 14});
                stateElement.innerHTML = '<b>Bikini Bottom</b>';
                flagElement.setAttribute('src', '/data/icon/SpongeBob.png');
            }
        })
    }

    // Active Button Function
    const active = document.getElementsByClassName("state");
    for (let i = 0; i < active.length; i++) {
        active[i].addEventListener("click", function() {
        let current = document.getElementsByClassName("active");

        // If there's no active class
        if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
        }

        // Add the active class to the current/clicked button
        this.className += " active";
    });
    }

    // DISPLAY NUMBER OF PROGRESS
    async function getProgress(){
        const road = await fetch(roa_obj);
        const service = await fetch(srv_obj);
        const attraction = await fetch(att_obj);
        const amenity = await fetch(ame_obj);
        const data_rd = await road.json();
        const data_sv = await service.json();
        const data_at = await attraction.json();
        const data_am = await amenity.json();
        const obj_rd = data_rd.features;
        const obj_sv = data_sv.features;
        const obj_at = data_at.features;
        const obj_am = data_am.features;

        //BUDGET
        //table filter budget road
        const holder = {};
        obj_rd.forEach(function(d) {
          if (holder.hasOwnProperty(d.properties.type)) {
            holder[d.properties.type] = holder[d.properties.type] + d.properties.budget;
          } else {
            holder[d.properties.type] = d.properties.budget;
          }
        });
        const sumType = [];        
        for (var prop in holder) {
          sumType.push({ type: prop, budget: holder[prop] });
        }
        
        //table filter budget service
        const holder1 = {};
        obj_sv.forEach(function(d) {
          if (holder1.hasOwnProperty(d.properties.type)) {
            holder1[d.properties.type] = holder1[d.properties.type] + d.properties.budget;
          } else {
            holder1[d.properties.type] = d.properties.budget;
          }
        });
        const sumType1 = [];        
        for (var prop in holder1) {
          sumType1.push({ type: prop, budget: holder1[prop] });
        }
        
        //table filter budget attraction
        const holder2 = {};
        obj_at.forEach(function(d) {
          if (holder2.hasOwnProperty(d.properties.type)) {
            holder2[d.properties.type] = holder2[d.properties.type] + d.properties.budget;
          } else {
            holder2[d.properties.type] = d.properties.budget;
          }
        });
        const sumType2 = [];        
        for (var prop in holder2) {
          sumType2.push({ type: prop, budget: holder2[prop] });
        }
        
        //table filter budget amenity
        const holder3 = {};
        obj_am.forEach(function(d) {
          if (holder3.hasOwnProperty(d.properties.type)) {
            holder3[d.properties.type] = holder3[d.properties.type] + d.properties.budget;
          } else {
            holder3[d.properties.type] = d.properties.budget;
          }
        });
        const sumType3 = [];        
        for (var prop in holder3) {
          sumType3.push({ type: prop, budget: holder3[prop] });
        }
        
        //sum all table filter budget
        const sumType_all = sumType.concat(sumType1).concat(sumType2).concat(sumType3)
        const sumAll = sumType_all.reduce(function(sum, current) {
            return sum + current.budget;
        }, 0);
        const numBudget = sumAll.toLocaleString('en')
        document.getElementById('budget').textContent = numBudget
        
        //SUBPROJECT
        //table filter subproject
        const planned_rd = obj_rd.filter(obj_rd => obj_rd.properties.status === 'planned')
        const planned_sv = obj_sv.filter(obj_sv => obj_sv.properties.status === 'planned')
        const planned_at = obj_at.filter(obj_at => obj_at.properties.status === 'planned')
        const planned_am = obj_am.filter(obj_am => obj_am.properties.status === 'planned')
        const construction_rd = obj_rd.filter(obj_rd => obj_rd.properties.status === 'construction')
        const construction_sv = obj_sv.filter(obj_sv => obj_sv.properties.status === 'construction')
        const construction_at = obj_at.filter(obj_at => obj_at.properties.status === 'construction')
        const construction_am = obj_am.filter(obj_am => obj_am.properties.status === 'construction')
        const complete_rd = obj_rd.filter(obj_rd => obj_rd.properties.status === 'complete')
        const complete_sv = obj_sv.filter(obj_sv => obj_sv.properties.status === 'complete')
        const complete_at = obj_at.filter(obj_at => obj_at.properties.status === 'complete')
        const complete_am = obj_am.filter(obj_am => obj_am.properties.status === 'complete')

        //show subproject number
        const planned = planned_rd.length + planned_sv.length + planned_at.length + planned_am.length
        document.getElementById('planned').textContent = planned
        const construction = construction_rd.length + construction_sv.length + construction_at.length + construction_am.length
        document.getElementById('ongoing').textContent = construction
        const complete = complete_rd.length + complete_sv.length + complete_at.length + complete_am.length
        document.getElementById('complete').textContent = complete
        const total = planned + construction + complete
        document.getElementById('subproject').textContent = total

        //WORKFORCE
        //labor attraction
        const holder4 = {};
        obj_at.forEach(function(d) {
          if (holder4.hasOwnProperty(d.properties.type)) {
            holder4[d.properties.type] = holder4[d.properties.type] + d.properties.labor;
          } else {
            holder4[d.properties.type] = d.properties.labor;
          }
        });
        const sumType4 = [];        
        for (var prop in holder4) {
          sumType4.push({ type: prop, labor: holder4[prop] });
        }
        const sumAll_labor_at = sumType4.reduce(function(sum, current) {
            return sum + current.labor;
        }, 0);
        const numLabor_at = sumAll_labor_at.toLocaleString('en')
        document.getElementById('labor_att').textContent = numLabor_at

        //labor amenity
        const holder5 = {};
        obj_am.forEach(function(d) {
          if (holder5.hasOwnProperty(d.properties.type)) {
            holder5[d.properties.type] = holder5[d.properties.type] + d.properties.labor;
          } else {
            holder5[d.properties.type] = d.properties.labor;
          }
        });
        const sumType5 = [];        
        for (var prop in holder5) {
          sumType5.push({ type: prop, labor: holder5[prop] });
        }
        const sumAll_labor_am = sumType5.reduce(function(sum, current) {
            return sum + current.labor;
        }, 0);
        const numLabor_am = sumAll_labor_am.toLocaleString('en')
        document.getElementById('labor_ame').textContent = numLabor_am

        //labor all
        const all_labor = sumAll_labor_at + sumAll_labor_am
        const numAll_labor = all_labor.toLocaleString('en')
        document.getElementById('workforce').textContent = numAll_labor

        //GDP
        //gdp attraction
        const holder6 = {};
        obj_at.forEach(function(d) {
          if (holder6.hasOwnProperty(d.properties.type)) {
            holder6[d.properties.type] = holder6[d.properties.type] + d.properties.gdp;
          } else {
            holder6[d.properties.type] = d.properties.gdp;
          }
        });
        const sumType6 = [];
        for (var prop in holder6) {
          sumType6.push({ type: prop, gdp: holder6[prop] });
        }
        const sumAll6 = sumType6.reduce(function(sum, current) {
            return sum + current.gdp;
        }, 0);
        const numGDP_at = sumAll6.toLocaleString('en')
        document.getElementById('gdp_att').textContent = numGDP_at

        //gdp amenity
        const holder7 = {};
        obj_am.forEach(function(d) {
          if (holder7.hasOwnProperty(d.properties.type)) {
            holder7[d.properties.type] = holder7[d.properties.type] + d.properties.gdp;
          } else {
            holder7[d.properties.type] = d.properties.gdp;
          }
        });
        const sumType7 = [];
        for (var prop in holder7) {
          sumType7.push({ type: prop, gdp: holder7[prop] });
        }
        const sumAll7 = sumType7.reduce(function(sum, current) {
            return sum + current.gdp;
        }, 0);
        const numGDP_am = sumAll7.toLocaleString('en')
        document.getElementById('gdp_ame').textContent = numGDP_am
        
        //gdp all
        const all_gdp = sumAll6 + sumAll7
        const numAll_gdp = all_gdp.toLocaleString('en')
        document.getElementById('contribution').textContent = numAll_gdp
    }
    getProgress();

    // DISPLAY NUMBER FOR INFRASTRUCTURE ROAD
    async function getRoad(){
        const response = await fetch(roa_obj);
        const data = await response.json();
        const obj = data.features;
        
        //table filter length
        const holder = {};
        obj.forEach(function(d) {
          if (holder.hasOwnProperty(d.properties.condition)) {
            holder[d.properties.condition] = holder[d.properties.condition] + d.properties.road_length;
          } else {
            holder[d.properties.condition] = d.properties.road_length;
          }
        });
        const sumType = [];        
        for (var prop in holder) {
          sumType.push({ condition: prop, road_length: holder[prop] });
        }

        //show transport capacity
        const trans_cap = sumType[0].road_length
        const num_trans_cap = trans_cap.toLocaleString('en')
        document.getElementById('road_length_sp').textContent = num_trans_cap
        //sum
        const sumAll = sumType.reduce(function(sum, current) {
            return sum + current.road_length;
        }, 0);
        const numRoad = sumAll.toLocaleString('en')
        document.getElementById('road_length_dm').textContent = numRoad
    }
    getRoad();

    // NUMBER DISPLAY INFRASTRUCTURE SERVICE
    async function getService(){
        const response = await fetch(srv_obj);
        const data = await response.json();
        const obj = data.features;
        
        //table filter capacity
        const holder = {};
        obj.forEach(function(d) {
          if (holder.hasOwnProperty(d.properties.type)) {
            holder[d.properties.type] = holder[d.properties.type] + d.properties.capacity;
          } else {
            holder[d.properties.type] = d.properties.capacity;
          }
        });
        const sumType = [];        
        for (var prop in holder) {
          sumType.push({ type: prop, capacity: holder[prop] });
        }

        //show transport capacity
        const trans_cap = sumType[13].capacity
        const num_trans_cap = trans_cap.toLocaleString('en')
        document.getElementById('transport_hub_sp').textContent = num_trans_cap
        //show watersupply capacity
        const water_cap = sumType[11].capacity
        const num_water_cap = water_cap.toLocaleString('en')
        document.getElementById('water_supp_sp').textContent = num_water_cap
        //show wastewater capacity
        const wstWat_cap = sumType[12].capacity
        const num_wstWat_cap = wstWat_cap.toLocaleString('en')
        document.getElementById('wst_water_sp').textContent = num_wstWat_cap
        //show solidwaste capacity
        const sldWst_cap = sumType[9].capacity
        const num_sldWst_cap = sldWst_cap.toLocaleString('en')
        document.getElementById('solid_wst_sp').textContent = num_sldWst_cap
        //show electricity capacity
        const power_cap = sumType[10].capacity
        const num_power_cap = power_cap.toLocaleString('en')
        document.getElementById('power_supp_sp').textContent = num_power_cap

        //table filter arrival
        const holder1 = {};
        obj.forEach(function(d) {
          if (holder1.hasOwnProperty(d.properties.type)) {
            holder1[d.properties.type] = holder1[d.properties.type] + d.properties.arrival;
          } else {
            holder1[d.properties.type] = d.properties.arrival;
          }
        });
        const sumType1 = [];        
        for (var prop in holder1) {
          sumType1.push({ type: prop, arrival: holder1[prop] });
        }
        //show transport arrival
        const trans_avl = sumType1[13].arrival
        const num_trans_avl = trans_avl.toLocaleString('en')
        document.getElementById('transport_hub_dm').textContent = num_trans_avl
    }
    getService();

    // NUMBER DISPLAY INFRASTRUCTURE DEMAND
    async function getInfra(){
        const response_attraction = await fetch(att_obj);
        const response_amenity = await fetch(ame_obj)
        const data_attraction = await response_attraction.json();
        const data_amenity = await response_amenity.json();
        const obj_attraction = data_attraction.features;
        const obj_amenity = data_amenity.features

        //WATERSUPPLY
        //table filter watersupply - attraction
        const holder_att_ws = {};
        obj_attraction.forEach(function(d) {
          if (holder_att_ws.hasOwnProperty(d.properties.type)) {
            holder_att_ws[d.properties.type] = holder_att_ws[d.properties.type] + d.properties.water_use;
          } else {
            holder_att_ws[d.properties.type] = d.properties.water_use;
          }
        });
        const sumType_att_ws = [];        
        for (var prop_att_ws in holder_att_ws) {
          sumType_att_ws.push({ type: prop_att_ws, water_use: holder_att_ws[prop_att_ws] });
        }

        //table filter watersupply - amenity
        const holder_ame_ws = {};
        obj_amenity.forEach(function(d) {
          if (holder_ame_ws.hasOwnProperty(d.properties.type)) {
            holder_ame_ws[d.properties.type] = holder_ame_ws[d.properties.type] + d.properties.water_use;
          } else {
            holder_ame_ws[d.properties.type] = d.properties.water_use;
          }
        });
        const sumType_ame_ws = [];        
        for (var prop_ame_ws in holder_ame_ws) {
          sumType_ame_ws.push({ type: prop_ame_ws, water_use: holder_ame_ws[prop_ame_ws] });
        }

        //sum all table filter watersupply
        const sumType_all_ws = sumType_att_ws.concat(sumType_ame_ws)
        const sumAll_ws = sumType_all_ws.reduce(function(sum, current) {
            return sum + current.water_use;
        }, 0);
        const numWS = sumAll_ws.toLocaleString('en')
        document.getElementById('water_supp_dm').textContent = numWS

        //WASTEWATER
        //table filter wastewater - attraction
        const holder_att_ww = {};
        obj_attraction.forEach(function(d) {
          if (holder_att_ww.hasOwnProperty(d.properties.type)) {
            holder_att_ww[d.properties.type] = holder_att_ww[d.properties.type] + d.properties.wastewater_prod;
          } else {
            holder_att_ww[d.properties.type] = d.properties.wastewater_prod;
          }
        });
        const sumType_att_ww = [];        
        for (var prop_att_ww in holder_att_ww) {
          sumType_att_ww.push({ type: prop_att_ww, wastewater_prod: holder_att_ww[prop_att_ww] });
        }

        //table filter wastewater - amenity
        const holder_ame_ww = {};
        obj_amenity.forEach(function(d) {
          if (holder_ame_ww.hasOwnProperty(d.properties.type)) {
            holder_ame_ww[d.properties.type] = holder_ame_ww[d.properties.type] + d.properties.wastewater_prod;
          } else {
            holder_ame_ww[d.properties.type] = d.properties.wastewater_prod;
          }
        });
        const sumType_ame_ww = [];        
        for (var prop_ame_ww in holder_ame_ww) {
          sumType_ame_ww.push({ type: prop_ame_ww, wastewater_prod: holder_ame_ww[prop_ame_ww] });
        }

        //sum all table filter wastewater
        const sumType_all_ww = sumType_att_ww.concat(sumType_ame_ww)
        const sumAll_ww = sumType_all_ww.reduce(function(sum, current) {
            return sum + current.wastewater_prod;
        }, 0);
        const numWW = sumAll_ww.toLocaleString('en')
        document.getElementById('wst_water_dm').textContent = numWW

        //SOLIDWASTE
        //table filter solidwaste - attraction
        const holder_att_sw = {};
        obj_attraction.forEach(function(d) {
          if (holder_att_sw.hasOwnProperty(d.properties.type)) {
            holder_att_sw[d.properties.type] = holder_att_sw[d.properties.type] + d.properties.solidwaste_prod;
          } else {
            holder_att_sw[d.properties.type] = d.properties.solidwaste_prod;
          }
        });
        const sumType_att_sw = [];        
        for (var prop_att_sw in holder_att_sw) {
          sumType_att_sw.push({ type: prop_att_sw, solidwaste_prod: holder_att_sw[prop_att_sw] });
        }

        //table filter solidwaste - amenity
        const holder_ame_sw = {};
        obj_amenity.forEach(function(d) {
          if (holder_ame_sw.hasOwnProperty(d.properties.type)) {
            holder_ame_sw[d.properties.type] = holder_ame_sw[d.properties.type] + d.properties.solidwaste_prod;
          } else {
            holder_ame_sw[d.properties.type] = d.properties.solidwaste_prod;
          }
        });
        const sumType_ame_sw = [];        
        for (var prop_ame_sw in holder_ame_sw) {
          sumType_ame_sw.push({ type: prop_ame_sw, solidwaste_prod: holder_ame_sw[prop_ame_sw] });
        }

        //sum all table filter solidwaste
        const sumType_all_sw = sumType_att_sw.concat(sumType_ame_sw)
        const sumAll_sw = sumType_all_sw.reduce(function(sum, current) {
            return sum + current.solidwaste_prod;
        }, 0);
        const numSW = sumAll_sw.toLocaleString('en')
        document.getElementById('solid_wst_dm').textContent = numSW

        //ELECTRICITY
        //table filter electricity - attraction
        const holder_att_el = {};
        obj_attraction.forEach(function(d) {
          if (holder_att_el.hasOwnProperty(d.properties.type)) {
            holder_att_el[d.properties.type] = holder_att_el[d.properties.type] + d.properties.power_use;
          } else {
            holder_att_el[d.properties.type] = d.properties.power_use;
          }
        });
        const sumType_att_el = [];        
        for (var prop_att_el in holder_att_el) {
          sumType_att_el.push({ type: prop_att_el, power_use: holder_att_el[prop_att_el] });
        }

        //table filter electricity - amenity
        const holder_ame_el = {};
        obj_amenity.forEach(function(d) {
          if (holder_ame_el.hasOwnProperty(d.properties.type)) {
            holder_ame_el[d.properties.type] = holder_ame_el[d.properties.type] + d.properties.power_use;
          } else {
            holder_ame_el[d.properties.type] = d.properties.power_use;
          }
        });
        const sumType_ame_el = [];        
        for (var prop_ame_el in holder_ame_el) {
          sumType_ame_el.push({ type: prop_ame_el, power_use: holder_ame_el[prop_ame_el] });
        }

        //sum all table filter electricity
        const sumType_all_el = sumType_att_el.concat(sumType_ame_el)
        const sumAll_el = sumType_all_el.reduce(function(sum, current) {
            return sum + current.power_use;
        }, 0);
        const numEL = sumAll_el.toLocaleString('en')
        document.getElementById('power_supp_dm').textContent = numEL
    }
    getInfra();

    // NUMBER DISPLAY ATTRACTION
    async function getAttraction(){
        const response = await fetch(att_obj);
        const data = await response.json();
        const obj = data.features
        
        // count object
        const num_obj = obj.length
        document.getElementById('att_object').textContent = num_obj

        // table filter visitor
        const holder = {};
        obj.forEach(function(d) {
          if (holder.hasOwnProperty(d.properties.type)) {
            holder[d.properties.type] = holder[d.properties.type] + d.properties.visitor;
          } else {
            holder[d.properties.type] = d.properties.visitor;
          }
        });
        const sumType = [];
        for (var prop in holder) {
          sumType.push({ type: prop, visitor: holder[prop] });
        }
        const sumAll = sumType.reduce(function(sum, current) {
            return sum + current.visitor;
        }, 0);
        const numVisitor = sumAll.toLocaleString('en')
        document.getElementById('visit_att').textContent = numVisitor
    }
    getAttraction();

    // NUMBER DISPLAY AMENITY
    async function getAmenity(){
        const response = await fetch(ame_obj);
        const data = await response.json();
        const obj = data.features

        // table filter room
        const holder0 = {};
        obj.forEach(function(d) {
          if (holder0.hasOwnProperty(d.properties.type)) {
            holder0[d.properties.type] = holder0[d.properties.type] + d.properties.room;
          } else {
            holder0[d.properties.type] = d.properties.room;
          }
        });
        const sumType0 = [];
        for (var prop0 in holder0) {
          sumType0.push({ type: prop0, room: holder0[prop0] });
        }
        const sumAll0 = sumType0.reduce(function(sum, current) {
            return sum + current.room;
        }, 0);
        const numRoom = sumAll0.toLocaleString('en')
        document.getElementById('room').textContent = numRoom
        
        // table filter visitor
        const holder = {};
        obj.forEach(function(d) {
          if (holder.hasOwnProperty(d.properties.type)) {
            holder[d.properties.type] = holder[d.properties.type] + d.properties.visitor;
          } else {
            holder[d.properties.type] = d.properties.visitor;
          }
        });
        const sumType = [];
        for (var prop in holder) {
          sumType.push({ type: prop, visitor: holder[prop] });
        }
        const sumAll = sumType.reduce(function(sum, current) {
            return sum + current.visitor;
        }, 0);
        const numVisitor = sumAll.toLocaleString('en')
        document.getElementById('visit_ame').textContent = numVisitor
    }
    getAmenity();
}