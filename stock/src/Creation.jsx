import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Creation = () => {
  const [Nom, nomch] = useState("");
  const [Prix, prch] = useState("");
  const [Qt, qtch] = useState("");
  const nav = useNavigate();

  const handler = (e) => {
    e.preventDefault();
    const prdata = { Nom, Prix, Qt };

    fetch("http://localhost:8000/produits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(prdata),
    })
      .then((res) => {
        alert(Nom + " a été ajouté avec succés");
        nav("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handler}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Ajoutez un produit</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Nom de produit</label>
                      <input
                        required
                        value={Nom}
                        onChange={(e) => nomch(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Prix de produit</label>
                      <input
                        required
                        value={Prix}
                        onChange={(e) => prch(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Quantité disponible</label>
                      <input
                        required
                        value={Qt}
                        onChange={(e) => qtch(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group bttn">
                      <button type="submit" className="btn btn-success">
                        Ajoutez
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Retour
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Creation;
