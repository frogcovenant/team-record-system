import React, { useState } from 'react';

import './TeamSelector.css';

interface TeamSelectorProps {
    teamOptions: string[];
    onSelectTeam: (teamIndex: number) => void;
}

export default function TeamSelector(props: TeamSelectorProps) {
    const [selectedValue, setSelectedValue] = useState<number | ''>('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(Number(event.target.value));
    };

    const handleButtonClick = () => {
        // TODO: currently the state of 'selectedValue' is not cleared properly when adding a team that is at the bottom
        // of the select tag. The state should reset to default value instead of having extra checks here.
        // This will also fix the issue of the selector not returning to the placeholder after adding a team.
        if (selectedValue !== '' && props.teamOptions.length !== 0 && selectedValue < props.teamOptions.length) {
            props.onSelectTeam(selectedValue);
        }
    };

    return (
        <div className='team-selector'>
            <h6>Nombre del equipo</h6>
            <select value={selectedValue} onChange={handleSelectChange}>
                <option value="">Selecciona un equipo</option>
                {props.teamOptions.map((value, index)=>{
                    return (
                        <option key={index} value={index}>{value}</option>  
                    )
                })}
            </select>
            <button onClick={handleButtonClick}>+</button>
        </div>
    );
}