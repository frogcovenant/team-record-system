import './TeamList.css';

export interface TeamListProps {
	teams: string[];
	judge: string;
	onDeleteTeam?: (teamName: string) => void;
}

export default function TeamList(props: TeamListProps) {
	return (
		<div className='team-list'>
			<div>
				<p>{props.judge}</p>
			</div>
			<div>
				<ul>
					{props.teams.map((team, index) => (
						<li key={index}>
							{team}
							<button onClick={() => props.onDeleteTeam?.(team)}>X</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
