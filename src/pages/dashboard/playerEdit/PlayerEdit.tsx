import { FullPlayerDataFieldInfo } from '../../../utils/fieldData'

import type { FullPlayerData } from '../../../utils/types';

import { useData } from '../../../hooks/DataContext'
import { useEffect, useState } from 'react';

import { TextField } from '@mui/material';

import { Card } from '../../../components'

import './playerEdit.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const playerEdit = () => {
    const navigate = useNavigate();

    const { data, updatePlayerData } = useData();

    const playerId = Number(window.location.pathname.split('/')[3]);

    const [playerData, setPlayerData] = useState<FullPlayerData | undefined>(undefined);

    useEffect(() => {
        const playerData = data.players?.find((player: FullPlayerData) => player.playerId === playerId);
        if (playerData) {
            setPlayerData(playerData);
        }
    }, [data]);

    if (!playerData) {
        return <div>Player not found</div>;
    }

    const handleFieldChange = (fieldKey: keyof FullPlayerData, newValue: any) => {
        setPlayerData((prevData) => {
            if (!prevData) return prevData;
    
            const updatedPlayerData = { ...prevData, [fieldKey]: newValue };
            return updatedPlayerData;
        });
    }

    return (
        <div className="dashboard-subpage-container">
                <header className="dashboard-subpage-header">
                    <h1>Edit Player</h1>
                    <div className='dashboard-subpage-header-actions'>
                        <button onClick={() => navigate(-1)} className="button"><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
                    </div>
                </header>
                <main className="dashboard-subpage-content">
                    <div className='player-edit-fields'>
                        {Object.entries(FullPlayerDataFieldInfo).map(([key, field]) => {
                            if (['playerId', 'gameLogs', 'seasonLog'].includes(key)) return null;
                            const fieldKey = key as keyof FullPlayerData;

                            return (
                                <Card key={fieldKey} className="player-edit-field">
                                    <Card.Header>
                                        <h2>{field.label}</h2>
                                        <p>{field.description}</p>
                                    </Card.Header>
                                    <Card.Body>
                                    {field.fields &&
                                        Object.entries(field.fields).map(([subKey, subfield], subindex) => (
                                        <TextField
                                            key={`${fieldKey}-${subindex}`}
                                            label={subfield.label}
                                            value={
                                                typeof playerData[fieldKey] === 'object' && playerData[fieldKey] !== null && !Array.isArray(playerData[fieldKey])
                                                    ? (playerData[fieldKey] as Record<string, any>)[subKey] || ''
                                                    : ''
                                            }
                                            onChange={(e) => {
                                                const newValue = e.target.value;
                                                handleFieldChange(fieldKey, {
                                                    ...((typeof playerData[fieldKey] === 'object' && playerData[fieldKey] !== null && !Array.isArray(playerData[fieldKey])) ? playerData[fieldKey] : {}),
                                                    [subKey]: newValue,
                                                });
                                            }}
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            type={subfield.type}
                                            placeholder={subfield.placeholder}
                                        />
                                    ))}
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </div>
                    <div className="player-edit-actions">
                        <button
                            onClick={() => {
                                if (playerData) {
                                    updatePlayerData(playerData);
                                    navigate(-1);
                                }
                            }}
                            className="button"
                        >
                            Save
                        </button>
                    </div>
            </main>
        </div>
    )
}

export default playerEdit