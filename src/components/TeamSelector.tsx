import React, { useState } from 'react';

import './TeamSelector.css';

interface TeamSelectorProps {
    teamOptions: string[];
    onSelectTeam: (teamIndex: number, position?: number) => void;
}

export default function TeamSelector(props: TeamSelectorProps) {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [position, setPosition] = useState<string>('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPosition(event.target.value);
    };

    const handleButtonClick = () => {
        const pos = position ? parseInt(position) : undefined;
        props.onSelectTeam(props.teamOptions.indexOf(selectedValue), pos);
        setSelectedValue('');
        setPosition('');
    };

    return (
        <div className='team-selector'>
            <h2>Nombre del equipo</h2>
            <input 
                type="text"
                list="team-options"
                value={selectedValue}
                onChange={handleSelectChange}
                placeholder="Selecciona o escribe un equipo"
            />
            <datalist id="team-options">
                {[...props.teamOptions].sort().map((value, index) => {
                    return (
                        <option key={index} value={value}></option>  
                    )
                })}
            </datalist>
            {/* TODO: move styles to css classes */}
            <input
                type="number"
                min="1"
                value={position}
                onChange={handlePositionChange}
                placeholder="Posición"
                style={{ width: '80px' }}
            />
            <button onClick={handleButtonClick}>+</button>
        </div>
    );
}