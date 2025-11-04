import teams from './../data/teams';

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
				<h3>{props.judge}</h3>
			</div>
			<div>
				<ol>
					{props.teams.map((team, index) => (
						<li key={index} style={{ position: 'relative' }}>
							<span>{team}</span>
							<button className='delete-team-button' onClick={() => props.onDeleteTeam?.(team)}>X</button>
							<br />
							<span>
								({teams.find(teamObject => team === teamObject.teamName)?.schoolName})
							</span>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
}
