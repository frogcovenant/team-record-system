import './TeamSelector.css';

export default function TeamSelector() {
    const teamOptions = ['frog', 'cat', 'wolf'];
    return (
        <div className='team-selector'>
            <h6>Nombre del equipo</h6>
            <select>
                <option value="">Selecciona un equipo</option>
                {teamOptions.map((value, index)=>{
                    return (
                        <option key={index} value={index}>{value}</option>  
                    )
                })}
            </select>
            <button>+</button>
        </div>
    );
}