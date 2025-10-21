import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <DatabaseStatus />
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseText = {
    version: "Carregando...",
    opened_connections: "Carregando...",
    max_connections: "Carregando...",
  };

  if (!isLoading && data) {
    databaseText = data.dependencies.database;
  }

  return (
    <>
      <div>
        <h3>Informações do banco de dados:</h3>
        <ul>
          <li> Versão: {databaseText.version}</li>
          <li> Conexões Abertas: {databaseText.opened_connections}</li>
          <li> Conexões Máximas: {databaseText.max_connections} </li>
        </ul>
      </div>
    </>
  );
}
