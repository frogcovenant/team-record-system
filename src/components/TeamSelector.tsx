import './TeamSelector.css';

interface TeamSelectorProps {
	teamOptions: string[];
}

export default function TeamSelector(props: TeamSelectorProps) {
    return (
        <div className='team-selector'>
            <h6>Nombre del equipo</h6>
            <select>
                <option value="">Selecciona un equipo</option>
                {props.teamOptions.map((value, index)=>{
                    return (
                        <option key={index} value={index}>{value}</option>  
                    )
                })}
            </select>
            <button>+</button>
        </div>
    );
}