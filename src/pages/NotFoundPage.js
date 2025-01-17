import React from 'react';
import { useHistory } from 'react-router-dom'; // Importer useHistory pour React Router v5
import "../styles/NotFoundPage.css";

function NotFoundPage() {
  const history = useHistory(); // Déclarez le hook useHistory

  // Fonction de redirection au clic du bouton
  const goHome = () => {
    history.push('/'); // Redirige vers la page d'accueil avec la méthode push
  };

  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={goHome}>Home</button> {/* Ajout de la fonction goHome au clic */}
    </div>
  );
}

export default NotFoundPage;
