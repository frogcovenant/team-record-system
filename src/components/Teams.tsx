import TeamList, { TeamListProps } from './TeamList';
import './Teams.css';

export default function Teams() {
	const data: TeamListProps[] = [
		{
			teams: ['Equipo A', 'Equipo B'],
			judge: 'Juez 1',
		},
		{
			teams: ['Equipo C', 'Equipo D'],
			judge: 'Juez 2',
		},
		{
			teams: ['Equipo E'],
			judge: 'Juez 3',
		}
	];

	return (
		<div className='teamsList'>
			{data.map((teamListInfo, index) => (
				<TeamList
					judge={teamListInfo.judge}
					teams={teamListInfo.teams}
					key={index}
				/>
			))}
		</div>
	);
}
