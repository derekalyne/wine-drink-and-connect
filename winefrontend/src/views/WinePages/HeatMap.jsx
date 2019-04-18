
import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

const selected = {
    default: {
      fill: "hsl(123, 54%, 66%)",
      stroke: "#607D8B",
      strokeWidth: 0.75,
      outline: "none",
    },

    hover: {
        fill: "hsl(123, 54%, 66%)",
        stroke: "#607D8B",
        strokeWidth: 0.75,
        outline: "none",
      }
  
  }

  const nonselected = {
    default: {
      fill: "ECEFF1",
      stroke: "#607D8B",
      strokeWidth: 0.75,
      outline: "none",
    },
    hover: {
      fill: "#607D8B",
      stroke: "#607D8B",
      strokeWidth: 0.75,
      outline: "none",
    }
   
  }



class BasicMap extends Component {
  render() {
    const mapData = this.props
    console.log(mapData)
    return (
        <div className="wrapper">
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11,0,0],
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[0,20]} disablePanning>
            <Geographies geography={require("assets/map/world-50m.json")}>
              {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  style={ mapData.mapData.indexOf(geography.properties.name) !== -1 ? selected : nonselected}
                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      </div>
    )
  }
}

export default BasicMap