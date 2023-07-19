import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Liste = () => {
  const [prdata, setPrdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8000/produits")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data.");
        }
        return res.json();
      })
      .then((resp) => {
        setPrdata(resp);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce produit ?"
    );
    if (confirmed) {
      fetch(`http://localhost:8000/produits/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete the item.");
          }

          fetchData();
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Liste des produits</h2>
        </div>
        <div className="card-body">
          <div className="ajout d-flex">
            <Link to="stock/create" className="btn btn-success">
              Ajoutez un produit (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Nom</td>
                <td>Prix</td>
                <td>Quantité</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {prdata &&
                prdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.Nom}</td>
                    <td>{item.Prix + "€"}</td>
                    <td>{item.Qt}</td>
                    <td>
                      <Link
                        to={`/stock/edit/${item.id}`}
                        className="btn btn-primary"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Supprimer
                      </button>
                      <Link
                        to={`/stock/detail/${item.id}`}
                        className="btn btn-secondary"
                      >
                        Détails
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Liste;
