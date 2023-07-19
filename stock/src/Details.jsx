import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Details = () => {
  const { prid } = useParams();

  const [prdata, prdatachange] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/produits/" + prid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        prdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <div className="container">
            <div className="card row" style={{ textAlign: "left" }}>
              <div className="card-title"></div>
              <div className="card-body"></div>

              {prdata && (
                <div>
                  <h2>
                    Nom : <b>{prdata.Nom}</b> ({prdata.id})
                  </h2>
                  <h3>Détails</h3>
                  <h5>Prix est : {prdata.Prix}</h5>
                  <h5>Quantité en stock : {prdata.Qt}</h5>
                  <Link className="btn btn-danger" to="/">
                    Retour
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
