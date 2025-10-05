import PlantCard from './PlantCard.jsx';

export default function PlantGrid({ plantas, regiaoNome }) {
  if (!regiaoNome) {
    return (
      <div className="plant-grid-empty">
        <div className="empty-state">
          <span className="empty-icon">🌵</span>
          <h3>Selecione uma região no mapa</h3>
          <p>Clique em uma das regiões marcadas para ver as plantas e previsões de floração</p>
        </div>
      </div>
    );
  }

  return (
    <div className="plant-grid-container">
      <div className="plant-grid-header">
        <h2>Floradas em {regiaoNome}</h2>
        <p className="update-time">
          Atualizado em: {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>

      <div className="plant-grid">
        {plantas.map(planta => (
          <PlantCard key={planta.id} planta={planta} />
        ))}
      </div>
    </div>
  );
}