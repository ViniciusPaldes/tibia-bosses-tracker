import React from 'react';

export default function NotAvailable() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f8f9fa',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <h1 style={{ color: '#c0392b' }}>Site indisponível por tempo indeterminado</h1>
            <p style={{ maxWidth: 600, margin: '1rem 0', fontSize: '1.2rem' }}>
                Nossa fonte de dados, o GuildStats, bloqueou automações.<br />
                Precisaremos de tempo para desenvolver as chances por nossa conta.<br />
                Pedimos perdão pelo ocorrido.<br /><br />
                Recomendamos que acesse o site <a href="https://guildstats.eu/" target="_blank" rel="noopener noreferrer">GuildStats</a> diretamente para checar as chances.<br /><br />
                Atenciosamente,<br />
                Sabarath
            </p>
        </div>
    );
}