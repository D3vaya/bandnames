import React, { useState } from "react";

export const BandAdd = ({ createBand }) => {
  const [value, setValue] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    if (value.trim().length > 0) {
      createBand(value);
      setValue("");
    }
  };

  return (
    <>
      <h3>
        Agregar Banda
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={value}
            className="form-control"
            placeholder="nuevo nombre de la banda"
            onChange={(event) => setValue(event.target.value)}
          />
        </form>
      </h3>
    </>
  );
};
