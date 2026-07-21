import React from "react";
import "../styles/maintenance.css";

function Maintenance() {
  return (
    <div className="maintenance-container">
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="maintenance-card">
        <div className="icon">🛠️</div>

        <h1>Site en maintenance</h1>

        <p>
          Nous effectuons actuellement une maintenance afin d'améliorer votre
          expérience.
        </p>

        <p className="secondary">
          Nous serons de retour très prochainement.
        </p>

        <div className="loader"></div>

        <p className="team-signature">
          Signé l’équipe Supernova
        </p>

        <p className="footer">
          Merci pour votre patience
        </p>
      </div>
    </div>
  );
}

export default Maintenance;