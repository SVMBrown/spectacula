var SVGSelector = React.createClass({
  render: function() {
    return(
      <div id="hud">
        <div className="Attack-Menu" style={{ display: "block", margin: "0 auto", overflow: "visible"}}>
          <div className="Menu-Wrapper">
            <svg  xmlns="http://www.w3.org/2000/svg" width="400" height= "400" viewBox="-100 -100 700 700" id="attack-menu">
              <g id="itemsContainer"  transform="matrix(0.38734,-0.92193,0.92193,0.38734,-77.3193578290572,383.64893561257276)"
              cursor="pointer"
              >

                <g className="item" id="item-1" onmouseup="buttonClick(evt)" transform="matrix(1,0,0,1,0,0)"  style={{}}>
                    <path fill="none" stroke="#111" d="M350,250 l150,0 A250,250 0 0,0 426.7766952966369,73.22330470336314 l-106.06601717798213,106.0660171779821 A100,100 0 0,1 350,250" className="sector" style={{ transition: "all .1s linear", fill: "rgba(255, 255, 255, .8)", stroke: "#ddd"  }}></path>
                </g>

                <g className="item" id="item-2" onmouseup="buttonClick(evt)" transform="matrix(0.7071,-0.7071,0.7071,0.7071,-103.55339059327378,249.99999999999997)"  style={{}}>
                    <path fill="none" stroke="#111" d="M350,250 l150,0 A250,250 0 0,0 426.7766952966369,73.22330470336314 l-106.06601717798213,106.0660171779821 A100,100 0 0,1 350,250" className="sector" style={{ transition: "all .1s linear", fill: "rgba(255, 255, 255, .8)", stroke: "#ddd"  }}></path>
                </g>

                <g className="item" id="item-3" onmouseup="buttonClick(evt)" transform="matrix(0,-1,1,0,0,500)"  style={{}}>
                  <path fill="none" stroke="#111" d="M350,250 l150,0 A250,250 0 0,0 426.7766952966369,73.22330470336314 l-106.06601717798213,106.0660171779821 A100,100 0 0,1 350,250" className="sector" style={{ transition: "all .1s linear", fill: "rgba(255, 255, 255, .8)", stroke: "#ddd"  }}></path>
                </g>

                <g className="item" id="item-4" onmouseup="buttonClick(evt)" transform="matrix(-0.7071,-0.7071,0.7071,-0.7071,249.99999999999997,603.5533905932738)"  style={{}}>
                  <path fill="none" stroke="#111" d="M350,250 l150,0 A250,250 0 0,0 426.7766952966369,73.22330470336314 l-106.06601717798213,106.0660171779821 A100,100 0 0,1 350,250" className="sector" style={{ transition: "all .1s linear", fill: "rgba(255, 255, 255, .8)", stroke: "#ddd"  }}></path>
                </g>

                <g className="item" id="item-5" onmouseup="buttonClick(evt)" transform="matrix(-1,0,0,-1,500,500)"  style={{}}>
                  <path fill="none" stroke="#111" d="M350,250 l150,0 A250,250 0 0,0 426.7766952966369,73.22330470336314 l-106.06601717798213,106.0660171779821 A100,100 0 0,1 350,250" className="sector" style={{ transition: "all .1s linear", fill: "rgba(255, 255, 255, .8)", stroke: "#ddd"  }}></path>
                </g>

                <g className="item" id="item-6" onmouseup="buttonClick(evt)" transform="matrix(-0.7071,0.7071,-0.7071,-0.7071,603.5533905932738,250.00000000000006)"  style={{}}>
                  <path fill="none" stroke="#111" d="M350,250 l150,0 A250,250 0 0,0 426.7766952966369,73.22330470336314 l-106.06601717798213,106.0660171779821 A100,100 0 0,1 350,250" className="sector" style={{ transition: "all .1s linear", fill: "rgba(255, 255, 255, .8)", stroke: "#ddd"  }}></path>
                </g>

                <g className="item" id="item-7" onmouseup="buttonClick(evt)" transform="matrix(0,1,-1,0,500.00000000000006,0)"  style={{}}>
                  <path fill="none" stroke="#111" d="M350,250 l150,0 A250,250 0 0,0 426.7766952966369,73.22330470336314 l-106.06601717798213,106.0660171779821 A100,100 0 0,1 350,250" className="sector" style={{ transition: "all .1s linear", fill: "rgba(255, 255, 255, .8)", stroke: "#ddd"  }}></path>
                </g>

                <g className="item" id="item-8" onmouseup="buttonClick(evt)" transform="matrix(0.7071,0.7071,-0.7071,0.7071,250.00000000000009,-103.55339059327378)"  style={{}}>
                  <path fill="none" stroke="#111" d="M350,250 l150,0 A250,250 0 0,0 426.7766952966369,73.22330470336314 l-106.06601717798213,106.0660171779821 A100,100 0 0,1 350,250" className="sector" style={{ transition: "all .1s linear", fill: "rgba(255, 255, 255, .8)", stroke: "#ddd"  }}></path>
                </g>

              </g>
              <g id="trigger" className="trigger menu-trigger">
                  <circle cx="250" cy="250" r="70"></circle>
                  <svg className="icon icon-power" x="235" y="235" height="75" width="75"><path fill="white" d="M12 0l-12 16h12l-8 16 28-20h-16l12-12z"></path></svg>
             </g>
            </svg>
          </div>
        </div>

        <div className="Move-Menu" style={{ display: "block", margin: "0 auto", overflow: "visible"}}>
          <div className="Menu-Wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"viewBox="-100 -100 700 700" id="move-menu" style={{transformOrigin: "50% 50% 0px", transform: "matrix3d(0.699915973223345, -0.714225195877895, 0, 0, 0.714225195877895, 0.699915973223345, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)", touchAction: "none", WebkitUserSelect: "none"}}>
              <g id="itemsContainer" cursor="pointer">

                  <g className="item" id="Mitem-1" onmouseup="buttonClick(evt)" transform="matrix(1,0,0,1,0,0)"  style={{}}>
                      <path fill="none" stroke="#111" d="M330,250 l170,0 A250,250 0 0,0 250.00000000000003,0 l-2.842170943040401e-14,170 A80,80 0 0,1 330,250" className="sector" style={{ transition: "all .1s linear", fill: "rgba(255, 255, 255, .8)", stroke: "#ddd"  }}></path>
                  </g>

                  <g className="item" id="Mitem-2" onmouseup="buttonClick(evt)" transform="matrix(0,-1,1,0,0,500)"  style={{}}>
                      <path fill="none" stroke="#111" d="M330,250 l170,0 A250,250 0 0,0 250.00000000000003,0 l-2.842170943040401e-14,170 A80,80 0 0,1 330,250" className="sector" style={{ transition: "all .1s linear", fill: "rgba(255, 255, 255, .8)", stroke: "#ddd"  }}></path>
                  </g>

                  <g className="item" id="Mitem-3"  onmouseup="buttonClick(evt)" transform="matrix(-1,0,0,-1,500,500)"  style={{}}>
                      <path fill="none" stroke="#111" d="M330,250 l170,0 A250,250 0 0,0 250.00000000000003,0 l-2.842170943040401e-14,170 A80,80 0 0,1 330,250" className="sector" style={{ transition: "all .1s linear", fill: "rgba(255, 255, 255, .8)", stroke: "#ddd"  }}></path>
                  </g>

                  <g className="item" id="Mitem-4" onmouseup="buttonClick(evt)" transform="matrix(0,1,-1,0,500.00000000000006,0)"  style={{}}>
                      <path fill="none" stroke="#111" d="M330,250 l170,0 A250,250 0 0,0 250.00000000000003,0 l-2.842170943040401e-14,170 A80,80 0 0,1 330,250" className="sector" style={{ transition: "all .1s linear", fill: "rgba(255, 255, 255, .8)", stroke: "#ddd"  }}></path>
                  </g>
              </g>
              <g id="Mtrigger" className="trigger menu-trigger" role="button">
                  <circle cx="250" cy="250" r="65"></circle>
                  <svg className="item" x="235" y="235" witdth="50" height="50"><path fill="white" d="M30.828 1.172c-1.562-1.562-4.095-1.562-5.657 0l-5.379 5.379-3.793-3.793-4.243 4.243 3.326 3.326-14.754 14.754c-0.252 0.252-0.358 0.592-0.322 0.921h-0.008v5c0 0.552 0.448 1 1 1h5c0 0 0.083 0 0.125 0 0.288 0 0.576-0.11 0.795-0.329l14.754-14.754 3.326 3.326 4.243-4.243-3.793-3.793 5.379-5.379c1.562-1.562 1.562-4.095 0-5.657zM5.409 30h-3.409v-3.409l14.674-14.674 3.409 3.409-14.674 14.674z"></path></svg>
              </g>
            </svg>
          </div>
        </div>
      </div>);
  }
});
// Relevant Styling info
//_______________________
// @import url(http://fonts.googleapis.com/css?family=Varela+Round|Comfortaa:400,700,300);
// body {
//   padding: 1em;
//   background-color: #EFEFF0;
//   background-image: url(http://subtlepatterns.com/patterns/swirl_pattern.png);
//   line-height: 1.5;
//   font-family: Comfortaa;
// }

// h1 {
//   text-align: center;
// }

// svg {
//   border-radius: 50%;
// }

// #attack-menu, #move-menu { display: block; margin: 0 auto; overflow: visible;}
//         .item .sector { transition: all .1s linear; fill: rgba(255, 255, 255, .8); stroke: #ddd;  }
//         .item:hover .sector { fill: #333; }
//         .menu-trigger { fill: #66023C; pointer-events: auto;}
//         /*.menu-trigger:hover { cursor: pointer; }*/
//         .item use { fill: #333; }
//         .item:hover use { fill: #fff; }

// .menu-wrapper {
//   position: relative;
//   height: 0;
//   width: 100%; /* any width you want */
//   padding-top: 100%; /* if the menu is in full circle mode. 50% if it is in semi-circle mode. */
// }
// #attack-menu #move-menu {
//   display: inline-flex;
// }
// #attack-menu {
//   position: absolute;
//   top: 0px;
//   left: 0;
//   width: 30%;
// }

// #move-menu {
//   position: absolute;
//   top: 0px;
//   left: 1000;
//   right: 0;
//   width: 30%;
// }

// .Attack-Menu .Move-Menu {
//   max-width: 30%;
// }
