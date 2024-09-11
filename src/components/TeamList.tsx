import './TeamList.css';

export interface TeamListProps {
	teams?: string[];
	judge?: string;
}

export default function TeamList({teams, judge}: TeamListProps) {
	judge ??= 'Juez';
	teams ??= [];

	return (
		<div className='team-list'>
			<div>
				<p>{judge}</p>
			</div>
			<div>
				<ul>
					{teams.map((team, index) => (
						<li key={index}>{team}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
