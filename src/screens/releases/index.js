import React, { useState, useEffect } from "react";

const Releases = () => {
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/ViniciusPaldes/tibia-bosses-tracker/releases"
        );
        const data = await response.json();
        setReleases(data);
      } catch (error) {
        console.error("Error fetching releases:", error);
      }
    };

    fetchReleases();
  }, []);

  return (
    <div>
      <h1>Notas de lançamento de versão</h1>
      <h1>
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" height="30" width="30" style={{ marginRight: '10px' }} />
            <a href="https://github.com/ViniciusPaldes/tibia-bosses-tracker" target="_blank" rel="noopener noreferrer">Repositório Github</a>
        </h1>
      {releases.map((release) => (
        <div key={release.id}>
          <h2>{release.name}</h2>
          <p>{release.body}</p>
          <p>
            Data de lançamento: {new Date(release.created_at).toLocaleDateString()}
          </p>{" "}
          <ul>
            {release.assets.map((asset) => (
              <li key={asset.id}>
                <a href={asset.browser_download_url}>{asset.name}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Releases;
