import React, { useState, useEffect } from "react";

export const BandList = ({ data, vote, remove, changeName: change }) => {
  const [bands, setBands] = useState(data);

  useEffect(() => {
    setBands(data);
  }, [data]);

  const changeName = (event, id) => {
    const newBands = bands.map((band) => {
      if (band.id === id) {
        band.name = event.target.value;
      }
      return band;
    });
    setBands(newBands);
  };

  const onNotFocus = (id, name) => {
    //TODO disparar socket
    change(id, name);
  };

  const crearRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => vote(band.id)}>
            +1
          </button>
        </td>
        <td>{band.name}</td>
        <td>
          <input
            type="text"
            value={band.name}
            className="form-control"
            onBlur={(event) => onNotFocus(band.id, event.target.value)}
            onChange={(event) => changeName(event, band.id)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button onClick={() => remove(band.id)} className="btn btn-danger">
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};
