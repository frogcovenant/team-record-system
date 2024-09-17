import './TeamList.css';

export interface TeamListProps {
	teams: string[];
	judge: string;
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
						<li key={index}>{team}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
