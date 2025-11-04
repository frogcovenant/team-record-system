import teams from './../data/teams';

import './TeamList.css';

export interface TeamListProps {
	teams: string[];
	judge: string;
	judgeNumber: number;
	maxJudgeNumber: number;
	onDeleteTeam?: (teamName: string) => void;
}

export default function TeamList(props: TeamListProps) {
	return (
		<div className='team-list'>
			<div>
				<h3>{props.judge}</h3>
			</div>
			<div>
				{/* TODO: move styles to css classes */}
				<ol style={{ listStyle: 'none', paddingLeft: 0 }}>
					{props.teams.map((team, index) => {
						const number = props.judgeNumber + 1 + index * props.maxJudgeNumber;

						return (
							<li key={index} style={{ position: 'relative', marginBottom: '8px' }}>
								<span style={{ fontWeight: 'bold', marginRight: '6px' }}>{number}.</span>
								<span>{team}</span>
								<button
									className='delete-team-button'
									onClick={() => props.onDeleteTeam?.(team)}
									style={{ marginLeft: '8px' }}
								>
									X
								</button>
								<br />
								<span>
									({teams.find(teamObject => team === teamObject.teamName)?.schoolName})
								</span>
							</li>
						);
					})}
				</ol>
			</div>
		</div>
	);
}
