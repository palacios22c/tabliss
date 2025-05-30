import React from "react";
import { FormattedMessage } from "react-intl";
import { useToggle } from "../../../hooks";
import { Icon } from "@iconify/react";
import { geocodeLocation, requestLocation } from "./api";
import "./LocationInput.sass";
import { Coordinates } from "./types";

type Props = {
  latitude?: number;
  longitude?: number;
  onChange: (location: Coordinates & { name?: string }) => void;
};

const GeocodeInput: React.FC<Props> = ({ onChange }) => {
  const [query, setQuery] = React.useState("");

  const handleGeocode = (event: React.FormEvent) => {
    event.preventDefault();
    geocodeLocation(query)
      .then((coords) => onChange({ ...coords, name: query }))
      .catch(() => {
        alert("Unable to find location. Please try again.");
      });
  };

  return (
    <form onSubmit={handleGeocode}>
      <div className="grid" style={{ gridTemplateColumns: "1fr auto" }}>
        <label htmlFor="LocationInput__query"><FormattedMessage
          id="plugins.weather.searchForCity"
          defaultMessage="Search for city"
          description="Search for city title"
        /></label>

        <div />

        <input
          id="LocationInput__query"
          placeholder="City or location"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <button type="submit" className="button--primary button--icon">
          <Icon icon="feather:search" />
        </button>
      </div>
    </form>
  );
};

const geolocationAvailable = "geolocation" in navigator;

const CoordinateInput: React.FC<Props> = ({
  latitude,
  longitude,
  onChange,
}) => {
  const handleLocate = () => {
    requestLocation()
      .then(onChange)
      .catch((err) => alert(`Cannot determine your location: ${err.message}`));
  };

  return (
    <div className="LocationInput">
      <div
        className="grid"
        style={{
          gridTemplateColumns: geolocationAvailable
            ? "1fr 1fr auto"
            : "1fr 1fr",
        }}
      >
        <label htmlFor="LocationInput__latitude"><FormattedMessage
          id="plugins.weather.latitude"
          defaultMessage="Latitude"
          description="Latitude title"
        /></label>

        <label htmlFor="LocationInput__longitude"><FormattedMessage
          id="plugins.weather.longitude"
          defaultMessage="Longitude"
          description="Longitude title"
        /></label>

        {geolocationAvailable && <div />}

        <input
          id="LocationInput__latitude"
          type="text"
          value={latitude}
          onChange={(event) =>
            onChange({ latitude: Number(event.target.value) })
          }
        />

        <input
          id="LocationInput__longitude"
          type="text"
          value={longitude}
          onChange={(event) =>
            onChange({ longitude: Number(event.target.value) })
          }
        />

        {geolocationAvailable && (
          <button
            className="button--primary button--icon"
            onClick={handleLocate}
          >
            <Icon icon="feather:navigation" />
          </button>
        )}
      </div>
    </div>
  );
};

const LocationInput: React.FC<Props> = ({ onChange, ...props }) => {
  const hasCoordinates = props.longitude && props.latitude;
  const [lookUp, toggleLookUp] = useToggle(!hasCoordinates);

  const handleChange = (coords: Coordinates) => {
    onChange(coords);
    if (lookUp) toggleLookUp();
  };

  return (
    <div className="LocationInput">
      {lookUp ? (
        <GeocodeInput {...props} onChange={handleChange} />
      ) : (
        <CoordinateInput {...props} onChange={handleChange} />
      )}

      <a onClick={toggleLookUp}>
        {lookUp ? "Enter coordinates" : "Search for city"}
      </a>
    </div>
  );
};

export default LocationInput;
