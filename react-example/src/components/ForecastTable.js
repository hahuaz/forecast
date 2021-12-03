import React, { useState } from 'react';
import moment from 'moment';

import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Grid,
	Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';

export default function ForecastTable({ data }) {
	const [expanded, setExpanded] = useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const { daily: dailyArr, placeName } = data;

	const firstLetterUppercase = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const summary = (item) => {
		return `${firstLetterUppercase(
			item.weather[0].description
		)} throughout day. Feeling temperature is ${Math.trunc(
			item.feels_like.day
		)}° at ${placeName}.`;
	};

	const providedDates = () => {
		return `${moment.unix(dailyArr[0].dt).format('MMM')} ${moment
			.unix(dailyArr[0].dt)
			.format('Do')} - ${moment
			.unix(dailyArr[dailyArr.length - 1].dt)
			.format('MMM')} ${moment
			.unix(dailyArr[dailyArr.length - 1].dt)
			.format('Do')}
    `;
	};
	return (
		<>
			<Box
				component="p"
				sx={{
					fontSize: '24px',
					fontWeight: 'bold',
					textAlign: 'center',
				}}
			>
				Forecast between {providedDates()} at {placeName}.
			</Box>

			{dailyArr.map((day, i) => {
				return (
					<Accordion
						key={i}
						expanded={expanded === i}
						onChange={handleChange(i)}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Grid
								container
								sx={{
									textAlign: 'center',
								}}
							>
								<Grid item xs={3}>
									<Box
										component="p"
										sx={{
											fontSize: '20px',
											fontWeight: 'bold',
											margin: ' 0 0 4px 0',
										}}
									>
										{moment.unix(day.dt).format('ddd')}
									</Box>
									<Box
										sx={{
											color: grey[500],
											fontSize: '15px',
										}}
									>
										{moment.unix(day.dt).format('MMM')} <span> </span>
										{moment.unix(day.dt).format('Do')}
									</Box>
								</Grid>
								<Grid item xs={3}>
									<i
										className={`wi ${day.weather[0].main}`}
										style={{ fontSize: '40px' }}
									></i>
								</Grid>
								<Grid
									item
									xs={3}
									sx={{
										fontSize: '20px',
									}}
								>
									{firstLetterUppercase(day.weather[0].description)}
								</Grid>
								<Grid item xs={3}>
									<Box
										component="span"
										sx={{
											fontSize: '30px',
											fontWeight: 'bold',
										}}
									>
										{Math.trunc(day.temp.max)}°
									</Box>
									<Box
										component="span"
										sx={{
											fontSize: '20px',
											color: grey[500],
										}}
									>
										/{Math.trunc(day.temp.min)}°
									</Box>
								</Grid>
							</Grid>
						</AccordionSummary>
						<AccordionDetails sx={{ textAlign: 'center' }}>
							{summary(day)}
						</AccordionDetails>
					</Accordion>
				);
			})}
		</>
	);
}
