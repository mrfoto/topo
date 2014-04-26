(function(){!function(t){function e(){try{return r in t&&t[r]}catch(e){return!1}}function o(t){return function(){var e=Array.prototype.slice.call(arguments,0);e.unshift(l),c.appendChild(l),l.addBehavior("#default#userData"),l.load(r);var o=t.apply(n,e);return c.removeChild(l),o}}function i(t){return t.replace(/^d/,"___$&").replace(p,"___")}var n={},a=t.document,r="localStorage",s="script",l;if(n.disabled=!1,n.set=function(t,e){},n.get=function(t){},n.remove=function(t){},n.clear=function(){},n.transact=function(t,e,o){var i=n.get(t);null==o&&(o=e,e=null),"undefined"==typeof i&&(i=e||{}),o(i),n.set(t,i)},n.getAll=function(){},n.forEach=function(){},n.serialize=function(t){return JSON.stringify(t)},n.deserialize=function(t){if("string"!=typeof t)return void 0;try{return JSON.parse(t)}catch(e){return t||void 0}},e())l=t[r],n.set=function(t,e){return void 0===e?n.remove(t):(l.setItem(t,n.serialize(e)),e)},n.get=function(t){return n.deserialize(l.getItem(t))},n.remove=function(t){l.removeItem(t)},n.clear=function(){l.clear()},n.getAll=function(){var t={};return n.forEach(function(e,o){t[e]=o}),t},n.forEach=function(t){for(var e=0;e<l.length;e++){var o=l.key(e);t(o,n.get(o))}};else if(a.documentElement.addBehavior){var c,d;try{d=new ActiveXObject("htmlfile"),d.open(),d.write("<"+s+">document.w=window</"+s+'><iframe src="/favicon.ico"></iframe>'),d.close(),c=d.w.frames[0].document,l=c.createElement("div")}catch(u){l=a.createElement("div"),c=a.body}var p=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^{|}~]","g");n.set=o(function(t,e,o){return e=i(e),void 0===o?n.remove(e):(t.setAttribute(e,n.serialize(o)),t.save(r),o)}),n.get=o(function(t,e){return e=i(e),n.deserialize(t.getAttribute(e))}),n.remove=o(function(t,e){e=i(e),t.removeAttribute(e),t.save(r)}),n.clear=o(function(t){var e=t.XMLDocument.documentElement.attributes;t.load(r);for(var o=0,i;i=e[o];o++)t.removeAttribute(i.name);t.save(r)}),n.getAll=function(t){var e={};return n.forEach(function(t,o){e[t]=o}),e},n.forEach=o(function(t,e){for(var o=t.XMLDocument.documentElement.attributes,i=0,a;a=o[i];++i)e(a.name,n.deserialize(t.getAttribute(a.name)))})}try{var m="__storejs__";n.set(m,m),n.get(m)!=m&&(n.disabled=!0),n.remove(m)}catch(u){n.disabled=!0}n.enabled=!n.disabled,"undefined"!=typeof module&&module.exports&&this.module!==module?module.exports=n:"function"==typeof define&&define.amd?define(n):t.store=n}(Function("return this")()),function(t,e){e.Google=e.Class.extend({includes:e.Mixin.Events,options:{minZoom:0,maxZoom:18,tileSize:256,subdomains:"abc",errorTileUrl:"",attribution:"",opacity:1,continuousWorld:!1,noWrap:!1,mapOptions:{backgroundColor:"#dddddd"}},initialize:function(o,i){e.Util.setOptions(this,i),this._ready=void 0!==t.maps.Map,this._ready||e.Google.asyncWait.push(this),this._type=o||"SATELLITE"},onAdd:function(t,o){this._map=t,this._insertAtTheBottom=o,this._initContainer(),this._initMapObject(),t.on("viewreset",this._resetCallback,this),this._limitedUpdate=e.Util.limitExecByInterval(this._update,150,this),t.on("move",this._update,this),t.on("zoomanim",this._handleZoomAnim,this),t._controlCorners.bottomright.style.marginBottom="20px",this._reset(),this._update()},onRemove:function(t){this._map._container.removeChild(this._container),this._map.off("viewreset",this._resetCallback,this),this._map.off("move",this._update,this),this._map.off("zoomanim",this._handleZoomAnim,this),t._controlCorners.bottomright.style.marginBottom="0em"},getAttribution:function(){return this.options.attribution},setOpacity:function(t){this.options.opacity=t,1>t&&e.DomUtil.setOpacity(this._container,t)},setElementSize:function(t,e){t.style.width=e.x+"px",t.style.height=e.y+"px"},_initContainer:function(){var t=this._map._container,o=t.firstChild;this._container||(this._container=e.DomUtil.create("div","leaflet-google-layer leaflet-top leaflet-left"),this._container.id="_GMapContainer_"+e.Util.stamp(this),this._container.style.zIndex="auto"),t.insertBefore(this._container,o),this.setOpacity(this.options.opacity),this.setElementSize(this._container,this._map.getSize())},_initMapObject:function(){if(this._ready){this._google_center=new t.maps.LatLng(0,0);var e=new t.maps.Map(this._container,{center:this._google_center,zoom:0,tilt:0,mapTypeId:t.maps.MapTypeId[this._type],disableDefaultUI:!0,keyboardShortcuts:!1,draggable:!1,disableDoubleClickZoom:!0,scrollwheel:!1,streetViewControl:!1,styles:this.options.mapOptions.styles,backgroundColor:this.options.mapOptions.backgroundColor}),o=this;this._reposition=t.maps.event.addListenerOnce(e,"center_changed",function(){o.onReposition()}),this._google=e,t.maps.event.addListenerOnce(e,"idle",function(){o._checkZoomLevels()})}},_checkZoomLevels:function(){this._google.getZoom()!==this._map.getZoom()&&this._map.setZoom(this._google.getZoom())},_resetCallback:function(t){this._reset(t.hard)},_reset:function(t){this._initContainer()},_update:function(e){if(this._google){this._resize();var o=e&&e.latlng?e.latlng:this._map.getCenter(),i=new t.maps.LatLng(o.lat,o.lng);this._google.setCenter(i),this._google.setZoom(this._map.getZoom()),this._checkZoomLevels()}},_resize:function(){var t=this._map.getSize();(this._container.style.width!==t.x||this._container.style.height!==t.y)&&(this.setElementSize(this._container,t),this.onReposition())},_handleZoomAnim:function(e){var o=e.center,i=new t.maps.LatLng(o.lat,o.lng);this._google.setCenter(i),this._google.setZoom(e.zoom)},onReposition:function(){this._google&&t.maps.event.trigger(this._google,"resize")}}),e.Google.asyncWait=[],e.Google.asyncInitialize=function(){var t;for(t=0;t<e.Google.asyncWait.length;t++){var o=e.Google.asyncWait[t];o._ready=!0,o._container&&(o._initMapObject(),o._update())}e.Google.asyncWait=[]}}(window.google,L),L.Control.Locate=L.Control.extend({options:{position:"topleft",drawCircle:!0,follow:!1,stopFollowingOnDrag:!1,circleStyle:{color:"#136AEC",fillColor:"#136AEC",fillOpacity:.15,weight:2,opacity:.5},markerStyle:{color:"#136AEC",fillColor:"#2A93EE",fillOpacity:.7,weight:2,opacity:.9,radius:5},followCircleStyle:{},followMarkerStyle:{},icon:"fa fa-location-arrow",iconLoading:"fa fa-spinner animate-spin",circlePadding:[0,0],metric:!0,onLocationError:function(t){alert(t.message)},onLocationOutsideMapBounds:function(t){t.stopLocate(),alert(context.options.strings.outsideMapBoundsMsg)},setView:!0,keepCurrentZoomLevel:!1,strings:{title:"Show me where I am",popup:"You are within {distance} {unit} from this point",outsideMapBoundsMsg:"You seem located outside the boundaries of the map"},locateOptions:{maxZoom:1/0,watch:!0}},onAdd:function(t){var e=L.DomUtil.create("div","leaflet-control-locate leaflet-bar leaflet-control"),o=this;this._layer=new L.LayerGroup,this._layer.addTo(t),this._event=void 0,this._locateOptions=this.options.locateOptions,L.extend(this._locateOptions,this.options.locateOptions),L.extend(this._locateOptions,{setView:!1});var i={};L.extend(i,this.options.markerStyle,this.options.followMarkerStyle),this.options.followMarkerStyle=i,i={},L.extend(i,this.options.circleStyle,this.options.followCircleStyle),this.options.followCircleStyle=i;var n=L.DomUtil.create("a","leaflet-bar-part leaflet-bar-part-single",e);this.icon=L.DomUtil.create("i",this.options.icon,n),L.DomEvent.on(e,"click",L.DomEvent.stopPropagation).on(e,"click",L.DomEvent.preventDefault).on(e,"click",function(){o._active&&(void 0===o._event||t.getBounds().contains(o._event.latlng)||!o.options.setView||c())?m():a()}).on(e,"dblclick",L.DomEvent.stopPropagation);var a=function(){o.options.setView&&(o._locateOnNextLocationFound=!0),o._active||t.locate(o._locateOptions),o._active=!0,o.options.follow&&s(),o._event?d():u("requesting")},r=function(t){o._event&&o._event.latlng.lat===t.latlng.lat&&o._event.latlng.lng===t.latlng.lng&&o._event.accuracy===t.accuracy||o._active&&(o._event=t,o.options.follow&&o._following&&(o._locateOnNextLocationFound=!0),d())},s=function(){t.fire("startfollowing",o),o._following=!0,o.options.stopFollowingOnDrag&&t.on("dragstart",l)},l=function(){t.fire("stopfollowing",o),o._following=!1,o.options.stopFollowingOnDrag&&t.off("dragstart",l),d()},c=function(){return void 0===o._event?!1:t.options.maxBounds&&!t.options.maxBounds.contains(o._event.latlng)},d=function(){void 0===o._event.accuracy&&(o._event.accuracy=0);var e=o._event.accuracy;o._locateOnNextLocationFound&&(c()?o.options.onLocationOutsideMapBounds(o):t.fitBounds(o._event.bounds,{padding:o.options.circlePadding,maxZoom:o.options.keepCurrentZoomLevel?t.getZoom():o._locateOptions.maxZoom}),o._locateOnNextLocationFound=!1);var i,n;if(o.options.drawCircle)if(i=o._following?o.options.followCircleStyle:o.options.circleStyle,o._circle){o._circle.setLatLng(o._event.latlng).setRadius(e);for(n in i)o._circle.options[n]=i[n]}else o._circle=L.circle(o._event.latlng,e,i).addTo(o._layer);var a,r;o.options.metric?(a=e.toFixed(0),r="meters"):(a=(3.2808399*e).toFixed(0),r="feet");var s;s=o._following?o.options.followMarkerStyle:o.options.markerStyle;var l=o.options.strings.popup;if(o._circleMarker){o._circleMarker.setLatLng(o._event.latlng).bindPopup(L.Util.template(l,{distance:a,unit:r}))._popup.setLatLng(o._event.latlng);for(n in s)o._circleMarker.options[n]=s[n]}else o._circleMarker=L.circleMarker(o._event.latlng,s).bindPopup(L.Util.template(l,{distance:a,unit:r})).addTo(o._layer);o._container&&u(o._following?"following":"active")},u=function(t){"requesting"==t?(L.DomUtil.removeClasses(o._container,"active following"),L.DomUtil.addClasses(o._container,"requesting"),L.DomUtil.removeClasses(o.icon,o.options.icon),L.DomUtil.addClasses(o.icon,o.options.iconLoading)):"active"==t?(L.DomUtil.removeClasses(o._container,"requesting following"),L.DomUtil.addClasses(o._container,"active"),L.DomUtil.removeClasses(o.icon,o.options.iconLoading),L.DomUtil.addClasses(o.icon,o.options.icon)):"following"==t&&(L.DomUtil.removeClasses(o._container,"requesting"),L.DomUtil.addClasses(o._container,"active following"),L.DomUtil.removeClasses(o.icon,o.options.iconLoading),L.DomUtil.addClasses(o.icon,o.options.icon))},p=function(){o._active=!1,o._locateOnNextLocationFound=o.options.setView,o._following=!1};p();var m=function(){t.stopLocate(),t.off("dragstart",l),o.options.follow&&o._following&&l(),L.DomUtil.removeClass(o._container,"requesting"),L.DomUtil.removeClass(o._container,"active"),L.DomUtil.removeClass(o._container,"following"),p(),o._layer.clearLayers(),o._circleMarker=void 0,o._circle=void 0},f=function(t){3==t.code&&o._locateOptions.watch||(m(),o.options.onLocationError(t))};return t.on("locationfound",r,o),t.on("locationerror",f,o),this.locate=a,this.stopLocate=m,this.stopFollowing=l,e}}),L.Map.addInitHook(function(){this.options.locateControl&&(this.locateControl=L.control.locate(),this.addControl(this.locateControl))}),L.control.locate=function(t){return new L.Control.Locate(t)},function(){var t=function(t,e,o){o=o.split(" "),o.forEach(function(o){L.DomUtil[t].call(this,e,o)})};L.DomUtil.addClasses=function(e,o){t("addClass",e,o)},L.DomUtil.removeClasses=function(e,o){t("removeClass",e,o)}}();var t,e,o,i,n,a,r,s,l;n=null,L.Control.Markers=L.Control.extend({options:{position:"topleft",disableIcon:"fa-save",enableIcon:"fa-pencil",locate:null},onAdd:function(t){var e;return n=this,this.markers=[],this.loadMarkers(),e=L.DomUtil.create("div","leaflet-control-markers leaflet-bar leaflet-control"),this.link=L.DomUtil.create("a","leaflet-bar-part leaflet-bar-part-single fa fa-pencil",e),L.DomEvent.on(e,"click",L.DomEvent.stop).on(e,"click",function(t){return function(){return t.editing?t.stopEdit():t.startEdit()}}(this)).on(e,"dblclick",L.DomEvent.stop),t.on("click",function(t){return function(e){return t.editing?t.addMarker(e.latlng):void 0}}(this)),e},startEdit:function(){return this.editing=!0,L.DomUtil.removeClass(this.link,this.options.enableIcon),L.DomUtil.addClass(this.link,this.options.disableIcon),this.markers.forEach(function(t){return function(t){return t.dragging.enable()}}(this))},stopEdit:function(){return this.editing=!1,L.DomUtil.addClass(this.link,this.options.enableIcon),L.DomUtil.removeClass(this.link,this.options.disableIcon),this.markers.forEach(function(t){return function(t){return t.dragging.disable()}}(this)),this.saveMarkers()},loadMarkers:function(){var t;return t=store.get("markers")||[],t.forEach(function(t){return function(e){return t.addMarker(e)}}(this))},saveMarkers:function(){return store.set("markers",this.markers.map(function(t){return t.getLatLng()}))},addMarker:function(t){return n.markers.push(L.marker(t,{draggable:this.editing}).addTo(i).on("dblclick",this.removeMarker).on("click",this.showPopup))},removeMarker:function(){return n.editing?(this.closePopup(),i.removeLayer(this),n.markers.splice(n.markers.indexOf(this),1)):void 0},distanceInM:function(t){var e;return this.options.locate._event&&this.options.locate._active?(e=t.distanceTo(this.options.locate._event.latlng),Number(e.toFixed(1)).toLocaleString()+" m"):void 0},showPopup:function(){var t;return this.unbindPopup(),t=n.distanceInM(this.getLatLng()),t?this.bindPopup(t).openPopup():void 0}}),L.control.markers=function(t){return new L.Control.Markers(t)},t=null,L.Control.Compass=L.Control.extend({options:{position:"topleft",element:null,offset:0},onAdd:function(e){var o;return t=this,window.addEventListener("deviceorientation",this.orientationChanged),this.container=L.DomUtil.create("div","leaflet-control-compass leaflet-bar leaflet-control hidden"),o=L.DomUtil.create("a","leaflet-bar-part leaflet-bar-part-single fa",this.container),this.icon=L.DomUtil.create("i","fa fa-arrow-up",o),this.options.element||(this.options.element=this.icon),this.container},orientationChanged:function(e){var o;return t.options.element===t.icon&&L.DomUtil.removeClass(t.container,"hidden"),o=-window.orientation-e.webkitCompassHeading,t.styleNeedle(o)},styleNeedle:function(t){var e,o;return o="rotate("+(t+this.options.offset)+"deg)",this.options.element.style.webkitTransform=o,L.DomUtil.removeClass(this.options.element,"accurate"),L.DomUtil.removeClass(this.options.element,"very-accurate"),e=100*Math.sin(t*(Math.PI/360)),Math.abs(e)<=5?L.DomUtil.addClass(this.options.element,"very-accurate"):Math.abs(e)<=20?L.DomUtil.addClass(this.options.element,"accurate"):void 0}}),L.control.compass=function(t){return new L.Control.Compass(t)},a=function(){return window.scrollTo(0,0)},window.addEventListener("orientationchange",a),a(),e=new L.Google("ROADMAP"),r=new L.Google("SATELLITE"),s=new L.Google("TERRAIN"),l=L.tileLayer("http://s3-eu-west-1.amazonaws.com/topo-slovenia/z{z}/{y}/{x}.png",{minZoom:10,maxNativeZoom:15,detectRetina:!0,attribution:'© <a href="http://www.gu.gov.si/">GURS</a>',unloadInvisibleTiles:!1}),i=L.map("map",{layers:e,minZoom:6}).setView([46,14.7],8),L.control.layers({Google:e,Satellite:r,Terrain:s,Topo:l}).addTo(i),L.control.scale({imperial:!1}).addTo(i),o=L.control.locate({setView:!1}).addTo(i),L.control.markers({locate:o}).addTo(i),L.control.compass({element:o.icon,offset:-45}).addTo(i),o.locate()}).call(this);