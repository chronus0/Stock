import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Modification = () => {
  const { prid } = useParams();
  const [formData, setFormData] = useState({
    Nom: "",
    Prix: "",
    Qt: "",
  });

  const nav = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/produits/${prid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data.");
        }
        return res.json();
      })
      .then((resp) => {
        setFormData(resp);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [prid]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/produits/${prid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update the item.");
        }

        nav(`/stock/detail/${prid}`);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Modification d'un produit</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nom du produit</label>
              <input
                type="text"
                name="Nom"
                value={formData.Nom}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Prix du produit</label>
              <input
                type="text"
                name="Prix"
                value={formData.Prix}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Quantité disponible</label>
              <input
                type="text"
                name="Qt"
                value={formData.Qt}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success">
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => {
                  nav(-1);
                }}
                className="btn btn-danger"
              >
                Retour
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modification;
