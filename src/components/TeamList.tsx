import teams from './../data/teams';

import './TeamList.css';

export interface TeamListProps {
	teams: { name: string; manualPosition: boolean }[];
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
					{props.teams.map((teamObj, index) => {
						const number = props.judgeNumber + 1 + index * props.maxJudgeNumber;
						return (
							<li key={index} style={{ position: 'relative', marginBottom: '8px' }}>
								<span style={{ fontWeight: 'bold', marginRight: '6px' }}>{number}.</span>
								<span>{teamObj.name || <em>libre</em>}</span>
								{teamObj.name && (
									<button
										className='delete-team-button'
										onClick={() => props.onDeleteTeam?.(teamObj.name)}
										style={{ marginLeft: '8px' }}
									>
										X
									</button>
								)}
								<br />
								<span>
									{teamObj.name && teamObj.name != 'BLOQUEADO' ? `(${teams.find(teamObject => teamObj.name === teamObject.teamName)?.schoolName})` : ''}
								</span>
							</li>
						);
					})}
				</ol>
			</div>
		</div>
	);
}
