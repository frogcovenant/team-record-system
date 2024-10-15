import React, { useState } from 'react';

import './TeamSelector.css';

interface TeamSelectorProps {
    teamOptions: string[];
    onSelectTeam: (teamIndex: number) => void;
}

export default function TeamSelector(props: TeamSelectorProps) {
    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const handleButtonClick = () => {
        // Find the index of the selected team in the teamOptions array
        const teamIndex = props.teamOptions.indexOf(selectedValue);

        if (teamIndex !== -1) {
            props.onSelectTeam(teamIndex);
            // Clear the input field after the team is selected
            setSelectedValue('');
        } else {
            console.log("Team not found or invalid input");
        }
    };

    return (
        <div className='team-selector'>
            <h6>Nombre del equipo</h6>
            <input 
                type="text"
                list="team-options"
                value={selectedValue}
                onChange={handleSelectChange}
                placeholder="Selecciona o escribe un equipo"
            />
            <datalist id="team-options">
                {props.teamOptions.map((value, index) => {
                    return (
                        <option key={index} value={value}></option>  
                    )
                })}
            </datalist>
            <button onClick={handleButtonClick}>+</button>
        </div>
    );
}